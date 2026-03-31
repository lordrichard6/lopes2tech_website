# Image Prompts — cold-email-outreach-switzerland

## Global Style Direction
**Style:** Cinematic Dark Office — near-photorealistic renders with dramatic studio lighting.
Dark desk environments, laptop/monitor screens as the focal point, cold blue accent lighting.
Premium B2B tech atmosphere — like Apple product photography applied to email infrastructure.
No readable text or personal data visible on any screen. No human faces.
All images 1280×720px, 16:9, saved as .webp.

---

## cold-email-cover.webp — Hero / Cover Image
**Placement:** Top of article, full-width
**Goal:** The tension of the moment before sending — a finger hovering over Enter, campaign dashboard glowing behind it. Specific to cold email, cinematic, memorable.

**DALL-E 3 prompt:**
`Cinematic extreme close-up of a human hand, index finger pressing down on a laptop keyboard's Enter key. In the background, slightly out of focus but clearly legible, a dark monitor displays a sleek email campaign dashboard. A glowing rectangular button with the word "Launch" written in bright white text on a cold electric blue background is prominently visible on the screen — sharp enough to read, radiating a strong blue glow that illuminates the entire scene. The screen glow spills across the back of the hand casting cold blue light on the knuckles. Deep shadows everywhere else. The atmosphere is tense, deliberate, late-night. The button is the second focal point of the image — not fully blurred, intentionally visible and glowing. Hyperrealistic 8K cinematic render, no face visible. 16:9 ratio.`

---

## cold-email-dns-terminal.webp — DNS & Infrastructure Setup
**Placement:** After "Why 99% of DIY Campaigns Fail Before They Send" section
**Goal:** Visualise the technical infrastructure layer — subdomain, DNS records, the invisible setup that determines deliverability.

**DALL-E 3 prompt:**
`Cinematic dark scene of a laptop on a dim desk, screen glowing with cold blue terminal code. Sitting on top of the laptop lid, a tiny adorable clay figurine — small, round, soft matte texture like a Pixar character — is perched cross-legged, holding a miniature glowing envelope in both hands and staring at it with curiosity. The figurine is warm-toned clay (cream or soft terracotta) which contrasts beautifully against the cold blue screen glow behind it. The screen light softly illuminates the tiny character from behind like a backlight halo. The rest of the scene is deep shadow. The figurine is sharply in focus, detailed and tactile. Hyperrealistic render with a mix of cinematic photography and 3D clay toy aesthetic. No readable text. No human figures. 16:9 ratio.`

---

## cold-email-warmup-graph.webp — Inbox Warmup Pool
**Placement:** After "Inbox Warmup: The Step Everyone Skips" section
**Goal:** Visualise the warmup process — multiple inboxes gradually building reputation over 14 days.

**DALL-E 3 prompt:**
`Overhead bird's-eye cinematic shot of a dark minimalist desk at night. A large curved monitor displays a glowing analytics dashboard with a single upward-curving line graph in electric cyan. A sleek mechanical keyboard and a small espresso cup are visible on the desk. Sitting on the desk right in front of the monitor, a tiny adorable clay figurine — same warm cream or soft terracotta matte texture as a Pixar character — stands with arms raised above its head in pure excitement and joy, staring up at the rising graph on the screen. The cold blue screen glow illuminates the tiny character from the front, casting a warm-meets-cold light contrast on its round clay body. The figurine is sharply in focus and full of personality. Deep shadows in the corners of the desk. Hyperrealistic render blending cinematic desk photography with 3D clay toy aesthetic. No readable text. No human figures. 16:9 ratio.`

---

## cold-email-campaign-dashboard.webp — Instantly.ai Campaign Dashboard
**Placement:** After "How We Run Campaigns End-to-End on Instantly.ai" section
**Goal:** Visualise an active cold email campaign in execution — sequence steps, live metrics, reply tracking.

**DALL-E 3 prompt:**
`Low-angle dramatic cinematic shot of a MacBook Pro on a dark desk, the screen displaying a sophisticated dark SaaS dashboard with glowing metric cards and a multi-step workflow diagram in cyan and white. Sitting on the desk leaning against the base of the MacBook, a tiny adorable clay figurine — warm cream or soft terracotta matte texture, Pixar-like — is pointing enthusiastically at the screen with one tiny arm, the other arm on its hip, looking proud and confident as if presenting the campaign results. The cold blue screen glow spills across the desk surface and illuminates the clay character from the front. The figurine is sharply in focus and full of personality. Deep shadows behind the laptop, background fades to pure black. Hyperrealistic render blending cinematic photography with 3D clay toy aesthetic. No readable text on screen. No human figures. 16:9 ratio.`

---

## Notes
- Generate all 4 images in the same session for visual consistency
- Save as: cold-email-cover.webp, cold-email-dns-terminal.webp, cold-email-warmup-graph.webp, cold-email-campaign-dashboard.webp
- Place in: `public/assets/blog/cold-email-outreach-switzerland/`
- After placing images, update `"image"` field in blog-posts.json to `/assets/blog/cold-email-outreach-switzerland/cold-email-cover.webp`
- Replace `<!-- IMAGE: -->` comments in content with full `<figure>` blocks
