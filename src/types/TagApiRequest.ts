/**
 * @fileoverview SEON Tag API Request Type Definitions
 * Comprehensive TypeScript definitions for SEON's Tag API request structures.
 * These types ensure type safety and provide detailed documentation for all available
 * Tag API request parameters and operations.
 *
 * @author SEON SDK Team
 * @version 1.0.0
 * @see {@link https://docs.seon.io/api-reference/tag-api} SEON Tag API Documentation
 */

/**
 * Interface for single transaction tag operations
 * @interface TagApiSingleRequest
 * Request structure for adding, updating, or deleting tags on a single transaction
 */
export interface TagApiSingleRequest {
  /**
   * Array of tags to apply to the transaction
   * Maximum 50 tags per request, each tag max 256 characters
   * @example ["high-value", "vip-customer", "fraud-review"]
   * @type {Array<string>}
   */
  tags: Array<string>;
}

/**
 * Interface for bulk transaction tag operations
 * @interface TagApiBulkRequest
 * Request structure for adding, updating, or deleting tags on multiple transactions
 */
export interface TagApiBulkRequest {
  /**
   * Array of transaction IDs to apply tags to
   * Maximum 500 transactions per request
   * @example ["txn_123", "txn_456", "txn_789"]
   * @type {Array<string>}
   */
  transaction_ids: Array<string>;

  /**
   * Array of tags to apply to the transactions
   * Maximum 50 tags per request, each tag max 256 characters
   * @example ["bulk-processed", "batch-update"]
   * @type {Array<string>}
   */
  tags: Array<string>;
}
