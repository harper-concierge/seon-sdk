/**
 * @fileoverview SEON Fraud API Response Type Definitions
 * @description Comprehensive TypeScript definitions for SEON's Fraud API response structure.
 * These types ensure type safety and provide detailed documentation for all response
 * data fields and nested objects returned by the fraud analysis.
 *
 * @author SEON SDK Team
 * @version 1.0.0
 * @see {@link https://docs.seon.io/api-reference/fraud-api#response} SEON Fraud API Response Documentation
 */

/**
 * Interface for applied fraud detection rules in the analysis
 * @interface AppliedRule
 * @description Represents a single rule that was triggered during fraud analysis
 */
interface AppliedRule {
  /**
   * Unique identifier for the fraud detection rule
   * @description Internal rule ID used by SEON's rule engine
   * @example "RULE_001"
   * @type {string}
   */
  id: string;

  /**
   * Human-readable name of the fraud detection rule
   * @description Descriptive name explaining what the rule checks
   * @example "High transaction amount for new user"
   * @type {string}
   */
  name: string;

  /**
   * Mathematical operation applied by the rule
   * @description How the rule affects the overall fraud score
   * @example "+" | "-" | "*" | null
   * @type {string | null}
   */
  operation: string | null;

  /**
   * Numerical score contribution of this rule
   * @description Points added or subtracted from the total fraud score
   * @example 25.5
   * @type {number}
   */
  score: number;
}

/**
 * Interface for BIN (Bank Identification Number) details
 * @interface BinDetails
 * @description Contains information about the payment card's issuing bank and characteristics
 */
interface BinDetails {
  /**
   * Bank Identification Number from the payment card
   * @description First 6-8 digits identifying the card issuer
   * @example "414141"
   * @type {string}
   */
  card_bin: string;

  /**
   * Name of the issuing bank
   * @description Financial institution that issued the payment card
   * @example "Chase Bank"
   * @type {string}
   */
  bin_bank: string;

  /**
   * Card network or brand
   * @description Payment network processing the card
   * @example "VISA" | "MASTERCARD" | "AMEX"
   * @type {string}
   */
  bin_card: string;

  /**
   * Type of payment card
   * @description Classification of the card product
   * @example "CREDIT" | "DEBIT" | "PREPAID"
   * @type {string}
   */
  bin_type: string;

  /**
   * Card product level or tier
   * @description Premium level of the card offering
   * @example "CLASSIC" | "GOLD" | "PLATINUM" | "BLACK"
   * @type {string}
   */
  bin_level: string;

  /**
   * Country where the card was issued
   * @description Full country name of the issuing country
   * @example "United States"
   * @type {string}
   */
  bin_country: string;

  /**
   * ISO 3166-1 alpha-2 country code of the issuing country
   * @description Two-letter country code for the issuing country
   * @example "US"
   * @type {string}
   */
  bin_country_code: string;

  /**
   * Official website of the issuing bank
   * @description URL to the bank's website
   * @example "https://www.chase.com"
   * @type {string}
   */
  bin_website: string;

  /**
   * Contact phone number for the issuing bank
   * @description Customer service phone number
   * @example "+1-800-935-9935"
   * @type {string}
   */
  bin_phone: string;

  /**
   * Validation status of the BIN
   * @description Whether the BIN is recognized and valid
   * @type {boolean}
   */
  bin_valid: boolean;

  /**
   * Primary card issuer name
   * @description Main card network or issuing entity
   * @example "VISA"
   * @type {string}
   */
  card_issuer: string;
}

/**
 * Interface for device location information
 * @interface DeviceLocation
 * @description Geolocation data derived from device intelligence
 */
interface DeviceLocation {
  /**
   * Postal code of the device location
   * @description ZIP code or postal code detected
   * @example "10001"
   * @type {string}
   */
  zip: string;

  /**
   * City name of the device location
   * @description Detected city name
   * @example "New York"
   * @type {string}
   */
  city: string;

  /**
   * Region or state of the device location
   * @description State, province, or administrative region
   * @example "NY"
   * @type {string}
   */
  region: string;

  /**
   * Status of the geolocation detection
   * @description Success or failure status of location detection
   * @example "SUCCESS" | "FAILED" | "TIMEOUT"
   * @type {string}
   */
  status: string;

  /**
   * Accuracy of the location detection in meters
   * @description Estimated accuracy radius of the location
   * @example 100
   * @type {number}
   */
  accuracy: number;

  /**
   * Latitude coordinate
   * @description Geographic latitude in decimal degrees
   * @example 40.7128
   * @type {number}
   */
  latitude: number;

  /**
   * Longitude coordinate
   * @description Geographic longitude in decimal degrees
   * @example -74.0060
   * @type {number}
   */
  longitude: number;

  /**
   * ISO 3166-1 alpha-2 country code
   * @description Two-letter country code for the location
   * @example "US"
   * @type {string}
   */
  country_code: string;
}

/**
 * Interface for comprehensive device intelligence data
 * @interface DeviceDetails
 * @description Contains detailed information about the user's device and browser environment
 */
interface DeviceDetails {
  /**
   * Operating system of the device
   * @description Detected OS name and version
   * @example "Windows 10" | "macOS 12.6" | "iOS 16.1"
   * @type {string}
   */
  os: string;

  /**
   * Type of device platform
   * @description Category of device being used
   * @example "web" | "ios" | "android"
   * @type {string}
   */
  type: string;

  /**
   * Browser name and version
   * @description Detected web browser
   * @example "Chrome 108.0"
   * @type {string}
   */
  browser: string;

  /**
   * Unique session identifier for this interaction
   * @description Session ID generated by SEON's SDK
   * @example "sess_1234567890abcdef"
   * @type {string}
   */
  session_id: string;

  /**
   * Full user agent string from the browser
   * @description Complete user agent header sent by the browser
   * @example "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36..."
   * @type {string}
   */
  user_agent: string;

  /**
   * Unique hash identifying the device
   * @description Fingerprint hash based on device characteristics
   * @example "a1b2c3d4e5f6..."
   * @type {string}
   */
  device_hash: string;

  /**
   * Category of device type
   * @description Specific device classification
   * @example "desktop" | "mobile" | "tablet"
   * @type {string}
   */
  device_type: string;

  /**
   * Screen resolution of the device
   * @description Display resolution in pixels
   * @example "1920x1080"
   * @type {string}
   */
  screen_resolution: string;

  /**
   * DNS server IP address
   * @description IP of the DNS server being used
   * @example "8.8.8.8"
   * @type {string | null}
   */
  dns_ip: string | null;

  /**
   * Source of the device fingerprint data
   * @description Version and source of data collection
   * @example "js-6.0.0" | "ios-5.5.2" | "android-6.6.1"
   * @type {string}
   */
  source: string;

  /**
   * Ad blocker detection status
   * @description Whether ad blocking software is detected
   * @type {boolean}
   */
  adblock: boolean;

  /**
   * Private browsing mode detection
   * @description Whether the browser is in incognito/private mode
   * @type {boolean}
   */
  private: boolean;

  /**
   * Platform identifier
   * @description Detailed platform information
   * @example "Win32" | "MacIntel" | "Linux x86_64"
   * @type {string}
   */
  platform: string;

  /**
   * Hash of installed fonts
   * @description Fingerprint based on available system fonts
   * @example "a1b2c3d4e5f6..."
   * @type {string}
   */
  font_hash: string;

  /**
   * List of detected fonts
   * @description Array of font names available on the system
   * @example ["Arial", "Times New Roman", "Helvetica"]
   * @type {Array<string>}
   */
  font_list: Array<string>;

  /**
   * Audio fingerprint hash
   * @description Unique identifier based on audio system capabilities
   * @example "124.04346607114712"
   * @type {string}
   */
  audio_hash: string;

  /**
   * DNS server ISP name
   * @description Internet service provider of the DNS server
   * @example "Google" | "Cloudflare"
   * @type {string | null}
   */
  dns_ip_isp: string | null;

  /**
   * Number of fonts detected on the system
   * @description Count of available fonts
   * @example 150
   * @type {number}
   */
  font_count: number;

  /**
   * WebGL rendering fingerprint hash
   * @description Unique identifier based on WebGL capabilities
   * @example "webgl_hash_abc123"
   * @type {string | null}
   */
  webgl_hash: string | null;

  /**
   * WebRTC IP addresses detected
   * @description Array of IP addresses discovered via WebRTC
   * @example ["192.168.1.100", "10.0.0.1"]
   * @type {Array<string>}
   */
  webrtc_ips: Array<string>;

  /**
   * Canvas fingerprint hash
   * @description Unique identifier based on canvas rendering
   * @example "canvas_hash_def456"
   * @type {string}
   */
  canvas_hash: string;

  /**
   * Cookie configuration fingerprint
   * @description Hash based on cookie settings and capabilities
   * @example "cookie_hash_ghi789"
   * @type {string}
   */
  cookie_hash: string;

  /**
   * Browser plugins fingerprint hash
   * @description Identifier based on installed browser plugins
   * @example "plugin_hash_jkl012"
   * @type {string}
   */
  plugin_hash: string;

  /**
   * List of detected browser plugins
   * @description Array of plugin names installed in the browser
   * @example ["PDF Viewer", "Flash Player"]
   * @type {Array<string>}
   */
  plugin_list: Array<string>;

  /**
   * Browser window size
   * @description Current window dimensions
   * @example "1920x1080"
   * @type {string}
   */
  window_size: string;

  /**
   * Browser fingerprint hash
   * @description Overall browser configuration fingerprint
   * @example "browser_hash_mno345"
   * @type {string}
   */
  browser_hash: string;

  /**
   * Do Not Track header value
   * @description Browser's DNT setting
   * @example "1" | "0" | null
   * @type {string | null}
   */
  do_not_track: string | null;

  /**
   * Java support status
   * @description Whether Java is enabled in the browser
   * @type {boolean}
   */
  java_enabled: boolean;

  /**
   * Number of browser plugins detected
   * @description Count of installed plugins
   * @example 8
   * @type {number}
   */
  plugin_count: number;

  /**
   * WebGL vendor information
   * @description Graphics card vendor detected via WebGL
   * @example "NVIDIA Corporation"
   * @type {string | null}
   */
  webgl_vendor: string | null;

  /**
   * Number of WebRTC IP addresses detected
   * @description Count of IPs found through WebRTC
   * @example 2
   * @type {number}
   */
  webrtc_count: number;

  /**
   * Battery level percentage
   * @description Current battery charge level
   * @example 85
   * @type {number}
   */
  battery_level: number;

  /**
   * Device IP address ISP
   * @description Internet service provider of the device IP
   * @example "Comcast Cable"
   * @type {string | null}
   */
  device_ip_isp: string | null;

  /**
   * Device memory in GB
   * @description Amount of RAM detected on the device
   * @example 16
   * @type {number | null}
   */
  device_memory: number | null;

  /**
   * Flash Player support status
   * @description Whether Flash is enabled
   * @type {boolean}
   */
  flash_enabled: boolean;

  /**
   * Social login providers detected
   * @description Array of social platforms used for authentication
   * @example ["google", "facebook", "twitter"]
   * @type {Array<string>}
   */
  social_logins: Array<string>;

  /**
   * Touch input support status
   * @description Whether the device supports touch input
   * @type {boolean}
   */
  touch_support: boolean;

  /**
   * Cookie support status
   * @description Whether cookies are enabled
   * @type {boolean}
   */
  cookie_enabled: boolean;

  /**
   * DNS server country
   * @description Country of the DNS server being used
   * @example "US"
   * @type {string}
   */
  dns_ip_country: string;

  /**
   * Browser language preferences
   * @description Array of preferred languages from Accept-Language header
   * @example ["en-US", "en", "es"]
   * @type {Array<string>}
   */
  accept_language: Array<string>;

  /**
   * Browser version number
   * @description Specific version of the browser
   * @example "108.0.5359.124"
   * @type {string}
   */
  browser_version: string;

  /**
   * Device geolocation information
   * @description Detailed location data for the device
   * @type {DeviceLocation}
   */
  device_location: DeviceLocation;

  /**
   * Regional language setting
   * @description Device's regional language configuration
   * @example "en-US"
   * @type {string}
   */
  region_language: string;

  /**
   * Regional timezone setting
   * @description Device's timezone configuration
   * @example "America/New_York"
   * @type {string}
   */
  region_timezone: string;

  /**
   * Battery charging status
   * @description Whether the device is currently charging
   * @type {boolean | null}
   */
  battery_charging: boolean | null;

  /**
   * WebRTC activation status
   * @description Whether WebRTC is active and functional
   * @type {boolean}
   */
  webrtc_activated: boolean;

  /**
   * Device's public IP address
   * @description External IP address of the device
   * @example "203.0.113.1"
   * @type {string}
   */
  device_ip_address: string;

  /**
   * Device IP address country
   * @description Country associated with the device's IP
   * @example "US"
   * @type {string}
   */
  device_ip_country: string;

  /**
   * Screen color depth
   * @description Bit depth of the display
   * @example 24
   * @type {number}
   */
  screen_color_depth: number;

  /**
   * Screen pixel ratio
   * @description Device pixel ratio for high-DPI displays
   * @example 2.0
   * @type {number}
   */
  screen_pixel_ratio: number;

  /**
   * Hardware concurrency
   * @description Number of logical processors available
   * @example 8
   * @type {number}
   */
  hardware_concurrency: number;

  /**
   * Available screen resolution
   * @description Usable screen area excluding OS elements
   * @example "1920x1040"
   * @type {string}
   */
  screen_available_resolution: string;
}

/**
 * Interface for IP address intelligence data
 * @interface IpDetails
 * @description Contains comprehensive analysis of the user's IP address
 */
interface IpDetails {
  /**
   * IP address that was analyzed
   * @description The actual IP address
   * @example "203.0.113.1"
   * @type {string}
   */
  ip: string;

  /**
   * Risk score for the IP address
   * @description Numerical risk assessment (0-100)
   * @example 25.5
   * @type {number}
   */
  score: number;

  /**
   * Country of the IP address
   * @description Country where the IP is registered
   * @example "United States"
   * @type {string}
   */
  country: string;

  /**
   * State or province of the IP address
   * @description Administrative region of the IP location
   * @example "California"
   * @type {string}
   */
  state_prov: string;

  /**
   * City of the IP address
   * @description City where the IP is located
   * @example "San Francisco"
   * @type {string}
   */
  city: string;

  /**
   * Timezone offset of the IP location
   * @description UTC offset for the IP's timezone
   * @example "-08:00"
   * @type {string}
   */
  timezone_offset: string;

  /**
   * Internet Service Provider name
   * @description ISP or hosting provider for the IP
   * @example "Comcast Cable Communications"
   * @type {string}
   */
  isp_name: string;

  /**
   * Latitude coordinate of the IP location
   * @description Geographic latitude
   * @example 37.7749
   * @type {number}
   */
  latitude: number;

  /**
   * Longitude coordinate of the IP location
   * @description Geographic longitude
   * @example -122.4194
   * @type {number}
   */
  longitude: number;

  /**
   * Type of IP address
   * @description Classification of the IP
   * @example "residential" | "datacenter" | "mobile" | "business"
   * @type {string}
   */
  type: string;

  /**
   * Open ports detected on the IP
   * @description Array of port numbers found open
   * @example [80, 443, 22]
   * @type {Array<any>}
   */
  open_ports: Array<any>;

  /**
   * Tor network detection
   * @description Whether the IP is associated with Tor
   * @type {boolean}
   */
  tor: boolean;

  /**
   * VPN detection
   * @description Whether the IP is identified as a VPN
   * @type {boolean}
   */
  vpn: boolean;

  /**
   * Web proxy detection
   * @description Whether the IP is a web proxy
   * @type {boolean}
   */
  web_proxy: boolean;

  /**
   * Public proxy detection
   * @description Whether the IP is a known public proxy
   * @type {boolean}
   */
  public_proxy: boolean;

  /**
   * Number of spam blacklists containing this IP
   * @description Count of spam databases listing this IP
   * @example 2
   * @type {number}
   */
  spam_number: number;

  /**
   * Spam blacklist URLs
   * @description Array of spam databases that list this IP
   * @example ["spamhaus.org", "barracuda.com"]
   * @type {Array<string>}
   */
  spam_urls: Array<string>;
}

/**
 * Interface for email domain analysis
 * @interface EmailDomainDetails
 * @description Detailed information about the email domain
 */
interface EmailDomainDetails {
  /**
   * Domain name
   * @description The email domain being analyzed
   * @example "example.com"
   * @type {string}
   */
  domain: string;

  /**
   * Top-level domain
   * @description TLD portion of the domain
   * @example "com"
   * @type {string}
   */
  tld: string;

  /**
   * Domain registration status
   * @description Whether the domain is registered
   * @type {boolean}
   */
  registered: boolean;

  /**
   * Domain creation date
   * @description When the domain was first registered
   * @example "2010-01-15 14:30:00"
   * @type {string}
   */
  created: string;

  /**
   * Domain last update date
   * @description When the domain was last modified
   * @example "2023-01-15 10:20:00"
   * @type {string}
   */
  updated: string;

  /**
   * Domain expiration date
   * @description When the domain registration expires
   * @example "2025-01-15 14:30:00"
   * @type {string}
   */
  expires: string;

  /**
   * Domain registrar name
   * @description Company that registered the domain
   * @example "GoDaddy Inc."
   * @type {string}
   */
  registrar_name: string;

  /**
   * Domain registered to
   * @description Entity that owns the domain
   * @example "Example Corporation"
   * @type {string}
   */
  registered_to: string;

  /**
   * Disposable email domain detection
   * @description Whether this is a temporary email service
   * @type {boolean}
   */
  disposable: boolean;

  /**
   * Free email service detection
   * @description Whether this is a free email provider
   * @type {boolean}
   */
  free: boolean;

  /**
   * Custom domain detection
   * @description Whether this is a private/business domain
   * @type {boolean}
   */
  custom: boolean;

  /**
   * DMARC policy enforcement
   * @description Whether DMARC is properly configured
   * @type {boolean}
   */
  dmarc_enforced: boolean;

  /**
   * SPF record strictness
   * @description Whether SPF is properly configured
   * @type {boolean}
   */
  spf_strict: boolean;

  /**
   * Valid MX record detection
   * @description Whether the domain has valid mail exchange records
   * @type {boolean}
   */
  valid_mx: boolean;

  /**
   * Accept-all email configuration
   * @description Whether the domain accepts all email addresses
   * @type {boolean}
   */
  accept_all: boolean;

  /**
   * Suspicious TLD detection
   * @description Whether the TLD is associated with suspicious activity
   * @type {boolean}
   */
  suspicious_tld: boolean;

  /**
   * Website existence check
   * @description Whether a website exists for this domain
   * @type {boolean}
   */
  website_exists: boolean;
}

/**
 * Interface for email breach information
 * @interface EmailBreachDetails
 * @description Information about data breaches involving the email
 */
interface EmailBreachDetails {
  /**
   * HaveIBeenPwned database listing status
   * @description Whether the email is found in breach databases
   * @type {boolean}
   */
  haveibeenpwned_listed: boolean;

  /**
   * Total number of breaches
   * @description Count of data breaches involving this email
   * @example 3
   * @type {number}
   */
  number_of_breaches: number;

  /**
   * Date of the first known breach
   * @description Earliest breach date found
   * @example "2019-03-15"
   * @type {string | null}
   */
  first_breach: string | null;

  /**
   * Array of breach incidents
   * @description Detailed information about each breach
   * @type {Array<any>}
   */
  breaches: Array<any>;
}

/**
 * Interface for comprehensive email analysis
 * @interface EmailDetails
 * @description Complete email intelligence and digital footprint data
 */
interface EmailDetails {
  /**
   * Email address that was analyzed
   * @description The actual email address
   * @example "user@example.com"
   * @type {string}
   */
  email: string;

  /**
   * Risk score for the email
   * @description Numerical risk assessment (0-100)
   * @example 15.5
   * @type {number}
   */
  score: number;

  /**
   * Email deliverability status
   * @description Whether the email address can receive mail
   * @type {boolean}
   */
  deliverable: boolean;

  /**
   * Detailed domain analysis
   * @description Information about the email's domain
   * @type {EmailDomainDetails}
   */
  domain_details: EmailDomainDetails;

  /**
   * Social media and online account associations
   * @description Accounts found associated with this email
   * @type {Record<string, any>}
   */
  account_details: Record<string, any>;

  /**
   * Data breach information
   * @description Breach history for this email address
   * @type {EmailBreachDetails}
   */
  breach_details: EmailBreachDetails;
}

/**
 * Interface for phone number analysis
 * @interface PhoneDetails
 * @description Comprehensive phone number intelligence and validation
 */
interface PhoneDetails {
  /**
   * Phone number that was analyzed
   * @description The phone number in numerical format
   * @example 1234567890
   * @type {number}
   */
  number: number;

  /**
   * Phone number validity status
   * @description Whether the phone number is valid and active
   * @type {boolean}
   */
  valid: boolean;

  /**
   * Type of phone line
   * @description Classification of the phone service
   * @example "mobile" | "landline" | "voip"
   * @type {string}
   */
  type: string;

  /**
   * Country of the phone number
   * @description Country where the number is registered
   * @example "United States"
   * @type {string}
   */
  country: string;

  /**
   * Mobile carrier name
   * @description Telecommunications provider for the number
   * @example "Verizon Wireless"
   * @type {string}
   */
  carrier: string;

  /**
   * Risk score for the phone number
   * @description Numerical risk assessment (0-100)
   * @example 10.0
   * @type {number}
   */
  score: number;

  /**
   * Social media and online account associations
   * @description Accounts found associated with this phone number
   * @type {Record<string, any>}
   */
  account_details: Record<string, any>;
}

/**
 * Interface for geolocation distance calculations
 * @interface GeolocationDetails
 * @description Distance measurements between different location data points
 */
interface GeolocationDetails {
  /**
   * Distance between user location and billing address
   * @description Calculated distance in kilometers
   * @example 5.2
   * @type {number}
   */
  user_billing_distance: number;

  /**
   * Distance between user location and shipping address
   * @description Calculated distance in kilometers
   * @example 250.8
   * @type {number}
   */
  user_shipping_distance: number;

  /**
   * Distance between billing and shipping addresses
   * @description Calculated distance in kilometers
   * @example 245.6
   * @type {number}
   */
  billing_shipping_distance: number;

  /**
   * Distance between IP location and user location
   * @description Calculated distance in kilometers
   * @example 12.3
   * @type {number}
   */
  ip_user_distance: number;

  /**
   * Distance between IP location and billing address
   * @description Calculated distance in kilometers
   * @example 8.7
   * @type {number}
   */
  ip_billing_distance: number;

  /**
   * Distance between IP location and shipping address
   * @description Calculated distance in kilometers
   * @example 258.9
   * @type {number}
   */
  ip_shipping_distance: number;
}

/**
 * Main response interface for SEON Fraud API
 * @interface FraudApiResponse
 * @description Complete structure for fraud analysis response from SEON API
 * @see {@link https://docs.seon.io/api-reference/fraud-api#response} API Response Documentation
 */
export interface FraudApiResponse {
  /**
   * API call success status
   * @description Whether the API call completed successfully
   * @type {boolean}
   */
  success: boolean;

  /**
   * Error information object
   * @description Contains error details if the API call failed
   * @type {Record<string, any>}
   */
  error: Record<string, any>;

  /**
   * Fraud analysis data payload
   * @description Complete fraud analysis results (only present if success is true)
   * @type {object}
   * @optional
   */
  data?: {
    /**
     * Unique identifier for this fraud analysis
     * @description SEON's internal transaction ID for this analysis
     * @example "67c2810c2de1"
     * @type {string}
     */
    id: string;

    /**
     * Final fraud decision state
     * @description Recommended action based on the analysis
     * @example "APPROVE" | "DECLINE" | "REVIEW"
     * @type {string}
     */
    state: string;

    /**
     * Overall fraud risk score
     * @description Calculated risk score from 0 (lowest risk) to 100 (highest risk)
     * @example 25.75
     * @type {number}
     */
    fraud_score: number;

    /**
     * API version used for this analysis
     * @description Version of the SEON API that processed this request
     * @example "v2"
     * @type {string}
     */
    version: string;

    /**
     * Fraud detection rules that were triggered
     * @description Array of rules that contributed to the fraud score
     * @type {Array<AppliedRule>}
     */
    applied_rules: Array<AppliedRule>;

    /**
     * Bank Identification Number analysis
     * @description Detailed information about the payment card
     * @type {BinDetails}
     */
    bin_details: BinDetails;

    /**
     * Device intelligence and fingerprinting data
     * @description Comprehensive device and browser analysis
     * @type {DeviceDetails}
     */
    device_details: DeviceDetails;

    /**
     * Analysis processing time
     * @description Time taken to complete the analysis in milliseconds
     * @example 1250
     * @type {number}
     */
    calculation_time: number;

    /**
     * SEON internal transaction identifier
     * @description Internal ID used by SEON for tracking and analytics
     * @example 12345
     * @type {number}
     */
    seon_id: number;

    /**
     * IP address intelligence data
     * @description Comprehensive IP analysis and risk assessment
     * @type {IpDetails}
     */
    ip_details: IpDetails;

    /**
     * Email intelligence and digital footprint data
     * @description Detailed email analysis and account associations
     * @type {EmailDetails}
     */
    email_details: EmailDetails;

    /**
     * Phone number intelligence data
     * @description Phone validation and carrier information
     * @type {PhoneDetails}
     */
    phone_details: PhoneDetails;

    /**
     * Geographic distance calculations
     * @description Distance analysis between various location points
     * @type {GeolocationDetails}
     */
    geolocation_details: GeolocationDetails;

    /**
     * Anti-Money Laundering screening results
     * @description AML compliance check results (null if AML not enabled)
     * @type {any | null}
     */
    aml_details: any | null;
  };
}
