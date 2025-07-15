/**
 * @fileoverview Use Case Scenarios Tests
 * @description Test suite for industry-specific use cases including e-commerce,
 * gaming, fintech, marketplace, and subscription business scenarios.
 */

import { Seon, FraudApiRequest } from "../index";

// Mock fetch globally
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("Use Case Scenarios", () => {
  let seon: Seon;

  beforeEach(() => {
    jest.clearAllMocks();
    seon = new Seon("test-api-key");

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        error: {},
        data: { fraud_score: 25, state: "APPROVE", id: "test-123" },
      }),
    } as Response);
  });

  describe("E-commerce Scenarios", () => {
    it("should handle new customer first purchase", async () => {
      const firstPurchaseRequest: FraudApiRequest = {
        action_type: "payment",
        transaction_id: "first_purchase_001",
        transaction_amount: 79.99,
        transaction_currency: "USD",
        transaction_type: "purchase",

        // New customer data
        email: "newcustomer@example.com",
        user_fullname: "New Customer",
        user_country: "US",

        // Payment details
        card_bin: "414141",
        card_last: "1234",
        payment_provider: "stripe",

        // Shipping information
        shipping_country: "US",
        shipping_city: "New York",
        shipping_method: "standard",

        config: {
          email_api: true,
          ip_api: true,
          device_fingerprinting: true,
          email: {
            version: "v2",
            include: "breach_details,account_details",
          },
        },

        custom_fields: {
          is_first_purchase: true,
          customer_type: "new",
          marketing_source: "google_ads",
        },
      };

      const response = await seon.fraud(firstPurchaseRequest);
      expect(response.success).toBe(true);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining("first_purchase"),
        }),
      );
    });

    it("should handle high-value luxury purchase", async () => {
      const luxuryPurchaseRequest: FraudApiRequest = {
        action_type: "payment",
        transaction_amount: 2500.0,
        transaction_currency: "USD",

        email: "vip@example.com",
        user_fullname: "VIP Customer",

        items: [
          {
            item_id: "LUX001",
            item_name: "Designer Watch",
            item_quantity: 1,
            item_price: 2500.0,
            item_store: "Luxury Boutique",
            item_store_country: "US",
            item_category: "luxury_goods",
            item_url: "https://luxury.com/watch",
            item_custom_fields: {
              brand: "Swiss Brand",
              authentication_required: true,
              insurance_value: 3000.0,
            },
          },
        ],

        config: {
          email_api: true,
          ip_api: true,
          device_fingerprinting: true,
        },

        custom_fields: {
          loyalty_tier: "platinum",
          purchase_category: "luxury",
          requires_signature: true,
        },
      };

      await seon.fraud(luxuryPurchaseRequest);
      expect(mockFetch).toHaveBeenCalled();
    });

    it("should handle cross-border marketplace transaction", async () => {
      const crossBorderRequest: FraudApiRequest = {
        action_type: "payment",
        transaction_amount: 150.0,
        transaction_currency: "EUR",

        email: "buyer@international.com",
        user_country: "DE",
        ip: "192.0.2.1",

        // Different countries
        billing_country: "DE",
        billing_city: "Berlin",
        shipping_country: "FR",
        shipping_city: "Paris",

        merchant_id: "seller_456",
        merchant_country: "IT",

        config: {
          email_api: true,
          ip_api: true,
          ip: {
            version: "v1",
            include: "flags,geolocation",
          },
        },

        custom_fields: {
          marketplace_platform: "european_marketplace",
          seller_rating: 4.8,
          cross_border: true,
        },
      };

      await seon.fraud(crossBorderRequest);
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  describe("Gaming and iGaming Scenarios", () => {
    it("should handle new player registration", async () => {
      const playerRegistrationRequest: FraudApiRequest = {
        action_type: "register",
        email: "newplayer@gaming.com",
        phone_number: "+1234567890",
        user_fullname: "New Player",
        user_dob: "1992-08-15",
        user_country: "US",
        user_region: "CA",
        ip: "198.51.100.1",

        config: {
          aml_api: true,
          email_api: true,
          phone_api: true,
          device_fingerprinting: true,
          aml: {
            version: "v1",
            monitoring_required: true,
            sources: {
              sanction_enabled: true,
              pep_enabled: true,
              watchlist_enabled: true,
            },
          },
        },

        custom_fields: {
          registration_source: "mobile_app",
          age_verified: true,
          jurisdiction_compliant: true,
          bonus_eligible: true,
        },
      };

      await seon.fraud(playerRegistrationRequest);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining("register"),
        }),
      );
    });

    it("should handle large deposit transaction", async () => {
      const largeDepositRequest: FraudApiRequest = {
        action_type: "deposit",
        transaction_amount: 5000.0,
        transaction_currency: "USD",

        user_id: "player_12345",
        email: "highroller@casino.com",
        payment_provider: "bank_transfer",

        config: {
          ip_api: true,
          device_fingerprinting: true,
          aml_api: true,
          aml: {
            version: "v1",
            monitoring_required: true,
            sources: {
              sanction_enabled: true,
              pep_enabled: true,
            },
          },
        },

        custom_fields: {
          player_tier: "vip",
          deposit_count: 15,
          lifetime_deposits: 25000.0,
          source_of_funds_verified: true,
        },
      };

      await seon.fraud(largeDepositRequest);
      expect(mockFetch).toHaveBeenCalled();
    });

    it("should handle bonus abuse prevention", async () => {
      const bonusRequest: FraudApiRequest = {
        action_type: "bonus_claim",
        user_id: "player_67890",
        email: "bonusplayer@casino.com",
        ip: "203.0.113.50",
        device_id: "dev_mobile_123",

        config: {
          device_fingerprinting: true,
          ip_api: true,
          device: {
            include: "device_location,extended_device_location",
          },
        },

        custom_fields: {
          bonus_type: "welcome_bonus",
          bonus_amount: 100.0,
          wagering_requirement: 30,
          account_age_hours: 2,
          previous_bonuses: 0,
        },
      };

      await seon.fraud(bonusRequest);
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  describe("Financial Services Scenarios", () => {
    it("should handle bank account opening", async () => {
      const accountOpeningRequest: FraudApiRequest = {
        action_type: "register",
        email: "customer@personal.com",
        phone_number: "+1987654321",
        user_fullname: "Banking Customer",
        user_dob: "1980-12-03",
        user_photoid_number: "DL987654321",
        user_country: "US",
        user_region: "NY",
        user_city: "New York",
        user_zip: "10001",
        user_street: "123 Banking Street",

        config: {
          aml_api: true,
          email_api: true,
          phone_api: true,
          aml: {
            version: "v1",
            monitoring_required: true,
            monitoring_schedule: "QUARTERLY",
            fuzzy_enabled: true,
            phonetic_search_enabled: true,
            sources: {
              sanction_enabled: true,
              pep_enabled: true,
              crimelist_enabled: true,
              adversemedia_enabled: true,
            },
          },
        },

        custom_fields: {
          account_type: "checking",
          initial_deposit: 1000.0,
          employment_status: "employed",
          annual_income: 75000,
          kyc_level: "full",
        },
      };

      await seon.fraud(accountOpeningRequest);
      expect(mockFetch).toHaveBeenCalled();
    });

    it("should handle high-value wire transfer", async () => {
      const wireTransferRequest: FraudApiRequest = {
        action_type: "wire_transfer",
        transaction_amount: 25000.0,
        transaction_currency: "USD",

        user_id: "customer_54321",
        email: "wirecustomer@bank.com",
        receiver_fullname: "Recipient Name",
        receiver_bank_account: "****6789",

        config: {
          aml_api: true,
          aml: {
            version: "v1",
            monitoring_required: true,
            sources: {
              sanction_enabled: true,
              pep_enabled: true,
              watchlist_enabled: true,
            },
          },
        },

        custom_fields: {
          wire_purpose: "business_payment",
          recipient_country: "CA",
          source_of_funds: "business_account",
          compliance_reviewed: true,
        },
      };

      await seon.fraud(wireTransferRequest);
      expect(mockFetch).toHaveBeenCalled();
    });

    it("should handle loan application", async () => {
      const loanApplicationRequest: FraudApiRequest = {
        action_type: "loan_application",
        email: "borrower@example.com",
        phone_number: "+1555987654",
        user_fullname: "Loan Applicant",
        user_dob: "1985-04-20",
        user_bank_account: "****1234",
        user_bank_name: "Primary Bank",

        config: {
          email_api: true,
          phone_api: true,
          aml_api: true,
          email: {
            version: "v2",
            include: "breach_details",
          },
          aml: {
            version: "v1",
            sources: {
              sanction_enabled: true,
              pep_enabled: true,
            },
          },
        },

        custom_fields: {
          loan_amount: 50000.0,
          loan_purpose: "home_improvement",
          credit_score: 720,
          employment_verified: true,
          income_verified: true,
        },
      };

      await seon.fraud(loanApplicationRequest);
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  describe("Subscription and SaaS Scenarios", () => {
    it("should handle subscription signup", async () => {
      const subscriptionRequest: FraudApiRequest = {
        action_type: "subscription_start",
        email: "subscriber@company.com",
        transaction_amount: 99.0,
        transaction_currency: "USD",
        transaction_type: "subscription",

        card_bin: "424242",
        card_last: "4242",
        payment_provider: "stripe",

        config: {
          email_api: true,
          ip_api: true,
          email: {
            version: "v2",
            include: "breach_details,account_details",
          },
        },

        custom_fields: {
          plan_type: "professional",
          billing_cycle: "monthly",
          trial_used: false,
          company_size: "50-100",
        },
      };

      await seon.fraud(subscriptionRequest);
      expect(mockFetch).toHaveBeenCalled();
    });

    it("should handle freemium to paid conversion", async () => {
      const conversionRequest: FraudApiRequest = {
        action_type: "upgrade",
        user_id: "freemium_user_123",
        email: "upgrade@saas.com",
        transaction_amount: 199.0,
        transaction_currency: "USD",

        config: {
          email_api: true,
          device_fingerprinting: true,
        },

        custom_fields: {
          previous_plan: "free",
          new_plan: "enterprise",
          usage_days: 30,
          feature_usage_score: 85,
          support_tickets: 2,
        },
      };

      await seon.fraud(conversionRequest);
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  describe("Marketplace and Gig Economy Scenarios", () => {
    it("should handle driver onboarding", async () => {
      const driverOnboardingRequest: FraudApiRequest = {
        action_type: "driver_signup",
        email: "newdriver@rideshare.com",
        phone_number: "+1234567890",
        user_fullname: "New Driver",
        user_dob: "1988-07-12",
        user_photoid_number: "DL123456789",

        config: {
          email_api: true,
          phone_api: true,
          aml_api: true,
          phone: {
            version: "v1",
            include: "account_details",
          },
          aml: {
            version: "v1",
            sources: {
              sanction_enabled: true,
              crimelist_enabled: true,
            },
          },
        },

        custom_fields: {
          vehicle_year: 2020,
          vehicle_make: "Toyota",
          vehicle_model: "Camry",
          background_check_passed: true,
          insurance_verified: true,
        },
      };

      await seon.fraud(driverOnboardingRequest);
      expect(mockFetch).toHaveBeenCalled();
    });

    it("should handle freelancer payment", async () => {
      const freelancerPaymentRequest: FraudApiRequest = {
        action_type: "payout",
        transaction_amount: 750.0,
        transaction_currency: "USD",

        user_id: "freelancer_456",
        email: "freelancer@work.com",
        receiver_bank_account: "****9876",

        config: {
          email_api: true,
          aml_api: true,
        },

        custom_fields: {
          project_completed: true,
          client_rating: 5.0,
          freelancer_tier: "expert",
          earnings_this_month: 2500.0,
          tax_form_submitted: true,
        },
      };

      await seon.fraud(freelancerPaymentRequest);
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  describe("Digital Goods and NFT Scenarios", () => {
    it("should handle NFT marketplace transaction", async () => {
      const nftPurchaseRequest: FraudApiRequest = {
        action_type: "nft_purchase",
        transaction_amount: 1.5, // ETH
        transaction_currency: "ETH",

        email: "collector@nft.com",
        user_fullname: "NFT Collector",

        items: [
          {
            item_id: "NFT_001",
            item_name: "Digital Art Piece #42",
            item_quantity: 1,
            item_price: 1.5,
            item_store: "NFT Marketplace",
            item_store_country: "US",
            item_category: "digital_art",
            item_url: "https://nftmarket.com/token/42",
            item_custom_fields: {
              token_id: "42",
              collection: "Digital Artists",
              blockchain: "ethereum",
              rarity: "rare",
            },
          },
        ],

        config: {
          email_api: true,
          ip_api: true,
          device_fingerprinting: true,
        },

        custom_fields: {
          wallet_address: "0x742d35Cc6634C0532925a3b8D4064",
          wallet_age_days: 90,
          previous_nft_purchases: 5,
          collection_holder: true,
        },
      };

      await seon.fraud(nftPurchaseRequest);
      expect(mockFetch).toHaveBeenCalled();
    });

    it("should handle in-app purchase", async () => {
      const inAppPurchaseRequest: FraudApiRequest = {
        action_type: "in_app_purchase",
        transaction_amount: 4.99,
        transaction_currency: "USD",

        user_id: "mobile_user_789",
        email: "gamer@mobile.com",
        device_id: "ios_device_123",

        config: {
          device_fingerprinting: true,
          device: {
            include: "device_location",
          },
        },

        custom_fields: {
          app_version: "2.1.3",
          item_purchased: "premium_currency",
          currency_amount: 1000,
          player_level: 15,
          session_duration_minutes: 45,
        },
      };

      await seon.fraud(inAppPurchaseRequest);
      expect(mockFetch).toHaveBeenCalled();
    });
  });
});
