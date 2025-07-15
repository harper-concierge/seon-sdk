/**
 * @fileoverview SEON Fraud API Response Type Definitions
 * Comprehensive TypeScript definitions for SEON's Fraud API response structure.
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
 * Represents a single rule that was triggered during fraud analysis
 */
export interface AppliedRule {
  /**
   * Unique identifier for the fraud detection rule
   * Internal rule ID used by SEON's rule engine
   * @example "RULE_001"
   * @type {string}
   */
  id: string;

  /**
   * Human-readable name of the fraud detection rule
   * Descriptive name explaining what the rule checks
   * @example "High transaction amount for new user"
   * @type {string}
   */
  name: string;

  /**
   * Mathematical operation applied by the rule
   * How the rule affects the overall fraud score
   * @example "+" | "-" | "*" | null
   * @type {string | null}
   */
  operation: string | null;

  /**
   * Numerical score contribution of this rule
   * Points added or subtracted from the total fraud score
   * @example 25.5
   * @type {number}
   */
  score: number;
}

/**
 * Interface for BIN (Bank Identification Number) details
 * @interface BinDetails
 * Contains information about the payment card's issuing bank and characteristics
 */
export interface BinDetails {
  /**
   * Bank Identification Number from the payment card
   * First 6-8 digits identifying the card issuer
   * @example "414141"
   * @type {string}
   */
  card_bin: string;

  /**
   * Name of the issuing bank
   * Financial institution that issued the payment card
   * @example "Chase Bank"
   * @type {string}
   */
  bin_bank: string;

  /**
   * Card network or brand
   * Payment network processing the card
   * @example "VISA" | "MASTERCARD" | "AMEX"
   * @type {string}
   */
  bin_card: string;

  /**
   * Type of payment card
   * Classification of the card product
   * @example "CREDIT" | "DEBIT" | "PREPAID"
   * @type {string}
   */
  bin_type: string;

  /**
   * Card product level or tier
   * Premium level of the card offering
   * @example "CLASSIC" | "GOLD" | "PLATINUM" | "BLACK"
   * @type {string}
   */
  bin_level: string;

  /**
   * Country where the card was issued
   * Full country name of the issuing country
   * @example "United States"
   * @type {string}
   */
  bin_country: string;

  /**
   * ISO 3166-1 alpha-2 country code of the issuing country
   * Two-letter country code for the issuing country
   * @example "US"
   * @type {string}
   */
  bin_country_code: string;

  /**
   * Official website of the issuing bank
   * URL to the bank's website
   * @example "https://www.chase.com"
   * @type {string}
   */
  bin_website: string;

  /**
   * Contact phone number for the issuing bank
   * Customer service phone number
   * @example "+1-800-935-9935"
   * @type {string}
   */
  bin_phone: string;

  /**
   * Validation status of the BIN
   * Whether the BIN is recognized and valid
   * @type {boolean}
   */
  bin_valid: boolean;

  /**
   * Primary card issuer name
   * Main card network or issuing entity
   * @example "VISA"
   * @type {string}
   */
  card_issuer: string;
}

/**
 * Interface for device location information
 * @interface DeviceLocation
 * Geolocation data derived from device intelligence
 */
export interface DeviceLocation {
  /**
   * Postal code of the device location
   * ZIP code or postal code detected
   * @example "10001"
   * @type {string}
   */
  zip: string;

  /**
   * City name of the device location
   * Detected city name
   * @example "New York"
   * @type {string}
   */
  city: string;

  /**
   * Region or state of the device location
   * State, province, or administrative region
   * @example "NY"
   * @type {string}
   */
  region: string;

  /**
   * Status of the geolocation detection
   * Success or failure status of location detection
   * @example "SUCCESS" | "FAILED" | "TIMEOUT"
   * @type {string}
   */
  status: string;

  /**
   * Accuracy of the location detection in meters
   * Estimated accuracy radius of the location
   * @example 100
   * @type {number}
   */
  accuracy: number;

  /**
   * Latitude coordinate
   * Geographic latitude in decimal degrees
   * @example 40.7128
   * @type {number}
   */
  latitude: number;

  /**
   * Longitude coordinate
   * Geographic longitude in decimal degrees
   * @example -74.0060
   * @type {number}
   */
  longitude: number;

  /**
   * ISO 3166-1 alpha-2 country code
   * Two-letter country code for the location
   * @example "US"
   * @type {string}
   */
  country_code: string;
}

/**
 * Interface for comprehensive device intelligence data
 * @interface DeviceDetails
 * Contains detailed information about the user's device and browser environment
 */
export interface DeviceDetails {
  /**
   * Operating system of the device
   * Detected OS name and version
   * @example "Windows 10" | "macOS 12.6" | "iOS 16.1"
   * @type {string}
   */
  os: string;

  /**
   * Type of device platform
   * Category of device being used
   * @example "web" | "ios" | "android"
   * @type {string}
   */
  type: string;

  /**
   * Browser name and version
   * Detected web browser
   * @example "Chrome 108.0"
   * @type {string}
   */
  browser: string;

  /**
   * Unique session identifier for this interaction
   * Session ID generated by SEON's SDK
   * @example "sess_1234567890abcdef"
   * @type {string}
   */
  session_id: string;

  /**
   * Full user agent string from the browser
   * Complete user agent header sent by the browser
   * @example "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36..."
   * @type {string}
   */
  user_agent: string;

  /**
   * Unique hash identifying the device
   * Fingerprint hash based on device characteristics
   * @example "a1b2c3d4e5f6..."
   * @type {string}
   */
  device_hash: string;

  /**
   * Category of device type
   * Specific device classification
   * @example "desktop" | "mobile" | "tablet"
   * @type {string}
   */
  device_type: string;

  /**
   * Screen resolution of the device
   * Display resolution in pixels
   * @example "1920x1080"
   * @type {string}
   */
  screen_resolution: string;

  /**
   * DNS server IP address
   * IP of the DNS server being used
   * @example "8.8.8.8"
   * @type {string | null}
   */
  dns_ip: string | null;

  /**
   * Source of the device fingerprint data
   * Version and source of data collection
   * @example "js-6.0.0" | "ios-5.5.2" | "android-6.6.1"
   * @type {string}
   */
  source: string;

  /**
   * Ad blocker detection status
   * Whether ad blocking software is detected
   * @type {boolean}
   */
  adblock: boolean;

  /**
   * Private browsing mode detection
   * Whether the browser is in incognito/private mode
   * @type {boolean}
   */
  private: boolean;

  /**
   * Platform identifier
   * Detailed platform information
   * @example "Win32" | "MacIntel" | "Linux x86_64"
   * @type {string}
   */
  platform: string;

  /**
   * Hash of installed fonts
   * Fingerprint based on available system fonts
   * @example "a1b2c3d4e5f6..."
   * @type {string}
   */
  font_hash: string;

  /**
   * List of detected fonts
   * Array of font names available on the system
   * @example ["Arial", "Times New Roman", "Helvetica"]
   * @type {Array<string>}
   */
  font_list: Array<string>;

  /**
   * Audio fingerprint hash
   * Unique identifier based on audio system capabilities
   * @example "124.04346607114712"
   * @type {string}
   */
  audio_hash: string;

  /**
   * DNS server ISP name
   * Internet service provider of the DNS server
   * @example "Google" | "Cloudflare"
   * @type {string | null}
   */
  dns_ip_isp: string | null;

  /**
   * Number of fonts detected on the system
   * Count of available fonts
   * @example 150
   * @type {number}
   */
  font_count: number;

  /**
   * WebGL rendering fingerprint hash
   * Unique identifier based on WebGL capabilities
   * @example "webgl_hash_abc123"
   * @type {string | null}
   */
  webgl_hash: string | null;

  /**
   * WebRTC IP addresses detected
   * Array of IP addresses discovered via WebRTC
   * @example ["192.168.1.100", "10.0.0.1"]
   * @type {Array<string>}
   */
  webrtc_ips: Array<string>;

  /**
   * Canvas fingerprint hash
   * Unique identifier based on canvas rendering
   * @example "canvas_hash_def456"
   * @type {string}
   */
  canvas_hash: string;

  /**
   * Cookie configuration fingerprint
   * Hash based on cookie settings and capabilities
   * @example "cookie_hash_ghi789"
   * @type {string}
   */
  cookie_hash: string;

  /**
   * Browser plugins fingerprint hash
   * Identifier based on installed browser plugins
   * @example "plugin_hash_jkl012"
   * @type {string}
   */
  plugin_hash: string;

  /**
   * List of detected browser plugins
   * Array of plugin names installed in the browser
   * @example ["PDF Viewer", "Flash Player"]
   * @type {Array<string>}
   */
  plugin_list: Array<string>;

  /**
   * Browser window size
   * Current window dimensions
   * @example "1920x1080"
   * @type {string}
   */
  window_size: string;

  /**
   * Browser fingerprint hash
   * Overall browser configuration fingerprint
   * @example "browser_hash_mno345"
   * @type {string}
   */
  browser_hash: string;

  /**
   * Do Not Track header value
   * Browser's DNT setting
   * @example "1" | "0" | null
   * @type {string | null}
   */
  do_not_track: string | null;

  /**
   * Java support status
   * Whether Java is enabled in the browser
   * @type {boolean}
   */
  java_enabled: boolean;

  /**
   * Number of browser plugins detected
   * Count of installed plugins
   * @example 8
   * @type {number}
   */
  plugin_count: number;

  /**
   * WebGL vendor information
   * Graphics card vendor detected via WebGL
   * @example "NVIDIA Corporation"
   * @type {string | null}
   */
  webgl_vendor: string | null;

  /**
   * Number of WebRTC IP addresses detected
   * Count of IPs found through WebRTC
   * @example 2
   * @type {number}
   */
  webrtc_count: number;

  /**
   * Battery level percentage
   * Current battery charge level
   * @example 85
   * @type {number}
   */
  battery_level: number;

  /**
   * Device IP address ISP
   * Internet service provider of the device IP
   * @example "Comcast Cable"
   * @type {string | null}
   */
  device_ip_isp: string | null;

  /**
   * Device memory in GB
   * Amount of RAM detected on the device
   * @example 16
   * @type {number | null}
   */
  device_memory: number | null;

  /**
   * Flash Player support status
   * Whether Flash is enabled
   * @type {boolean}
   */
  flash_enabled: boolean;

  /**
   * Social login providers detected
   * Array of social platforms used for authentication
   * @example ["google", "facebook", "twitter"]
   * @type {Array<string>}
   */
  social_logins: Array<string>;

  /**
   * Touch input support status
   * Whether the device supports touch input
   * @type {boolean}
   */
  touch_support: boolean;

  /**
   * Cookie support status
   * Whether cookies are enabled
   * @type {boolean}
   */
  cookie_enabled: boolean;

  /**
   * DNS server country
   * Country of the DNS server being used
   * @example "US"
   * @type {string}
   */
  dns_ip_country: string;

  /**
   * Browser language preferences
   * Array of preferred languages from Accept-Language header
   * @example ["en-US", "en", "es"]
   * @type {Array<string>}
   */
  accept_language: Array<string>;

  /**
   * Browser version number
   * Specific version of the browser
   * @example "108.0.5359.124"
   * @type {string}
   */
  browser_version: string;

  /**
   * Device geolocation information
   * Detailed location data for the device
   * @type {DeviceLocation}
   */
  device_location: DeviceLocation;

  /**
   * Regional language setting
   * Device's regional language configuration
   * @example "en-US"
   * @type {string}
   */
  region_language: string;

  /**
   * Regional timezone setting
   * Device's timezone configuration
   * @example "America/New_York"
   * @type {string}
   */
  region_timezone: string;

  /**
   * Battery charging status
   * Whether the device is currently charging
   * @type {boolean | null}
   */
  battery_charging: boolean | null;

  /**
   * WebRTC activation status
   * Whether WebRTC is active and functional
   * @type {boolean}
   */
  webrtc_activated: boolean;

  /**
   * Device's public IP address
   * External IP address of the device
   * @example "203.0.113.1"
   * @type {string}
   */
  device_ip_address: string;

  /**
   * Device IP address country
   * Country associated with the device's IP
   * @example "US"
   * @type {string}
   */
  device_ip_country: string;

  /**
   * Screen color depth
   * Bit depth of the display
   * @example 24
   * @type {number}
   */
  screen_color_depth: number;

  /**
   * Screen pixel ratio
   * Device pixel ratio for high-DPI displays
   * @example 2.0
   * @type {number}
   */
  screen_pixel_ratio: number;

  /**
   * Hardware concurrency
   * Number of logical processors available
   * @example 8
   * @type {number}
   */
  hardware_concurrency: number;

  /**
   * Available screen resolution
   * Usable screen area excluding OS elements
   * @example "1920x1040"
   * @type {string}
   */
  screen_available_resolution: string;
}

/**
 * Interface for IP address intelligence data
 * @interface IpDetails
 * Contains comprehensive analysis of the user's IP address
 */
export interface IpDetails {
  /**
   * IP address that was analyzed
   * The actual IP address
   * @example "203.0.113.1"
   * @type {string}
   */
  ip: string;

  /**
   * Risk score for the IP address
   * Numerical risk assessment (0-100)
   * @example 25.5
   * @type {number}
   */
  score: number;

  /**
   * Country of the IP address
   * Country where the IP is registered
   * @example "United States"
   * @type {string}
   */
  country: string;

  /**
   * State or province of the IP address
   * Administrative region of the IP location
   * @example "California"
   * @type {string}
   */
  state_prov: string;

  /**
   * City of the IP address
   * City where the IP is located
   * @example "San Francisco"
   * @type {string}
   */
  city: string;

  /**
   * Timezone offset of the IP location
   * UTC offset for the IP's timezone
   * @example "-08:00"
   * @type {string}
   */
  timezone_offset: string;

  /**
   * Internet Service Provider name
   * ISP or hosting provider for the IP
   * @example "Comcast Cable Communications"
   * @type {string}
   */
  isp_name: string;

  /**
   * Latitude coordinate of the IP location
   * Geographic latitude
   * @example 37.7749
   * @type {number}
   */
  latitude: number;

  /**
   * Longitude coordinate of the IP location
   * Geographic longitude
   * @example -122.4194
   * @type {number}
   */
  longitude: number;

  /**
   * Type of IP address
   * Classification of the IP
   * @example "residential" | "datacenter" | "mobile" | "business"
   * @type {string}
   */
  type: string;

  /**
   * Open ports detected on the IP
   * Array of port numbers found open
   * @example [80, 443, 22]
   * @type {Array<number>}
   */
  open_ports: Array<number>;

  /**
   * Tor network detection
   * Whether the IP is associated with Tor
   * @type {boolean}
   */
  tor: boolean;

  /**
   * VPN detection
   * Whether the IP is identified as a VPN
   * @type {boolean}
   */
  vpn: boolean;

  /**
   * Web proxy detection
   * Whether the IP is a web proxy
   * @type {boolean}
   */
  web_proxy: boolean;

  /**
   * Public proxy detection
   * Whether the IP is a known public proxy
   * @type {boolean}
   */
  public_proxy: boolean;

  /**
   * Number of spam blacklists containing this IP
   * Count of spam databases listing this IP
   * @example 2
   * @type {number}
   */
  spam_number: number;

  /**
   * Spam blacklist URLs
   * Array of spam databases that list this IP
   * @example ["spamhaus.org", "barracuda.com"]
   * @type {Array<string>}
   */
  spam_urls: Array<string>;
}

/**
 * Interface for email domain analysis
 * @interface EmailDomainDetails
 * Detailed information about the email domain
 */
export interface EmailDomainDetails {
  /**
   * Domain name
   * The email domain being analyzed
   * @example "example.com"
   * @type {string}
   */
  domain: string;

  /**
   * Top-level domain
   * TLD portion of the domain
   * @example "com"
   * @type {string}
   */
  tld: string;

  /**
   * Domain registration status
   * Whether the domain is registered
   * @type {boolean}
   */
  registered: boolean;

  /**
   * Domain creation date
   * When the domain was first registered
   * @example "2010-01-15 14:30:00"
   * @type {string}
   */
  created: string;

  /**
   * Domain last update date
   * When the domain was last modified
   * @example "2023-01-15 10:20:00"
   * @type {string}
   */
  updated: string;

  /**
   * Domain expiration date
   * When the domain registration expires
   * @example "2025-01-15 14:30:00"
   * @type {string}
   */
  expires: string;

  /**
   * Domain registrar name
   * Company that registered the domain
   * @example "GoDaddy Inc."
   * @type {string}
   */
  registrar_name: string;

  /**
   * Domain registered to
   * Entity that owns the domain
   * @example "Example Corporation"
   * @type {string}
   */
  registered_to: string;

  /**
   * Disposable email domain detection
   * Whether this is a temporary email service
   * @type {boolean}
   */
  disposable: boolean;

  /**
   * Free email service detection
   * Whether this is a free email provider
   * @type {boolean}
   */
  free: boolean;

  /**
   * Custom domain detection
   * Whether this is a private/business domain
   * @type {boolean}
   */
  custom: boolean;

  /**
   * DMARC policy enforcement
   * Whether DMARC is properly configured
   * @type {boolean}
   */
  dmarc_enforced: boolean;

  /**
   * SPF record strictness
   * Whether SPF is properly configured
   * @type {boolean}
   */
  spf_strict: boolean;

  /**
   * Valid MX record detection
   * Whether the domain has valid mail exchange records
   * @type {boolean}
   */
  valid_mx: boolean;

  /**
   * Accept-all email configuration
   * Whether the domain accepts all email addresses
   * @type {boolean}
   */
  accept_all: boolean;

  /**
   * Suspicious TLD detection
   * Whether the TLD is associated with suspicious activity
   * @type {boolean}
   */
  suspicious_tld: boolean;

  /**
   * Website existence check
   * Whether a website exists for this domain
   * @type {boolean}
   */
  website_exists: boolean;
}

/**
 * Interface for email breach information
 * @interface EmailBreachDetails
 * Information about data breaches involving the email
 */
export interface EmailBreachDetails {
  /**
   * HaveIBeenPwned database listing status
   * Whether the email is found in breach databases
   * @type {boolean}
   */
  haveibeenpwned_listed: boolean;

  /**
   * Total number of breaches
   * Count of data breaches involving this email
   * @example 3
   * @type {number}
   */
  number_of_breaches: number;

  /**
   * Date of the first known breach
   * Earliest breach date found
   * @example "2019-03-15"
   * @type {string | null}
   */
  first_breach: string | null;

  /**
   * Array of breach incidents
   * Detailed information about each breach
   * @type {Array<BreachIncident>}
   */
  breaches: Array<BreachIncident>;
}

/**
 * Interface for comprehensive email analysis
 * @interface EmailDetails
 * Complete email intelligence and digital footprint data
 */
export interface EmailDetails {
  /**
   * Email address that was analyzed
   * The actual email address
   * @example "user@example.com"
   * @type {string}
   */
  email: string;

  /**
   * Risk score for the email
   * Numerical risk assessment (0-100)
   * @example 15.5
   * @type {number}
   */
  score: number;

  /**
   * Email deliverability status
   * Whether the email address can receive mail
   * @type {boolean}
   */
  deliverable: boolean;

  /**
   * Detailed domain analysis
   * Information about the email's domain
   * @type {EmailDomainDetails}
   */
  domain_details: EmailDomainDetails;

  /**
   * Social media and online account associations
   * Accounts found associated with this email
   * @type {Record<string, SocialAccount>}
   */
  account_details: Record<string, SocialAccount>;

  /**
   * Data breach information
   * Breach history for this email address
   * @type {EmailBreachDetails}
   */
  breach_details: EmailBreachDetails;
}

/**
 * Interface for phone number analysis
 * @interface PhoneDetails
 * Comprehensive phone number intelligence and validation
 */
export interface PhoneDetails {
  /**
   * Phone number that was analyzed
   * The phone number in numerical format
   * @example 1234567890
   * @type {number}
   */
  number: number;

  /**
   * Phone number validity status
   * Whether the phone number is valid and active
   * @type {boolean}
   */
  valid: boolean;

  /**
   * Type of phone line
   * Classification of the phone service
   * @example "mobile" | "landline" | "voip"
   * @type {string}
   */
  type: string;

  /**
   * Country of the phone number
   * Country where the number is registered
   * @example "United States"
   * @type {string}
   */
  country: string;

  /**
   * Mobile carrier name
   * Telecommunications provider for the number
   * @example "Verizon Wireless"
   * @type {string}
   */
  carrier: string;

  /**
   * Risk score for the phone number
   * Numerical risk assessment (0-100)
   * @example 10.0
   * @type {number}
   */
  score: number;

  /**
   * Social media and online account associations
   * Accounts found associated with this phone number
   * @type {Record<string, SocialAccount>}
   */
  account_details: Record<string, SocialAccount>;
}

/**
 * Interface for geolocation distance calculations
 * @interface GeolocationDetails
 * Distance measurements between different location data points
 */
export interface GeolocationDetails {
  /**
   * Distance between user location and billing address
   * Calculated distance in kilometers
   * @example 5.2
   * @type {number}
   */
  user_billing_distance: number;

  /**
   * Distance between user location and shipping address
   * Calculated distance in kilometers
   * @example 250.8
   * @type {number}
   */
  user_shipping_distance: number;

  /**
   * Distance between billing and shipping addresses
   * Calculated distance in kilometers
   * @example 245.6
   * @type {number}
   */
  billing_shipping_distance: number;

  /**
   * Distance between IP location and user location
   * Calculated distance in kilometers
   * @example 12.3
   * @type {number}
   */
  ip_user_distance: number;

  /**
   * Distance between IP location and billing address
   * Calculated distance in kilometers
   * @example 8.7
   * @type {number}
   */
  ip_billing_distance: number;

  /**
   * Distance between IP location and shipping address
   * Calculated distance in kilometers
   * @example 258.9
   * @type {number}
   */
  ip_shipping_distance: number;
}

/**
 * SEON Fraud API Response Types
 * TypeScript definitions for SEON Anti-Fraud API responses
 * Provides comprehensive type safety for fraud detection and analysis
 */

/**
 * Interface for breach incident information
 * @interface BreachIncident
 * Individual data breach incident details
 */
export interface BreachIncident {
  /**
   * Name of the breach incident
   * @example "Example Breach"
   * @type {string}
   */
  name: string;

  /**
   * Date when the breach occurred
   * @example "2019-03-15"
   * @type {string}
   */
  date: string;
}

/**
 * Interface for social media account information
 * @interface SocialAccount
 * Social platform account details and metadata
 */
export interface SocialAccount {
  /**
   * Whether the account is registered
   * @type {boolean}
   */
  registered: boolean;

  /**
   * Account identifier or URL
   * @example "https://facebook.com/johndoe"
   * @type {string}
   */
  url?: string;

  /**
   * Account display name
   * @example "John Doe"
   * @type {string}
   */
  name?: string;

  /**
   * Profile photo URL
   * @example "https://photo.url"
   * @type {string | null}
   */
  photo?: string | null;

  /**
   * Username or handle
   * @example "johndoe"
   * @type {string}
   */
  username?: string;

  /**
   * Account ID on the platform
   * @example "wa789012"
   * @type {string}
   */
  account_id?: string;

  /**
   * Full name associated with account
   * @example "John Doe"
   * @type {string}
   */
  full_name?: string;

  /**
   * Last seen timestamp (Unix timestamp)
   * @example 1640995200
   * @type {number}
   */
  last_seen?: number;

  /**
   * Number of followers (social platforms)
   * @example 250
   * @type {number}
   */
  followers?: number;

  /**
   * Location information
   * @example "New York, NY"
   * @type {string | null}
   */
  location?: string | null;

  /**
   * Occupation or job title
   * @example "Software Engineer"
   * @type {string | null}
   */
  occupation?: string | null;

  /**
   * Profile description or bio
   * @example "Software developer and tech enthusiast"
   * @type {string | null}
   */
  description?: string | null;

  /**
   * About section content
   * @example "Available"
   * @type {string | null}
   */
  about?: string | null;

  /**
   * Last active timestamp
   * @example 1640995200
   * @type {number | null}
   */
  last_active?: number | null;

  /**
   * User's age
   * @example 25
   * @type {number | null}
   */
  age?: number | null;

  /**
   * City information
   * @example "New York"
   * @type {string | null}
   */
  city?: string | null;

  /**
   * Biography or profile bio
   * @example "Love traveling and photography"
   * @type {string | null}
   */
  bio?: string | null;

  /**
   * Company or workplace information
   * @example "Tech Corp Inc."
   * @type {string | null}
   */
  company?: string | null;

  /**
   * Country information
   * @example "US"
   * @type {string | null}
   */
  country?: string | null;

  /**
   * Website URL
   * @example "https://johndoe.com"
   * @type {string | null}
   */
  website?: string | null;

  /**
   * Gender information
   * @example "male" | "female"
   * @type {string | null}
   */
  gender?: string | null;

  /**
   * Number of accounts being followed
   * @example 180
   * @type {number}
   */
  following?: number;

  /**
   * Language preference
   * @example "en" | "es"
   * @type {string | null}
   */
  language?: string | null;

  /**
   * Twitter handle or account
   * @example "@johndoe"
   * @type {string | null}
   */
  twitter?: string | null;

  /**
   * Social media handle
   * @example "johndoe123"
   * @type {string | null}
   */
  handle?: string | null;

  /**
   * Last updated timestamp
   * @example 1640995200
   * @type {number}
   */
  last_updated?: number;

  /**
   * Account identifier
   * @example "123456"
   * @type {string | null}
   */
  id?: string | null;

  /**
   * Reviews or ratings information
   * @type {string | null}
   */
  reviews?: string | null;

  /**
   * State or region information
   * @example "NY"
   * @type {string | null}
   */
  state?: string | null;

  /**
   * Ratings information
   * @type {string | null}
   */
  ratings?: string | null;

  /**
   * Photos or images information
   * @type {string | null}
   */
  photos?: string | null;

  /**
   * Videos information
   * @type {string | null}
   */
  videos?: string | null;

  /**
   * Answers or Q&A information
   * @type {string | null}
   */
  answers?: string | null;

  /**
   * Edits or modifications count
   * @type {string | null}
   */
  edits?: string | null;

  /**
   * Places added or contributed
   * @type {string | null}
   */
  places_added?: string | null;

  /**
   * Roads added or contributed
   * @type {string | null}
   */
  roads_added?: string | null;

  /**
   * Facts checked count
   * @type {string | null}
   */
  facts_checked?: string | null;

  /**
   * Published lists count
   * @type {string | null}
   */
  published_lists?: string | null;

  /**
   * Q&A participation
   * @type {string | null}
   */
  q_and_a?: string | null;
}

/**
 * Interface for AML hit information
 * @interface AmlHit
 * Individual AML screening match result
 */
export interface AmlHit {
  /**
   * Hit identifier
   * @type {string}
   */
  id?: string;

  /**
   * Match confidence score
   * @type {number}
   */
  score?: number;

  /**
   * Matched entity name
   * @type {string}
   */
  name?: string;

  /**
   * Additional hit details
   * @type {Record<string, unknown>}
   */
  [key: string]: unknown;
}

/**
 * Interface for Anti-Money Laundering details
 * @interface AmlDetails
 * AML compliance check results and monitoring information
 */
export interface AmlDetails {
  /**
   * Array of AML hits or matches
   * @type {Array<AmlHit>}
   */
  hits: Array<AmlHit>;

  /**
   * Whether monitoring is required
   * @type {boolean}
   */
  monitoring_required?: boolean;

  /**
   * Risk level assessment
   * @example "low" | "medium" | "high"
   * @type {string}
   */
  risk_level?: string;

  /**
   * Monitoring identifier
   * @example "mon_123456"
   * @type {string}
   */
  monitoring_id?: string;
}

/**
 * Interface for API error information
 * @interface ErrorDetails
 * Error response structure for failed API calls
 */
export interface ErrorDetails {
  /**
   * Error code identifier
   * @example "2002"
   * @type {string}
   */
  code?: string;

  /**
   * Human-readable error message
   * @example "invalid license key"
   * @type {string}
   */
  message?: string;

  /**
   * HTTP status and description
   * @example "401 - Unauthorized"
   * @type {string}
   */
  [key: string]: string | undefined;
}

/**
 * Main response interface for SEON Fraud API
 * @interface FraudApiResponse
 * Complete structure for fraud analysis response from SEON API
 * @see {@link https://docs.seon.io/api-reference/fraud-api#response} API Response Documentation
 */
export interface FraudApiResponse {
  /**
   * API call success status
   * Whether the API call completed successfully
   * @type {boolean}
   */
  success: boolean;

  /**
   * Error information object
   * Contains error details if the API call failed
   * @type {ErrorDetails}
   */
  error: ErrorDetails;

  /**
   * Fraud analysis data payload
   * Complete fraud analysis results (only present if success is true)
   * @type {object}
   *
   */
  data?: {
    /**
     * Unique identifier for this fraud analysis
     * SEON's internal transaction ID for this analysis
     * @example "67c2810c2de1"
     * @type {string}
     */
    id: string;

    /**
     * Final fraud decision state
     * Recommended action based on the analysis
     * @example "APPROVE" | "DECLINE" | "REVIEW"
     * @type {string}
     */
    state: string;

    /**
     * Overall fraud risk score
     * Calculated risk score from 0 (lowest risk) to 100 (highest risk)
     * @example 25.75
     * @type {number}
     */
    fraud_score: number;

    /**
     * API version used for this analysis
     * Version of the SEON API that processed this request
     * @example "v2"
     * @type {string}
     */
    version: string;

    /**
     * Fraud detection rules that were triggered
     * Array of rules that contributed to the fraud score
     * @type {Array<AppliedRule>}
     */
    applied_rules: Array<AppliedRule>;

    /**
     * Bank Identification Number analysis
     * Detailed information about the payment card
     * @type {BinDetails}
     */
    bin_details: BinDetails;

    /**
     * Device intelligence and fingerprinting data
     * Comprehensive device and browser analysis
     * @type {DeviceDetails}
     */
    device_details: DeviceDetails;

    /**
     * Analysis processing time
     * Time taken to complete the analysis in milliseconds
     * @example 1250
     * @type {number}
     */
    calculation_time: number;

    /**
     * SEON internal transaction identifier
     * Internal ID used by SEON for tracking and analytics
     * @example 12345
     * @type {number}
     */
    seon_id: number;

    /**
     * IP address intelligence data
     * Comprehensive IP analysis and risk assessment
     * @type {IpDetails}
     */
    ip_details: IpDetails;

    /**
     * Email intelligence and digital footprint data
     * Detailed email analysis and account associations
     * @type {EmailDetails}
     */
    email_details: EmailDetails;

    /**
     * Phone number intelligence data
     * Phone validation and carrier information
     * @type {PhoneDetails}
     */
    phone_details: PhoneDetails;

    /**
     * Geographic distance calculations
     * Distance analysis between various location points
     * @type {GeolocationDetails}
     */
    geolocation_details: GeolocationDetails;

    /**
     * Anti-Money Laundering screening results
     * AML compliance check results (null if AML not enabled)
     * @type {AmlDetails | null}
     */
    aml_details: AmlDetails | null;
  };
}
