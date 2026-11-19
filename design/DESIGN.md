---
name: Campus Tech Discovery
colors:
  surface: '#fff7f9'
  surface-dim: '#e7d5e0'
  surface-bright: '#fff7f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ffeff9'
  surface-container: '#fbe9f4'
  surface-container-high: '#f5e3ef'
  surface-container-highest: '#efdee9'
  on-surface: '#221921'
  on-surface-variant: '#53414f'
  inverse-surface: '#382d36'
  inverse-on-surface: '#feecf7'
  outline: '#857180'
  outline-variant: '#d8c0d1'
  surface-tint: '#a612a6'
  primary: '#a30ba4'
  on-primary: '#ffffff'
  primary-container: '#c135bf'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffaaf4'
  secondary: '#8a4485'
  on-secondary: '#ffffff'
  secondary-container: '#feabf4'
  on-secondary-container: '#7c3879'
  tertiary: '#526600'
  on-tertiary: '#ffffff'
  tertiary-container: '#688000'
  on-tertiary-container: '#040600'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd7f6'
  primary-fixed-dim: '#ffaaf4'
  on-primary-fixed: '#380038'
  on-primary-fixed-variant: '#810082'
  secondary-fixed: '#ffd7f6'
  secondary-fixed-dim: '#feabf4'
  on-secondary-fixed: '#380039'
  on-secondary-fixed-variant: '#6f2c6c'
  tertiary-fixed: '#cef054'
  tertiary-fixed-dim: '#b2d43a'
  on-tertiary-fixed: '#171e00'
  on-tertiary-fixed-variant: '#3d4c00'
  background: '#fff7f9'
  on-background: '#221921'
  surface-variant: '#efdee9'
typography:
  headline-xl:
    fontFamily: Anton
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Anton
    fontSize: 30px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Anton
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Anton
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Anton
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Anton
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1.0rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system establishes an energetic, reliable, and frictionless portal experience tailored to collegiate students, organizers, and campus tech communities. The interface balances high-utility academic tooling with the refined visual polish of consumer discovery apps.

- **Brand Personality**: Dynamic, organized, accessible, and intellectually vibrant. It avoids institutional stiffness in favor of an inviting, student-first platform.
- **Visual Style**: Clean Modern SaaS infused with bold, energetic typography and playful tactile depth. It uses generous whitespace, subtle hairline structural dividers, low-saturation backgrounds, and high-impact magenta and lime interactions to focus cognitive attention directly on event exploration, RSVP flows, and scheduling details.
- **Emotional Response**: Clarity, momentum, and reassurance—eliminating registration friction while driving excitement around campus hackathons, workshops, and speaker series.

## Colors

The palette employs a deliberate hierarchy designed to keep content dense with information yet calm and breathable.

- **Primary (`#c438c2`) & Secondary (`#a65da0`)**: Vibrant magenta hues represent interactive focus, active tabs, primary buttons, and navigational states. `#c438c2` acts as the primary interactive fill, shifting to `#a65da0` for hovered and focused states.
- **Tertiary Accent (`#8aa900`)**: A lively lime green reserved exclusively for high-urgency states—most notably successful registrations, live countdowns, seating availability, and positive status indicators. It must not be overused for generic decoration.
- **Neutrals & Surfaces**:
  - Deep Neutral (`#81737d`) serves as the dominant high-contrast text color, paired with muted utility tones for secondary metadata and icons.
  - Page Canvas sits on Crisp Pure White (`#FFFFFF`) or light tinted canvases, while layered utility panels, event cards, and filter trays use soft background tones.
  - Borders are strictly rendered in fine structural hairlines.

## Typography

The typography system pairs the high-impact display font **Anton** for headlines with **Plus Jakarta Sans** for body and labels, utilizing geometric clarity and bold character to guarantee effortless scanning across schedules, calendar feeds, and technical workshop agendas.

- **Headlines**: Powered by Anton, weighted for high-impact presence to provide crisp, punchy anchors for hero banners and event group headers.
- **Body Copy**: Standardized at 14px (`body-md`) and 16px (`body-lg`) using Plus Jakarta Sans with relaxed line heights to maintain comfortable reading during long-form project requirements or speaker bios.
- **Labels & Tags**: Uses medium-to-bold weights with slight positive letter spacing for quick parsing on category badges (e.g., "AI/ML", "Hackathon", "Demo Day") and seat status counts.

## Layout & Spacing

The layout is built on a responsive 12-column fluid grid system bounded by a max-width container of `1280px` to maintain optimal scanability on wide monitors.

- **Desktop (1024px+)**: 12 columns with `1.5rem` (`24px`) gutters and `2rem` (`32px`) margins. Sidebars for filters and campus categories occupy 3 columns, while event cards occupy 9 columns (arranged in a 3-column subgrid).
- **Tablet (768px - 1023px)**: 8 columns with `1.5rem` gutters and `1.5rem` margins. Filter controls collapse into a horizontal scrolling row; event cards occupy a 2-column layout.
- **Mobile (< 768px)**: 4 columns with `1rem` (`16px`) gutters and `1rem` outer margins. All event cards reflow into a clean single-column feed.
- **Rhythm**: Element padding and gap rhythm follow an 8-point base scale (`0.25rem` to `2.5rem`), prioritizing breathing room inside cards and sections to counteract dense data blocks.

## Elevation & Depth

Visual hierarchy uses a hybrid strategy pairing low-contrast border boundaries with soft, tinted ambient drop shadows. Surfaces rely primarily on color stepping before applying shadow.

- **Layer 0 (Canvas)**: Base surface for application-level backgrounds.
- **Layer 1 (Cards & Modules)**: Pure white surface enclosed by a `1px` solid hairline border, accompanied by an ambient diffused shadow.
- **Layer 2 (Floating Popovers & Dropdowns)**: Elevated panels feature increased elevation and edge definition.
- **Layer 3 (Modals & Sheet Drawers)**: High elevation supported by a backdrop overlay with backdrop blur and an elevated shadow.
- **Interaction Hover**: Cards gently rise on hover by reducing shadow spread and shifting color tone slightly toward a magenta-tinted glow.

## Shapes

The design system incorporates modern, highly rounded pill-like contours that keep tech-centric content accessible, playful, and contemporary.

- **Standard Containers (`rounded-lg`)**: Default radius for form inputs, event cards, modular dashboards, and dropdown menus with pronounced softening.
- **Featured Shells (`rounded-xl`)**: Applied to hero event banners, modal dialogs, and registration checkout panels.
- **Interactive Micro-elements (`rounded-md`)**: Buttons, inner selection states, and small icon buttons maintain smooth, friendly definition.
- **Pills (`9999px`)**: Reserved strictly for category tags, seat countdown urgency badges, status dots, and floating user avatars.

## Components

### Buttons
- **Primary**: Solid Magenta (`#c438c2`) background with pure white text, transitioning to `#a65da0` on hover. Height: `44px` (desktop), horizontal padding: `1.25rem`, border radius configured for a pill-soft look. Text uses `label-lg`.
- **Secondary**: Pure white fill with structural border and text. Hover adds background tinting and border contrast.
- **Destructive / Urgent Action**: White fill with accent border and text, shifting to solid accent with white text on hover.

### Chips & Badges
- **Category Chips**: Subtle background, neutral text, `9999px` pill radius, padding `0.25rem 0.75rem`. On active selection: magenta tint fill with primary text.
- **Seat Countdown Badges**: Urgency-driven pill badges using the tertiary lime accent for live status indicators.

### Event Cards
- Built using pure white fill, structural borders, comfortable padding, and high roundedness outer radii.
- Structure: Header containing host club avatar and seat countdown pill; midsection featuring `headline-sm` event title and date/venue metadata; footer with primary "RSVP" button and quick-share action.

### Input Fields & Search Bars
- Background with clean outline. Height: `44px`, padding: `0.75rem 1rem`.
- Focus State: Border color shifts cleanly to primary magenta with an ambient ring.

### Checkboxes & Radios
- Size: `18px` by `18px`, radius `4px` for checkboxes and `9999px` for radios.
- Checked State: Filled with primary magenta displaying a crisp white micro checkmark.

### Additional Suggested Component: Live Capacity Progress Bar
- A thin, 6px track with `9999px` pill curvature embedded within event cards. The active bar transitions to provide clear visual urgency at a glance.