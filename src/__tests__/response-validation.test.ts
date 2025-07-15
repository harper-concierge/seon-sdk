/**
 * @fileoverview Response Validation and Data Structure Tests
 * @description Test suite for validating API response structures, data types,
 * and ensuring response data integrity from the SEON Fraud API.
 */

import { Seon, FraudApiResponse } from "../index";
import {
  createMockDeviceDetails,
  createMockIpDetails,
  createMockEmailDetails,
  createMockPhoneDetails,
  createMockGeolocationDetails,
} from "./test-utils";

// Mock fetch globally
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("Response Validation and Data Structure", () => {
  let seon: Seon;

  beforeEach(() => {
    jest.clearAllMocks();
    seon = new Seon("test-api-key");
  });

  describe("Successful Response Structure", () => {
    it("should validate complete fraud response structure", async () => {
      const mockResponseData = {
        success: true,
        error: {},
        data: {
          id: "67c2810c2de1",
          state: "APPROVE",
          fraud_score: 25.75,
          version: "v2",
          applied_rules: [
            {
              id: "RULE_001",
              name: "Low risk transaction",
              operation: "+",
              score: 10,
            },
          ],
          bin_details: {
            card_bin: "414141",
            bin_bank: "Test Bank",
            bin_card: "VISA",
            bin_type: "CREDIT",
            bin_level: "STANDARD",
            bin_country: "United States",
            bin_country_code: "US",
            bin_website: "https://bank.example.com",
            bin_phone: "+1-800-555-0123",
            bin_valid: true,
            card_issuer: "VISA",
          },
          device_details: {
            os: "Windows 10",
            type: "web",
            browser: "Chrome 108.0",
            session_id: "sess_abc123",
            user_agent: "Mozilla/5.0...",
            device_hash: "hash123",
            device_type: "desktop",
            screen_resolution: "1920x1080",
            dns_ip: "8.8.8.8",
            source: "js-6.0.0",
            adblock: false,
            private: false,
            platform: "Win32",
            font_hash: "fonthash123",
            font_list: ["Arial", "Times"],
            audio_hash: "audiohash123",
            dns_ip_isp: "Google",
            font_count: 150,
            webgl_hash: "webglhash123",
            webrtc_ips: ["192.168.1.1"],
            canvas_hash: "canvashash123",
            cookie_hash: "cookiehash123",
            plugin_hash: "pluginhash123",
            plugin_list: ["PDF Viewer"],
            window_size: "1920x1080",
            browser_hash: "browserhash123",
            do_not_track: "0",
            java_enabled: false,
            plugin_count: 5,
            webgl_vendor: "NVIDIA",
            webrtc_count: 1,
            battery_level: 85,
            device_ip_isp: "Comcast",
            device_memory: 16,
            flash_enabled: false,
            social_logins: ["google"],
            touch_support: false,
            cookie_enabled: true,
            dns_ip_country: "US",
            accept_language: ["en-US", "en"],
            browser_version: "108.0.5359.124",
            device_location: {
              zip: "10001",
              city: "New York",
              region: "NY",
              status: "SUCCESS",
              accuracy: 100,
              latitude: 40.7128,
              longitude: -74.006,
              country_code: "US",
            },
            region_language: "en-US",
            region_timezone: "America/New_York",
            battery_charging: false,
            webrtc_activated: true,
            device_ip_address: "203.0.113.1",
            device_ip_country: "US",
            screen_color_depth: 24,
            screen_pixel_ratio: 1.0,
            hardware_concurrency: 8,
            screen_available_resolution: "1920x1040",
          },
          calculation_time: 1250,
          seon_id: 12345,
          ip_details: {
            ip: "203.0.113.1",
            score: 25.5,
            country: "United States",
            state_prov: "California",
            city: "San Francisco",
            timezone_offset: "-08:00",
            isp_name: "Comcast Cable",
            latitude: 37.7749,
            longitude: -122.4194,
            type: "residential",
            open_ports: [],
            tor: false,
            vpn: false,
            web_proxy: false,
            public_proxy: false,
            spam_number: 0,
            spam_urls: [],
          },
          email_details: {
            email: "user@example.com",
            score: 15.5,
            deliverable: true,
            domain_details: {
              domain: "example.com",
              tld: "com",
              registered: true,
              created: "2010-01-15 14:30:00",
              updated: "2023-01-15 10:20:00",
              expires: "2025-01-15 14:30:00",
              registrar_name: "GoDaddy Inc.",
              registered_to: "Example Corp",
              disposable: false,
              free: false,
              custom: true,
              dmarc_enforced: true,
              spf_strict: true,
              valid_mx: true,
              accept_all: false,
              suspicious_tld: false,
              website_exists: true,
            },
            account_details: {},
            breach_details: {
              haveibeenpwned_listed: false,
              number_of_breaches: 0,
              first_breach: null,
              breaches: [],
            },
          },
          phone_details: {
            number: 1234567890,
            valid: true,
            type: "mobile",
            country: "United States",
            carrier: "Verizon",
            score: 10.0,
            account_details: {},
          },
          geolocation_details: {
            user_billing_distance: 5.2,
            user_shipping_distance: 250.8,
            billing_shipping_distance: 245.6,
            ip_user_distance: 12.3,
            ip_billing_distance: 8.7,
            ip_shipping_distance: 258.9,
          },
          aml_details: null,
        },
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponseData,
      } as Response);

      const response = await seon.fraud({ email: "user@example.com" });

      // Validate top-level structure
      expect(response.success).toBe(true);
      expect(response.error).toEqual({});
      expect(response.data).toBeDefined();

      // Validate core response fields
      expect(response.data!.id).toBe("67c2810c2de1");
      expect(response.data!.state).toBe("APPROVE");
      expect(response.data!.fraud_score).toBe(25.75);
      expect(response.data!.version).toBe("v2");

      // Validate applied rules structure
      expect(Array.isArray(response.data!.applied_rules)).toBe(true);
      expect(response.data!.applied_rules[0]).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        operation: expect.any(String),
        score: expect.any(Number),
      });

      // Validate BIN details structure
      expect(response.data!.bin_details).toMatchObject({
        card_bin: expect.any(String),
        bin_bank: expect.any(String),
        bin_valid: expect.any(Boolean),
      });

      // Validate device details structure
      expect(response.data!.device_details).toMatchObject({
        os: expect.any(String),
        browser: expect.any(String),
        device_hash: expect.any(String),
      });
    });

    it("should handle minimal successful response", async () => {
      const minimalResponse = {
        success: true,
        error: {},
        data: {
          id: "simple123",
          state: "REVIEW",
          fraud_score: 50,
          version: "v2",
          applied_rules: [],
          calculation_time: 500,
          seon_id: 98765,
        },
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => minimalResponse,
      } as Response);

      const response = await seon.fraud({ email: "test@example.com" });

      expect(response.success).toBe(true);
      expect(response.data!.fraud_score).toBe(50);
      expect(response.data!.state).toBe("REVIEW");
    });
  });

  describe("Response Data Types Validation", () => {
    it("should validate fraud score is a number", async () => {
      const responseWithNumber = {
        success: true,
        error: {},
        data: { fraud_score: 75.25, state: "DECLINE", id: "test123" },
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => responseWithNumber,
      } as Response);

      const response = await seon.fraud({ email: "test@example.com" });
      expect(typeof response.data!.fraud_score).toBe("number");
      expect(response.data!.fraud_score).toBe(75.25);
    });

    it("should validate state is a string", async () => {
      const states = ["APPROVE", "DECLINE", "REVIEW"];

      for (const state of states) {
        const responseWithState = {
          success: true,
          error: {},
          data: { fraud_score: 30, state, id: "test123" },
        };

        mockFetch.mockResolvedValue({
          ok: true,
          json: async () => responseWithState,
        } as Response);

        const response = await seon.fraud({ email: "test@example.com" });
        expect(typeof response.data!.state).toBe("string");
        expect(response.data!.state).toBe(state);
      }
    });

    it("should validate calculation_time is a number", async () => {
      const responseWithTime = {
        success: true,
        error: {},
        data: {
          fraud_score: 25,
          state: "APPROVE",
          id: "test123",
          calculation_time: 1500,
        },
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => responseWithTime,
      } as Response);

      const response = await seon.fraud({ email: "test@example.com" });
      expect(typeof response.data!.calculation_time).toBe("number");
      expect(response.data!.calculation_time).toBe(1500);
    });

    it("should validate boolean fields in device details", async () => {
      const responseWithBooleans = {
        success: true,
        error: {},
        data: {
          fraud_score: 20,
          state: "APPROVE",
          id: "test123",
          device_details: {
            adblock: true,
            private: false,
            java_enabled: false,
            touch_support: true,
            cookie_enabled: true,
            flash_enabled: false,
            webrtc_activated: true,
          },
        },
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => responseWithBooleans,
      } as Response);

      const response = await seon.fraud({ email: "test@example.com" });
      const deviceDetails = response.data!.device_details;

      expect(typeof deviceDetails.adblock).toBe("boolean");
      expect(typeof deviceDetails.private).toBe("boolean");
      expect(typeof deviceDetails.java_enabled).toBe("boolean");
      expect(typeof deviceDetails.touch_support).toBe("boolean");
      expect(typeof deviceDetails.cookie_enabled).toBe("boolean");
      expect(typeof deviceDetails.flash_enabled).toBe("boolean");
      expect(typeof deviceDetails.webrtc_activated).toBe("boolean");
    });
  });

  describe("Array Structure Validation", () => {
    it("should validate applied_rules array structure", async () => {
      const responseWithRules = {
        success: true,
        error: {},
        data: {
          fraud_score: 45,
          state: "REVIEW",
          id: "test123",
          applied_rules: [
            { id: "RULE_001", name: "Rule 1", operation: "+", score: 15 },
            { id: "RULE_002", name: "Rule 2", operation: "-", score: -5 },
            { id: "RULE_003", name: "Rule 3", operation: null, score: 10 },
          ],
        },
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => responseWithRules,
      } as Response);

      const response = await seon.fraud({ email: "test@example.com" });
      const rules = response.data!.applied_rules;

      expect(Array.isArray(rules)).toBe(true);
      expect(rules).toHaveLength(3);

      rules.forEach((rule) => {
        expect(typeof rule.id).toBe("string");
        expect(typeof rule.name).toBe("string");
        expect(typeof rule.score).toBe("number");
        expect(
          rule.operation === null || typeof rule.operation === "string",
        ).toBe(true);
      });
    });

    it("should validate font_list array in device details", async () => {
      const responseWithFonts = {
        success: true,
        error: {},
        data: {
          fraud_score: 30,
          state: "APPROVE",
          id: "test123",
          device_details: {
            font_list: ["Arial", "Times New Roman", "Helvetica", "Georgia"],
            font_count: 4,
          },
        },
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => responseWithFonts,
      } as Response);

      const response = await seon.fraud({ email: "test@example.com" });
      const fontList = response.data!.device_details.font_list;

      expect(Array.isArray(fontList)).toBe(true);
      expect(fontList).toHaveLength(4);
      fontList.forEach((font) => {
        expect(typeof font).toBe("string");
      });
    });
  });

  describe("Nested Object Validation", () => {
    it("should validate device_location nested structure", async () => {
      const responseWithLocation = {
        success: true,
        error: {},
        data: {
          fraud_score: 35,
          state: "APPROVE",
          id: "test123",
          device_details: {
            device_location: {
              zip: "90210",
              city: "Beverly Hills",
              region: "CA",
              status: "SUCCESS",
              accuracy: 50,
              latitude: 34.0901,
              longitude: -118.4065,
              country_code: "US",
            },
          },
        },
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => responseWithLocation,
      } as Response);

      const response = await seon.fraud({ email: "test@example.com" });
      const location = response.data!.device_details.device_location;

      expect(typeof location.zip).toBe("string");
      expect(typeof location.city).toBe("string");
      expect(typeof location.region).toBe("string");
      expect(typeof location.status).toBe("string");
      expect(typeof location.accuracy).toBe("number");
      expect(typeof location.latitude).toBe("number");
      expect(typeof location.longitude).toBe("number");
      expect(typeof location.country_code).toBe("string");
    });

    it("should validate geolocation_details structure", async () => {
      const responseWithGeo = {
        success: true,
        error: {},
        data: {
          fraud_score: 40,
          state: "REVIEW",
          id: "test123",
          geolocation_details: {
            user_billing_distance: 12.5,
            user_shipping_distance: 300.7,
            billing_shipping_distance: 295.2,
            ip_user_distance: 15.3,
            ip_billing_distance: 10.8,
            ip_shipping_distance: 310.5,
          },
        },
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => responseWithGeo,
      } as Response);

      const response = await seon.fraud({ email: "test@example.com" });
      const geo = response.data!.geolocation_details;

      expect(typeof geo.user_billing_distance).toBe("number");
      expect(typeof geo.user_shipping_distance).toBe("number");
      expect(typeof geo.billing_shipping_distance).toBe("number");
      expect(typeof geo.ip_user_distance).toBe("number");
      expect(typeof geo.ip_billing_distance).toBe("number");
      expect(typeof geo.ip_shipping_distance).toBe("number");
    });
  });

  describe("TypeScript Type Safety", () => {
    it("should maintain type safety for FraudApiResponse", async () => {
      const mockResponse: FraudApiResponse = {
        success: true,
        error: {},
        data: {
          id: "type-safe-123",
          state: "APPROVE",
          fraud_score: 25,
          version: "v2",
          applied_rules: [],
          bin_details: {
            card_bin: "414141",
            bin_bank: "Test Bank",
            bin_card: "VISA",
            bin_type: "CREDIT",
            bin_level: "STANDARD",
            bin_country: "US",
            bin_country_code: "US",
            bin_website: "https://bank.com",
            bin_phone: "+1-800-555-0123",
            bin_valid: true,
            card_issuer: "VISA",
          },
          device_details: createMockDeviceDetails(),
          calculation_time: 1000,
          seon_id: 123,
          ip_details: createMockIpDetails(),
          email_details: createMockEmailDetails(),
          phone_details: createMockPhoneDetails(),
          geolocation_details: createMockGeolocationDetails(),
          aml_details: null,
        },
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const response = await seon.fraud({ email: "test@example.com" });

      // TypeScript should enforce these types
      expect(response).toEqual(mockResponse);
      expect(response.success).toBe(true);
      expect(response.data?.fraud_score).toBe(25);
    });
  });
});
