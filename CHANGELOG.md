# Changelog

All notable changes to this project will be documented in this file.

## [2.1.0] - 2026-05-28

### Added

- `FraudApiResponse.data` now includes the remaining top-level fields documented by SEON: `blackbox_score`, `rule_category_details`, `aml_bank_screening_details`, `string_analyses`, `ekyc_result`. The inner shapes of `rule_category_details`, `aml_bank_screening_details`, and `string_analyses` are not documented in the SEON API reference, so they are typed as permissive index signatures — consumers can narrow as needed.

### Changed

- `FraudApiResponse.data.aml_details` and `FraudApiResponse.data.geolocation_details` are now optional. SEON only returns these top-level keys when the corresponding field name is included in `config.response_fields`; otherwise the key is absent from the response. The previous typing implied they were always present, which was misleading. Consumers that read these fields without a null-check may need to add one.

## [2.0.0] - 2026-05-28

### Changed

- **BREAKING:** `response_fields` has moved from `config.device.response_fields` to `config.response_fields`. SEON's docs only document the field at the top level of `config`; the previous nesting was a type bug. Consumers setting `config.device.response_fields` must move the value up to `config.response_fields`.

## [1.4.1] - 2024-09-24

### Changed

- Updated all dependencies to latest versions
- React updated to 19.1.1
- TypeScript updated to 5.9.2
- ESLint updated to 9.36.0
- Jest updated to 30.1.3
- All other dev dependencies updated to latest versions

### Fixed

- Ensured 100% type safety with latest TypeScript version
- Maintained 97.05% test coverage with 185 passing tests
- All linting and formatting checks pass

## [1.2.0] - 2024-12-18

### Added

- Pre-commit hooks with ESLint and Prettier
- TypeScript type definitions for all API responses
- Type-safe mock utilities for testing
- Comprehensive test coverage (185+ tests)

### Changed

- Made Seon class properties public readonly
- Replaced `any` types with specific interfaces
- Improved TypeDoc documentation

### Fixed

- Git hooks activation issues
- Async logging warnings in tests
- TypeScript compilation errors
- Documentation warnings

## [1.1.0] - 2024-12-01

### Added

- TypeScript SDK implementation
- Fraud detection API integration
- HMAC signature utilities
- Jest test suite

## [1.0.0] - 2024-11-15

### Added

- Initial project setup
- Basic package structure
