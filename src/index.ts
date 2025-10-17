/**
 * SEON Fraud Prevention SDK
 *
 * Main entry point for the SEON Fraud Detection and Prevention SDK.
 * This module provides a comprehensive TypeScript/JavaScript client for integrating
 * with SEON's fraud prevention platform, including real-time fraud detection,
 * device intelligence, email/phone validation, and AML compliance screening.
 *
 * @author SEON SDK Team
 * @see {@link https://docs.seon.io/api-reference/fraud-api} SEON Fraud API Documentation
 * @see {@link https://seon.io} SEON Official Website
 *
 * @example
 * ```typescript
 * import { Seon, FraudApiRequest, FraudApiResponse } from "seon-sdk";
 *
 * // Initialize SEON client
 * const seon = new Seon(process.env.SEON_API_KEY);
 *
 * // Perform fraud analysis
 * const response = await seon.fraud({
 *   email: "user@example.com",
 *   ip: "192.168.1.1",
 *   transaction_amount: 99.99
 * });
 *
 * console.log(`Fraud Score: ${response.data?.fraud_score}`);
 * ```
 */

// Import type definitions for request and response structures
import {
  FraudApiRequest,
  FraudApiResponse,
  TagApiSingleRequest,
  TagApiBulkRequest,
  TagApiSingleResponse,
  TagApiBulkResponse,
} from "./types";

/**
 * Error logging function type
 *
 * Allows SDK users to provide their own logging function
 * instead of using the default console logging.
 *
 * @example
 * ```typescript
 * // Custom logger function
 * const customLogger = (message: string, meta: Record<string, unknown>) => {
 *   myLoggingService.error(message, meta);
 * };
 *
 * const seon = new Seon(apiKey, undefined, true, customLogger);
 * ```
 */
export type ErrorLogger = (
  // eslint-disable-next-line no-unused-vars
  message: string,
  // eslint-disable-next-line no-unused-vars
  meta: Record<string, unknown>,
) => void;

/**
 * Main SEON SDK client class for fraud detection and prevention
 *
 * The primary class for interacting with SEON's Fraud Detection API.
 * Provides methods for real-time fraud analysis, device fingerprinting, email/phone
 * validation, IP intelligence, and AML compliance screening. This class handles
 * API authentication, request/response management, and error handling.
 *
 * @example
 * ```typescript
 * // Basic initialization
 * const seon = new Seon("your-api-key");
 *
 * // With custom base URL (US region)
 * const seonUS = new Seon(
 *   "your-api-key",
 *   "https://api.us-east-1-main.seon.io/SeonRestService"
 * );
 *
 * // E-commerce fraud check
 * const ecommerceCheck = await seon.fraud({
 *   action_type: "payment",
 *   email: "customer@example.com",
 *   transaction_amount: 299.99,
 *   transaction_currency: "USD",
 *   card_bin: "414141",
 *   config: {
 *     email_api: true,
 *     ip_api: true,
 *     device_fingerprinting: true
 *   }
 * });
 *
 * // Gaming/iGaming registration check
 * const gamingCheck = await seon.fraud({
 *   action_type: "register",
 *   email: "player@example.com",
 *   phone_number: "+1234567890",
 *   user_dob: "1990-05-15",
 *   config: {
 *     aml_api: true,
 *     aml: {
 *       version: "v1",
 *       sources: {
 *         sanction_enabled: true,
 *         pep_enabled: true
 *       }
 *     }
 *   }
 * });
 * ```
 *
 * @since 1.0.0
 * @public
 */
export class Seon {
  // Public readonly property to store the SEON API key for authentication
  public readonly key: string;

  // Public readonly property to store the SEON API endpoint URL
  public readonly url: string;

  // Private property to control error logging behavior
  private readonly enableErrorLogging: boolean;

  // Private property to store the logger function
  private readonly logger: ErrorLogger;

  /**
   * Creates a new SEON fraud detection client instance
   *
   * @param key - Your SEON API key for authentication
   * @param baseUrl - Optional custom base URL (defaults to production)
   * @param enableErrorLogging - Whether to log errors (defaults to true in non-test environments)
   * @param logger - Optional custom logging function (defaults to console.error)
   *
   * @example
   * ```typescript
   * // Create client with default production endpoint
   * const seon = new Seon('your-api-key');
   *
   * // Create client with custom base URL
   * const seon = new Seon('your-api-key', 'https://api.us-east-1-main.seon.io/SeonRestService');
   *
   * // Create client with error logging disabled
   * const seon = new Seon('your-api-key', undefined, false);
   *
   * // Create client with custom logger
   * const customLogger = (message, meta) => myLoggingService.error(message, meta);
   * const seon = new Seon('your-api-key', undefined, true, customLogger);
   * ```
   */
  constructor(
    key: string,
    baseUrl?: string,
    enableErrorLogging: boolean = process.env.NODE_ENV !== "test",
    logger?: ErrorLogger,
  ) {
    // Store the provided API key for use in all API requests
    this.key = key;

    // Use provided base URL or default to SEON's production base URL
    this.url = baseUrl || "https://api.seon.io/SeonRestService";

    // Configure error logging based on environment or explicit setting
    this.enableErrorLogging = enableErrorLogging;

    // Use provided logger or default to console.error
    this.logger =
      logger ||
      ((message: string, meta: Record<string, unknown>) => {
        console.error(message, meta);
      });
  }

  /**
   * Performs comprehensive fraud analysis on the provided transaction data
   *
   * Executes a complete fraud detection analysis using SEON's machine learning
   * models, device intelligence, digital footprint analysis, and rule engine. This method
   * combines multiple fraud detection signals including email reputation, phone validation,
   * IP intelligence, device fingerprinting, and AML screening to generate a comprehensive
   * risk assessment.
   *
   * @param request - Complete fraud analysis request payload
   * @returns Promise that resolves to fraud analysis results
   *
   * @throws {TypeError} Throws if request parameter is invalid
   * @throws {Error} Throws if network request fails
   * @throws {Error} Throws if API authentication fails
   *
   * @example
   * ```typescript
   * // Basic fraud check
   * const basicCheck = await seon.fraud({
   *   email: "user@example.com",
   *   ip: "192.168.1.1",
   *   transaction_amount: 99.99
   * });
   *
   * // Comprehensive e-commerce fraud analysis
   * const ecommerceAnalysis = await seon.fraud({
   *   action_type: "payment",
   *   transaction_id: "txn_987654321",
   *   transaction_amount: 299.99,
   *   transaction_currency: "USD",
   *   transaction_type: "purchase",
   *
   *   // Customer information
   *   email: "customer@example.com",
   *   phone_number: "+1234567890",
   *   user_fullname: "John Smith",
   *   user_country: "US",
   *
   *   // Payment details
   *   card_bin: "414141",
   *   card_last: "1234",
   *   payment_provider: "stripe",
   *
   *   // Address information
   *   billing_country: "US",
   *   billing_city: "New York",
   *   shipping_country: "US",
   *   shipping_city: "Boston",
   *
   *   // Device and network
   *   ip: "203.0.113.1",
   *   session_id: "sess_abc123def456",
   *
   *   // Module configuration
   *   config: {
   *     email_api: true,
   *     phone_api: true,
   *     ip_api: true,
   *     device_fingerprinting: true,
   *     email: {
   *       version: "v2",
   *       include: "breach_details,account_details"
   *     },
   *     phone: {
   *       version: "v1",
   *       include: "hlr_details,cnam_lookup"
   *     }
   *   }
   * });
   *
   * // Gaming/iGaming compliance check
   * const gamingCompliance = await seon.fraud({
   *   action_type: "register",
   *   email: "player@example.com",
   *   phone_number: "+1234567890",
   *   user_fullname: "Jane Doe",
   *   user_dob: "1990-05-15",
   *   user_country: "US",
   *   ip: "203.0.113.1",
   *
   *   config: {
   *     aml_api: true,
   *     email_api: true,
   *     phone_api: true,
   *     aml: {
   *       version: "v1",
   *       monitoring_required: true,
   *       sources: {
   *         sanction_enabled: true,
   *         pep_enabled: true,
   *         watchlist_enabled: true
   *       }
   *     }
   *   },
   *
   *   custom_fields: {
   *     bonus_claimed: true,
   *     marketing_source: "google_ads",
   *     affiliate_code: "PARTNER123"
   *   }
   * });
   *
   * // Handle response
   * if (basicCheck.success && basicCheck.data) {
   *   const { fraud_score, state, applied_rules } = basicCheck.data;
   *
   *   switch (state) {
   *     case "APPROVE":
   *       console.log("Transaction approved");
   *       break;
   *     case "DECLINE":
   *       console.log("Transaction declined - high fraud risk");
   *       break;
   *     case "REVIEW":
   *       console.log("Transaction requires manual review");
   *       break;
   *   }
   *
   *   console.log(`Fraud Score: ${fraud_score}/100`);
   *   console.log(`Rules Applied: ${applied_rules.length}`);
   * }
   * ```
   *
   * @see {@link https://docs.seon.io/api-reference/fraud-api#request} Request Documentation
   * @see {@link https://docs.seon.io/api-reference/fraud-api#response} Response Documentation
   * @see {@link https://docs.seon.io/integration/quick-start} Integration Guide
   *
   * @since 1.0.0
   * @public
   */
  async fraud(request: FraudApiRequest): Promise<FraudApiResponse> {
    const url = `${this.url}/fraud-api/v2`;
    return this.makeApiRequest<FraudApiResponse>(url, "POST", request);
  }

  /**
   * Adds tags to a single transaction
   *
   * @param transactionId - The transaction ID to add tags to
   * @param tags - Array of tags to add to the transaction
   * @returns Promise that resolves to tag operation results
   *
   * @example
   * ```typescript
   * const response = await seon.addTags("txn_123", ["high-value", "vip-customer"]);
   * if (response.success) {
   *   console.log("Tags added:", response.data?.tags);
   * }
   * ```
   */
  async addTags(
    transactionId: string,
    tags: Array<string>,
  ): Promise<TagApiSingleResponse> {
    const request: TagApiSingleRequest = { tags };
    const url = `${this.url}/tag-api/v1/tags/${transactionId}/add`;

    return this.makeApiRequest<TagApiSingleResponse>(url, "POST", request);
  }

  /**
   * Updates tags for a single transaction (replaces existing tags)
   *
   * @param transactionId - The transaction ID to update tags for
   * @param tags - Array of tags to set for the transaction
   * @returns Promise that resolves to tag operation results
   *
   * @example
   * ```typescript
   * const response = await seon.updateTags("txn_123", ["updated-tag", "new-tag"]);
   * if (response.success) {
   *   console.log("Tags updated:", response.data?.tags);
   * }
   * ```
   */
  async updateTags(
    transactionId: string,
    tags: Array<string>,
  ): Promise<TagApiSingleResponse> {
    const request: TagApiSingleRequest = { tags };
    const url = `${this.url}/tag-api/v1/tags/${transactionId}/update`;

    return this.makeApiRequest<TagApiSingleResponse>(url, "POST", request);
  }

  /**
   * Deletes specific tags from a single transaction
   *
   * @param transactionId - The transaction ID to delete tags from
   * @param tags - Array of tags to delete from the transaction
   * @returns Promise that resolves to tag operation results
   *
   * @example
   * ```typescript
   * const response = await seon.deleteTags("txn_123", ["old-tag"]);
   * if (response.success) {
   *   console.log("Tags after deletion:", response.data?.tags);
   * }
   * ```
   */
  async deleteTags(
    transactionId: string,
    tags: Array<string>,
  ): Promise<TagApiSingleResponse> {
    const request: TagApiSingleRequest = { tags };
    const url = `${this.url}/tag-api/v1/tags/${transactionId}/delete`;

    return this.makeApiRequest<TagApiSingleResponse>(url, "POST", request);
  }

  /**
   * Gets all tags associated with a single transaction
   *
   * @param transactionId - The transaction ID to get tags for
   * @returns Promise that resolves to tag operation results
   *
   * @example
   * ```typescript
   * const response = await seon.getTags("txn_123");
   * if (response.success) {
   *   console.log("Current tags:", response.data?.tags);
   * }
   * ```
   */
  async getTags(transactionId: string): Promise<TagApiSingleResponse> {
    const url = `${this.url}/tag-api/v1/tags/${transactionId}`;

    return this.makeApiRequest<TagApiSingleResponse>(url, "GET");
  }

  /**
   * Removes all tags from a single transaction
   *
   * @param transactionId - The transaction ID to remove all tags from
   * @returns Promise that resolves to tag operation results
   *
   * @example
   * ```typescript
   * const response = await seon.removeAllTags("txn_123");
   * if (response.success) {
   *   console.log("All tags removed:", response.data?.tags);
   * }
   * ```
   */
  async removeAllTags(transactionId: string): Promise<TagApiSingleResponse> {
    const url = `${this.url}/tag-api/v1/tags/${transactionId}`;

    return this.makeApiRequest<TagApiSingleResponse>(url, "DELETE");
  }

  /**
   * Adds tags to multiple transactions in a single request
   *
   * @param transactionIds - Array of transaction IDs to add tags to
   * @param tags - Array of tags to add to the transactions
   * @returns Promise that resolves to bulk tag operation results
   *
   * @example
   * ```typescript
   * const response = await seon.bulkAddTags(["txn_1", "txn_2"], ["bulk-tag"]);
   * if (response.success) {
   *   console.log("Updated transactions:", response.data?.updated_items);
   * }
   * ```
   */
  async bulkAddTags(
    transactionIds: Array<string>,
    tags: Array<string>,
  ): Promise<TagApiBulkResponse> {
    const request: TagApiBulkRequest = {
      transaction_ids: transactionIds,
      tags,
    };
    const url = `${this.url}/tag-api/v1/tags/bulk-add`;

    return this.makeApiRequest<TagApiBulkResponse>(url, "POST", request);
  }

  /**
   * Updates tags for multiple transactions in a single request (replaces existing tags)
   *
   * @param transactionIds - Array of transaction IDs to update tags for
   * @param tags - Array of tags to set for the transactions
   * @returns Promise that resolves to bulk tag operation results
   *
   * @example
   * ```typescript
   * const response = await seon.bulkUpdateTags(["txn_1", "txn_2"], ["new-tag"]);
   * if (response.success) {
   *   console.log("Updated transactions:", response.data?.updated_items);
   * }
   * ```
   */
  async bulkUpdateTags(
    transactionIds: Array<string>,
    tags: Array<string>,
  ): Promise<TagApiBulkResponse> {
    const request: TagApiBulkRequest = {
      transaction_ids: transactionIds,
      tags,
    };
    const url = `${this.url}/tag-api/v1/tags/bulk-update`;

    return this.makeApiRequest<TagApiBulkResponse>(url, "POST", request);
  }

  /**
   * Deletes specific tags from multiple transactions in a single request
   *
   * @param transactionIds - Array of transaction IDs to delete tags from
   * @param tags - Array of tags to delete from the transactions
   * @returns Promise that resolves to bulk tag operation results
   *
   * @example
   * ```typescript
   * const response = await seon.bulkDeleteTags(["txn_1", "txn_2"], ["old-tag"]);
   * if (response.success) {
   *   console.log("Updated transactions:", response.data?.updated_items);
   * }
   * ```
   */
  async bulkDeleteTags(
    transactionIds: Array<string>,
    tags: Array<string>,
  ): Promise<TagApiBulkResponse> {
    const request: TagApiBulkRequest = {
      transaction_ids: transactionIds,
      tags,
    };
    const url = `${this.url}/tag-api/v1/tags/bulk-delete`;

    return this.makeApiRequest<TagApiBulkResponse>(url, "POST", request);
  }

  /**
   * Generic API request method with proper error handling
   * @private
   * @param url - The complete API endpoint URL
   * @param method - HTTP method to use
   * @param body - Request body (optional for GET/DELETE)
   * @returns Promise that resolves to the specified response type
   */
  private async makeApiRequest<T>(
    url: string,
    method: "GET" | "POST" | "DELETE",
    body?: unknown,
  ): Promise<T> {
    const requestOptions: Parameters<typeof fetch>[1] = {
      method,
      headers: {
        "X-API-KEY": this.key,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    };

    if (body && method === "POST") {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, requestOptions);

    if (response.ok) {
      const json = await response.json();
      return json as T;
    }

    const text = await response.text();

    if (this.enableErrorLogging) {
      this.logger(text, {
        status: response.status,
        statusText: response.statusText,
      });
    }

    return {
      success: false,
      error: {
        [`${response.status} - ${response.statusText}`]: text,
      },
      data: undefined,
    } as T;
  }
}

/**
 * Re-export all type definitions for external use
 * @description Makes all SEON SDK types available for import, ensuring
 * developers have access to complete type safety and IntelliSense support.
 *
 * @see {@link ./types} Type definitions module
 *
 * @example
 * ```typescript
 * import {
 *   Seon,
 *   FraudApiRequest,
 *   FraudApiResponse,
 *   APIRequestConfig
 * } from "seon-sdk";
 * ```
 */
export * from "./types";

/**
 * Re-export all utility functions for external use
 * @description Makes cryptographic and helper utilities available for
 * advanced use cases, API request signing, and webhook verification.
 *
 * @see {@link ./utils} Utility functions module
 *
 * @example
 * ```typescript
 * import { hmacSha256 } from "seon-sdk";
 *
 * const signature = hmacSha256(payload, secretKey);
 * ```
 */
export * from "./utils";
// Test comment for Husky validation
