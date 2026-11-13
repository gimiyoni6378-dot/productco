# Ivory program cards — design QA

final result: passed

## Evidence
- Source: `/workspace/generated_images/exec-841f6b98-eae0-426e-9dbc-981c7755b233.png` (1488 × 1058 image).
- Desktop: `/workspace/ivory-programs-desktop.png` (1364 × 1024 desktop screenshot; browser content about 1180 × 757 CSS pixels).
- Narrow screen: `/workspace/ivory-programs-mobile.png`, `/workspace/ivory-programs-mobile-lower.png` (1364 × 1024 screenshots; browser content about 485 × 757 CSS pixels).
- Full composition comparison: `/workspace/ivory-design-comparison.jpg`. Browser chrome excluded from desktop comparison. Images scaled proportionally; different viewport sizes acknowledged, no claim of pixel identity.
- State: home program section, three static informational cards. Cards remain above services. Narrow-screen lower capture confirms the second and third cards stack after actor options.

## Findings
No actionable P0/P1/P2 findings in the captured states.
- Typography: existing Noto Sans KR / DM Sans retained; program hierarchy and right-aligned gold prices match the selected direction. Text remains readable and wraps inside cards.
- Layout: three desktop columns, single column below 760px; ivory surfaces, 24px radii, restrained shadows and compact row separators match the visual direction. Existing site section heading retained intentionally.
- Colors: warm page, off-white cards and darker gold prices retain the reference palette while keeping small text legible.
- Assets: Phosphor Light library film slate and video camera SVG files provide the closest production icon equivalents. Decorative, empty alt text. Camera differs from reference's vintage projector; accepted standard library equivalent rather than custom drawing.
- Copy: all supplied prices, 40-minute/2-hour/3-hour durations, angles, premium revision, discount, add-ons and rental disclaimer preserved.
- Focused checks: mobile actor capture verifies price columns and wrapping; lower mobile capture verifies add-ons and subsequent cards.

## Verification limits
Native Chromium inspection used because browser automation backend is unavailable. DevTools is disabled by browser policy, so console inspection and exact 390px device emulation were unavailable. Narrow real browser window verified responsive stacking at approximately 485px. No new interactions introduced; program cards have no links or controls.

## Comparison history
Initial comparison found no P0/P1/P2 issues requiring a correction loop. Existing site header scale and compact body text intentionally retained for the user's density preference.

## Follow-up polish
P3: vintage projector icon could be substituted if a matching licensed library asset is preferred.
