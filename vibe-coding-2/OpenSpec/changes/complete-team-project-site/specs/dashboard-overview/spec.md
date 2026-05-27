## ADDED Requirements

### Requirement: Workspace summary
The system SHALL provide a Dashboard page that summarizes team work across tasks, members, and calendar events.

#### Scenario: Dashboard route opens
- **WHEN** a user visits `/app/dashboard`
- **THEN** the system displays task status counts, upcoming due items, upcoming calendar events, and team activity highlights

#### Scenario: Empty workspace summary
- **WHEN** there are no tasks, team members, or events
- **THEN** the system displays empty states that guide the user to create or review the relevant workspace records

### Requirement: Dashboard navigation
The system SHALL allow users to navigate from Dashboard summary areas to the detailed Tasks, Team, and Calendar pages.

#### Scenario: Navigate to detail page
- **WHEN** a user activates a Dashboard summary action for tasks, team, or calendar
- **THEN** the system navigates to the corresponding `/app/tasks`, `/app/team`, or `/app/calendar` route

### Requirement: Responsive app shell
The system SHALL render the Dashboard inside the shared workspace shell with consistent navigation and responsive layout.

#### Scenario: Mobile dashboard
- **WHEN** the Dashboard is viewed on a narrow viewport
- **THEN** the system stacks summary sections without overlapping text, controls, or navigation
