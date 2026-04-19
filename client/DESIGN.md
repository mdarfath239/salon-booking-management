# The Design System: Editorial Luxury for Modern Wellness

## 1. Overview & Creative North Star: "The Digital Atelier"
This design system is not a utility; it is a curation. Moving away from the rigid, "boxed-in" nature of traditional SaaS, this system adopts the **Digital Atelier** North Star. We treat the interface as a high-end editorial layout—think of a premium physical magazine or a boutique hotel concierge desk. 

The aesthetic is "Glossier meets Notion": functional and hyper-organized, yet breathing with soft, feminine-neutral air. We achieve this by breaking the "template" look through intentional asymmetry, generous white space (negative space as a luxury), and a total rejection of harsh structural lines.

---

## 2. Color & Tonal Architecture
Our palette uses warmth and depth to establish "High-Trust." We avoid pure blacks and cold grays in favor of organic, pigment-based tones.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section off content. 
Boundaries must be defined solely through:
- **Background Color Shifts:** Use `surface_container_low` sitting on `background`.
- **Soft Tonal Transitions:** Use `surface_variant` to distinguish functional areas.
- **Negative Space:** Use the 24px gutter and vertical padding to let elements breathe.

### Surface Hierarchy & Nesting
Treat the UI as stacked sheets of fine paper.
- **Level 0 (Base):** `background` (#fbf9f6) – The canvas.
- **Level 1 (Sections):** `surface_container_low` (#f5f3f0) – Large layout blocks.
- **Level 2 (Cards):** `surface_container_lowest` (#ffffff) – Individual interactive elements. This creates a natural "lift" without heavy shadows.

### The "Glass & Gradient" Rule
For floating elements like Modals or Navigation bars, use **Glassmorphism**:
- **Background:** `surface` at 80% opacity.
- **Backdrop-blur:** 12px to 20px.
- **Signature Gradient:** For primary CTAs, use a subtle linear gradient from `primary` (#1A1009) to `primary_container` (#241912) at a 145° angle to add "soul" and depth.

---

## 3. Typography: Editorial Authority
We pair a high-contrast serif with a modern, functional sans-serif to bridge the gap between "Premium Beauty" and "SaaS Efficiency."

*   **Headlines (Newsreader / Playfair Display):** Our "Voice." Used for `display` and `headline` levels. These should feel authoritative yet graceful. Use `on_surface` for maximum impact.
*   **Body & Labels (Manrope / DM Sans):** Our "Engine." Used for `title`, `body`, and `label` levels. High legibility is non-negotiable. Use `on_surface_variant` (#4e4540) for body text to reduce eye strain and maintain the soft-minimal aesthetic.

---

## 4. Elevation & Depth: Tonal Layering
We do not use structural lines. We use light and tone.

*   **The Layering Principle:** Depth is achieved by stacking. A `surface_container_highest` (#e4e2df) element should only exist inside a `surface_container` or lower.
*   **Ambient Shadows:** For "floating" components (Toasts, Modals), use an extra-diffused shadow:
    *   *Shadow:* `0px 12px 32px rgba(27, 28, 26, 0.06)` (A tinted shadow using the `on_surface` color).
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use `outline_variant` at **15% opacity**. Never use a 100% opaque border.

---

## 5. Components

### Buttons
*   **Primary:** Deep espresso (`primary`). High-contrast. No border. Roundedness: `md` (0.75rem).
*   **Secondary:** `secondary_container` (#fecbc6) with `on_secondary_container` (#7a5450) text. Soft and inviting.
*   **Ghost:** No background. `on_surface` text. Hover state uses `surface_container_high` with 40% opacity.
*   **Destructive:** `error_container` with `on_error_container` text.

### Input Fields
*   **Default:** `surface_container_low` background. No border.
*   **Focus:** A subtle "Ghost Border" of `primary` at 20% opacity and a 2px inset shadow to feel "pressed" into the paper.
*   **Error:** Background shifts to `error_container` at 30% opacity. Label turns to `error`.

### Cards (Appointment, Client, Stat)
*   **Rule:** **No Dividers.** Separate content using `title-sm` vs `body-sm` typography and vertical spacing.
*   **Stat Cards:** Use `display-sm` for the metric, paired with an `accent` (Dusty Rose) icon or sparkline.
*   **Client Cards:** Background `surface_container_lowest`. 16px border radius.

### Appointment Status Badges
Instead of "Pill" shapes, use **Soft Rectangles** (4px radius) with low-saturation backgrounds:
*   **Confirmed:** `surface_variant` with `on_surface_variant` (Subtle & Professional).
*   **Pending:** `secondary_container` (Warm & Notifying).
*   **Cancelled:** `error_container` (Clear but not aggressive).

### Calendar Block Component
*   **Grid:** 7-column layout without lines. 
*   **Current Day:** `primary` circle with `on_primary` text.
*   **Available Slot:** `surface_container_high` background that transitions to `accent` (Dusty Rose) on hover.

### Modal / Drawer
*   Always use a **Backdrop Blur** (8px) on the `background`. 
*   The Modal surface should be `surface_container_lowest` to pop against the blurred content.

### Avatar + Initials
*   Background: `primary_fixed` (#f4ded2).
*   Text: `on_primary_fixed` (#241912).
*   Shape: Circular for individual clients; `lg` rounded square for salon staff.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical layouts (e.g., a left-aligned headline with a right-aligned CTA that doesn't perfectly align with the grid) to create an editorial feel.
*   **Do** use `secondary` (Dusty Rose) as an "ink" color for links or small icons to guide the eye.
*   **Do** prioritize "Breathing Room." If in doubt, double the padding.

### Don't:
*   **Don't** use 1px gray lines to separate list items. Use 8px or 12px of vertical white space instead.
*   **Don't** use pure black (#000). Always use `primary` (Espresso) for dark elements.
*   **Don't** use "Standard" Material Design shadows. Use the Ambient Shadow spec mentioned above to maintain the "luxury-minimal" weight.