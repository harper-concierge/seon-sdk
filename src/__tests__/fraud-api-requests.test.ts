/**
 * @fileoverview Fraud API Request Types and Configurations Tests
 * @description Comprehensive test suite for various fraud API request types,
 * configurations, and use case scenarios including e-commerce, gaming, and AML.
 */

import { Seon, FraudApiRequest } from "../index";

// Mock fetch globally
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("Fraud API Request Types and Configurations", () => {
  let seon: Seon;

  beforeEach(() => {
    jest.clearAllMocks();
    // Create Seon instance with error logging disabled for tests
    seon = new Seon("test-api-key", undefined, false);

    // Default successful mock response
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        error: {},
        data: { fraud_score: 25, state: "APPROVE", id: "test-123" },
      }),
    } as Response);
  });

  describe("E-commerce Fraud Requests", () => {
    it("should handle basic e-commerce payment request", async () => {
      const ecommerceRequest: FraudApiRequest = {
        action_type: "payment",
        transaction_id: "ecom_12345",
        transaction_amount: 99.99,
        transaction_currency: "USD",
        email: "customer@example.com",
        card_bin: "414141",
        card_last: "1234",
        billing_country: "US",
        shipping_country: "US",
        config: {
          email_api: true,
          ip_api: true,
          device_fingerprinting: true,
        },
      };

      await seon.fraud(ecommerceRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "X-API-KEY": "test-api-key",
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(ecommerceRequest),
        }),
      );
    });

    it("should handle comprehensive e-commerce request with items", async () => {
      const request: FraudApiRequest = {
        action_type: "payment",
        transaction_amount: 299.99,
        transaction_currency: "USD",
        email: "buyer@example.com",
        phone_number: "+1234567890",
        items: [
          {
            item_id: "ITEM001",
            item_name: "Premium Widget",
            item_quantity: 2,
            item_price: 149.99,
            item_store: "Main Store",
            item_store_country: "US",
            item_category: "electronics",
            item_url: "https://store.example.com/item001",
            item_custom_fields: {
              warranty: true,
              color: "blue",
            },
          },
        ],
        config: {
          email_api: true,
          phone_api: true,
          email: {
            version: "v2",
            include: "breach_details",
          },
        },
      };

      const response = await seon.fraud(request);
      expect(response.success).toBe(true);
    });
  });

  describe("Gaming/iGaming Fraud Requests", () => {
    it("should handle player registration with AML screening", async () => {
      const gamingRequest: FraudApiRequest = {
        action_type: "register",
        email: "player@example.com",
        phone_number: "+1234567890",
        user_fullname: "John Player",
        user_dob: "1990-05-15",
        user_country: "US",
        config: {
          aml_api: true,
          email_api: true,
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
          bonus_claimed: false,
          affiliate_code: "PARTNER123",
        },
      };

      await seon.fraud(gamingRequest);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: JSON.stringify(gamingRequest),
        }),
      );
    });

    it("should handle deposit transaction monitoring", async () => {
      const depositRequest: FraudApiRequest = {
        action_type: "deposit",
        transaction_amount: 500.0,
        transaction_currency: "EUR",
        user_id: "player_789",
        payment_provider: "stripe",
        config: {
          ip_api: true,
          device_fingerprinting: true,
        },
      };

      const response = await seon.fraud(depositRequest);
      expect(response.success).toBe(true);
    });
  });

  describe("Financial Services Requests", () => {
    it("should handle KYC verification request", async () => {
      const kycRequest: FraudApiRequest = {
        action_type: "register",
        email: "customer@bank.com",
        phone_number: "+1987654321",
        user_fullname: "Jane Customer",
        user_dob: "1985-03-20",
        user_photoid_number: "DL123456789",
        user_bank_account: "****5678",
        user_bank_name: "Chase Bank",
        config: {
          aml_api: true,
          email_api: true,
          phone_api: true,
          aml: {
            version: "v1",
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
      };

      await seon.fraud(kycRequest);
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  describe("Device Intelligence Requests", () => {
    it("should handle device fingerprinting with session data", async () => {
      const deviceRequest: FraudApiRequest = {
        session_id: "sess_abc123def456",
        session: "encrypted_device_data_payload",
        device_id: "dev_xyz789",
        ip: "203.0.113.1",
        config: {
          device_fingerprinting: true,
          device: {
            include: "device_location,extended_device_location",
          },
        },
      };

      await seon.fraud(deviceRequest);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: JSON.stringify(deviceRequest),
        }),
      );
    });
  });

  describe("Configuration Edge Cases", () => {
    it("should handle minimal configuration", async () => {
      const minimalRequest: FraudApiRequest = {
        email: "simple@test.com",
      };

      await seon.fraud(minimalRequest);
      expect(mockFetch).toHaveBeenCalled();
    });

    it("should handle maximum configuration complexity", async () => {
      const maximalRequest: FraudApiRequest = {
        config: {
          ip: {
            version: "v1",
            include: "flags,history,id",
            flags_timeframe_days: 30,
          },
          email: {
            version: "v2",
            timeout: 5000,
            priority_timeout: 2000,
            include: "flags,history,id,breach_details",
            data_enrichment_mode: "detailed",
          },
          phone: {
            version: "v1",
            timeout: 3000,
            include: "hlr_details,cnam_lookup",
            exclude: "photo,last_seen",
          },
          aml: {
            version: "v1",
            monitoring_required: true,
            monitoring_schedule: "MONTHLY",
            fuzzy_enabled: true,
            phonetic_search_enabled: true,
            edit_distance_enabled: true,
            scoring: {
              result_limit: 20,
              score_threshold: 0.8,
            },
            sources: {
              sanction_enabled: true,
              pep_enabled: true,
              watchlist_enabled: true,
              crimelist_enabled: true,
              adversemedia_enabled: true,
            },
          },
          email_api: true,
          phone_api: true,
          ip_api: true,
          aml_api: true,
          device_fingerprinting: true,
          device: {
            include: "device_location,extended_device_location",
            response_fields: "id,state,fraud_score",
          },
        },
        action_type: "payment",
        email: "complex@test.com",
        phone_number: "+1234567890",
        transaction_amount: 1000.0,
      };

      await seon.fraud(maximalRequest);
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  describe("Custom Fields Validation", () => {
    it("should handle various custom field types", async () => {
      const customFieldsRequest: FraudApiRequest = {
        email: "test@example.com",
        custom_fields: {
          loyalty_tier: "platinum",
          is_employee: true,
          account_age_days: 365,
          referral_code: "REF123",
          marketing_consent: false,
          previous_orders: 15,
          subscription_active: true,
        },
      };

      await seon.fraud(customFieldsRequest);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: JSON.stringify(customFieldsRequest),
        }),
      );
    });
  });
});
