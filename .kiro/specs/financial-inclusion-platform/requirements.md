# Requirements Document

## Introduction

This document outlines the requirements for SEED, a desktop-based web application designed to provide small loans ranging from $50 to $5000 and financial services to low-income individuals (investees) and investors. The platform focuses on accessibility, visual representation of financial data, and multi-language support to serve communities with limited financial literacy. SEED emphasizes professional design using Tailwind CSS and JavaScript libraries while maintaining simplicity for users with varying technical backgrounds, helping users grow their financial opportunities from small beginnings.

## Requirements

### Requirement 1: Authentication System with Currency Selection

**User Story:** As a user, I want to log in using my phone number with OTP verification and select my preferred currency during login, so that I can securely access the platform with my financial preferences set from the beginning.

#### Acceptance Criteria

1. WHEN a user visits the login page THEN the system SHALL display a phone number input field, role selection (Investor/Investee), and currency selection dialog
2. WHEN a user enters a phone number and requests OTP THEN the system SHALL accept any phone number and always work with mocked OTP "908978"
3. WHEN a user enters the correct OTP "908978" THEN the system SHALL authenticate the user and store their selected currency preference
4. WHEN a user successfully logs in THEN the system SHALL display a personalized welcome message for 1 second using mock motivational data
5. WHEN the welcome animation completes THEN the system SHALL redirect to the appropriate dashboard based on user role with currency preference applied
6. WHEN a user selects a currency during login THEN the system SHALL store the preference in SessionStorage for immediate use across the platform

### Requirement 2: Multi-Language and Currency Support System

**User Story:** As an investee, I want to select my preferred language and currency and have them persist across sessions, so that I can use the application in my native language with familiar currency formatting.

#### Acceptance Criteria

1. WHEN an investee first logs in THEN the system SHALL display a language and currency selection page with multiple options
2. WHEN a user selects language and currency THEN the system SHALL store both preferences in SessionStorage and set them as defaults
3. WHEN a user is on any page THEN the system SHALL display language and currency dropdowns in the header for easy switching
4. WHEN a user changes language THEN the system SHALL use Google Translate API to translate all page content
5. WHEN a user changes currency THEN the system SHALL update all financial displays to show amounts in the selected currency
6. WHEN a user returns to the application THEN the system SHALL load their previously selected language and currency from SessionStorage

### Requirement 3: Financial Data Visualization Dashboard

**User Story:** As an investee with limited financial knowledge, I want to see my financial data presented through clear graphics and visual representations, so that I can easily understand my financial situation.

#### Acceptance Criteria

1. WHEN an investee accesses the dashboard THEN the system SHALL display income and expenses using charts, graphs, and visual indicators including pie charts for income categories
2. WHEN displaying financial data THEN the system SHALL use terminology and examples relevant to low-income professions (farmers, mechanics, craftsmen)
3. WHEN showing income data THEN the system SHALL provide pie chart visualization showing different income sources and categories
4. WHEN showing financial metrics THEN the system SHALL provide graphical representations with minimal text and clear visual cues
5. WHEN a user wants to add financial data THEN the system SHALL provide options to upload Excel files, photos, or manually enter structured data
6. WHEN financial data is uploaded THEN the system SHALL display confirmation and integrate the data into visual representations including updated pie charts

### Requirement 4: Credit Assessment and Loan Eligibility

**User Story:** As an investee, I want to see my credit score and loan eligibility with audio explanations, so that I can understand my borrowing capacity and financial standing within SEED's loan range of $50 to $5000.

#### Acceptance Criteria

1. WHEN an investee views their profile THEN the system SHALL display a calculated credit score using a mock algorithm
2. WHEN credit score is displayed THEN the system SHALL show eligible loan amount between $50 and $5000 with recommended tenure options
3. WHEN a user clicks the speaker icon THEN the system SHALL provide audio overview of credit score, loan eligibility, and tenure recommendations
4. WHEN displaying credit information THEN the system SHALL use visual indicators (colors, progress bars, icons) to represent score ranges
5. WHEN loan eligibility is shown THEN the system SHALL present loan amounts within the $50-$5000 range in simple, accessible language with visual aids

### Requirement 5: Community Testimonials Section

**User Story:** As an investee, I want to read inspiring testimonials from people in similar financial situations, so that I feel motivated and connected to a supportive community.

#### Acceptance Criteria

1. WHEN a user accesses the testimonials section THEN the system SHALL display emotional success stories from low-income community members
2. WHEN testimonials are shown THEN the system SHALL include diverse stories from various professions (farmers, mechanics, craftsmen, etc.)
3. WHEN displaying testimonials THEN the system SHALL use professional styling with photos, quotes, and impact metrics
4. WHEN a user reads testimonials THEN the system SHALL present them in an engaging, visually appealing format
5. WHEN testimonials load THEN the system SHALL ensure they are available in the user's selected language

### Requirement 6: Professional Design and User Experience

**User Story:** As any user, I want the application to have a professional appearance and smooth user experience, so that I trust the platform and can navigate it easily.

#### Acceptance Criteria

1. WHEN any page loads THEN the system SHALL use Tailwind CSS for consistent, professional styling
2. WHEN users interact with the interface THEN the system SHALL provide smooth transitions and responsive design
3. WHEN displaying content THEN the system SHALL use a cohesive color scheme and professional typography
4. WHEN users navigate THEN the system SHALL provide clear visual hierarchy and intuitive user interface elements
5. WHEN the application runs THEN the system SHALL function as a single-machine desktop web application without requiring backend services for core functionality