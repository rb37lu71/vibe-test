## 1. Routing and App Shell

- [x] 1.1 Update the `/app` route map to expose Dashboard, Tasks, Team, and Calendar pages.
- [x] 1.2 Update shared workspace navigation labels, active states, and redirects for replaced routes.
- [x] 1.3 Ensure the shared layout remains responsive across desktop and mobile widths.

## 2. Data and State

- [x] 2.1 Normalize member data to include name, role, one-line introduction, avatar metadata, points, and completed count.
- [x] 2.2 Normalize task data to include title, status, assignee, due date, created date, and completion date.
- [x] 2.3 Add calendar event data with title, date, optional time, description, and optional assignee.
- [x] 2.4 Add a Calendar context and reducer with create, update, delete, and local storage persistence.
- [x] 2.5 Seed demo data when local storage is empty without overwriting existing user data.

## 3. Task Management

- [x] 3.1 Implement the Tasks page using existing task card, task form, filter, and empty-state patterns.
- [x] 3.2 Add task create, edit, delete, assignee, due date, and status update flows.
- [x] 3.3 Add task grouping or filtering for `todo`, `in-progress`, and `done`.
- [x] 3.4 Add assignee filtering and verify dashboard counts update after task changes.

## 4. Team Directory

- [x] 4.1 Update member cards to show avatar, name, role, and one-line introduction.
- [x] 4.2 Add role filter controls with all-members and no-match empty states.
- [x] 4.3 Ensure team member data is reused consistently by task assignee and calendar event displays.

## 5. Calendar Scheduling

- [x] 5.1 Implement month grid generation with weekday labels, today highlighting, selected date state, and month navigation.
- [x] 5.2 Display event indicators in calendar cells and a selected-date event list.
- [x] 5.3 Add event create, edit, and delete flows with local storage persistence.
- [x] 5.4 Update dashboard summaries when calendar events are created, edited, or deleted.

## 6. Dashboard Overview

- [x] 6.1 Build Dashboard summary sections for task status counts, upcoming due tasks, upcoming events, and team activity.
- [x] 6.2 Add navigation actions from Dashboard summaries to Tasks, Team, and Calendar detail routes.
- [x] 6.3 Add empty states for missing tasks, members, or events.

## 7. Styling and Verification

- [x] 7.1 Move new colors, radii, and spacing through CSS variables in `src/styles/tokens.css`.
- [x] 7.2 Scan changed UI files for inline hex colors and replace them with token references.
- [x] 7.3 Run `npm run build` and fix any build errors.
- [ ] 7.4 Manually verify task CRUD, role filtering, calendar event CRUD, dashboard navigation, and mobile layout.
