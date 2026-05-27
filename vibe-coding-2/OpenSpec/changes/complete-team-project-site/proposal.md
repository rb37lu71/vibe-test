## Why

The current React app is partially implemented, but it does not yet match the team collaboration product described in the project instructions. This change establishes the product contract for a focused internal team workspace with dashboard, task management, team directory, and monthly calendar workflows.

## What Changes

- Add an authenticated-app-style workspace shell with route-level pages for Dashboard, Tasks, Team, and Calendar.
- Add task management for creating, editing, deleting, assigning, filtering, and moving work through `todo`, `in-progress`, and `done`.
- Add a team directory with member cards and role filtering.
- Add a monthly calendar view with day selection and event create/edit/delete flows.
- Persist app state locally so demo data and user changes survive page reloads.
- Align visual treatment with `DESIGN.md` Apple-style tokens, route layout, and component structure from `AGENTS.md`.

## Capabilities

### New Capabilities
- `dashboard-overview`: Covers the main workspace summary, upcoming work, team activity highlights, and navigation into deeper workflows.
- `task-management`: Covers task CRUD, status management, assignee and due date metadata, and board/list presentation.
- `team-directory`: Covers team member presentation, avatar metadata, role filtering, and empty states.
- `calendar-scheduling`: Covers monthly calendar navigation, date selection, and event CRUD for scheduled team work.

### Modified Capabilities
- None.

## Impact

- Affected app areas: `src/App.jsx`, `src/components/`, `src/pages/`, `src/context/`, `src/hooks/`, `src/styles/`, and `src/data/`.
- Routing will use React Router v6 routes for `/app/dashboard`, `/app/tasks`, `/app/team`, and `/app/calendar`.
- State will remain client-side using React Context plus `useReducer`, backed by local storage where appropriate.
- No backend API or external service integration is introduced by this change.
