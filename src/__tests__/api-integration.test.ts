/**
 * @fileoverview API Integration and Real-World Usage Tests
 * @description Test suite for simulating real-world API integration scenarios,
 * including authentication, rate limiting, and complex business logic flows.
 */

import { Seon } from "../index";

// Mock fetch globally
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("API Integration and Real-World Usage", () => {
  let seon: Seon;

  beforeEach(() => {
    jest.clearAllMocks();
    // Create Seon instance with error logging disabled for tests
    seon = new Seon("test-api-key", undefined, false);
  });

  describe("Authentication Scenarios", () => {
    it("should handle valid API key authentication", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          error: {},
          data: { fraud_score: 30, state: "APPROVE" },
        }),
      } as Response);

      await seon.fraud({ email: "test@example.com" });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            "X-API-KEY": "test-api-key",
          }),
        }),
      );
    });

    it("should handle different API key formats", async () => {
      const keyFormats = [
        "seon_live_1234567890abcdef",
        "seon_test_abcdef1234567890",
        "sk_live_12345",
        "pk_test_67890",
      ];

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, error: {}, data: {} }),
      } as Response);

      for (const apiKey of keyFormats) {
        const testSeon = new Seon(apiKey);
        await testSeon.fraud({ email: "test@example.com" });

        expect(mockFetch).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            headers: expect.objectContaining({
              "X-API-KEY": apiKey,
            }),
          }),
        );
      }
    });

    it("should handle API key rotation scenario", async () => {
      const oldKey = "seon_live_old_key";
      const newKey = "seon_live_new_key";

      // First request with old key (success)
      const oldSeon = new Seon(oldKey);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, error: {}, data: {} }),
      } as Response);

      await oldSeon.fraud({ email: "test@example.com" });

      // Second request with new key (after rotation)
      const newSeon = new Seon(newKey);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, error: {}, data: {} }),
      } as Response);

      await newSeon.fraud({ email: "test@example.com" });

      expect(mockFetch).toHaveBeenCalledTimes(2);
    });
  });

  describe("Regional Endpoint Handling", () => {
    it("should handle EU region endpoint", async () => {
      const euSeon = new Seon(
        "eu-key",
        "https://api.seon.io/SeonRestService/fraud-api/v2/",
      );

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, error: {}, data: {} }),
      } as Response);

      await euSeon.fraud({ email: "eu-user@example.com" });

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.seon.io/SeonRestService/fraud-api/v2/",
        expect.any(Object),
      );
    });

    it("should handle US region endpoint", async () => {
      const usSeon = new Seon(
        "us-key",
        "https://api.us-east-1-main.seon.io/SeonRestService/fraud-api/v2/",
      );

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, error: {}, data: {} }),
      } as Response);

      await usSeon.fraud({ email: "us-user@example.com" });

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.us-east-1-main.seon.io/SeonRestService/fraud-api/v2/",
        expect.any(Object),
      );
    });

    it("should handle custom/private endpoint", async () => {
      const customSeon = new Seon(
        "custom-key",
        "https://private-api.company.com/fraud/v2/",
      );

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, error: {}, data: {} }),
      } as Response);

      await customSeon.fraud({ email: "internal@company.com" });

      expect(mockFetch).toHaveBeenCalledWith(
        "https://private-api.company.com/fraud/v2/",
        expect.any(Object),
      );
    });
  });

  describe("Rate Limiting and Retry Logic", () => {
    it("should handle rate limiting gracefully", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 429,
        statusText: "Too Many Requests",
        text: async () => "Rate limit exceeded. Retry after 60 seconds.",
      } as Response);

      const response = await seon.fraud({ email: "rate-limited@example.com" });

      expect(response.success).toBe(false);
      expect(response.error["429 - Too Many Requests"]).toContain("Rate limit");
    });

    it("should handle burst requests", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          error: {},
          data: { fraud_score: 25 },
        }),
      } as Response);

      // Simulate burst of 10 concurrent requests
      const requests = Array.from({ length: 10 }, (_, i) =>
        seon.fraud({ email: `user${i}@example.com` }),
      );

      const responses = await Promise.all(requests);

      expect(responses).toHaveLength(10);
      responses.forEach((response) => {
        expect(response.success).toBe(true);
      });
      expect(mockFetch).toHaveBeenCalledTimes(10);
    });
  });

  describe("Business Logic Integration", () => {
    it("should simulate e-commerce checkout flow", async () => {
      // Simulate step-by-step e-commerce fraud check
      const checkoutData = {
        step1_email_check: { email: "customer@store.com" },
        step2_address_validation: {
          email: "customer@store.com",
          billing_country: "US",
          shipping_country: "US",
        },
        step3_payment_verification: {
          email: "customer@store.com",
          card_bin: "414141",
          card_last: "1234",
          transaction_amount: 299.99,
        },
      };

      // Mock different responses for each step
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            success: true,
            error: {},
            data: { fraud_score: 15, state: "APPROVE" },
          }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            success: true,
            error: {},
            data: { fraud_score: 20, state: "APPROVE" },
          }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            success: true,
            error: {},
            data: { fraud_score: 25, state: "APPROVE" },
          }),
        } as Response);

      const step1 = await seon.fraud(checkoutData.step1_email_check);
      const step2 = await seon.fraud(checkoutData.step2_address_validation);
      const step3 = await seon.fraud(checkoutData.step3_payment_verification);

      expect(step1.data?.fraud_score).toBe(15);
      expect(step2.data?.fraud_score).toBe(20);
      expect(step3.data?.fraud_score).toBe(25);
      expect(mockFetch).toHaveBeenCalledTimes(3);
    });

    it("should simulate gaming account registration with AML", async () => {
      const playerRegistration = {
        action_type: "register",
        email: "newplayer@casino.com",
        phone_number: "+1234567890",
        user_fullname: "John Player",
        user_dob: "1990-05-15",
        user_country: "US",
        config: {
          aml_api: true,
          email_api: true,
          phone_api: true,
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
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          error: {},
          data: {
            fraud_score: 35,
            state: "REVIEW",
            aml_details: {
              hits: [],
              monitoring_id: "mon_123456",
            },
          },
        }),
      } as Response);

      const registrationCheck = await seon.fraud(playerRegistration);

      expect(registrationCheck.data?.fraud_score).toBe(35);
      expect(registrationCheck.data?.state).toBe("REVIEW");
      expect(registrationCheck.data?.aml_details).toBeDefined();
    });

    it("should simulate financial services KYC workflow", async () => {
      const kycSteps = [
        {
          // Initial identity verification
          email: "customer@bank.com",
          user_fullname: "Jane Customer",
          user_dob: "1985-03-20",
          config: { email_api: true },
        },
        {
          // Enhanced due diligence
          email: "customer@bank.com",
          user_fullname: "Jane Customer",
          user_photoid_number: "DL123456789",
          config: {
            aml_api: true,
            aml: {
              version: "v1",
              sources: {
                sanction_enabled: true,
                pep_enabled: true,
                crimelist_enabled: true,
              },
            },
          },
        },
      ];

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            success: true,
            error: {},
            data: { fraud_score: 10, state: "APPROVE" },
          }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            success: true,
            error: {},
            data: {
              fraud_score: 15,
              state: "APPROVE",
              aml_details: { hits: [] },
            },
          }),
        } as Response);

      const identityCheck = await seon.fraud(kycSteps[0]);
      const enhancedDueDiligence = await seon.fraud(kycSteps[1]);

      expect(identityCheck.data?.state).toBe("APPROVE");
      expect(enhancedDueDiligence.data?.aml_details).toBeDefined();
    });
  });

  describe("Error Recovery Patterns", () => {
    it("should handle temporary service unavailability", async () => {
      // First request fails
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 503,
        statusText: "Service Unavailable",
        text: async () => "Service temporarily unavailable",
      } as Response);

      // Second request succeeds
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          error: {},
          data: { fraud_score: 30 },
        }),
      } as Response);

      const firstAttempt = await seon.fraud({ email: "retry@example.com" });
      const secondAttempt = await seon.fraud({ email: "retry@example.com" });

      expect(firstAttempt.success).toBe(false);
      expect(secondAttempt.success).toBe(true);
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it("should handle partial service degradation", async () => {
      // Some modules work, others don't
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          error: {},
          data: {
            fraud_score: 40,
            state: "REVIEW",
            email_details: {
              /* normal response */
            },
            ip_details: null, // IP service degraded
            phone_details: {
              /* normal response */
            },
          },
        }),
      } as Response);

      const response = await seon.fraud({
        email: "degraded@example.com",
        config: {
          email_api: true,
          ip_api: true,
          phone_api: true,
        },
      });

      expect(response.success).toBe(true);
      expect(response.data?.email_details).toBeDefined();
      expect(response.data?.ip_details).toBeNull();
    });
  });

  describe("Performance and Load Testing", () => {
    it("should handle high-volume processing", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          error: {},
          data: { fraud_score: 25, calculation_time: 500 },
        }),
      } as Response);

      const startTime = Date.now();
      const batchSize = 100;

      const batchPromises = Array.from({ length: batchSize }, (_, i) =>
        seon.fraud({ email: `batch${i}@example.com` }),
      );

      const results = await Promise.all(batchPromises);
      const endTime = Date.now();

      expect(results).toHaveLength(batchSize);
      expect(mockFetch).toHaveBeenCalledTimes(batchSize);
      expect(endTime - startTime).toBeLessThan(10000); // Should complete within 10 seconds
    });

    it("should handle memory-intensive requests", async () => {
      // Create a large request payload
      const largePayload = {
        email: "large@example.com",
        items: Array.from({ length: 100 }, (_, i) => ({
          item_id: `ITEM_${i}`,
          item_name: `Product ${i}`,
          item_quantity: 1,
          item_price: 10.99,
          item_store: "Test Store",
          item_store_country: "US",
          item_category: "test",
          item_url: `https://example.com/item${i}`,
          item_custom_fields: {
            description: "x".repeat(1000), // Large description
            metadata: JSON.stringify({ data: "x".repeat(1000) }),
          },
        })),
        custom_fields: Object.fromEntries(
          Array.from({ length: 50 }, (_, i) => [`field_${i}`, `value_${i}`]),
        ),
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          error: {},
          data: { fraud_score: 35 },
        }),
      } as Response);

      const response = await seon.fraud(largePayload);

      expect(response.success).toBe(true);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining("large@example.com"),
        }),
      );
    });
  });
});
