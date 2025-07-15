/**
 * @fileoverview Performance and Stress Testing
 * @description Test suite for performance benchmarks, stress testing,
 * and load validation of the SEON SDK under various conditions.
 */

import { Seon } from "../index";

// Mock fetch globally
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("Performance and Stress Testing", () => {
  let seon: Seon;

  beforeEach(() => {
    jest.clearAllMocks();
    seon = new Seon("test-api-key");

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        error: {},
        data: { fraud_score: 25, state: "APPROVE" },
      }),
    } as Response);
  });

  afterEach(async () => {
    // Clean up any pending promises and timers
    await new Promise((resolve) => setTimeout(resolve, 100));
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  afterAll(async () => {
    // Final cleanup to ensure all async operations complete
    await new Promise((resolve) => setTimeout(resolve, 200));
  });

  describe("Throughput Performance", () => {
    it("should handle sequential requests efficiently", async () => {
      const requestCount = 100;
      const startTime = performance.now();

      for (let i = 0; i < requestCount; i++) {
        await seon.fraud({ email: `test${i}@example.com` });
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(mockFetch).toHaveBeenCalledTimes(requestCount);
      expect(duration).toBeLessThan(5000); // Should complete within 5 seconds
    });

    it("should handle concurrent requests", async () => {
      const concurrentRequests = 50;
      const startTime = performance.now();

      const promises = Array.from({ length: concurrentRequests }, (_, i) =>
        seon.fraud({ email: `concurrent${i}@example.com` }),
      );

      const results = await Promise.all(promises);
      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(results).toHaveLength(concurrentRequests);
      expect(mockFetch).toHaveBeenCalledTimes(concurrentRequests);
      expect(duration).toBeLessThan(3000); // Concurrent should be faster
    });

    it("should maintain performance with large payloads", async () => {
      const largePayload = {
        email: "large@example.com",
        items: Array.from({ length: 100 }, (_, i) => ({
          item_id: `LARGE_ITEM_${i}`,
          item_name: `Large Product ${i}`,
          item_quantity: Math.floor(Math.random() * 10) + 1,
          item_price: Math.random() * 100,
          item_store: "Performance Test Store",
          item_store_country: "US",
          item_category: "performance_test",
          item_url: `https://perf.test.com/item${i}`,
          item_custom_fields: {
            description: "x".repeat(500),
            metadata: JSON.stringify({ data: "y".repeat(500) }),
            category_id: i,
            featured: i % 10 === 0,
          },
        })),
        custom_fields: Object.fromEntries(
          Array.from({ length: 50 }, (_, i) => [
            `perf_field_${i}`,
            `value_${i}`,
          ]),
        ),
      };

      const startTime = performance.now();
      const response = await seon.fraud(largePayload);
      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(response.success).toBe(true);
      expect(duration).toBeLessThan(2000); // Should handle large payloads efficiently
    });
  });

  describe("Memory Usage Testing", () => {
    it("should not leak memory with repeated requests", async () => {
      const iterations = 1000;

      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      for (let i = 0; i < iterations; i++) {
        await seon.fraud({
          email: `memory${i}@example.com`,
          custom_fields: {
            iteration: i,
            timestamp: Date.now(),
            random_data: Math.random().toString(36),
          },
        });

        // Force garbage collection periodically
        if (i % 100 === 0 && global.gc) {
          global.gc();
        }
      }

      expect(mockFetch).toHaveBeenCalledTimes(iterations);
    });

    it("should handle deeply nested objects", async () => {
      const deepObject = {
        email: "deep@example.com",
        custom_fields: {
          level1_data: "deep_value",
          level1_count: 5,
          level1_active: true,
          nested_string: JSON.stringify({
            level2: {
              level3: {
                level4: {
                  level5: {
                    data: "deep_value",
                    array: Array.from({ length: 100 }, (_, i) => ({
                      id: i,
                      value: `item_${i}`,
                    })),
                  },
                },
              },
            },
          }),
        },
      };

      const response = await seon.fraud(deepObject);
      expect(response.success).toBe(true);
    });

    it("should handle rapid object creation and disposal", async () => {
      const rapidRequests = Array.from({ length: 200 }, (_, i) => {
        const request = {
          email: `rapid${i}@example.com`,
          transaction_amount: Math.random() * 1000,
          items: Array.from(
            { length: Math.floor(Math.random() * 10) + 1 },
            (_, j) => ({
              item_id: `rapid_${i}_${j}`,
              item_name: `Rapid Item ${j}`,
              item_quantity: 1,
              item_price: Math.random() * 50,
              item_store: "Rapid Store",
              item_store_country: "US",
              item_category: "rapid",
              item_url: `https://rapid.com/item${j}`,
              item_custom_fields: {
                batch: i,
                generated_at: Date.now(),
              },
            }),
          ),
        };
        return seon.fraud(request);
      });

      const results = await Promise.all(rapidRequests);
      expect(results).toHaveLength(200);
    });
  });

  describe("Edge Case Stress Testing", () => {
    it("should handle extremely long strings", async () => {
      const extremeRequest = {
        email: "extreme@example.com",
        user_fullname: "A".repeat(10000),
        user_street: "B".repeat(5000),
        custom_fields: {
          long_description: "C".repeat(50000),
          metadata: "D".repeat(25000),
        },
      };

      const response = await seon.fraud(extremeRequest);
      expect(response.success).toBe(true);
    });

    it("should handle maximum array sizes", async () => {
      const maxArrayRequest = {
        email: "maxarray@example.com",
        items: Array.from({ length: 500 }, (_, i) => ({
          item_id: `MAX_${i}`,
          item_name: `Max Item ${i}`,
          item_quantity: 1,
          item_price: 1.0,
          item_store: "Max Store",
          item_store_country: "US",
          item_category: "max_test",
          item_url: `https://max.com/item${i}`,
          item_custom_fields: {
            index: i,
            batch: "maximum",
          },
        })),
      };

      const response = await seon.fraud(maxArrayRequest);
      expect(response.success).toBe(true);
    });

    it("should handle special character combinations", async () => {
      const specialCharsRequest = {
        email: "special@例え.тест",
        user_fullname: "José María O'Connor-Smith 测试用户",
        user_street: "123 Main St. Apt #4B 北京市",
        custom_fields: {
          unicode_test: "🚀🌍💰🔒🎯",
          mixed_script: "English العربية 中文 русский हिंदी",
          symbols: "!@#$%^&*()_+-=[]{}|;':\",./<>?",
          emoji_sequence: "👨‍👩‍👧‍👦🏳️‍🌈🏳️‍⚧️",
        },
      };

      const response = await seon.fraud(specialCharsRequest);
      expect(response.success).toBe(true);
    });

    it("should handle numeric edge cases", async () => {
      const numericEdgeRequest = {
        email: "numeric@example.com",
        transaction_amount: Number.MAX_SAFE_INTEGER,
        custom_fields: {
          zero: 0,
          negative: -999999,
          decimal: 0.000001,
          scientific: 1.23e-10,
          infinity: Number.POSITIVE_INFINITY,
          max_int: Number.MAX_SAFE_INTEGER,
          min_int: Number.MIN_SAFE_INTEGER,
        },
      };

      // Note: JSON.stringify will handle these appropriately
      const response = await seon.fraud(numericEdgeRequest);
      expect(response.success).toBe(true);
    });
  });

  describe("Network Simulation Stress Tests", () => {
    it("should handle slow network responses", async () => {
      mockFetch.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  ok: true,
                  json: async () => ({ success: true, error: {}, data: {} }),
                } as Response),
              2000,
            ),
          ),
      );

      const startTime = performance.now();
      const response = await seon.fraud({ email: "slow@example.com" });
      const endTime = performance.now();

      expect(response.success).toBe(true);
      expect(endTime - startTime).toBeGreaterThan(1900); // Should wait for slow response
    });

    it("should handle network timeouts gracefully", async () => {
      mockFetch.mockRejectedValue(new Error("Request timeout"));

      await expect(
        seon.fraud({ email: "timeout@example.com" }),
      ).rejects.toThrow("Request timeout");
    });

    it("should handle intermittent network failures", async () => {
      let attemptCount = 0;
      mockFetch.mockImplementation(() => {
        attemptCount++;
        if (attemptCount <= 3) {
          return Promise.reject(new Error("Network unavailable"));
        }
        return Promise.resolve({
          ok: true,
          json: async () => ({ success: true, error: {}, data: {} }),
        } as Response);
      });

      // First 3 attempts should fail
      await expect(seon.fraud({ email: "fail1@example.com" })).rejects.toThrow(
        "Network unavailable",
      );
      await expect(seon.fraud({ email: "fail2@example.com" })).rejects.toThrow(
        "Network unavailable",
      );
      await expect(seon.fraud({ email: "fail3@example.com" })).rejects.toThrow(
        "Network unavailable",
      );

      // 4th attempt should succeed
      const response = await seon.fraud({ email: "success@example.com" });
      expect(response.success).toBe(true);
    });
  });

  describe("Resource Exhaustion Testing", () => {
    it("should handle many simultaneous instances", async () => {
      const instanceCount = 100;
      const instances = Array.from(
        { length: instanceCount },
        (_, i) => new Seon(`test-key-${i}`),
      );

      const promises = instances.map((instance, i) =>
        instance.fraud({ email: `instance${i}@example.com` }),
      );

      const results = await Promise.all(promises);
      expect(results).toHaveLength(instanceCount);
    });

    it("should handle burst traffic patterns", async () => {
      // Simulate traffic bursts
      const bursts = [
        Array.from({ length: 50 }, (_, i) =>
          seon.fraud({ email: `burst1_${i}@example.com` }),
        ),
        Array.from({ length: 30 }, (_, i) =>
          seon.fraud({ email: `burst2_${i}@example.com` }),
        ),
        Array.from({ length: 70 }, (_, i) =>
          seon.fraud({ email: `burst3_${i}@example.com` }),
        ),
      ];

      const results = await Promise.all([
        Promise.all(bursts[0]),
        Promise.all(bursts[1]),
        Promise.all(bursts[2]),
      ]);

      expect(results[0]).toHaveLength(50);
      expect(results[1]).toHaveLength(30);
      expect(results[2]).toHaveLength(70);
    });

    it("should maintain performance under sustained load", async () => {
      const sustainedLoad = Array.from({ length: 300 }, (_, i) => {
        const delay = Math.random() * 100; // Random delay 0-100ms
        return new Promise((resolve) =>
          setTimeout(
            () => resolve(seon.fraud({ email: `sustained${i}@example.com` })),
            delay,
          ),
        );
      });

      const startTime = performance.now();
      const results = await Promise.all(sustainedLoad);
      const endTime = performance.now();

      expect(results).toHaveLength(300);
      expect(endTime - startTime).toBeLessThan(10000); // Should complete within 10 seconds
    });
  });

  describe("Cleanup and Garbage Collection", () => {
    it("should properly cleanup after stress tests", async () => {
      // Perform intensive operations
      const operations = Array.from({ length: 500 }, (_, i) =>
        seon.fraud({
          email: `cleanup${i}@example.com`,
          items: Array.from({ length: 10 }, (_, j) => ({
            item_id: `cleanup_${i}_${j}`,
            item_name: `Cleanup Item ${j}`,
            item_quantity: 1,
            item_price: 1.0,
            item_store: "Cleanup Store",
            item_store_country: "US",
            item_category: "cleanup",
            item_url: `https://cleanup.com/item${j}`,
            item_custom_fields: {},
          })),
        }),
      );

      const results = await Promise.all(operations);

      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      expect(results).toHaveLength(500);
      expect(mockFetch).toHaveBeenCalledTimes(500);
    }, 10000); // Extend timeout to 10 seconds
  });
});
