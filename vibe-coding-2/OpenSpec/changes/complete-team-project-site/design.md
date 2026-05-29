## Context

The app is a Vite React single page application with route-based pages, Context providers, CSS token files, and local-storage-backed reducers already present. Existing pages cover a board, minutes, leaderboard, landing, and team views, while the project instructions define a team collaboration tool centered on Dashboard, Tasks, Team, and Calendar.

The implementation should keep the client-only architecture, reuse existing Context/useReducer patterns, and align route names, components, and styling tokens with the project structure described in `AGENTS.md`. The installed package versions are newer than the documented baseline, so the implementation should use APIs compatible with the current dependencies unless a separate dependency-alignment change is requested.

## Goals / Non-Goals

**Goals:**
- Provide a coherent `/app/*` workspace with Dashboard, Tasks, Team, and Calendar as first-class pages.
- Keep task, member, and calendar event state in small, domain-specific Context providers backed by local storage.
- Reuse existing components and data where possible while renaming or adding components to match the target product surface.
- Apply Apple-style visual tokens from `DESIGN.md` through CSS variables instead of inline color literals.
- Preserve a buildable, demo-ready app with predictable seeded data when local storage is empty.

**Non-Goals:**
- Add authentication, backend APIs, realtime collaboration, or remote persistence.
- Introduce drag-and-drop, date picker, state-management, or calendar libraries.
- Rewrite the landing page unless routing or navigation consistency requires small adjustments.
- Add complex permission roles or admin-only behavior.

## Decisions

1. Use one app shell for all workspace routes.
   - Decision: route `/app` through a shared layout and expose `/app/dashboard`, `/app/tasks`, `/app/team`, and `/app/calendar`.
   - Rationale: the product is a single workspace, so common navigation, spacing, and responsive behavior should live in one layout.
   - Alternative considered: keep existing `/app/board`, `/app/minutes`, and `/app/leaderboard` as primary routes. This would preserve current code but keep the app misaligned with the requested product.

2. Keep domain state split by Context provider.
   - Decision: maintain separate providers for tasks, team members, and calendar events, each with its own reducer and local storage key.
   - Rationale: the app has small domains and no backend; split providers avoid a broad global store and match the documented convention.
   - Alternative considered: consolidate all state into one reducer. This would simplify provider wiring but make unrelated updates easier to couple.

3. Normalize demo data around stable IDs.
   - Decision: seed members, tasks, and calendar events with stable IDs and cross-reference assignees by `member.id`.
   - Rationale: stable demo data keeps the dashboard, filters, and calendar deterministic across reloads and tests.
   - Alternative considered: generate all IDs at runtime. This is useful for new user-created records but makes fixtures harder to reason about.

4. Implement calendar logic locally.
   - Decision: build month-grid, date selection, and event grouping with small date utilities rather than adding a calendar dependency.
   - Rationale: the required calendar is a simple monthly view and event list; custom utilities keep bundle and API surface small.
   - Alternative considered: adopt a full calendar package. That would speed advanced scheduling but add styling and dependency complexity beyond the MVP.

5. Treat current Tasks board as the foundation for task management.
   - Decision: adapt or rename existing board/task components into the documented `Tasks` page and add list/board mode only if the existing UI does not already satisfy the workflow.
   - Rationale: the code already has TaskContext, TaskCard, and TaskForm pieces that can be reused.
   - Alternative considered: rebuild task management from scratch. That would produce cleaner names but risks discarding working behavior.

## Risks / Trade-offs

- React Router version mismatch -> Use installed APIs that remain compatible with route object/JSX patterns and avoid dependency changes in this proposal.
- Local storage schema drift -> Add defensive parsing and seed only when storage is empty.
- Calendar date math edge cases -> Keep date utilities pure and cover month boundaries, today highlighting, and selected day filtering.
- Route renaming may break old links -> Redirect old `/app/board` to `/app/tasks` where practical.
- Design-token compliance can regress during UI work -> centralize colors and spacing in `src/styles/tokens.css` and scan for inline hex values before finishing.

## Migration Plan

1. Add or rename pages and routes while keeping temporary redirects for replaced routes.
2. Add calendar event data and provider, then wire Dashboard to consume tasks, members, and events.
3. Update navigation labels and paths to the target IA.
4. Verify `npm run build` and manually exercise create/edit/delete flows in the browser.

Rollback is straightforward because this is client-only: restore the previous route map and remove the new Calendar provider/page if implementation needs to be backed out.

## Open Questions

- Should the previous Minutes and Leaderboard features remain as secondary routes after the core four pages land?
- Should completed tasks remain immutable, as the current TaskContext comments imply, or should editing be allowed for all statuses?
