/**
 * @fileoverview HMAC-SHA256 Cryptographic Utility
 * @description Provides secure HMAC-SHA256 hashing functionality for message authentication
 * and integrity verification. This utility is commonly used for API request signing,
 * webhook verification, and secure token generation in fraud prevention systems.
 *
 * @author SEON SDK Team
 * @version 1.0.0
 * @see {@link https://tools.ietf.org/html/rfc2104} HMAC RFC 2104 Specification
 * @see {@link https://tools.ietf.org/html/rfc6234} SHA-2 Hash Functions
 *
 * @example
 * ```typescript
 * import { hmacSha256 } from "seon-sdk";
 *
 * // Generate HMAC for API request signing
 * const signature = hmacSha256("request-payload", "secret-key");
 *
 * // Verify webhook authenticity
 * const webhookSignature = hmacSha256(webhookBody, webhookSecret);
 * const isValid = providedSignature === webhookSignature;
 * ```
 */

// Import Node.js built-in crypto module for cryptographic operations
import { createHmac } from "crypto";

/**
 * Generates HMAC-SHA256 hash for message authentication and integrity verification
 *
 * @description Creates a Hash-based Message Authentication Code (HMAC) using the SHA-256
 * cryptographic hash function. HMAC provides both data integrity and authentication
 * by combining a cryptographic hash function with a secret key. This implementation
 * follows RFC 2104 standards and is suitable for API request signing, webhook
 * verification, and secure token generation.
 *
 * @param {string} message - The message or data to be authenticated and hashed
 * @param {string} [key=""] - The secret key used for HMAC generation (optional, defaults to empty string)
 *
 * @returns {string} The HMAC-SHA256 hash as a hexadecimal string (64 characters)
 *
 * @throws {TypeError} Throws if message is not a string
 * @throws {Error} Throws if crypto operations fail
 *
 * @example
 * ```typescript
 * // Basic usage with key
 * const hash = hmacSha256("Hello, World!", "my-secret-key");
 * console.log(hash); // "a1b2c3d4e5f6..."
 *
 * // Usage without key (equivalent to SHA256)
 * const hashNoKey = hmacSha256("Hello, World!");
 *
 * // API request signing
 * const payload = JSON.stringify({ user: "john", amount: 100 });
 * const signature = hmacSha256(payload, process.env.API_SECRET);
 *
 * // Webhook verification
 * const webhookBody = req.body;
 * const expectedSignature = req.headers['x-signature'];
 * const calculatedSignature = hmacSha256(webhookBody, webhookSecret);
 * const isValid = expectedSignature === calculatedSignature;
 * ```
 *
 * @see {@link https://nodejs.org/api/crypto.html#crypto_crypto_createhmac_algorithm_key_options} Node.js Crypto HMAC
 * @see {@link https://tools.ietf.org/html/rfc2104} HMAC Specification
 *
 * @since 1.0.0
 * @public
 */
export function hmacSha256(message: string, key: string = ""): string {
  // Create HMAC instance using SHA-256 algorithm and the provided secret key
  const hmac = createHmac("sha256", key);

  // Update the HMAC with the message data to be authenticated
  hmac.update(message);

  // Generate and return the final HMAC digest as a hexadecimal string
  return hmac.digest("hex");
}
