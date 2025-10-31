/**
 * @fileoverview SEON Label API Request Type Definitions
 * Comprehensive TypeScript definitions for SEON's Label API request structures.
 * These types ensure type safety and provide detailed documentation for all available
 * Label API request parameters and operations.
 *
 * @author SEON SDK Team
 * @version 1.0.0
 * @see {@link https://docs.seon.io/api-reference/label-api} SEON Label API Documentation
 */

/**
 * Union type for all valid SEON label values
 * Defines the complete set of label values accepted by the SEON Label API
 * These labels are used to train SEON's machine learning algorithm based on your business process
 *
 * @see {@link https://docs.seon.io/api-reference/label-api#valid-labels} Valid Labels Documentation
 */
export type ValidLabel =
  // Fraud Detection Labels (Negative)
  | "fraud_detection_fraud"
  | "fraud_detection_bonus_abuse"
  | "fraud_detection_multi_accounting"
  | "fraud_detection_ato"
  | "fraud_detection_underage"
  | "fraud_detection_false_identity"
  | "fraud_detection_phishing"
  | "fraud_detection_remote_access_fraud"
  | "fraud_detection_chargeback_fraud"
  | "fraud_detection_vishing"
  | "fraud_detection_front_man"
  | "fraud_detection_arbitrage"
  | "fraud_detection_vishing_rat"
  | "fraud_detection_bot"
  | "fraud_detection_campaign_abuse"
  | "fraud_detection_missed_fraud"
  // Fraud Detection Labels (Positive)
  | "fraud_detection_marked_as_approved"
  | "fraud_detection_verified_payment"
  | "fraud_detection_false_alert"
  // BNPL / Credit Risk Labels (Negative)
  | "bnpl_credit_risk_default"
  | "bnpl_credit_risk_fraud"
  | "bnpl_credit_risk_first_payment_default"
  | "bnpl_credit_risk_second_payment_default"
  | "bnpl_credit_risk_mule"
  | "bnpl_credit_risk_false_identity"
  | "bnpl_credit_risk_underage"
  | "bnpl_credit_risk_chargeback_fraud"
  | "bnpl_credit_risk_no_intention_to_pay"
  | "bnpl_credit_risk_missed_fraud"
  // BNPL / Credit Risk Labels (Positive)
  | "bnpl_credit_risk_repaid"
  | "bnpl_credit_risk_on_time_payment"
  | "bnpl_credit_risk_fully_repaid"
  | "bnpl_credit_risk_false_alert"
  // Ecommerce / Retail Labels (Negative)
  | "ecommerce_fraud"
  | "ecommerce_false_identity"
  | "ecommerce_first_party_fraud"
  | "ecommerce_second_party_fraud"
  | "ecommerce_third_party_fraud"
  | "ecommerce_return_refund_abuse"
  | "ecommerce_underage"
  | "ecommerce_chargeback_fraud"
  | "ecommerce_chargeback_dispute"
  | "ecommerce_chargeback_processing_error"
  | "ecommerce_chargeback_authorization_issue"
  | "ecommerce_missed_fraud"
  // Ecommerce / Retail Labels (Positive)
  | "ecommerce_marked_as_approved"
  | "ecommerce_false_alert"
  // Anti Money-Laundering Labels (Negative)
  | "aml_escalated_without_reporting"
  | "aml_escalated_reported"
  // Anti Money-Laundering Labels (Positive)
  | "aml_false_alert"
  | "aml_marked_as_approved";

/**
 * Interface for individual transaction label assignment
 * @interface LabelApiTransaction
 * Represents a single transaction to be labeled with a specific label value
 */
export interface LabelApiTransaction {
  /**
   * Transaction ID to apply the label to
   * Must be an existing transaction in SEON
   * @example "txn_123456789"
   * @type {string}
   */
  transaction_id: string;

  /**
   * Label value to apply to the transaction
   * Must be one of the valid SEON label values
   * A transaction can have a single label at a time (existing labels can be overwritten)
   * @example "fraud_detection_fraud" | "fraud_detection_marked_as_approved"
   * @type {ValidLabel}
   */
  label: ValidLabel;
}

/**
 * Main interface for SEON Label API request payload
 * @interface LabelApiRequest
 * Request structure for labeling one or multiple transactions
 * Supports labeling up to 50 transactions in a single request
 *
 * @see {@link https://docs.seon.io/api-reference/label-api#labeling-request} Labeling Request Documentation
 */
export interface LabelApiRequest {
  /**
   * Array of transaction label assignments
   * Each object contains a transaction_id and the label to apply
   * Maximum 50 transactions per request
   * @example [{ transaction_id: "txn_123", label: "fraud_detection_fraud" }]
   * @type {Array<LabelApiTransaction>}
   */
  transactions: Array<LabelApiTransaction>;
}
