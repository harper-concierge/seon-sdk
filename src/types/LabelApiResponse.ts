/**
 * @fileoverview SEON Label API Response Type Definitions
 * Comprehensive TypeScript definitions for SEON's Label API response structures.
 * These types ensure type safety and provide detailed documentation for all response
 * data fields returned by the Label API operations.
 *
 * @author SEON SDK Team
 * @version 1.0.0
 * @see {@link https://docs.seon.io/api-reference/label-api} SEON Label API Response Documentation
 */

/**
 * Interface for API error information
 * @interface LabelApiErrorDetails
 * Error response structure for failed Label API calls
 */
export interface LabelApiErrorDetails {
  /**
   * Error code identifier
   * @example "1000" | "1001" | "1005" | "2001" | "4004"
   * @type {string}
   */
  code?: string;

  /**
   * Human-readable error message
   * @example "Empty request body." | "Transaction not found"
   * @type {string}
   */
  message?: string;

  /**
   * HTTP status and description
   * @example "400 - Bad Request" | "401 - Unauthorized"
   * @type {string}
   */
  [key: string]: string | undefined;
}

/**
 * Interface for label operation response data
 * @interface LabelApiResponseData
 * Response data structure for label operations
 * The data object is typically empty or contains minimal information on success
 */
export interface LabelApiResponseData {
  /**
   * Additional response data (if any)
   * Most label operations return empty data object on success
   * @type {Record<string, unknown>}
   */
  [key: string]: unknown;
}

/**
 * Main response interface for Label API operations
 * @interface LabelApiResponse
 * Complete structure for label operation responses
 * @see {@link https://docs.seon.io/api-reference/label-api#labeling-request} Labeling Request Documentation
 * @see {@link https://docs.seon.io/api-reference/label-api#label-api-errors} Label API Errors Documentation
 */
export interface LabelApiResponse {
  /**
   * API call success status
   * Whether the API call completed successfully
   * @type {boolean}
   */
  success: boolean;

  /**
   * Error information object
   * Contains error details if the API call failed
   * @type {LabelApiErrorDetails}
   */
  error: LabelApiErrorDetails;

  /**
   * Label operation data payload
   * Contains response data (if any) - typically empty on success
   * @type {LabelApiResponseData}
   */
  data?: LabelApiResponseData;
}
