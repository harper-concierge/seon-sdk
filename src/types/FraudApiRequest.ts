/**
 * @fileoverview SEON Fraud API Request Type Definitions
 * @description Comprehensive TypeScript definitions for SEON's Fraud API request structure.
 * These types ensure type safety and provide detailed documentation for all available
 * configuration options and request parameters.
 *
 * @author SEON SDK Team
 * @version 1.0.0
 * @see {@link https://docs.seon.io/api-reference/fraud-api} SEON Fraud API Documentation
 */

/**
 * Configuration interface for SEON's IP analysis module
 * @interface APIRequestConfigIP
 * @description Configures the IP intelligence and geolocation analysis features
 */
export interface APIRequestConfigIP {
  /**
   * API version to use for IP analysis
   * @example "v1"
   * @type {string}
   */
  version: string;

  /**
   * Optional additional information to include in IP analysis
   * @description Comma-separated list of additional data points
   * @example "flags,history,id"
   * @type {string}
   * @optional
   */
  include?: string;

  /**
   * Optional timeframe in days for historical flags analysis
   * @description Limits the historical data timeframe for flag analysis
   * @example 30
   * @type {number}
   * @optional
   */
  flags_timeframe_days?: number;
}

/**
 * Configuration interface for SEON's Email analysis module
 * @interface APIRequestConfigEmail
 * @description Configures email reputation, deliverability, and digital footprint analysis
 */
export interface APIRequestConfigEmail {
  /**
   * API version to use for email analysis
   * @example "v2"
   * @type {string}
   */
  version: string;

  /**
   * Optional timeout in milliseconds for email analysis
   * @description Maximum time to wait for email analysis completion
   * @example 2000
   * @type {number}
   * @optional
   */
  timeout?: number;

  /**
   * Optional priority timeout in milliseconds for high-priority email checks
   * @description Reduced timeout for priority email validation requests
   * @type {number}
   * @optional
   */
  priority_timeout?: number;

  /**
   * Optional priority sites configuration for enhanced email analysis
   * @description Comma-separated list of priority email providers for enhanced checking
   * @type {string}
   * @optional
   */
  priority_sites?: string;

  /**
   * Optional accuracy settings for email validation
   * @description Numerical accuracy threshold for email validation confidence
   * @type {number}
   * @optional
   */
  priority_accuracy?: number;

  /**
   * Optional additional information to include in email analysis
   * @description Comma-separated list of additional data points
   * @example "flags,history,id,breach_details"
   * @type {string}
   * @optional
   */
  include?: string;

  /**
   * Optional timeframe in days for email flags analysis
   * @description Limits the historical data timeframe for email flag analysis
   * @example 30
   * @type {number}
   * @optional
   */
  flags_timeframe_days?: number;

  /**
   * Optional data enrichment mode for email analysis
   * @description Controls the depth and detail of email data enrichment
   * @example "high-volume" | "detailed"
   * @type {string}
   * @optional
   */
  data_enrichment_mode?: string;
}

/**
 * Configuration interface for SEON's Phone analysis module
 * @interface APIRequestConfigPhone
 * @description Configures phone number validation, carrier detection, and social media analysis
 */
export interface APIRequestConfigPhone {
  /**
   * API version to use for phone analysis
   * @example "v1"
   * @type {string}
   */
  version: string;

  /**
   * Optional timeout in milliseconds for phone analysis
   * @description Maximum time to wait for phone analysis completion
   * @example 2000
   * @type {number}
   * @optional
   */
  timeout?: number;

  /**
   * Optional priority timeout in milliseconds for high-priority phone checks
   * @description Reduced timeout for priority phone validation requests
   * @type {number}
   * @optional
   */
  priority_timeout?: number;

  /**
   * Optional priority sites configuration for enhanced phone analysis
   * @description Comma-separated list of priority phone validation providers
   * @type {string}
   * @optional
   */
  priority_sites?: string;

  /**
   * Optional accuracy settings for phone validation
   * @description Numerical accuracy threshold for phone validation confidence
   * @type {number}
   * @optional
   */
  priority_accuracy?: number;

  /**
   * Optional additional information to include in phone analysis
   * @description Comma-separated list of additional data points
   * @example "flags,history,id,hlr_details,cnam_lookup"
   * @type {string}
   * @optional
   */
  include?: string;

  /**
   * Optional timeframe in days for phone flags analysis
   * @description Limits the historical data timeframe for phone flag analysis
   * @example 30
   * @type {number}
   * @optional
   */
  flags_timeframe_days?: number;

  /**
   * Optional fields to exclude from phone analysis
   * @description Comma-separated list of fields to exclude from response
   * @example "photo,last_seen"
   * @type {string}
   * @optional
   */
  exclude?: string;

  /**
   * Optional data enrichment mode for phone analysis
   * @description Controls the depth and detail of phone data enrichment
   * @example "high-volume" | "detailed"
   * @type {string}
   * @optional
   */
  data_enrichment_mode?: string;
}

/**
 * Configuration interface for SEON's AML (Anti-Money Laundering) module
 * @interface APIRequestConfigAML
 * @description Configures sanctions screening, PEP checks, and compliance monitoring
 */
export interface APIRequestConfigAML {
  /**
   * API version to use for AML analysis
   * @example "v1"
   * @type {string}
   */
  version: string;

  /**
   * Optional flag to enable or disable ongoing monitoring
   * @description Enables continuous monitoring for AML compliance
   * @type {boolean}
   * @optional
   */
  monitoring_required?: boolean;

  /**
   * Optional monitoring schedule for ongoing AML checks
   * @description Defines the frequency of ongoing monitoring checks
   * @type {"ON_CHANGE" | "DAILY" | "WEEKLY" | "MONTHLY" | "QUARTERLY" | "TWICE_A_YEAR" | "EVERY_YEAR"}
   * @optional
   */
  monitoring_schedule?:
    | "ON_CHANGE"
    | "DAILY"
    | "WEEKLY"
    | "MONTHLY"
    | "QUARTERLY"
    | "TWICE_A_YEAR"
    | "EVERY_YEAR";

  /**
   * Optional flag to enable or disable fuzzy search matching
   * @description Enables fuzzy string matching for name variations
   * @type {boolean}
   * @optional
   */
  fuzzy_enabled?: boolean;

  /**
   * Optional fuzzy search configuration object
   * @description Advanced configuration options for fuzzy matching algorithms
   * @type {object}
   * @optional
   */
  fuzzy_config?: object;

  /**
   * Optional flag to enable or disable phonetic search
   * @description Enables phonetic matching for names that sound similar
   * @type {boolean}
   * @optional
   */
  phonetic_search_enabled?: boolean;

  /**
   * Optional flag to enable or disable edit distance module
   * @description Enables Levenshtein distance-based name matching
   * @type {boolean}
   * @optional
   */
  edit_distance_enabled?: boolean;

  /**
   * Optional scoring configuration for AML results
   * @description Controls result scoring and filtering parameters
   * @type {object}
   * @optional
   */
  scoring?: {
    /**
     * Maximum number of AML hits to return
     * @description Limits the number of results returned per check
     * @default 10
     * @type {number}
     * @optional
     */
    result_limit?: number;

    /**
     * Relevancy score threshold for AML matches
     * @description Minimum confidence score required for a match to be included
     * @default 0.585
     * @type {number}
     * @optional
     */
    score_threshold?: number;
  };

  /**
   * Optional timeout in milliseconds for AML analysis
   * @description Maximum time to wait for AML analysis completion
   * @example 2000
   * @type {number}
   * @optional
   */
  timeout?: number;

  /**
   * Optional configuration for AML data sources
   * @description Controls which AML databases and lists to check against
   * @type {object}
   * @optional
   */
  sources?: {
    /**
     * Optional flag to enable or disable sanctions list checks
     * @description Checks against international sanctions lists (OFAC, UN, EU, etc.)
     * @type {boolean}
     * @optional
     */
    sanction_enabled?: boolean;

    /**
     * Optional flag to enable or disable PEP (Politically Exposed Person) checks
     * @description Checks against politically exposed persons databases
     * @type {boolean}
     * @optional
     */
    pep_enabled?: boolean;

    /**
     * Optional flag to enable or disable watchlist checks
     * @description Checks against custom and third-party watchlists
     * @type {boolean}
     * @optional
     */
    watchlist_enabled?: boolean;

    /**
     * Optional flag to enable or disable crime list checks
     * @description Checks against criminal databases and wanted lists
     * @type {boolean}
     * @optional
     */
    crimelist_enabled?: boolean;

    /**
     * Optional flag to enable or disable adverse media checks
     * @description Checks for negative news and media mentions
     * @type {boolean}
     * @optional
     */
    adversemedia_enabled?: boolean;
  };
}

/**
 * Configuration interface for SEON's Device Intelligence module
 * @interface APIRequestConfigDevice
 * @description Configures device fingerprinting and behavioral analysis options
 */
export interface APIRequestConfigDevice {
  /**
   * Optional geolocation fields to include in device analysis
   * @description Comma-separated list of additional location-based fields
   * @example "device_location,extended_device_location"
   * @type {string}
   * @optional
   */
  include?: string;

  /**
   * Optional response fields to include in the analysis result
   * @description Comma-separated list of specific fields to return in response
   * @example "id,state,fraud_score"
   * @type {string}
   * @optional
   */
  response_fields?: string;
}

/**
 * Main configuration interface for SEON Fraud API request
 * @interface APIRequestConfig
 * @description Controls which SEON modules are enabled and their individual configurations
 */
export interface APIRequestConfig {
  /**
   * Optional IP analysis module configuration
   * @description Configuration for IP intelligence and geolocation analysis
   * @type {APIRequestConfigIP}
   * @optional
   */
  ip?: APIRequestConfigIP;

  /**
   * Optional email analysis module configuration
   * @description Configuration for email reputation and digital footprint analysis
   * @type {APIRequestConfigEmail}
   * @optional
   */
  email?: APIRequestConfigEmail;

  /**
   * Optional phone analysis module configuration
   * @description Configuration for phone validation and social media analysis
   * @type {APIRequestConfigPhone}
   * @optional
   */
  phone?: APIRequestConfigPhone;

  /**
   * Optional AML analysis module configuration
   * @description Configuration for anti-money laundering and compliance screening
   * @type {APIRequestConfigAML}
   * @optional
   */
  aml?: APIRequestConfigAML;

  /**
   * Optional flag to enable or disable Email API module
   * @description Global switch for email-based fraud detection
   * @type {boolean}
   * @optional
   */
  email_api?: boolean;

  /**
   * Optional flag to enable or disable Phone API module
   * @description Global switch for phone-based fraud detection
   * @type {boolean}
   * @optional
   */
  phone_api?: boolean;

  /**
   * Optional flag to enable or disable IP API module
   * @description Global switch for IP-based fraud detection
   * @type {boolean}
   * @optional
   */
  ip_api?: boolean;

  /**
   * Optional flag to enable or disable AML API module
   * @description Global switch for AML compliance screening
   * @type {boolean}
   * @optional
   */
  aml_api?: boolean;

  /**
   * Optional flag to enable or disable device fingerprinting
   * @description Global switch for device intelligence and behavioral analysis
   * @type {boolean}
   * @optional
   */
  device_fingerprinting?: boolean;

  /**
   * Optional device intelligence configuration
   * @description Advanced configuration for device fingerprinting module
   * @type {APIRequestConfigDevice}
   * @optional
   */
  device?: APIRequestConfigDevice;
}

/**
 * Interface for individual items in e-commerce transactions
 * @interface APIRequestItem
 * @description Represents a single item in a transaction for detailed fraud analysis
 */
export interface APIRequestItem {
  /**
   * Unique product identifier in the merchant's system
   * @description Internal SKU or product ID used by the merchant
   * @example "PROD-12345"
   * @type {string}
   */
  item_id: string;

  /**
   * Quantity of the item being purchased
   * @description Number of units of this specific item
   * @example 2
   * @type {number}
   */
  item_quantity: number;

  /**
   * Human-readable name of the product
   * @description Display name for the product as shown to customers
   * @example "Apple iPhone 14 Pro 256GB Space Black"
   * @type {string}
   */
  item_name: string;

  /**
   * Price per unit of the item
   * @description Individual item price before quantity multiplication
   * @example 999.99
   * @type {number}
   */
  item_price: number;

  /**
   * Store or warehouse fulfilling the order
   * @description Physical or virtual store handling this item
   * @example "Downtown Electronics Store"
   * @type {string}
   */
  item_store: string;

  /**
   * ISO 3166-1 alpha-2 country code for the fulfilling store
   * @description Two-character country code where the item ships from
   * @example "US"
   * @type {string}
   */
  item_store_country: string;

  /**
   * Product category classification
   * @description Categorical classification for fraud pattern analysis
   * @example "electronics"
   * @type {string}
   */
  item_category: string;

  /**
   * URL to the product description or details page
   * @description Direct link to the product on the merchant's website
   * @example "https://store.example.com/products/iphone-14-pro"
   * @type {string}
   */
  item_url: string;

  /**
   * Custom fields for additional item-specific information
   * @description Flexible object for merchant-specific item metadata
   * @example { "warranty_months": 24, "color": "space_black", "storage": "256gb" }
   * @type {Record<string, string | boolean | number>}
   */
  item_custom_fields: {
    /**
     * Dynamic custom field key-value pairs
     * @description Allows any string key with string, boolean, or number values
     */
    [key: string]: string | boolean | number;
  };
}

/**
 * Main interface for SEON Fraud API request payload
 * @interface FraudApiRequest
 * @description Complete request structure for SEON's fraud detection and prevention API
 * @see {@link https://docs.seon.io/api-reference/fraud-api#request} API Request Documentation
 */
export interface FraudApiRequest {
  /**
   * Optional SEON modules configuration
   * @description Controls which fraud detection modules are enabled and their settings
   * @type {APIRequestConfig}
   * @optional
   */
  config?: APIRequestConfig;

  /**
   * Optional action type being performed
   * @description Describes the type of user action being analyzed
   * @example "login" | "register" | "payment" | "deposit" | "withdrawal"
   * @type {string}
   * @optional
   */
  action_type?: string;

  /**
   * Optional IP address of the user
   * @description IPv4 or IPv6 address for geolocation and risk analysis
   * @example "192.168.1.1"
   * @type {string}
   * @optional
   */
  ip?: string;

  /**
   * Optional unique transaction identifier
   * @description Merchant's internal transaction ID for tracking and correlation
   * @example "txn_1234567890"
   * @maxLength 255
   * @type {string}
   * @optional
   */
  transaction_id?: string;

  /**
   * Optional affiliate identifier
   * @description ID of the affiliate or partner referring this transaction
   * @example "affiliate_001"
   * @type {string}
   * @optional
   */
  affiliate_id?: string;

  /**
   * Optional affiliate name
   * @description Human-readable name of the referring affiliate
   * @example "Marketing Partner Co."
   * @type {string}
   * @optional
   */
  affiliate_name?: string;

  /**
   * Optional order memo or notes
   * @description Additional information or notes about the transaction
   * @example "Gift order for anniversary"
   * @type {string}
   * @optional
   */
  order_memo?: string;

  /**
   * Optional user email address
   * @description Primary email address for digital footprint analysis
   * @example "user@example.com"
   * @type {string}
   * @optional
   */
  email?: string;

  /**
   * Optional email domain
   * @description Domain portion of the email address for domain-specific analysis
   * @example "example.com"
   * @type {string}
   * @optional
   */
  email_domain?: string;

  /**
   * Optional payment method identifier
   * @description Unique identifier for the payment method used
   * @example "pm_1234567890"
   * @type {string}
   * @optional
   */
  payment_id?: string;

  /**
   * Optional hashed password
   * @description One-way hash of user password for pattern analysis (never send plaintext)
   * @example "sha256:a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3"
   * @type {string}
   * @optional
   */
  password_hash?: string;

  /**
   * Optional complete user name
   * @description Full name of the user for identity verification
   * @example "John Michael Smith"
   * @type {string}
   * @optional
   */
  user_fullname?: string;

  /**
   * Optional username or login identifier
   * @description Unique username or login handle
   * @example "jsmith123"
   * @type {string}
   * @optional
   */
  user_name?: string;

  /**
   * Optional user first name
   * @description Given name for identity verification
   * @example "John"
   * @type {string}
   * @optional
   */
  user_firstname?: string;

  /**
   * Optional user middle name
   * @description Middle name or initial for enhanced identity verification
   * @example "Michael"
   * @type {string}
   * @optional
   */
  user_middlename?: string;

  /**
   * Optional user last name
   * @description Family name or surname for identity verification
   * @example "Smith"
   * @type {string}
   * @optional
   */
  user_lastname?: string;

  /**
   * Optional user place of birth
   * @description Birth location for enhanced identity verification
   * @example "New York, NY, USA"
   * @type {string}
   * @optional
   */
  user_pob?: string;

  /**
   * Optional photo ID number
   * @description Government-issued photo ID number (masked/hashed recommended)
   * @example "DL123456789"
   * @type {string}
   * @optional
   */
  user_photoid_number?: string;

  /**
   * Optional internal user identifier
   * @description Merchant's internal user ID for account linking
   * @example "user_1234567890"
   * @type {string}
   * @optional
   */
  user_id?: string;

  /**
   * Optional user account creation timestamp
   * @description Unix timestamp when the user account was created
   * @example 1640995200
   * @type {number}
   * @optional
   */
  user_created?: number;

  /**
   * Optional user category or tier
   * @description User classification for risk assessment
   * @example "premium" | "standard" | "vip"
   * @type {string}
   * @optional
   */
  user_category?: string;

  /**
   * Optional user account status
   * @description Current verification or standing status
   * @example "verified" | "pending" | "suspended"
   * @type {string}
   * @optional
   */
  user_account_status?: string;

  /**
   * Optional user bank account number
   * @description Bank account number (masked/tokenized recommended)
   * @example "****5678"
   * @type {string}
   * @optional
   */
  user_bank_account?: string;

  /**
   * Optional user bank name
   * @description Name of the user's primary banking institution
   * @example "Chase Bank"
   * @type {string}
   * @optional
   */
  user_bank_name?: string;

  /**
   * Optional user account balance
   * @description Current account balance for risk assessment
   * @example 1250.75
   * @type {number}
   * @optional
   */
  user_balance?: number;

  /**
   * Optional user verification level
   * @description KYC/verification tier achieved by the user
   * @example "level_1" | "level_2" | "level_3"
   * @type {string}
   * @optional
   */
  user_verification_level?: string;

  /**
   * Optional user date of birth
   * @description Birth date in YYYY-MM-DD format for age verification
   * @example "1990-05-15"
   * @type {string}
   * @optional
   */
  user_dob?: string;

  /**
   * Optional user country
   * @description User's country of residence (ISO 3166-1 alpha-2 recommended)
   * @example "US"
   * @type {string}
   * @optional
   */
  user_country?: string;

  /**
   * Optional user city
   * @description User's city of residence
   * @example "New York"
   * @type {string}
   * @optional
   */
  user_city?: string;

  /**
   * Optional user region/state
   * @description User's state, province, or region
   * @example "NY"
   * @type {string}
   * @optional
   */
  user_region?: string;

  /**
   * Optional user postal code
   * @description ZIP code or postal code for location verification
   * @example "10001"
   * @type {string}
   * @optional
   */
  user_zip?: string;

  /**
   * Optional user street address
   * @description Primary street address for location verification
   * @example "123 Main Street"
   * @type {string}
   * @optional
   */
  user_street?: string;

  /**
   * Optional user secondary address
   * @description Apartment, suite, or secondary address line
   * @example "Apt 4B"
   * @type {string}
   * @optional
   */
  user_street2?: string;

  /**
   * Optional session identifier
   * @description Unique session ID for tracking user activity
   * @example "sess_1234567890abcdef"
   * @maxLength 64
   * @type {string}
   * @optional
   */
  session_id?: string;

  /**
   * Optional encrypted session data
   * @description Encrypted session payload from SEON's JavaScript SDK
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   * @type {string}
   * @optional
   */
  session?: string;

  /**
   * Optional device identifier
   * @description Unique device ID for device tracking and analysis
   * @example "dev_1234567890abcdef"
   * @type {string}
   * @optional
   */
  device_id?: string;

  /**
   * Optional payment mode or method type
   * @description Type of payment method being used
   * @example "credit_card" | "debit_card" | "bank_transfer" | "digital_wallet"
   * @type {string}
   * @optional
   */
  payment_mode?: string;

  /**
   * Optional payment processor or provider
   * @description Name of the payment processing service
   * @example "stripe" | "paypal" | "square"
   * @type {string}
   * @optional
   */
  payment_provider?: string;

  /**
   * Optional cardholder name
   * @description Name as it appears on the payment card
   * @example "John M Smith"
   * @type {string}
   * @optional
   */
  card_fullname?: string;

  /**
   * Optional card BIN (Bank Identification Number)
   * @description First 6-8 digits of the payment card for issuer identification
   * @example "414141"
   * @maxLength 15
   * @type {string}
   * @optional
   */
  card_bin?: string;

  /**
   * Optional card hash or token
   * @description Hashed or tokenized card number for tracking without PCI exposure
   * @example "card_1234567890abcdef"
   * @maxLength 500
   * @type {string}
   * @optional
   */
  card_hash?: string;

  /**
   * Optional card expiration date
   * @description Card expiry in YYYY-MM format
   * @example "2025-12"
   * @type {string}
   * @optional
   */
  card_expire?: string;

  /**
   * Optional last 4 digits of card number
   * @description Last 4 digits for card identification (PCI compliant)
   * @example "1234"
   * @type {string}
   * @optional
   */
  card_last?: string;

  /**
   * Optional Address Verification System result
   * @description AVS check result code from payment processor
   * @example "Y" | "N" | "P"
   * @type {string}
   * @optional
   */
  avs_result?: string;

  /**
   * Optional CVV verification result
   * @description Whether CVV/CVC check passed or failed
   * @type {boolean}
   * @optional
   */
  cvv_result?: boolean;

  /**
   * Optional 3D Secure authentication status
   * @description Result of 3D Secure authentication process
   * @example "authenticated" | "failed" | "not_enrolled"
   * @type {string}
   * @optional
   */
  status_3d?: string;

  /**
   * Optional Strong Customer Authentication method used
   * @description Type of SCA method employed for the transaction
   * @example "biometric" | "sms" | "app_notification"
   * @type {string}
   * @optional
   */
  sca_method?: string;

  /**
   * Optional user phone number
   * @description Phone number for validation and social media analysis
   * @example "+1234567890"
   * @maxLength 19
   * @type {string}
   * @optional
   */
  phone_number?: string;

  /**
   * Optional transaction type classification
   * @description Categorical description of the transaction
   * @example "purchase" | "refund" | "subscription" | "donation"
   * @type {string}
   * @optional
   */
  transaction_type?: string;

  /**
   * Optional transaction amount
   * @description Monetary value of the transaction
   * @example 99.99
   * @type {number}
   * @optional
   */
  transaction_amount?: number;

  /**
   * Optional transaction currency
   * @description ISO 4217 currency code for the transaction
   * @example "USD"
   * @maxLength 4
   * @type {string}
   * @optional
   */
  transaction_currency?: string;

  /**
   * Optional detailed transaction description
   * @description Extended description or memo for the transaction
   * @example "Monthly subscription renewal for Premium Plan"
   * @type {string}
   * @optional
   */
  transaction_long_text?: string;

  /**
   * Optional array of items in the transaction
   * @description Detailed breakdown of products/services in the transaction
   * @type {APIRequestItem[]}
   * @optional
   */
  items?: APIRequestItem[];

  /**
   * Optional shipping destination country
   * @description ISO 3166-1 alpha-2 country code for shipping
   * @example "US"
   * @type {string}
   * @optional
   */
  shipping_country?: string;

  /**
   * Optional shipping destination city
   * @description City where the order will be shipped
   * @example "Boston"
   * @type {string}
   * @optional
   */
  shipping_city?: string;

  /**
   * Optional shipping destination region/state
   * @description State, province, or region for shipping
   * @example "MA"
   * @type {string}
   * @optional
   */
  shipping_region?: string;

  /**
   * Optional shipping destination postal code
   * @description ZIP code or postal code for shipping address
   * @example "02101"
   * @type {string}
   * @optional
   */
  shipping_zip?: string;

  /**
   * Optional shipping street address
   * @description Primary street address for shipping
   * @example "456 Oak Avenue"
   * @type {string}
   * @optional
   */
  shipping_street?: string;

  /**
   * Optional shipping secondary address
   * @description Apartment, suite, or secondary shipping address line
   * @example "Suite 200"
   * @type {string}
   * @optional
   */
  shipping_street2?: string;

  /**
   * Optional shipping contact phone number
   * @description Phone number for shipping contact
   * @example "+1987654321"
   * @type {string}
   * @optional
   */
  shipping_phone?: string;

  /**
   * Optional shipping recipient name
   * @description Full name of the shipping recipient
   * @example "Jane Doe"
   * @type {string}
   * @optional
   */
  shipping_fullname?: string;

  /**
   * Optional shipping method selected
   * @description Type or speed of shipping service
   * @example "express" | "standard" | "overnight"
   * @maxLength 50
   * @type {string}
   * @optional
   */
  shipping_method?: string;

  /**
   * Optional billing address country
   * @description ISO 3166-1 alpha-2 country code for billing
   * @example "US"
   * @type {string}
   * @optional
   */
  billing_country?: string;

  /**
   * Optional billing address city
   * @description City for billing address
   * @example "New York"
   * @type {string}
   * @optional
   */
  billing_city?: string;

  /**
   * Optional billing address region/state
   * @description State, province, or region for billing
   * @example "NY"
   * @type {string}
   * @optional
   */
  billing_region?: string;

  /**
   * Optional billing address postal code
   * @description ZIP code or postal code for billing address
   * @example "10001"
   * @type {string}
   * @optional
   */
  billing_zip?: string;

  /**
   * Optional billing street address
   * @description Primary street address for billing
   * @example "123 Main Street"
   * @type {string}
   * @optional
   */
  billing_street?: string;

  /**
   * Optional billing secondary address
   * @description Apartment, suite, or secondary billing address line
   * @example "Apt 4B"
   * @type {string}
   * @optional
   */
  billing_street2?: string;

  /**
   * Optional billing contact phone number
   * @description Phone number associated with billing address
   * @example "+1234567890"
   * @type {string}
   * @optional
   */
  billing_phone?: string;

  /**
   * Optional discount code applied
   * @description Promotional or discount code used in transaction
   * @example "SAVE20"
   * @maxLength 50
   * @type {string}
   * @optional
   */
  discount_code?: string;

  /**
   * Optional flag indicating if this is a gift purchase
   * @description Whether the transaction is a gift for someone else
   * @type {boolean}
   * @optional
   */
  gift?: boolean;

  /**
   * Optional flag indicating if a gift message was included
   * @description Whether a gift message was added to the transaction
   * @type {boolean}
   * @optional
   */
  gift_message?: boolean;

  /**
   * Optional merchant category classification
   * @description Business category of the merchant
   * @example "retail" | "travel" | "digital_goods"
   * @type {string}
   * @optional
   */
  merchant_category?: string;

  /**
   * Optional merchant identifier
   * @description Unique identifier for the merchant or sub-merchant
   * @example "merchant_1234567890"
   * @type {string}
   * @optional
   */
  merchant_id?: string;

  /**
   * Optional merchant account creation timestamp
   * @description Unix timestamp when the merchant account was created
   * @example 1609459200
   * @type {number}
   * @optional
   */
  merchant_created_at?: number;

  /**
   * Optional merchant country
   * @description Country where the merchant is located
   * @example "US"
   * @type {string}
   * @optional
   */
  merchant_country?: string;

  /**
   * Optional receiver full name for transfers
   * @description Name of the recipient for money transfer transactions
   * @example "Alice Johnson"
   * @type {string}
   * @optional
   */
  receiver_fullname?: string;

  /**
   * Optional receiver bank account for transfers
   * @description Bank account number of the transfer recipient
   * @example "****9876"
   * @type {string}
   * @optional
   */
  receiver_bank_account?: string;

  /**
   * Optional URL for transaction details
   * @description Link to detailed transaction information
   * @example "https://merchant.example.com/transaction/123456"
   * @type {string}
   * @optional
   */
  details_url?: string;

  /**
   * Optional regulatory compliance framework
   * @description Applicable regulatory framework for the transaction
   * @example "GDPR" | "CCPA" | "PCI_DSS"
   * @type {string}
   * @optional
   */
  regulation?: string;

  /**
   * Optional bonus campaign identifier
   * @description ID of the promotional campaign or bonus offer
   * @example "bonus_summer2024"
   * @type {string}
   * @optional
   */
  bonus_campaign_id?: string;

  /**
   * Optional brand identifier
   * @description Brand or sub-brand associated with the transaction
   * @example "brand_premium"
   * @type {string}
   * @optional
   */
  brand_id?: string;

  /**
   * Optional custom fields for additional business-specific data
   * @description Flexible object for merchant-specific metadata and business logic
   * @example { "loyalty_tier": "gold", "referral_code": "REF123", "is_employee": false }
   * @maxLength 200
   * @type {Record<string, string | boolean | number>}
   * @optional
   */
  custom_fields?: {
    /**
     * Dynamic custom field key-value pairs
     * @description Allows any string key with string, boolean, or number values for business-specific data
     */
    [key: string]: string | boolean | number;
  };
}
