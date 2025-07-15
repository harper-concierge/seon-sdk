/**
 * @fileoverview SEON SDK Utility Functions Index
 * Central export file for all utility functions used in the SEON SDK.
 * This module provides cryptographic utilities, helper functions, and common
 * operations needed for fraud detection and API security implementations.
 *
 * @author SEON SDK Team
 * @version 1.0.0
 * @see {@link https://docs.seon.io/api-reference/fraud-api} SEON Fraud API Documentation
 *
 * @example
 * ```typescript
 * import { hmacSha256 } from "seon-sdk";
 *
 * // Use cryptographic utilities for secure operations
 * const signature = hmacSha256(requestPayload, secretKey);
 * ```
 */

/**
 * Re-export HMAC-SHA256 cryptographic utility function
 * Exports secure hash-based message authentication code functionality
 * for API request signing, webhook verification, and data integrity validation.
 *
 * @see {@link ./hmacSha256} HMAC-SHA256 utility implementation
 *
 * @example
 * ```typescript
 * import { hmacSha256 } from "seon-sdk";
 *
 * // Sign API requests
 * const signature = hmacSha256(JSON.stringify(payload), apiSecret);
 *
 * // Verify webhooks
 * const isValid = hmacSha256(webhookBody, webhookSecret) === providedSignature;
 * ```
 */
export * from "./hmacSha256";
