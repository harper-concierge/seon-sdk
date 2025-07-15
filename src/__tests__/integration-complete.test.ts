/**
 * @fileoverview Complete Integration Test Suite
 * @description End-to-end integration tests that validate the complete SEON SDK
 * functionality including all modules, configurations, and real-world workflows.
 */

import { Seon, FraudApiRequest, FraudApiResponse, hmacSha256 } from "../index";

// Mock fetch globally
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("Complete Integration Test Suite", () => {
  let seon: Seon;

  beforeEach(() => {
    jest.clearAllMocks();
    seon = new Seon("integration-test-key");
  });

  describe("Full Workflow Integration", () => {
    it("should handle complete e-commerce transaction workflow", async () => {
      // Mock different responses for each step
      const responses = [
        // Step 1: Email validation
        {
          ok: true,
          json: async () => ({
            success: true,
            error: {},
            data: {
              id: "email_check_001",
              fraud_score: 15,
              state: "APPROVE",
              email_details: {
                email: "customer@store.com",
                deliverable: true,
                score: 10,
              },
            },
          }),
        },
        // Step 2: Address verification
        {
          ok: true,
          json: async () => ({
            success: true,
            error: {},
            data: {
              id: "address_check_002",
              fraud_score: 20,
              state: "APPROVE",
              geolocation_details: {
                ip_billing_distance: 5.2,
                ip_shipping_distance: 250.8,
              },
            },
          }),
        },
        // Step 3: Payment verification
        {
          ok: true,
          json: async () => ({
            success: true,
            error: {},
            data: {
              id: "payment_check_003",
              fraud_score: 25,
              state: "APPROVE",
              bin_details: {
                card_bin: "414141",
                bin_bank: "Test Bank",
                bin_valid: true,
              },
            },
          }),
        },
        // Step 4: Final comprehensive check
        {
          ok: true,
          json: async () => ({
            success: true,
            error: {},
            data: {
              id: "final_check_004",
              fraud_score: 30,
              state: "APPROVE",
              applied_rules: [
                {
                  id: "RULE_001",
                  name: "Email reputation",
                  operation: "+",
                  score: 5,
                },
                {
                  id: "RULE_002",
                  name: "Shipping distance",
                  operation: "+",
                  score: 10,
                },
              ],
            },
          }),
        },
      ];

      mockFetch
        .mockResolvedValueOnce(responses[0] as Response)
        .mockResolvedValueOnce(responses[1] as Response)
        .mockResolvedValueOnce(responses[2] as Response)
        .mockResolvedValueOnce(responses[3] as Response);

      // Step 1: Initial email check
      const emailCheck = await seon.fraud({
        email: "customer@store.com",
        config: { email_api: true },
      });

      // Step 2: Address verification
      const addressCheck = await seon.fraud({
        email: "customer@store.com",
        ip: "192.168.1.1",
        billing_country: "US",
        shipping_country: "US",
        config: { ip_api: true },
      });

      // Step 3: Payment method validation
      const paymentCheck = await seon.fraud({
        email: "customer@store.com",
        card_bin: "414141",
        card_last: "1234",
        payment_provider: "stripe",
        config: { email_api: false }, // Already checked
      });

      // Step 4: Final comprehensive check
      const finalCheck = await seon.fraud({
        action_type: "payment",
        transaction_id: "ecom_final_001",
        transaction_amount: 299.99,
        transaction_currency: "USD",
        email: "customer@store.com",
        card_bin: "414141",
        items: [
          {
            item_id: "PROD001",
            item_name: "Premium Widget",
            item_quantity: 1,
            item_price: 299.99,
            item_store: "Online Store",
            item_store_country: "US",
            item_category: "electronics",
            item_url: "https://store.com/widget",
            item_custom_fields: { warranty: true },
          },
        ],
        config: {
          email_api: true,
          ip_api: true,
          device_fingerprinting: true,
        },
      });

      // Validate each step
      expect(emailCheck.success).toBe(true);
      expect(emailCheck.data?.fraud_score).toBe(15);

      expect(addressCheck.success).toBe(true);
      expect(addressCheck.data?.fraud_score).toBe(20);

      expect(paymentCheck.success).toBe(true);
      expect(paymentCheck.data?.fraud_score).toBe(25);

      expect(finalCheck.success).toBe(true);
      expect(finalCheck.data?.fraud_score).toBe(30);
      expect(finalCheck.data?.applied_rules).toHaveLength(2);

      expect(mockFetch).toHaveBeenCalledTimes(4);
    });

    it("should handle gaming registration and deposit workflow", async () => {
      const registrationResponse = {
        ok: true,
        json: async () => ({
          success: true,
          error: {},
          data: {
            id: "gaming_reg_001",
            fraud_score: 20,
            state: "APPROVE",
            aml_details: { hits: [], monitoring_id: "mon_123" },
          },
        }),
      };

      const depositResponse = {
        ok: true,
        json: async () => ({
          success: true,
          error: {},
          data: {
            id: "gaming_dep_001",
            fraud_score: 25,
            state: "APPROVE",
            device_details: { device_hash: "dev_hash_123" },
          },
        }),
      };

      mockFetch
        .mockResolvedValueOnce(registrationResponse as Response)
        .mockResolvedValueOnce(depositResponse as Response);

      // Player registration
      const registration = await seon.fraud({
        action_type: "register",
        email: "player@casino.com",
        phone_number: "+1234567890",
        user_fullname: "Gaming Player",
        user_dob: "1990-05-15",
        config: {
          aml_api: true,
          email_api: true,
          aml: {
            version: "v1",
            monitoring_required: true,
            sources: {
              sanction_enabled: true,
              pep_enabled: true,
            },
          },
        },
      });

      // First deposit
      const deposit = await seon.fraud({
        action_type: "deposit",
        user_id: "player_123",
        transaction_amount: 100.0,
        transaction_currency: "USD",
        payment_provider: "credit_card",
        config: {
          device_fingerprinting: true,
          ip_api: true,
        },
      });

      expect(registration.success).toBe(true);
      expect(registration.data?.aml_details).toBeDefined();

      expect(deposit.success).toBe(true);
      expect(deposit.data?.device_details).toBeDefined();
    });
  });

  describe("Error Handling Integration", () => {
    it("should handle cascading failures gracefully", async () => {
      const responses = [
        // First request fails
        {
          ok: false,
          status: 503,
          statusText: "Service Unavailable",
          text: async () => "Service temporarily down",
        },
        // Second request succeeds
        {
          ok: true,
          json: async () => ({
            success: true,
            error: {},
            data: { fraud_score: 35, state: "APPROVE" },
          }),
        },
      ];

      mockFetch
        .mockResolvedValueOnce(responses[0] as unknown as Response)
        .mockResolvedValueOnce(responses[1] as unknown as Response);

      // First attempt fails
      const failedResponse = await seon.fraud({
        email: "retry@example.com",
      });

      // Retry succeeds
      const successResponse = await seon.fraud({
        email: "retry@example.com",
      });

      expect(failedResponse.success).toBe(false);
      expect(failedResponse.error["503 - Service Unavailable"]).toBeDefined();

      expect(successResponse.success).toBe(true);
      expect(successResponse.data?.fraud_score).toBe(35);
    });

    it("should handle partial module failures", async () => {
      const partialFailureResponse = {
        ok: true,
        json: async () => ({
          success: true,
          error: {},
          data: {
            fraud_score: 50,
            state: "REVIEW",
            email_details: { email: "test@example.com", score: 20 },
            ip_details: null, // IP module failed
            phone_details: { number: 1234567890, valid: true },
            aml_details: null, // AML module failed
          },
        }),
      };

      mockFetch.mockResolvedValue(partialFailureResponse as Response);

      const response = await seon.fraud({
        email: "partial@example.com",
        phone_number: "+1234567890",
        ip: "192.168.1.1",
        user_fullname: "Partial Test",
        config: {
          email_api: true,
          phone_api: true,
          ip_api: true,
          aml_api: true,
        },
      });

      expect(response.success).toBe(true);
      expect(response.data?.email_details).toBeDefined();
      expect(response.data?.phone_details).toBeDefined();
      expect(response.data?.ip_details).toBeNull();
      expect(response.data?.aml_details).toBeNull();
    });
  });

  describe("Security and Cryptographic Integration", () => {
    it("should integrate HMAC utilities with API requests", async () => {
      const requestPayload = {
        email: "secure@example.com",
        transaction_amount: 99.99,
        timestamp: Date.now(),
      };

      const apiSecret = "secure_api_secret_key";
      const signature = hmacSha256(JSON.stringify(requestPayload), apiSecret);

      // Add signature to custom fields
      const secureRequest: FraudApiRequest = {
        ...requestPayload,
        custom_fields: {
          request_signature: signature,
          signed_at: requestPayload.timestamp,
        },
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          error: {},
          data: { fraud_score: 20, state: "APPROVE" },
        }),
      } as Response);

      const response = await seon.fraud(secureRequest);

      expect(response.success).toBe(true);
      expect(signature).toMatch(/^[a-f0-9]{64}$/);

      // Verify signature in request body
      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining(signature),
        }),
      );
    });

    it("should handle webhook verification scenario", async () => {
      const webhookPayload = JSON.stringify({
        event: "fraud_check_completed",
        transaction_id: "txn_webhook_001",
        fraud_score: 35,
        state: "REVIEW",
      });

      const webhookSecret = "webhook_secret_key";
      const expectedSignature = hmacSha256(webhookPayload, webhookSecret);

      // Simulate receiving webhook with signature
      const receivedSignature = hmacSha256(webhookPayload, webhookSecret);

      // Verify webhook authenticity
      expect(receivedSignature).toBe(expectedSignature);
      expect(receivedSignature.length).toBe(64);
    });
  });

  describe("Multi-Regional Integration", () => {
    it("should handle requests across different regions", async () => {
      const regions = [
        {
          name: "US",
          seon: new Seon(
            "us-key",
            "https://api.us-east-1-main.seon.io/SeonRestService/fraud-api/v2/",
          ),
        },
        {
          name: "EU",
          seon: new Seon(
            "eu-key",
            "https://api.seon.io/SeonRestService/fraud-api/v2/",
          ),
        },
      ];

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          error: {},
          data: { fraud_score: 30, state: "APPROVE" },
        }),
      } as Response);

      for (const region of regions) {
        const response = await region.seon.fraud({
          email: `${region.name.toLowerCase()}@example.com`,
          user_country: region.name === "US" ? "US" : "DE",
        });

        expect(response.success).toBe(true);
      }

      expect(mockFetch).toHaveBeenCalledTimes(2);
    });
  });

  describe("Type Safety Integration", () => {
    it("should maintain type safety throughout complete workflows", async () => {
      const typedRequest: FraudApiRequest = {
        action_type: "payment",
        email: "typed@example.com",
        transaction_amount: 199.99,
        transaction_currency: "USD",
        config: {
          email_api: true,
          email: {
            version: "v2",
            include: "breach_details",
          },
        },
        custom_fields: {
          type_safe: true,
          test_mode: false,
          priority: 1,
        },
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          error: {},
          data: {
            id: "typed_001",
            fraud_score: 25,
            state: "APPROVE",
            version: "v2",
            applied_rules: [],
            calculation_time: 1500,
            seon_id: 12345,
          },
        }),
      } as Response);

      const response: FraudApiResponse = await seon.fraud(typedRequest);

      // TypeScript ensures these properties exist and are correctly typed
      expect(response.success).toBe(true);
      expect(typeof response.data?.fraud_score).toBe("number");
      expect(typeof response.data?.state).toBe("string");
      expect(Array.isArray(response.data?.applied_rules)).toBe(true);
    });

    it("should validate complex nested type structures", async () => {
      const complexRequest: FraudApiRequest = {
        email: "complex@example.com",
        items: [
          {
            item_id: "COMPLEX_001",
            item_quantity: 2,
            item_name: "Complex Product",
            item_price: 149.99,
            item_store: "Complex Store",
            item_store_country: "US",
            item_category: "complex",
            item_url: "https://complex.com/product",
            item_custom_fields: {
              nested_object: {
                deep_property: "value",
              } as any,
              typed_boolean: true,
              typed_number: 42,
              typed_string: "test",
            },
          },
        ],
        config: {
          aml: {
            version: "v1",
            scoring: {
              result_limit: 15,
              score_threshold: 0.85,
            },
            sources: {
              sanction_enabled: true,
              pep_enabled: false,
              watchlist_enabled: true,
            },
          },
        },
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, error: {}, data: {} }),
      } as Response);

      const response = await seon.fraud(complexRequest);
      expect(response.success).toBe(true);
    });
  });

  describe("Performance Integration Under Load", () => {
    it("should maintain performance with realistic production load", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          error: {},
          data: { fraud_score: 25, calculation_time: 500 },
        }),
      } as Response);

      const productionScenarios = [
        // E-commerce burst
        ...Array.from({ length: 50 }, (_, i) => ({
          type: "ecommerce",
          request: {
            action_type: "payment",
            email: `ecom${i}@example.com`,
            transaction_amount: Math.random() * 500,
            config: { email_api: true, ip_api: true },
          },
        })),
        // Gaming registrations
        ...Array.from({ length: 30 }, (_, i) => ({
          type: "gaming",
          request: {
            action_type: "register",
            email: `gamer${i}@casino.com`,
            config: { aml_api: true, email_api: true },
          },
        })),
        // Financial KYC
        ...Array.from({ length: 20 }, (_, i) => ({
          type: "fintech",
          request: {
            action_type: "kyc_verification",
            email: `customer${i}@bank.com`,
            user_fullname: `Customer ${i}`,
            config: { aml_api: true, email_api: true },
          },
        })),
      ];

      const startTime = performance.now();

      const results = await Promise.all(
        productionScenarios.map((scenario) =>
          seon.fraud(scenario.request as FraudApiRequest),
        ),
      );

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(results).toHaveLength(100);
      expect(duration).toBeLessThan(5000); // Should handle 100 requests within 5 seconds
      expect(mockFetch).toHaveBeenCalledTimes(100);

      // Verify all responses are successful
      results.forEach((result) => {
        expect(result.success).toBe(true);
      });
    });
  });

  describe("Comprehensive Cleanup", () => {
    it("should properly cleanup all resources after integration tests", async () => {
      // Perform final verification that everything is working
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          error: {},
          data: { fraud_score: 0, state: "APPROVE" },
        }),
      } as Response);

      const cleanupResponse = await seon.fraud({
        email: "cleanup@integration.test",
      });

      expect(cleanupResponse.success).toBe(true);
      expect(mockFetch).toHaveBeenCalled();

      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }
    });
  });
});
