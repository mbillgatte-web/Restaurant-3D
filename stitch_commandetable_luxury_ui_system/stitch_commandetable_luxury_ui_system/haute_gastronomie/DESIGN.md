---
name: Haute Gastronomie
colors:
  surface: '#121411'
  surface-dim: '#121411'
  surface-bright: '#383a36'
  surface-container-lowest: '#0d0f0c'
  surface-container-low: '#1a1c19'
  surface-container: '#1e201d'
  surface-container-high: '#292a27'
  surface-container-highest: '#333532'
  on-surface: '#e3e3de'
  on-surface-variant: '#d0c5b2'
  inverse-surface: '#e3e3de'
  inverse-on-surface: '#2f312e'
  outline: '#99907e'
  outline-variant: '#4d4637'
  surface-tint: '#e6c364'
  primary: '#e6c364'
  on-primary: '#3d2e00'
  primary-container: '#c9a84c'
  on-primary-container: '#503d00'
  inverse-primary: '#755b00'
  secondary: '#ffb3ac'
  on-secondary: '#680007'
  secondary-container: '#8e1c1c'
  on-secondary-container: '#ff9e96'
  tertiary: '#c9c6c6'
  on-tertiary: '#313030'
  tertiary-container: '#adabab'
  on-tertiary-container: '#403f3f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe08f'
  primary-fixed-dim: '#e6c364'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#584400'
  secondary-fixed: '#ffdad6'
  secondary-fixed-dim: '#ffb3ac'
  on-secondary-fixed: '#410003'
  on-secondary-fixed-variant: '#8a1a1a'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c9c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#121411'
  on-background: '#e3e3de'
  surface-variant: '#333532'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
  price-lg:
    fontFamily: EB Garamond
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1'
  price-md:
    fontFamily: EB Garamond
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-margin: 24px
  gutter: 16px
  section-gap-desktop: 80px
  section-gap-mobile: 48px
---

## Brand & Style

This design system is tailored for high-end culinary experiences, embodying the atmosphere of a Michelin-starred restaurant or an exclusive five-star hotel lounge. The brand personality is **glamorous, chic, and sophisticated**, designed to evoke a sense of anticipation and indulgence.

The visual style leans into a **Modern Luxury** aesthetic. It utilizes a deep, nocturnal foundation to make photography and golden accents radiate. To prevent the digital interface from feeling sterile, a subtle film grain/noise texture is applied to all surface layers, mimicking the tactile quality of premium heavy-stock paper menus and velvet upholstery.

## Colors

The palette is rooted in a "Deep Nocturnal" base. 
- **Champagne Gold** serves as the primary accent, used for high-importance calls to action, brand elements, and active states.
- **Bordeaux** acts as a sophisticated secondary accent, perfect for highlighting special offers, vintage selections, or deep-interaction states.
- **Surface** colors use a slightly elevated gray-black to create depth against the pure black background.
- **Text** is strictly off-white to reduce eye strain and maintain a warm, candle-lit reading experience.

## Typography

This design system uses a triple-font strategy to balance readability with editorial elegance:
- **Playfair Display** is reserved for headlines and section titles, providing a classic, authoritative serif voice.
- **Inter** handles all functional UI, body text, and button labels to ensure maximum legibility and a modern touch.
- **EB Garamond** (as a substitute for Cormorant Garamond for refined serif needs) is used exclusively for pricing and key metrics, giving the financial aspect of the experience a delicate, high-end feel.

Apply `letter-spacing: 0.1em` and `text-transform: uppercase` to labels to create a sense of curated "navigation."

## Layout & Spacing

The layout follows a **Fixed Grid** model for desktop to maintain the tight, curated feeling of a printed menu, while transitioning to a fluid model for mobile.

- **Desktop (1440px+):** 12-column grid, 80px margins, 24px gutters.
- **Tablet (768px - 1439px):** 8-column grid, 40px margins, 16px gutters.
- **Mobile (Up to 767px):** 4-column grid, 24px margins, 16px gutters.

Whitespace is used aggressively to denote luxury. Elements should never feel crowded; prioritize vertical breathing room between menu categories and item descriptions.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Ambient Shadows**.

1.  **Level 0 (Base):** `#0D0D0D` with a 3% opacity grain overlay.
2.  **Level 1 (Cards/Surfaces):** `#1A1A1A` with a subtle `1px solid #2A2A2A` border.
3.  **Level 2 (Modals/Popovers):** Elevated with a deep shadow: `0 4px 24px rgba(0,0,0,0.6)`.

Avoid using harsh drop shadows on small elements; instead, use thin, high-contrast borders in Gold or Bordeaux to signify interactivity or focus.

## Shapes

The shape language combines generous curves for containers with sharper, more precise corners for interactive elements.
- **Large Containers (Cards, Images, Modals):** Use 16px (`rounded-lg`) to soften the dark aesthetic and feel more inviting.
- **Small Components (Buttons, Inputs, Chips):** Use 8px (`rounded-md`) to maintain a sense of precision and professional service.

## Components

### Buttons
- **Primary:** Champagne Gold background, Deep Black text. 8px radius. Inter SemiBold.
- **Secondary:** Transparent background, 1px Gold border, Gold text.
- **Hover States:** All buttons should transition over 0.25s. Primary buttons should slightly glow; secondary buttons should fill with a subtle gold tint (10% opacity).

### Cards (Menu Items)
- Surface: `#1A1A1A`.
- Padding: 24px.
- Elements: Image at top or left with 12px radius, Title in Playfair Display, Price in EB Garamond (Gold), Description in Inter (Muted).

### Inputs & Selects
- Background: `#0D0D0D`.
- Border: `1px solid #2A2A2A`.
- Focus State: Border color changes to Gold with a soft outer glow.

### Chips (Dietary/Tags)
- Small, uppercase Inter text. 
- Outline style: `1px solid #2A2A2A` with Muted text, unless active (Gold).

### Interactive Lists
- Used for wine lists or reservation times. Hovering over a list item should change the background to a subtle Bordeaux tint (`#8B1A1A` at 15% opacity).