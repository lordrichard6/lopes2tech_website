# Image Prompts — cold-email-outreach-switzerland

## Global Style Direction
Dark navy/slate background (#080d1a tone), cyan (#22d3ee) and purple (#a855f7) accent colours.
Clean, professional, minimal. Swiss corporate aesthetic. No people's faces. No generic stock photos.
Consistent glow/neon accents. All images 1280×720px, 16:9, saved as .webp.

---

## cover.webp — Hero / Cover Image
**Placement:** Top of article, full-width
**Goal:** Convey "cold email = reaching decision-makers directly, systematically"

**Midjourney prompt:**
`dark navy background, glowing cyan envelope icon with digital circuit lines radiating outward, minimalist flat style, Swiss corporate aesthetic, purple and cyan gradient accents, no text, clean and professional --ar 16:9 --style raw`

**DALL-E 3 prompt:**
`A minimalist digital illustration on a very dark navy background. A glowing cyan email envelope at the center, with geometric circuit-board lines radiating outward to represent systematic outreach. Purple and cyan gradient accents. Clean, professional Swiss corporate aesthetic. No text. 16:9 ratio.`

---

## image-01.webp — Personalised Cold Email in Inbox
**Placement:** After "What Cold Email Outreach Actually Is" section
**Goal:** Show what a well-crafted cold email looks like in an inbox — not spam, professional

**Midjourney prompt:**
`dark-themed email client interface on laptop screen, one open email highlighted with subtle cyan glow, professional inbox view, minimal UI, dark navy background, soft depth of field, Swiss office atmosphere, no visible text or personal data --ar 16:9 --style raw`

**DALL-E 3 prompt:**
`A dark-themed email inbox interface displayed on a laptop screen. One email is highlighted open with a subtle cyan/teal glow to indicate it's being read. The interface is minimal and professional, with a dark navy background. No readable personal data or text content visible. Clean Swiss office atmosphere with soft depth of field. 16:9 ratio.`

---

## image-02.webp — 4-Step Process Diagram
**Placement:** After "What a Real Campaign Looks Like" section
**Goal:** Visually show the four campaign phases

**Midjourney prompt:**
`minimalist dark infographic showing 4 connected steps: lead sourcing, technical setup, email sequence, monthly reporting. Horizontal flow with cyan numbered circles, dark navy background, purple connecting lines, clean sans-serif labels, modern Swiss design aesthetic --ar 16:9 --style raw`

**DALL-E 3 prompt:**
`A clean, minimalist dark-background infographic showing four horizontal steps connected by lines: (1) Lead Sourcing, (2) Technical Setup, (3) Email Sequence, (4) Reporting. Each step is represented by a glowing cyan numbered circle. Dark navy (#080d1a) background with purple connecting lines. Modern Swiss corporate design style. No decorative clipart. 16:9 ratio.`

---

## image-03.webp — Comparison Chart
**Placement:** After "Cold Email vs. The Alternatives" section
**Goal:** Visual comparison of cold email vs LinkedIn, Google Ads, SEO

**Midjourney prompt:**
`minimalist dark comparison matrix chart, 4 rows (Cold Email, LinkedIn, Google Ads, SEO) vs 3 columns (Cost, Speed, Effort), cyan checkmarks for best scores, dark navy background, clean modern data visualization, Swiss design, no text visible --ar 16:9 --style raw`

**DALL-E 3 prompt:**
`A minimal, clean comparison matrix on a dark navy background. Four rows representing different marketing channels and three columns representing metrics (Cost, Speed, Effort). Cyan/teal checkmarks and indicators show which channels score best. The "Cold Email" row is highlighted with a subtle cyan glow. Modern Swiss corporate data visualization style. No readable text labels. 16:9 ratio.`

---

## Notes
- Generate all 4 images in the same session for visual consistency
- Save as: cover.webp, image-01.webp, image-02.webp, image-03.webp
- Place in: `public/assets/blog/cold-email-outreach-switzerland/`
- After placing images, update `"image"` field in blog-posts.json to `/assets/blog/cold-email-outreach-switzerland/cover.webp`
- Replace `<!-- IMAGE: -->` comments in content with full `<figure>` blocks
