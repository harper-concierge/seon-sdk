import { Seon, TagApiSingleResponse, TagApiBulkResponse } from "../index";

// Mock fetch globally
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("Seon SDK - Tag API", () => {
  const apiKey = "test-api-key";
  const baseUrl = "https://api.test.seon.io/SeonRestService";
  const tagApiUrl = "https://api.test.seon.io/SeonRestService/tag-api/v1";

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

  describe("Single Transaction Tag Operations", () => {
    describe("addTags", () => {
      it("should add tags to a transaction successfully", async () => {
        const transactionId = "txn_123";
        const tags = ["high-value", "vip-customer"];
        const mockResponse: TagApiSingleResponse = {
          success: true,
          error: {},
          data: {
            tags: ["high-value", "vip-customer", "existing-tag"],
          },
        };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        } as Response);

        const result = await seon.addTags(transactionId, tags);

        expect(mockFetch).toHaveBeenCalledWith(
          `${tagApiUrl}/tags/${transactionId}/add`,
          {
            method: "POST",
            headers: {
              "X-API-KEY": apiKey,
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
            },
            body: JSON.stringify({ tags }),
          },
        );

        expect(result).toEqual(mockResponse);
      });

      it("should handle addTags API errors", async () => {
        const transactionId = "txn_123";
        const tags = ["test-tag"];
        const errorText =
          '{"success": false,"error":{"code":"4001","message":"Transaction not found"},"data": {}}';

        mockFetch.mockResolvedValueOnce({
          ok: false,
          status: 404,
          statusText: "Not Found",
          text: async () => errorText,
        } as Response);

        const result = await seon.addTags(transactionId, tags);

        expect(result).toEqual({
          success: false,
          error: {
            "404 - Not Found": errorText,
          },
          data: undefined,
        });
      });
    });

    describe("updateTags", () => {
      it("should update tags for a transaction successfully", async () => {
        const transactionId = "txn_123";
        const tags = ["updated-tag", "new-tag"];
        const mockResponse: TagApiSingleResponse = {
          success: true,
          error: {},
          data: {
            tags: ["updated-tag", "new-tag"],
          },
        };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        } as Response);

        const result = await seon.updateTags(transactionId, tags);

        expect(mockFetch).toHaveBeenCalledWith(
          `${tagApiUrl}/tags/${transactionId}/update`,
          {
            method: "POST",
            headers: {
              "X-API-KEY": apiKey,
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
            },
            body: JSON.stringify({ tags }),
          },
        );

        expect(result).toEqual(mockResponse);
      });
    });

    describe("deleteTags", () => {
      it("should delete specific tags from a transaction successfully", async () => {
        const transactionId = "txn_123";
        const tags = ["old-tag"];
        const mockResponse: TagApiSingleResponse = {
          success: true,
          error: {},
          data: {
            tags: ["remaining-tag"],
          },
        };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        } as Response);

        const result = await seon.deleteTags(transactionId, tags);

        expect(mockFetch).toHaveBeenCalledWith(
          `${tagApiUrl}/tags/${transactionId}/delete`,
          {
            method: "POST",
            headers: {
              "X-API-KEY": apiKey,
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
            },
            body: JSON.stringify({ tags }),
          },
        );

        expect(result).toEqual(mockResponse);
      });
    });

    describe("getTags", () => {
      it("should get all tags for a transaction successfully", async () => {
        const transactionId = "txn_123";
        const mockResponse: TagApiSingleResponse = {
          success: true,
          error: {},
          data: {
            tags: ["tag1", "tag2", "tag3"],
          },
        };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        } as Response);

        const result = await seon.getTags(transactionId);

        expect(mockFetch).toHaveBeenCalledWith(
          `${tagApiUrl}/tags/${transactionId}`,
          {
            method: "GET",
            headers: {
              "X-API-KEY": apiKey,
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
            },
          },
        );

        expect(result).toEqual(mockResponse);
      });
    });

    describe("removeAllTags", () => {
      it("should remove all tags from a transaction successfully", async () => {
        const transactionId = "txn_123";
        const mockResponse: TagApiSingleResponse = {
          success: true,
          error: {},
          data: {
            tags: [],
          },
        };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        } as Response);

        const result = await seon.removeAllTags(transactionId);

        expect(mockFetch).toHaveBeenCalledWith(
          `${tagApiUrl}/tags/${transactionId}`,
          {
            method: "DELETE",
            headers: {
              "X-API-KEY": apiKey,
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
            },
          },
        );

        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe("Bulk Transaction Tag Operations", () => {
    describe("bulkAddTags", () => {
      it("should add tags to multiple transactions successfully", async () => {
        const transactionIds = ["txn_1", "txn_2", "txn_3"];
        const tags = ["bulk-tag", "processed"];
        const mockResponse: TagApiBulkResponse = {
          success: true,
          error: {},
          data: {
            updated_items: [
              {
                transaction_id: "txn_1",
                tags: ["bulk-tag", "processed", "existing-tag"],
              },
              {
                transaction_id: "txn_2",
                tags: ["bulk-tag", "processed"],
              },
              {
                transaction_id: "txn_3",
                tags: ["bulk-tag", "processed", "another-tag"],
              },
            ],
          },
        };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        } as Response);

        const result = await seon.bulkAddTags(transactionIds, tags);

        expect(mockFetch).toHaveBeenCalledWith(`${tagApiUrl}/tags/bulk-add`, {
          method: "POST",
          headers: {
            "X-API-KEY": apiKey,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify({
            transaction_ids: transactionIds,
            tags,
          }),
        });

        expect(result).toEqual(mockResponse);
      });

      it("should handle bulkAddTags API errors", async () => {
        const transactionIds = ["txn_1", "txn_2"];
        const tags = ["bulk-tag"];
        const errorText =
          '{"success": false,"error":{"code":"4002","message":"Invalid transaction IDs"},"data": {}}';

        mockFetch.mockResolvedValueOnce({
          ok: false,
          status: 400,
          statusText: "Bad Request",
          text: async () => errorText,
        } as Response);

        const result = await seon.bulkAddTags(transactionIds, tags);

        expect(result).toEqual({
          success: false,
          error: {
            "400 - Bad Request": errorText,
          },
          data: undefined,
        });
      });
    });

    describe("bulkUpdateTags", () => {
      it("should update tags for multiple transactions successfully", async () => {
        const transactionIds = ["txn_1", "txn_2"];
        const tags = ["new-tag", "updated"];
        const mockResponse: TagApiBulkResponse = {
          success: true,
          error: {},
          data: {
            updated_items: [
              {
                transaction_id: "txn_1",
                tags: ["new-tag", "updated"],
              },
              {
                transaction_id: "txn_2",
                tags: ["new-tag", "updated"],
              },
            ],
          },
        };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        } as Response);

        const result = await seon.bulkUpdateTags(transactionIds, tags);

        expect(mockFetch).toHaveBeenCalledWith(
          `${tagApiUrl}/tags/bulk-update`,
          {
            method: "POST",
            headers: {
              "X-API-KEY": apiKey,
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
            },
            body: JSON.stringify({
              transaction_ids: transactionIds,
              tags,
            }),
          },
        );

        expect(result).toEqual(mockResponse);
      });
    });

    describe("bulkDeleteTags", () => {
      it("should delete specific tags from multiple transactions successfully", async () => {
        const transactionIds = ["txn_1", "txn_2"];
        const tags = ["old-tag", "deprecated"];
        const mockResponse: TagApiBulkResponse = {
          success: true,
          error: {},
          data: {
            updated_items: [
              {
                transaction_id: "txn_1",
                tags: ["remaining-tag"],
              },
              {
                transaction_id: "txn_2",
                tags: ["other-tag"],
              },
            ],
          },
        };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        } as Response);

        const result = await seon.bulkDeleteTags(transactionIds, tags);

        expect(mockFetch).toHaveBeenCalledWith(
          `${tagApiUrl}/tags/bulk-delete`,
          {
            method: "POST",
            headers: {
              "X-API-KEY": apiKey,
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
            },
            body: JSON.stringify({
              transaction_ids: transactionIds,
              tags,
            }),
          },
        );

        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe("Error Handling", () => {
    it("should handle network errors for Tag API calls", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      await expect(seon.addTags("txn_123", ["test-tag"])).rejects.toThrow(
        "Network error",
      );
    });

    it("should log errors when error logging is enabled", async () => {
      // Create a separate instance with logging enabled for this test
      const seonWithLogging = new Seon(apiKey, baseUrl, true);
      const errorText = "Tag API Error";

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
        text: async () => errorText,
      } as Response);

      await seonWithLogging.addTags("txn_123", ["test-tag"]);

      // Verify error was logged
      expect(consoleErrorSpy).toHaveBeenCalledWith(errorText, {
        status: 500,
        statusText: "Internal Server Error",
      });
    });
  });

  describe("URL Construction", () => {
    it("should construct correct Tag API URLs from base URLs", async () => {
      const customSeon = new Seon(
        apiKey,
        "https://api.us-east-1-main.seon.io/SeonRestService",
      );

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, error: {}, data: { tags: [] } }),
      } as Response);

      await customSeon.getTags("txn_123");

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.us-east-1-main.seon.io/SeonRestService/tag-api/v1/tags/txn_123",
        expect.any(Object),
      );
    });

    it("should handle default URL construction", async () => {
      const defaultSeon = new Seon(apiKey);

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, error: {}, data: { tags: [] } }),
      } as Response);

      await defaultSeon.getTags("txn_123");

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.seon.io/SeonRestService/tag-api/v1/tags/txn_123",
        expect.any(Object),
      );
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty tag arrays", async () => {
      const mockResponse: TagApiSingleResponse = {
        success: true,
        error: {},
        data: {
          tags: [],
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await seon.addTags("txn_123", []);

      expect(result).toEqual(mockResponse);
    });

    it("should handle single tag operations", async () => {
      const mockResponse: TagApiSingleResponse = {
        success: true,
        error: {},
        data: {
          tags: ["single-tag"],
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await seon.addTags("txn_123", ["single-tag"]);

      expect(result).toEqual(mockResponse);
    });

    it("should handle large tag arrays", async () => {
      const largeTagArray = Array.from({ length: 50 }, (_, i) => `tag-${i}`);
      const mockResponse: TagApiSingleResponse = {
        success: true,
        error: {},
        data: {
          tags: largeTagArray,
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await seon.addTags("txn_123", largeTagArray);

      expect(result).toEqual(mockResponse);
    });
  });
});
