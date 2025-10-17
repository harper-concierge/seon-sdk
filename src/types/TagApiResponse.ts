/**
 * @fileoverview SEON Tag API Response Type Definitions
 * Comprehensive TypeScript definitions for SEON's Tag API response structures.
 * These types ensure type safety and provide detailed documentation for all response
 * data fields returned by the Tag API operations.
 *
 * @author SEON SDK Team
 * @version 1.0.0
 * @see {@link https://docs.seon.io/api-reference/tag-api} SEON Tag API Response Documentation
 */

/**
 * Interface for single transaction tag operation response data
 * @interface TagApiSingleResponseData
 * Response data structure for single transaction tag operations
 */
export interface TagApiSingleResponseData {
  /**
   * Array of tags currently associated with the transaction
   * @example ["tag1", "tag2", "tag3"]
   * @type {Array<string>}
   */
  tags: Array<string>;
}

/**
 * Interface for bulk transaction tag operation response data
 * @interface TagApiBulkResponseData
 * Response data structure for bulk transaction tag operations
 */
export interface TagApiBulkResponseData {
  /**
   * Array of updated items with their associated tags
   * @type {Array<TagApiUpdatedItem>}
   */
  updated_items: Array<TagApiUpdatedItem>;
}

/**
 * Interface for individual updated item in bulk operations
 * @interface TagApiUpdatedItem
 * Represents a single transaction with its associated tags
 */
export interface TagApiUpdatedItem {
  /**
   * Transaction ID that was updated
   * @example "txn_123456789"
   * @type {string}
   */
  transaction_id: string;

  /**
   * Array of tags currently associated with this transaction
   * @example ["tag1", "tag2"]
   * @type {Array<string>}
   */
  tags: Array<string>;
}

/**
 * Interface for API error information
 * @interface TagApiErrorDetails
 * Error response structure for failed Tag API calls
 */
export interface TagApiErrorDetails {
  /**
   * Error code identifier
   * @example "4001"
   * @type {string}
   */
  code?: string;

  /**
   * Human-readable error message
   * @example "Transaction not found"
   * @type {string}
   */
  message?: string;

  /**
   * HTTP status and description
   * @example "404 - Not Found"
   * @type {string}
   */
  [key: string]: string | undefined;
}

/**
 * Main response interface for single transaction Tag API operations
 * @interface TagApiSingleResponse
 * Complete structure for single transaction tag operation responses
 * @see {@link https://docs.seon.io/api-reference/tag-api#add-request} Add Request Documentation
 * @see {@link https://docs.seon.io/api-reference/tag-api#update-request} Update Request Documentation
 * @see {@link https://docs.seon.io/api-reference/tag-api#delete-request} Delete Request Documentation
 * @see {@link https://docs.seon.io/api-reference/tag-api#get-all-tags-on-a-transaction---response} Get Tags Response Documentation
 * @see {@link https://docs.seon.io/api-reference/tag-api#remove-all-tags-from-a-transaction---response} Remove All Tags Response Documentation
 */
export interface TagApiSingleResponse {
  /**
   * API call success status
   * Whether the API call completed successfully
   * @type {boolean}
   */
  success: boolean;

  /**
   * Error information object
   * Contains error details if the API call failed
   * @type {TagApiErrorDetails}
   */
  error: TagApiErrorDetails;

  /**
   * Tag operation data payload
   * Complete tag operation results (only present if success is true)
   * @type {TagApiSingleResponseData}
   */
  data?: TagApiSingleResponseData;
}

/**
 * Main response interface for bulk transaction Tag API operations
 * @interface TagApiBulkResponse
 * Complete structure for bulk transaction tag operation responses
 * @see {@link https://docs.seon.io/api-reference/tag-api#add-request-multiple} Bulk Add Request Documentation
 * @see {@link https://docs.seon.io/api-reference/tag-api#update-request-multiple} Bulk Update Request Documentation
 * @see {@link https://docs.seon.io/api-reference/tag-api#delete-request-multiple} Bulk Delete Request Documentation
 */
export interface TagApiBulkResponse {
  /**
   * API call success status
   * Whether the API call completed successfully
   * @type {boolean}
   */
  success: boolean;

  /**
   * Error information object
   * Contains error details if the API call failed
   * @type {TagApiErrorDetails}
   */
  error: TagApiErrorDetails;

  /**
   * Bulk tag operation data payload
   * Complete bulk tag operation results (only present if success is true)
   * @type {TagApiBulkResponseData}
   */
  data?: TagApiBulkResponseData;
}
