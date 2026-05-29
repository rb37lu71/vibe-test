## ADDED Requirements

### Requirement: Task creation
The system SHALL allow users to create tasks with title, status, assignee, and due date fields.

#### Scenario: Create valid task
- **WHEN** a user submits a task form with required fields
- **THEN** the system adds the task to the workspace and persists it across reloads

#### Scenario: Reject incomplete task
- **WHEN** a user submits a task form without a required title or due date
- **THEN** the system prevents creation and communicates the missing field

### Requirement: Task editing
The system SHALL allow users to edit existing task title, assignee, due date, and non-final status metadata.

#### Scenario: Update task metadata
- **WHEN** a user saves changes to an existing task
- **THEN** the system updates the displayed task and persists the new values across reloads

### Requirement: Task deletion
The system SHALL allow users to delete tasks from the workspace.

#### Scenario: Delete task
- **WHEN** a user confirms deletion of a task
- **THEN** the system removes the task from all task views and dashboard summaries

### Requirement: Task status workflow
The system SHALL represent task status as exactly `todo`, `in-progress`, or `done`.

#### Scenario: Move task through workflow
- **WHEN** a user changes a task status to another valid status
- **THEN** the system moves the task to the matching status group or updates the list status indicator

#### Scenario: Complete task
- **WHEN** a user changes a task status to `done`
- **THEN** the system records completion time and includes the task in done counts

### Requirement: Task views
The system SHALL provide a task management page that supports a kanban board or list view for scanning tasks.

#### Scenario: View task board
- **WHEN** a user opens `/app/tasks`
- **THEN** the system displays tasks grouped or filterable by workflow status

#### Scenario: Filter by assignee
- **WHEN** a user selects an assignee filter
- **THEN** the system displays only tasks assigned to that member
