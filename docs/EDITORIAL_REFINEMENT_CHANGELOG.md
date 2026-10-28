# Editorial refinement — before / after

## Before

- Syne rendered the Vietnamese hero name while body type came from direct `@fontsource` imports.
- The homepage inspector reported 13 failures: 3–5-line headlines, decorative numbering, tiny uppercase labels, 28 font sizes, 14px body copy, gradients, resting shadows, hairline rules and almost no measured motion.
- The hero used two rigid rectangular frames that overlapped the title and supporting copy at tablet/mobile widths.
- Section color fields largely concealed the authentic image texture beneath them.
- The Disabled case study had two cover images but no dedicated editorial gallery.

## After

- Be Vietnam Pro is loaded with `next/font` for Vietnamese and body/UI text; Syne is reserved for English editorial display roles.
- The hero keeps the name-as-monument direction, replaces the rigid mask frame with a transparent Hát Bội object cutout, and uses original Yumi artwork as a torn-paper insert.
- Hero artwork, headline, identity, statement and action have separate non-overlapping zones at desktop, tablet and mobile breakpoints.
- Every major homepage chapter separates atmosphere, color overlay and content layers; text and documentary images are never faded by parent opacity.
- Homepage labels are sentence case without decorative issue numbering, and chapter headlines are authored to fit two lines.
- Resting card shadows, decorative gradients and caption hairlines are removed in the refinement layer.
- The Disabled case study now includes a cinematic two-image festival-documentation gallery and keeps the Best Creative Adaptation award separate from the Best Actress nomination.
- A 40-image rights-gated manifest and a five-image portrait shortlist document what is public, what is held, and what needs manual identification.
- Phone hero composition now prioritizes the name, role and mask; the secondary Yumi insert is removed below 600px to prevent overlap.
- Final browser QA covers 60 route/viewport combinations, and the editorial inspector reports 0 failures at 390, 768 and 1440.
- Homepage spacing pass: desktop Yumi, Debate and Flashmob galleries now use denser four-column editorial grids; homepage length reduced from roughly 19.8 to 14.9 viewport screens without removing approved media.
- Hero asset update: replaced the previous mask cutout with the user-supplied ornate opera-performer illustration, preserving transparent alpha, responsive sizing and drop-shadow treatment.
- Film image update: the user-approved award ceremony photo now leads the Disabled project card on `/work`; the manifest increased from 40 to 41 approved WebPs and the original screening image remains available for the case-study gallery.
- Film contrast fix: removed dotted figure borders from the homepage collage and placed each caption on a dark, high-contrast surface so patterns cannot cross or wash out the copy.
- Film layout fix: converted the homepage film collage from overlapping absolute figures to a responsive grid; the closing CTA links now wrap cleanly instead of colliding.
- Editorial strip fix: wrapped the Film and Flashmob ticker copy in animated tracks that move right-to-left inside an overflow-safe viewport, with a reduced-motion fallback.
