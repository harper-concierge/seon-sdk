import {
  Seon,
  LabelApiResponse,
  LabelApiTransaction,
  ValidLabel,
} from "../index";

// Mock fetch globally
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("Seon SDK - Label API", () => {
  const apiKey = "test-api-key";
  const baseUrl = "https://api.test.seon.io/SeonRestService";
  const labelApiUrl =
    "https://api.test.seon.io/SeonRestService/fraud-api/transaction-label/v2";

  let seon: Seon;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    // Create Seon instance with error logging disabled for tests
    seon = new Seon(apiKey, baseUrl, false);
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
  });

  afterEach(() => {
    // Clean up console spy
    consoleErrorSpy.mockRestore();
    // Give time for any pending async operations to complete
    return new Promise((resolve) => setTimeout(resolve, 100));
  });

  afterAll(async () => {
    // Final cleanup to ensure all async operations complete
    await new Promise((resolve) => setTimeout(resolve, 200));
  });

  describe("Single Transaction Label Operations", () => {
    describe("labelTransaction", () => {
      it("should label a single transaction successfully", async () => {
        const transactionId = "txn_123";
        const label: ValidLabel = "fraud_detection_fraud";
        const mockResponse: LabelApiResponse = {
          success: true,
          error: {},
          data: {},
        };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        } as Response);

        const result = await seon.labelTransaction(transactionId, label);

        expect(mockFetch).toHaveBeenCalledWith(labelApiUrl, {
          method: "PUT",
          headers: {
            "X-API-KEY": apiKey,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify({
            transactions: [{ transaction_id: transactionId, label }],
          }),
        });

        expect(result).toEqual(mockResponse);
      });

      it("should handle different label types", async () => {
        const transactionId = "txn_456";
        const positiveLabel: ValidLabel = "fraud_detection_marked_as_approved";
        const mockResponse: LabelApiResponse = {
          success: true,
          error: {},
          data: {},
        };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        } as Response);

        const result = await seon.labelTransaction(
          transactionId,
          positiveLabel,
        );

        expect(mockFetch).toHaveBeenCalledWith(labelApiUrl, {
          method: "PUT",
          headers: {
            "X-API-KEY": apiKey,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify({
            transactions: [
              { transaction_id: transactionId, label: positiveLabel },
            ],
          }),
        });

        expect(result).toEqual(mockResponse);
      });

      it("should handle labelTransaction API errors", async () => {
        const transactionId = "txn_123";
        const label: ValidLabel = "fraud_detection_fraud";
        const errorText =
          '{"success": false,"error":{"code":"1000","message":"Empty request body."},"data": {}}';

        mockFetch.mockResolvedValueOnce({
          ok: false,
          status: 400,
          statusText: "Bad Request",
          text: async () => errorText,
        } as Response);

        const result = await seon.labelTransaction(transactionId, label);

        expect(result).toEqual({
          success: false,
          error: {
            "400 - Bad Request": errorText,
          },
          data: undefined,
        });
      });

      it("should support all fraud detection labels", async () => {
        const fraudLabels: Array<ValidLabel> = [
          "fraud_detection_fraud",
          "fraud_detection_bonus_abuse",
          "fraud_detection_multi_accounting",
          "fraud_detection_ato",
          "fraud_detection_underage",
          "fraud_detection_false_identity",
          "fraud_detection_phishing",
          "fraud_detection_remote_access_fraud",
          "fraud_detection_chargeback_fraud",
          "fraud_detection_vishing",
          "fraud_detection_front_man",
          "fraud_detection_arbitrage",
          "fraud_detection_vishing_rat",
          "fraud_detection_bot",
          "fraud_detection_campaign_abuse",
          "fraud_detection_missed_fraud",
          "fraud_detection_marked_as_approved",
          "fraud_detection_verified_payment",
          "fraud_detection_false_alert",
        ];

        const mockResponse: LabelApiResponse = {
          success: true,
          error: {},
          data: {},
        };

        for (const label of fraudLabels) {
          mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
          } as Response);

          const result = await seon.labelTransaction("txn_test", label);
          expect(result.success).toBe(true);
        }

        expect(mockFetch).toHaveBeenCalledTimes(fraudLabels.length);
      });

      it("should support BNPL credit risk labels", async () => {
        const bnplLabels: Array<ValidLabel> = [
          "bnpl_credit_risk_default",
          "bnpl_credit_risk_fraud",
          "bnpl_credit_risk_first_payment_default",
          "bnpl_credit_risk_second_payment_default",
          "bnpl_credit_risk_mule",
          "bnpl_credit_risk_false_identity",
          "bnpl_credit_risk_underage",
          "bnpl_credit_risk_chargeback_fraud",
          "bnpl_credit_risk_no_intention_to_pay",
          "bnpl_credit_risk_missed_fraud",
          "bnpl_credit_risk_repaid",
          "bnpl_credit_risk_on_time_payment",
          "bnpl_credit_risk_fully_repaid",
          "bnpl_credit_risk_false_alert",
        ];

        const mockResponse: LabelApiResponse = {
          success: true,
          error: {},
          data: {},
        };

        for (const label of bnplLabels) {
          mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
          } as Response);

          const result = await seon.labelTransaction("txn_test", label);
          expect(result.success).toBe(true);
        }
      });

      it("should support ecommerce labels", async () => {
        const ecommerceLabels: Array<ValidLabel> = [
          "ecommerce_fraud",
          "ecommerce_false_identity",
          "ecommerce_first_party_fraud",
          "ecommerce_second_party_fraud",
          "ecommerce_third_party_fraud",
          "ecommerce_return_refund_abuse",
          "ecommerce_underage",
          "ecommerce_chargeback_fraud",
          "ecommerce_chargeback_dispute",
          "ecommerce_chargeback_processing_error",
          "ecommerce_chargeback_authorization_issue",
          "ecommerce_missed_fraud",
          "ecommerce_marked_as_approved",
          "ecommerce_false_alert",
        ];

        const mockResponse: LabelApiResponse = {
          success: true,
          error: {},
          data: {},
        };

        for (const label of ecommerceLabels) {
          mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
          } as Response);

          const result = await seon.labelTransaction("txn_test", label);
          expect(result.success).toBe(true);
        }
      });

      it("should support AML labels", async () => {
        const amlLabels: Array<ValidLabel> = [
          "aml_escalated_without_reporting",
          "aml_escalated_reported",
          "aml_false_alert",
          "aml_marked_as_approved",
        ];

        const mockResponse: LabelApiResponse = {
          success: true,
          error: {},
          data: {},
        };

        for (const label of amlLabels) {
          mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
          } as Response);

          const result = await seon.labelTransaction("txn_test", label);
          expect(result.success).toBe(true);
        }
      });
    });
  });

  describe("Multiple Transaction Label Operations", () => {
    describe("labelTransactions", () => {
      it("should label multiple transactions successfully", async () => {
        const labels: Array<LabelApiTransaction> = [
          { transaction_id: "txn_1", label: "fraud_detection_fraud" },
          {
            transaction_id: "txn_2",
            label: "fraud_detection_marked_as_approved",
          },
          { transaction_id: "txn_3", label: "ecommerce_false_alert" },
        ];
        const mockResponse: LabelApiResponse = {
          success: true,
          error: {},
          data: {},
        };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        } as Response);

        const result = await seon.labelTransactions(labels);

        expect(mockFetch).toHaveBeenCalledWith(labelApiUrl, {
          method: "PUT",
          headers: {
            "X-API-KEY": apiKey,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify({ transactions: labels }),
        });

        expect(result).toEqual(mockResponse);
      });

      it("should handle labelTransactions API errors", async () => {
        const labels: Array<LabelApiTransaction> = [
          { transaction_id: "txn_1", label: "fraud_detection_fraud" },
        ];
        const errorText =
          '{"success": false,"error":{"code":"1005","message":"Request did not contain any transactions."},"data": {}}';

        mockFetch.mockResolvedValueOnce({
          ok: false,
          status: 400,
          statusText: "Bad Request",
          text: async () => errorText,
        } as Response);

        const result = await seon.labelTransactions(labels);

        expect(result).toEqual({
          success: false,
          error: {
            "400 - Bad Request": errorText,
          },
          data: undefined,
        });
      });

      it("should handle authentication errors", async () => {
        const labels: Array<LabelApiTransaction> = [
          { transaction_id: "txn_1", label: "fraud_detection_fraud" },
        ];
        const errorText =
          '{"success": false,"error":{"code":"2001","message":"The authentication token is invalid."},"data": {}}';

        mockFetch.mockResolvedValueOnce({
          ok: false,
          status: 401,
          statusText: "Unauthorized",
          text: async () => errorText,
        } as Response);

        const result = await seon.labelTransactions(labels);

        expect(result).toEqual({
          success: false,
          error: {
            "401 - Unauthorized": errorText,
          },
          data: undefined,
        });
      });

      it("should handle rate limit errors", async () => {
        const labels: Array<LabelApiTransaction> = [
          { transaction_id: "txn_1", label: "fraud_detection_fraud" },
        ];
        const errorText =
          '{"success": false,"error":{"code":"4004","message":"Too Many Requests."},"data": {}}';

        mockFetch.mockResolvedValueOnce({
          ok: false,
          status: 429,
          statusText: "Too Many Requests",
          text: async () => errorText,
        } as Response);

        const result = await seon.labelTransactions(labels);

        expect(result).toEqual({
          success: false,
          error: {
            "429 - Too Many Requests": errorText,
          },
          data: undefined,
        });
      });

      it("should handle up to 50 transactions", async () => {
        const labels: Array<LabelApiTransaction> = Array.from(
          { length: 50 },
          (_, i) => ({
            transaction_id: `txn_${i}`,
            label: "fraud_detection_fraud" as ValidLabel,
          }),
        );
        const mockResponse: LabelApiResponse = {
          success: true,
          error: {},
          data: {},
        };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        } as Response);

        const result = await seon.labelTransactions(labels);

        expect(mockFetch).toHaveBeenCalledWith(labelApiUrl, {
          method: "PUT",
          headers: {
            "X-API-KEY": apiKey,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify({ transactions: labels }),
        });

        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe("Error Handling", () => {
    it("should handle network errors for Label API calls", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      await expect(
        seon.labelTransaction("txn_123", "fraud_detection_fraud"),
      ).rejects.toThrow("Network error");
    });

    it("should log errors when error logging is enabled", async () => {
      // Create a separate instance with logging enabled for this test
      const seonWithLogging = new Seon(apiKey, baseUrl, true);
      const errorText = "Label API Error";

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
        text: async () => errorText,
      } as Response);

      await seonWithLogging.labelTransaction(
        "txn_123",
        "fraud_detection_fraud",
      );

      // Verify error was logged
      expect(consoleErrorSpy).toHaveBeenCalledWith(errorText, {
        status: 500,
        statusText: "Internal Server Error",
      });
    });
  });

  describe("URL Construction", () => {
    it("should construct correct Label API URLs from base URLs", async () => {
      const customSeon = new Seon(
        apiKey,
        "https://api.us-east-1-main.seon.io/SeonRestService",
      );

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, error: {}, data: {} }),
      } as Response);

      await customSeon.labelTransaction("txn_123", "fraud_detection_fraud");

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.us-east-1-main.seon.io/SeonRestService/fraud-api/transaction-label/v2",
        expect.any(Object),
      );
    });

    it("should handle APAC endpoint URLs", async () => {
      const apacSeon = new Seon(
        apiKey,
        "https://api.ap-southeast-1-main.seon.io/SeonRestService",
      );

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, error: {}, data: {} }),
      } as Response);

      await apacSeon.labelTransaction("txn_123", "fraud_detection_fraud");

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.ap-southeast-1-main.seon.io/SeonRestService/fraud-api/transaction-label/v2",
        expect.any(Object),
      );
    });

    it("should handle default URL construction", async () => {
      const defaultSeon = new Seon(apiKey);

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, error: {}, data: {} }),
      } as Response);

      await defaultSeon.labelTransaction("txn_123", "fraud_detection_fraud");

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.seon.io/SeonRestService/fraud-api/transaction-label/v2",
        expect.any(Object),
      );
    });
  });

  describe("Edge Cases", () => {
    it("should handle single transaction in labelTransactions", async () => {
      const labels: Array<LabelApiTransaction> = [
        { transaction_id: "txn_123", label: "fraud_detection_fraud" },
      ];
      const mockResponse: LabelApiResponse = {
        success: true,
        error: {},
        data: {},
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await seon.labelTransactions(labels);

      expect(result).toEqual(mockResponse);
    });

    it("should handle mixed label types in bulk operations", async () => {
      const labels: Array<LabelApiTransaction> = [
        { transaction_id: "txn_1", label: "fraud_detection_fraud" },
        { transaction_id: "txn_2", label: "bnpl_credit_risk_default" },
        { transaction_id: "txn_3", label: "ecommerce_false_alert" },
        { transaction_id: "txn_4", label: "aml_marked_as_approved" },
      ];
      const mockResponse: LabelApiResponse = {
        success: true,
        error: {},
        data: {},
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await seon.labelTransactions(labels);

      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(labelApiUrl, {
        method: "PUT",
        headers: {
          "X-API-KEY": apiKey,
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({ transactions: labels }),
      });
    });
  });
});
