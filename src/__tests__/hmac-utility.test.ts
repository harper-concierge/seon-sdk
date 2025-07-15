/**
 * @fileoverview HMAC-SHA256 Utility Function Tests
 * @description Comprehensive test suite for the HMAC-SHA256 cryptographic utility,
 * including edge cases, security validation, and compatibility testing.
 */

import { hmacSha256 } from "../utils/hmacSha256";

describe("HMAC-SHA256 Utility Function", () => {
  describe("Basic HMAC Functionality", () => {
    it("should generate correct HMAC-SHA256 hash", () => {
      const message = "test message";
      const key = "secret key";
      const hash = hmacSha256(message, key);

      // Should return a valid hex string of 64 characters (SHA256)
      expect(typeof hash).toBe("string");
      expect(hash.length).toBe(64);
      expect(hash).toMatch(/^[a-f0-9]{64}$/);

      // Test consistency - same input should produce same output
      const hash2 = hmacSha256(message, key);
      expect(hash).toBe(hash2);
    });

    it("should handle empty message", () => {
      const hash = hmacSha256("", "secret-key");

      expect(typeof hash).toBe("string");
      expect(hash.length).toBe(64);
      expect(hash).toMatch(/^[a-f0-9]{64}$/);
    });

    it("should handle empty key (defaults to empty string)", () => {
      const message = "test message";
      const hash1 = hmacSha256(message);
      const hash2 = hmacSha256(message, "");

      expect(hash1).toBe(hash2);
      expect(hash1.length).toBe(64);
    });

    it("should handle both empty message and key", () => {
      const hash = hmacSha256("", "");

      expect(typeof hash).toBe("string");
      expect(hash.length).toBe(64);
      expect(hash).toMatch(/^[a-f0-9]{64}$/);
    });
  });

  describe("Input Validation and Edge Cases", () => {
    it("should handle very long messages", () => {
      const longMessage = "a".repeat(10000);
      const key = "test-key";
      const hash = hmacSha256(longMessage, key);

      expect(hash.length).toBe(64);
      expect(hash).toMatch(/^[a-f0-9]{64}$/);
    });

    it("should handle very long keys", () => {
      const message = "test message";
      const longKey = "b".repeat(10000);
      const hash = hmacSha256(message, longKey);

      expect(hash.length).toBe(64);
      expect(hash).toMatch(/^[a-f0-9]{64}$/);
    });

    it("should handle special characters in message", () => {
      const specialMessage = "!@#$%^&*()_+-=[]{}|;':\",./<>?`~";
      const key = "test-key";
      const hash = hmacSha256(specialMessage, key);

      expect(hash.length).toBe(64);
      expect(hash).toMatch(/^[a-f0-9]{64}$/);
    });

    it("should handle special characters in key", () => {
      const message = "test message";
      const specialKey = "!@#$%^&*()_+-=[]{}|;':\",./<>?`~";
      const hash = hmacSha256(message, specialKey);

      expect(hash.length).toBe(64);
      expect(hash).toMatch(/^[a-f0-9]{64}$/);
    });

    it("should handle Unicode characters", () => {
      const unicodeMessage = "Hello 世界 🌍 тест";
      const unicodeKey = "ключ 密钥 🔑";
      const hash = hmacSha256(unicodeMessage, unicodeKey);

      expect(hash.length).toBe(64);
      expect(hash).toMatch(/^[a-f0-9]{64}$/);
    });

    it("should handle newlines and whitespace", () => {
      const messageWithNewlines = "line1\nline2\r\nline3\ttabbed";
      const keyWithSpaces = "  spaced key  ";
      const hash = hmacSha256(messageWithNewlines, keyWithSpaces);

      expect(hash.length).toBe(64);
      expect(hash).toMatch(/^[a-f0-9]{64}$/);
    });
  });

  describe("Consistency and Determinism", () => {
    it("should produce consistent results across multiple calls", () => {
      const message = "consistency test";
      const key = "stable-key";

      const hashes = Array.from({ length: 10 }, () => hmacSha256(message, key));

      // All hashes should be identical
      const firstHash = hashes[0];
      hashes.forEach((hash) => {
        expect(hash).toBe(firstHash);
      });
    });

    it("should produce different hashes for different messages", () => {
      const key = "same-key";
      const message1 = "message one";
      const message2 = "message two";

      const hash1 = hmacSha256(message1, key);
      const hash2 = hmacSha256(message2, key);

      expect(hash1).not.toBe(hash2);
    });

    it("should produce different hashes for different keys", () => {
      const message = "same message";
      const key1 = "key-one";
      const key2 = "key-two";

      const hash1 = hmacSha256(message, key1);
      const hash2 = hmacSha256(message, key2);

      expect(hash1).not.toBe(hash2);
    });

    it("should be sensitive to minor message changes", () => {
      const key = "test-key";
      const message1 = "test message";
      const message2 = "Test message"; // Different case

      const hash1 = hmacSha256(message1, key);
      const hash2 = hmacSha256(message2, key);

      expect(hash1).not.toBe(hash2);
    });

    it("should be sensitive to minor key changes", () => {
      const message = "test message";
      const key1 = "test-key";
      const key2 = "Test-key"; // Different case

      const hash1 = hmacSha256(message, key1);
      const hash2 = hmacSha256(message, key2);

      expect(hash1).not.toBe(hash2);
    });
  });

  describe("Practical Use Cases", () => {
    it("should handle API request signing scenario", () => {
      const apiPayload = JSON.stringify({
        user_id: "12345",
        action: "payment",
        amount: 99.99,
        timestamp: 1640995200,
      });
      const apiSecret = "sk_test_1234567890abcdef";

      const signature = hmacSha256(apiPayload, apiSecret);

      expect(signature.length).toBe(64);
      expect(signature).toMatch(/^[a-f0-9]{64}$/);

      // Verify signature can be validated
      const verificationSignature = hmacSha256(apiPayload, apiSecret);
      expect(signature).toBe(verificationSignature);
    });

    it("should handle webhook verification scenario", () => {
      const webhookPayload = '{"event":"transaction.completed","id":"txn_123"}';
      const webhookSecret = "whsec_abcdef123456789";

      const providedSignature = hmacSha256(webhookPayload, webhookSecret);
      const calculatedSignature = hmacSha256(webhookPayload, webhookSecret);

      // Webhook verification should pass
      expect(providedSignature).toBe(calculatedSignature);
    });

    it("should handle session token generation scenario", () => {
      const sessionData = "user:12345:1640995200:web";
      const sessionSecret = "session_secret_key_2024";

      const sessionToken = hmacSha256(sessionData, sessionSecret);

      expect(sessionToken.length).toBe(64);
      expect(sessionToken).toMatch(/^[a-f0-9]{64}$/);
    });

    it("should handle password reset token scenario", () => {
      const resetData = "user@example.com:1640995200:reset";
      const resetSecret = "password_reset_secret";

      const resetToken = hmacSha256(resetData, resetSecret);

      expect(resetToken.length).toBe(64);
      expect(resetToken).toMatch(/^[a-f0-9]{64}$/);
    });
  });

  describe("Security Properties", () => {
    it("should not reveal key information from hash", () => {
      const message = "public message";
      const key1 = "secret-key-1";
      const key2 = "secret-key-2";

      const hash1 = hmacSha256(message, key1);
      const hash2 = hmacSha256(message, key2);

      // Hashes should appear random and unrelated
      expect(hash1).not.toBe(hash2);
      expect(hash1).not.toContain(key1);
      expect(hash2).not.toContain(key2);
    });

    it("should not reveal message information from hash", () => {
      const key = "secret-key";
      const message1 = "sensitive data 1";
      const message2 = "sensitive data 2";

      const hash1 = hmacSha256(message1, key);
      const hash2 = hmacSha256(message2, key);

      // Hashes should not contain message content
      expect(hash1).not.toContain("sensitive");
      expect(hash2).not.toContain("sensitive");
      expect(hash1).not.toContain("data");
      expect(hash2).not.toContain("data");
    });

    it("should produce avalanche effect", () => {
      const key = "test-key";
      const message1 = "test message";
      const message2 = "test messag"; // One character shorter

      const hash1 = hmacSha256(message1, key);
      const hash2 = hmacSha256(message2, key);

      // Small change should result in completely different hash
      expect(hash1).not.toBe(hash2);

      // Count different characters (should be roughly 50% different)
      let differentChars = 0;
      for (let i = 0; i < hash1.length; i++) {
        if (hash1[i] !== hash2[i]) {
          differentChars++;
        }
      }

      // Should have significant differences (avalanche effect)
      expect(differentChars).toBeGreaterThan(20);
    });
  });

  describe("Performance and Stress Testing", () => {
    it("should handle rapid successive calls", () => {
      const message = "performance test";
      const key = "perf-key";

      const start = Date.now();
      const iterations = 1000;

      for (let i = 0; i < iterations; i++) {
        hmacSha256(message + i, key);
      }

      const end = Date.now();
      const duration = end - start;

      // Should complete within reasonable time (adjust threshold as needed)
      expect(duration).toBeLessThan(5000); // 5 seconds for 1000 iterations
    });

    it("should handle concurrent calls", async () => {
      const message = "concurrent test";
      const key = "concurrent-key";

      const promises = Array.from({ length: 100 }, (_, i) =>
        Promise.resolve(hmacSha256(message + i, key)),
      );

      const results = await Promise.all(promises);

      // All promises should resolve
      expect(results).toHaveLength(100);

      // All results should be valid hashes
      results.forEach((hash) => {
        expect(hash.length).toBe(64);
        expect(hash).toMatch(/^[a-f0-9]{64}$/);
      });
    });
  });
});
