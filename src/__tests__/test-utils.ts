/**
 * Test Utilities
 * Helper functions for creating properly typed mock objects in tests
 */

import {
  DeviceDetails,
  IpDetails,
  EmailDetails,
  PhoneDetails,
  GeolocationDetails,
  BinDetails,
} from "../types/FraudApiResponse";

/**
 * Creates a minimal but properly typed DeviceDetails object for testing
 */
export function createMockDeviceDetails(
  overrides: Partial<DeviceDetails> = {},
): DeviceDetails {
  return {
    os: "",
    type: "web",
    browser: "",
    session_id: "",
    user_agent: "",
    device_hash: "",
    device_type: "",
    screen_resolution: "",
    dns_ip: null,
    source: "",
    adblock: false,
    private: false,
    platform: "",
    font_hash: "",
    font_list: [],
    audio_hash: "",
    dns_ip_isp: null,
    font_count: 0,
    webgl_hash: null,
    webrtc_ips: [],
    canvas_hash: "",
    cookie_hash: "",
    plugin_hash: "",
    plugin_list: [],
    window_size: "",
    browser_hash: "",
    do_not_track: null,
    java_enabled: false,
    plugin_count: 0,
    webgl_vendor: null,
    webrtc_count: 0,
    battery_level: 0,
    device_ip_isp: null,
    device_memory: null,
    flash_enabled: false,
    social_logins: [],
    touch_support: false,
    cookie_enabled: false,
    dns_ip_country: "",
    accept_language: [],
    browser_version: "",
    device_location: {
      zip: "",
      city: "",
      region: "",
      status: "",
      accuracy: 0,
      latitude: 0,
      longitude: 0,
      country_code: "",
    },
    region_language: "",
    region_timezone: "",
    battery_charging: null,
    webrtc_activated: false,
    device_ip_address: "",
    device_ip_country: "",
    screen_color_depth: 0,
    screen_pixel_ratio: 0,
    hardware_concurrency: 0,
    screen_available_resolution: "",
    ...overrides,
  };
}

/**
 * Creates a minimal but properly typed IpDetails object for testing
 */
export function createMockIpDetails(
  overrides: Partial<IpDetails> = {},
): IpDetails {
  return {
    ip: "",
    score: 0,
    country: "",
    state_prov: "",
    city: "",
    timezone_offset: "",
    isp_name: "",
    latitude: 0,
    longitude: 0,
    type: "",
    open_ports: [],
    tor: false,
    vpn: false,
    web_proxy: false,
    public_proxy: false,
    spam_number: 0,
    spam_urls: [],
    ...overrides,
  };
}

/**
 * Creates a minimal but properly typed EmailDetails object for testing
 */
export function createMockEmailDetails(
  overrides: Partial<EmailDetails> = {},
): EmailDetails {
  return {
    email: "",
    score: 0,
    deliverable: false,
    domain_details: {
      domain: "",
      tld: "",
      registered: false,
      created: "",
      updated: "",
      expires: "",
      registrar_name: "",
      registered_to: "",
      disposable: false,
      free: false,
      custom: false,
      dmarc_enforced: false,
      spf_strict: false,
      valid_mx: false,
      accept_all: false,
      suspicious_tld: false,
      website_exists: false,
    },
    account_details: {},
    breach_details: {
      haveibeenpwned_listed: false,
      number_of_breaches: 0,
      first_breach: null,
      breaches: [],
    },
    ...overrides,
  };
}

/**
 * Creates a minimal but properly typed PhoneDetails object for testing
 */
export function createMockPhoneDetails(
  overrides: Partial<PhoneDetails> = {},
): PhoneDetails {
  return {
    number: 0,
    valid: false,
    type: "",
    country: "",
    carrier: "",
    score: 0,
    account_details: {},
    ...overrides,
  };
}

/**
 * Creates a minimal but properly typed GeolocationDetails object for testing
 */
export function createMockGeolocationDetails(
  overrides: Partial<GeolocationDetails> = {},
): GeolocationDetails {
  return {
    user_billing_distance: 0,
    user_shipping_distance: 0,
    billing_shipping_distance: 0,
    ip_user_distance: 0,
    ip_billing_distance: 0,
    ip_shipping_distance: 0,
    ...overrides,
  };
}

/**
 * Creates a minimal but properly typed BinDetails object for testing
 */
export function createMockBinDetails(
  overrides: Partial<BinDetails> = {},
): BinDetails {
  return {
    card_bin: "",
    bin_bank: "",
    bin_card: "",
    bin_type: "",
    bin_level: "",
    bin_country: "",
    bin_country_code: "",
    bin_website: "",
    bin_phone: "",
    bin_valid: false,
    card_issuer: "",
    ...overrides,
  };
}
