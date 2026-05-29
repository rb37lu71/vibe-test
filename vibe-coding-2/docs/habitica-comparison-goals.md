# Habitica Comparison Goals

Reference: https://habitica.com/static/features

## Functional Gaps

1. Habitica has habits, dailies, to-dos, rewards, avatar equipment, parties, quests, challenges, reminders, and customization. This app already has tasks, team, calendar, XP, HP, reliability, raid, and gold, but it needs a clearer ERP reward loop.
2. Habitica rewards are personal and playful. For enterprise use, rewards should become HR-friendly benefits such as half-day leave, monthly leave, focus blocks, and team perks.
3. Habitica avatars make progress visible. This app needs role-based characters so team members immediately read as frontend, backend, design, or PM classes.
4. Habitica separates task types. For this MVP, the dashboard should stay simpler: show only the signed-in member's active work, current status, and next action.

## Goal 1: Simplify The Dashboard

Related requirement: A member shall see their own work first.

Done when:
- Dashboard headline is about the member's quests, not a dense team overview.
- The primary CTA opens Tasks.
- The secondary CTA opens Shop.
- Raid status remains visible but compact.

Excluded:
- Advanced analytics, full team leaderboard, and multi-raid switching.

## Goal 2: Add Role Characters

Related requirement: Members shall have a fantasy class visual mapped to their workplace role.

Done when:
- Frontend, backend, UI/UX, and PM members display distinct generated portraits.
- Team cards and dashboard party identity use the same class asset system.

Excluded:
- Equipment customization, pets, mounts, and animation.

## Goal 3: Add ERP Reward Shop

Related requirement: Members shall spend earned Gold on workplace rewards.

Done when:
- Shop is available from navigation.
- Members can buy half-day leave, monthly leave, focus shield, and snack ticket.
- Buying deducts Gold and updates leave balance/inventory.

Excluded:
- Manager approval workflow, payroll integration, and real HR policy rules.

## Goal 4: Keep The Experience Work-First

Related requirement: Game mechanics shall support task clarity instead of hiding work.

Done when:
- Task cards still show assignee, deadline, status, XP, Gold, and damage.
- Dashboard shows only the most relevant active quests.
- Design remains fantasy ERP, not a marketing landing page.

Excluded:
- Social feed, guild chat, public challenges, and seasonal events.
