# Team Directory Specification

## Purpose
Defines the team directory experience, including member cards, role filtering, and empty states.

## Requirements

### Requirement: Team member cards
The system SHALL display team members as cards containing name, role, one-line introduction, and avatar.

#### Scenario: View team member
- **WHEN** a user opens `/app/team`
- **THEN** the system displays each member with their name, role, introduction, and avatar

#### Scenario: Missing avatar fallback
- **WHEN** a team member does not have a custom avatar
- **THEN** the system displays a consistent generated or initial-based avatar fallback

### Requirement: Role filtering
The system SHALL allow users to filter team members by role.

#### Scenario: Filter by role
- **WHEN** a user selects a role filter
- **THEN** the system displays only members whose role matches the selected filter

#### Scenario: Clear role filter
- **WHEN** a user clears the selected role filter
- **THEN** the system displays all team members

### Requirement: Empty team state
The system SHALL provide a clear empty state when no team members match the current filter.

#### Scenario: No matching members
- **WHEN** a selected role filter has no matching members
- **THEN** the system displays an empty state without removing the filter controls
