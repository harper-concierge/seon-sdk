/**
 * SEON SDK Type Definitions Index
 *
 * Central export file for all SEON Fraud API TypeScript type definitions.
 * This file provides a single import point for all types used in the SEON SDK,
 * ensuring consistent type safety across fraud detection implementations.
 *
 * @author SEON SDK Team
 * @see {@link https://docs.seon.io/api-reference/fraud-api} SEON Fraud API Documentation
 *
 * @example
 * ```typescript
 * import { FraudApiRequest, FraudApiResponse } from "seon-sdk";
 *
 * const request: FraudApiRequest = {
 *   email: "user@example.com",
 *   transaction_amount: 99.99
 * };
 *
 * const response: FraudApiResponse = await seon.fraud(request);
 * ```
 */

/**
 * Re-export all fraud API request type definitions
 * Exports comprehensive request structure types including:
 * - FraudApiRequest: Main request interface
 * - APIRequestConfig: Configuration options for SEON modules
 * - APIRequestItem: E-commerce item structure
 * - All sub-configuration interfaces (IP, Email, Phone, AML, Device)
 *
 * @see {@link ./FraudApiRequest} FraudApiRequest type definitions
 */
export * from "./FraudApiRequest";

/**
 * Re-export all fraud API response type definitions
 * Exports comprehensive response structure types including:
 * - FraudApiResponse: Main response interface
 * - All nested interfaces for device details, email analysis, etc.
 *
 * @see {@link ./FraudApiResponse} FraudApiResponse type definitions
 */
export * from "./FraudApiResponse";
