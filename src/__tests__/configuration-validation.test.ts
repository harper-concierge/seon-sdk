/**
 * @fileoverview Configuration Validation Tests
 * @description Test suite for validating SEON API configuration options,
 * module settings, and parameter combinations.
 */

import { Seon, FraudApiRequest, APIRequestConfig } from "../index";

// Mock fetch globally
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("Configuration Validation", () => {
  let seon: Seon;

  beforeEach(() => {
    jest.clearAllMocks();
    seon = new Seon("test-api-key");

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        error: {},
        data: { fraud_score: 25, state: "APPROVE" },
      }),
    } as Response);
  });

  describe("Email API Configuration", () => {
    it("should handle basic email API configuration", async () => {
      const request: FraudApiRequest = {
        email: "test@example.com",
        config: {
          email_api: true,
          email: {
            version: "v2",
          },
        },
      };

      await seon.fraud(request);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: JSON.stringify(request),
        }),
      );
    });

    it("should handle advanced email configuration", async () => {
      const emailConfig: APIRequestConfig = {
        email_api: true,
        email: {
          version: "v2",
          timeout: 5000,
          priority_timeout: 2000,
          priority_sites: "gmail.com,yahoo.com,outlook.com",
          priority_accuracy: 95,
          include: "flags,history,breach_details,account_details",
          flags_timeframe_days: 90,
          data_enrichment_mode: "detailed",
        },
      };

      const request: FraudApiRequest = {
        email: "advanced@example.com",
        config: emailConfig,
      };

      await seon.fraud(request);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining("detailed"),
        }),
      );
    });

    it("should handle high-volume email mode", async () => {
      const highVolumeConfig: APIRequestConfig = {
        email_api: true,
        email: {
          version: "v2",
          data_enrichment_mode: "high-volume",
          timeout: 1000,
          include: "flags",
        },
      };

      await seon.fraud({
        email: "volume@example.com",
        config: highVolumeConfig,
      });

      expect(mockFetch).toHaveBeenCalled();
    });
  });

  describe("Phone API Configuration", () => {
    it("should handle basic phone API configuration", async () => {
      const phoneConfig: APIRequestConfig = {
        phone_api: true,
        phone: {
          version: "v1",
        },
      };

      await seon.fraud({
        phone_number: "+1234567890",
        config: phoneConfig,
      });

      expect(mockFetch).toHaveBeenCalled();
    });

    it("should handle comprehensive phone configuration", async () => {
      const comprehensivePhoneConfig: APIRequestConfig = {
        phone_api: true,
        phone: {
          version: "v1",
          timeout: 4000,
          priority_timeout: 1500,
          priority_sites: "carrier_database,social_networks",
          priority_accuracy: 85,
          include: "hlr_details,cnam_lookup,account_details",
          flags_timeframe_days: 60,
          exclude: "photo,last_seen,private_info",
          data_enrichment_mode: "detailed",
        },
      };

      await seon.fraud({
        phone_number: "+1987654321",
        config: comprehensivePhoneConfig,
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining("hlr_details"),
        }),
      );
    });

    it("should handle privacy-focused phone configuration", async () => {
      const privacyConfig: APIRequestConfig = {
        phone_api: true,
        phone: {
          version: "v1",
          exclude: "photo,last_seen,personal_info,social_profiles",
          include: "hlr_details",
          data_enrichment_mode: "high-volume",
        },
      };

      await seon.fraud({
        phone_number: "+1555000123",
        config: privacyConfig,
      });

      expect(mockFetch).toHaveBeenCalled();
    });
  });

  describe("IP API Configuration", () => {
    it("should handle basic IP configuration", async () => {
      const ipConfig: APIRequestConfig = {
        ip_api: true,
        ip: {
          version: "v1",
        },
      };

      await seon.fraud({
        ip: "192.168.1.1",
        config: ipConfig,
      });

      expect(mockFetch).toHaveBeenCalled();
    });

    it("should handle detailed IP analysis", async () => {
      const detailedIpConfig: APIRequestConfig = {
        ip_api: true,
        ip: {
          version: "v1",
          include: "flags,history,geolocation,isp_details",
          flags_timeframe_days: 180,
        },
      };

      await seon.fraud({
        ip: "203.0.113.1",
        config: detailedIpConfig,
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining("flags_timeframe_days"),
        }),
      );
    });

    it("should handle recent flags analysis", async () => {
      const recentFlagsConfig: APIRequestConfig = {
        ip_api: true,
        ip: {
          version: "v1",
          include: "flags,recent_activity",
          flags_timeframe_days: 7,
        },
      };

      await seon.fraud({
        ip: "198.51.100.1",
        config: recentFlagsConfig,
      });

      expect(mockFetch).toHaveBeenCalled();
    });
  });

  describe("AML API Configuration", () => {
    it("should handle basic AML configuration", async () => {
      const amlConfig: APIRequestConfig = {
        aml_api: true,
        aml: {
          version: "v1",
        },
      };

      await seon.fraud({
        user_fullname: "John Doe",
        config: amlConfig,
      });

      expect(mockFetch).toHaveBeenCalled();
    });

    it("should handle comprehensive AML screening", async () => {
      const comprehensiveAMLConfig: APIRequestConfig = {
        aml_api: true,
        aml: {
          version: "v1",
          monitoring_required: true,
          monitoring_schedule: "MONTHLY",
          fuzzy_enabled: true,
          fuzzy_config: {
            threshold: 0.8,
            algorithm: "advanced",
          },
          phonetic_search_enabled: true,
          edit_distance_enabled: true,
          scoring: {
            result_limit: 25,
            score_threshold: 0.75,
          },
          timeout: 10000,
          sources: {
            sanction_enabled: true,
            pep_enabled: true,
            watchlist_enabled: true,
            crimelist_enabled: true,
            adversemedia_enabled: true,
          },
        },
      };

      await seon.fraud({
        user_fullname: "Jane Smith",
        user_dob: "1985-06-15",
        config: comprehensiveAMLConfig,
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining("monitoring_schedule"),
        }),
      );
    });

    it("should handle different monitoring schedules", async () => {
      const schedules = [
        "ON_CHANGE",
        "DAILY",
        "WEEKLY",
        "MONTHLY",
        "QUARTERLY",
        "TWICE_A_YEAR",
        "EVERY_YEAR",
      ];

      for (const schedule of schedules) {
        const config: APIRequestConfig = {
          aml_api: true,
          aml: {
            version: "v1",
            monitoring_required: true,
            monitoring_schedule: schedule as any,
          },
        };

        await seon.fraud({
          user_fullname: "Test User",
          config,
        });
      }

      expect(mockFetch).toHaveBeenCalledTimes(schedules.length);
    });

    it("should handle selective source configuration", async () => {
      const selectiveConfig: APIRequestConfig = {
        aml_api: true,
        aml: {
          version: "v1",
          sources: {
            sanction_enabled: true,
            pep_enabled: false,
            watchlist_enabled: true,
            crimelist_enabled: false,
            adversemedia_enabled: true,
          },
        },
      };

      await seon.fraud({
        user_fullname: "Selective Screening",
        config: selectiveConfig,
      });

      expect(mockFetch).toHaveBeenCalled();
    });
  });

  describe("Device Fingerprinting Configuration", () => {
    it("should handle basic device configuration", async () => {
      const deviceConfig: APIRequestConfig = {
        device_fingerprinting: true,
        device: {
          response_fields: "id,state,fraud_score",
        },
      };

      await seon.fraud({
        session_id: "sess_123",
        config: deviceConfig,
      });

      expect(mockFetch).toHaveBeenCalled();
    });

    it("should handle extended device configuration", async () => {
      const extendedDeviceConfig: APIRequestConfig = {
        device_fingerprinting: true,
        device: {
          include: "device_location,extended_device_location,browser_details",
          response_fields: "id,state,fraud_score,device_hash,session_id",
        },
      };

      await seon.fraud({
        session_id: "sess_456",
        device_id: "dev_789",
        config: extendedDeviceConfig,
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining("extended_device_location"),
        }),
      );
    });

    it("should handle minimal device configuration", async () => {
      const minimalConfig: APIRequestConfig = {
        device_fingerprinting: true,
        device: {
          response_fields: "fraud_score",
        },
      };

      await seon.fraud({
        session_id: "sess_minimal",
        config: minimalConfig,
      });

      expect(mockFetch).toHaveBeenCalled();
    });
  });

  describe("Combined Module Configurations", () => {
    it("should handle all modules enabled", async () => {
      const allModulesConfig: APIRequestConfig = {
        email_api: true,
        phone_api: true,
        ip_api: true,
        aml_api: true,
        device_fingerprinting: true,
        email: {
          version: "v2",
          include: "breach_details",
        },
        phone: {
          version: "v1",
          include: "hlr_details",
        },
        ip: {
          version: "v1",
          include: "flags",
        },
        aml: {
          version: "v1",
          sources: {
            sanction_enabled: true,
            pep_enabled: true,
          },
        },
        device: {
          include: "device_location",
        },
      };

      await seon.fraud({
        email: "complete@example.com",
        phone_number: "+1234567890",
        ip: "192.168.1.1",
        user_fullname: "Complete User",
        session_id: "sess_complete",
        config: allModulesConfig,
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining("email_api"),
        }),
      );
    });

    it("should handle selective module combination", async () => {
      const selectiveConfig: APIRequestConfig = {
        email_api: true,
        ip_api: true,
        device_fingerprinting: false,
        phone_api: false,
        aml_api: false,
        email: {
          version: "v2",
          data_enrichment_mode: "high-volume",
        },
        ip: {
          version: "v1",
          flags_timeframe_days: 30,
        },
      };

      await seon.fraud({
        email: "selective@example.com",
        ip: "203.0.113.100",
        config: selectiveConfig,
      });

      expect(mockFetch).toHaveBeenCalled();
    });

    it("should handle gaming-specific configuration", async () => {
      const gamingConfig: APIRequestConfig = {
        email_api: true,
        phone_api: true,
        aml_api: true,
        device_fingerprinting: true,
        email: {
          version: "v2",
          include: "account_details,breach_details",
        },
        phone: {
          version: "v1",
          include: "account_details",
        },
        aml: {
          version: "v1",
          monitoring_required: true,
          sources: {
            sanction_enabled: true,
            pep_enabled: true,
            watchlist_enabled: true,
          },
        },
      };

      await seon.fraud({
        action_type: "register",
        email: "player@casino.com",
        phone_number: "+1555123456",
        user_fullname: "Gaming Player",
        user_dob: "1990-01-01",
        config: gamingConfig,
      });

      expect(mockFetch).toHaveBeenCalled();
    });

    it("should handle financial services configuration", async () => {
      const financialConfig: APIRequestConfig = {
        email_api: true,
        aml_api: true,
        ip_api: true,
        email: {
          version: "v2",
          data_enrichment_mode: "detailed",
          include: "breach_details,account_details",
        },
        aml: {
          version: "v1",
          monitoring_required: true,
          monitoring_schedule: "QUARTERLY",
          fuzzy_enabled: true,
          phonetic_search_enabled: true,
          sources: {
            sanction_enabled: true,
            pep_enabled: true,
            crimelist_enabled: true,
            adversemedia_enabled: true,
          },
        },
        ip: {
          version: "v1",
          include: "flags,history",
          flags_timeframe_days: 365,
        },
      };

      await seon.fraud({
        action_type: "kyc_verification",
        email: "customer@bank.com",
        user_fullname: "Bank Customer",
        user_photoid_number: "ID123456789",
        config: financialConfig,
      });

      expect(mockFetch).toHaveBeenCalled();
    });
  });

  describe("Configuration Edge Cases", () => {
    it("should handle empty configuration", async () => {
      const emptyConfig: APIRequestConfig = {};

      await seon.fraud({
        email: "empty-config@example.com",
        config: emptyConfig,
      });

      expect(mockFetch).toHaveBeenCalled();
    });

    it("should handle configuration with only flags", async () => {
      const flagsOnlyConfig: APIRequestConfig = {
        email_api: true,
        phone_api: false,
        ip_api: false,
        aml_api: false,
        device_fingerprinting: false,
      };

      await seon.fraud({
        email: "flags-only@example.com",
        config: flagsOnlyConfig,
      });

      expect(mockFetch).toHaveBeenCalled();
    });

    it("should handle partial module configurations", async () => {
      const partialConfig: APIRequestConfig = {
        email_api: true,
        email: {
          version: "v2",
          // Missing other email config options
        },
        aml_api: true,
        aml: {
          version: "v1",
          sources: {
            sanction_enabled: true,
            // Missing other source options
          },
        },
      };

      await seon.fraud({
        email: "partial@example.com",
        user_fullname: "Partial Config User",
        config: partialConfig,
      });

      expect(mockFetch).toHaveBeenCalled();
    });
  });
});
