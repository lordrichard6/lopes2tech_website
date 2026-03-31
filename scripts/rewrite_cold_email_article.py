#!/usr/bin/env python3
import json, re, math

content = """<p>Cold email in 2026 is not what it was in 2019. The channel did not get harder — it got more unforgiving. <strong>The gap between campaigns that land in the inbox and campaigns that land in spam has never been wider.</strong> And that gap is almost entirely determined by infrastructure, not copy.</p>

<p>This article explains exactly how cold email works today, why most people fail at it before pressing send, and how we run campaigns at Lopes2Tech using Instantly.ai — from subdomain setup to inbox warmup to multi-inbox rotation at scale.</p>

<p>If you want a generic overview of what cold email is, this is not that article. This is what actually works in 2026 and why.</p>

<hr>

<h2>How Cold Email Changed — And Why the Old Playbook Is Dead</h2>

<p>In 2019, you could set up a Gmail account, grab a list of 500 emails, and blast a templated pitch. Some of it worked. Not anymore.</p>

<p>In February 2024, Google and Yahoo introduced mandatory DMARC authentication requirements for any sender sending more than 5,000 emails per day. Microsoft followed. The major inbox providers now filter at the domain authentication layer — before your email is even evaluated for content. <strong>If your DNS records are not configured correctly, your email does not exist as far as Gmail is concerned.</strong></p>

<p>At the same time, inboxes are flooded with AI-generated cold email. GPT-4 dropped the barrier to writing personalised-sounding messages to near zero — which means decision-makers are receiving more cold email than ever, and spam filters are more aggressive than ever in response. The threshold for what triggers a spam complaint has dropped. Google's spam threshold is now <strong>0.3% complaint rate</strong> — that is 3 complaints per 1,000 emails sent. One bad day and your domain is blacklisted.</p>

<blockquote>
  <p>The problem is not that cold email stopped working. The problem is that the barrier to doing it correctly has gone up significantly. The channel is more effective than ever — for the people who set it up properly.</p>
</blockquote>

<p>The campaigns that work in 2026 are technical first, copy second. The infrastructure is what determines deliverability. The copy is what determines replies. You cannot have one without the other.</p>

<hr>

<h2>Why 99% of DIY Campaigns Fail Before They Even Send</h2>

<p>Most people who try cold email on their own make the same mistake: they start with a list and a message. They skip everything that comes before it. Here is what actually happens when you send from an unconfigured inbox:</p>

<ul>
  <li>Your email lands in the promotions tab or spam — not because of your copy, but because your domain has no authentication records.</li>
  <li>Your bounce rate spikes because the list was not verified — and a bounce rate above 5% signals a low-quality sender to inbox providers.</li>
  <li>You send from your main business domain. One spam complaint. Now your entire company email is flagged.</li>
  <li>You send 200 emails on day one from a brand-new inbox. The providers notice the sudden volume spike and flag the account. Game over.</li>
</ul>

<p>Every one of these failures is preventable. <strong>They are not bad luck — they are skipped steps.</strong> The technical foundation is not optional. It is the campaign.</p>

<!-- IMAGE: image-01.webp | A technical diagram showing the layers of cold email infrastructure: subdomain, DNS records (SPF/DKIM/DMARC), inbox warmup pool, and Instantly.ai connecting to recipient inboxes — dark navy background, cyan and purple technical aesthetic -->

<hr>

<h2>The Infrastructure Stack: What Has to Be in Place Before Any Email Is Sent</h2>

<p>This is the part most guides skip because it is not exciting. It is also the part that determines whether your campaign exists or not.</p>

<h3>Sending Subdomain — Never Your Main Domain</h3>
<p>We always create a dedicated sending subdomain — something like <em>mail.yourdomain.com</em> or <em>outreach.yourdomain.com</em>. This subdomain is used exclusively for cold outreach. <strong>Your main domain (the one your business email runs on) is never touched.</strong></p>

<p>Why? Because if anything goes wrong — a spam complaint spike, a blacklist — the damage is contained to the subdomain. Your main business email keeps running. If you send from your main domain and get blacklisted, your invoices, client emails, and proposals stop landing too.</p>

<h3>SPF, DKIM, and DMARC</h3>
<p>These are DNS records that tell the receiving mail server that your email is legitimate and that you are authorised to send from this domain. Without them, Gmail does not trust your email. Here is what each one does:</p>

<ul>
  <li><strong>SPF (Sender Policy Framework):</strong> Specifies which mail servers are authorised to send on behalf of your domain. Prevents spoofing.</li>
  <li><strong>DKIM (DomainKeys Identified Mail):</strong> Adds a cryptographic signature to every email you send, proving the message was not altered in transit.</li>
  <li><strong>DMARC (Domain-based Message Authentication):</strong> Tells receiving servers what to do if SPF or DKIM fails — reject, quarantine, or monitor. Since Google's 2024 mandate, DMARC is not optional.</li>
</ul>

<p>We configure all three on the sending subdomain before a single email leaves the account. This typically takes 24–48 hours to propagate through DNS. Skipping this step means your emails are unauthenticated — and unauthenticated bulk email is spam by definition in 2026.</p>

<hr>

<h2>Inbox Warmup: The Step Everyone Skips — And Why It Destroys Campaigns</h2>

<p>A brand-new inbox has no sending history. No reputation. No trust score. When you connect a fresh inbox to an email-sending platform and immediately blast 100 emails, the providers flag it as suspicious activity — because it is. <strong>Legitimate senders do not go from zero to full volume overnight.</strong></p>

<p>Warmup is the process of gradually building a sending reputation for a new inbox. It works by sending small volumes of email that get opened, replied to, and marked as important — simulating the behaviour of a healthy, trusted sender. The sending volume increases incrementally over 14–21 days until the inbox is ready for campaign use.</p>

<h3>How We Handle Warmup Using Instantly.ai</h3>
<p>We run all inbox warmup through <strong>Instantly.ai</strong>, which has a built-in warmup pool of thousands of real inboxes. When your inbox is in warmup mode, Instantly automatically sends and receives emails within this pool — the emails are opened, replied to, and occasionally moved from spam back to inbox. This signals to Gmail, Outlook, and other providers that your inbox is engaged and trustworthy.</p>

<p>The warmup phase runs for a minimum of 14 days. We do not launch a campaign before it completes — ever. <strong>An inbox that skips warmup will typically hit spam within the first week of sending.</strong> The deliverability damage from launching early is difficult to reverse and can permanently damage the subdomain's reputation.</p>

<blockquote>
  <p>Warmup is not a feature. It is the foundation. Every day you skip it is a day you are sending into a black hole — and burning a domain in the process.</p>
</blockquote>

<!-- IMAGE: image-02.webp | A graph showing inbox warmup progression: sending volume curve rising gradually over 14 days from 0 to 50 emails/day, with Instantly.ai warmup pool illustration below, dark navy background, cyan accent line -->

<hr>

<h2>Multiple Inboxes: The Real Scaling Mechanism</h2>

<p>A single warmed inbox can safely send <strong>30–50 emails per day</strong>. That is the limit recommended by Instantly.ai and consistent with what inbox providers consider normal human sending behaviour. Push beyond it and your sender score drops.</p>

<p>So how do you send 250 or 500 emails per month without burning your inbox? You use multiple inboxes in rotation.</p>

<p>Each inbox is a separate sending address on the subdomain — for example, <em>paulo@mail.yourdomain.com</em>, <em>contact@mail.yourdomain.com</em>, <em>hello@mail.yourdomain.com</em>. Instantly.ai rotates sending across all active inboxes, distributing the daily volume so no single inbox exceeds its safe threshold. <strong>This is not just a deliverability trick — it is a fundamental architecture decision for any serious outreach operation.</strong></p>

<p>Here is how inbox count maps to our packages:</p>

<ul>
  <li><strong>Campaign Starter (100 contacts/mo):</strong> 1 inbox — sufficient for this volume at 30–50 sends/day over the month.</li>
  <li><strong>Campaign Growth (250 contacts/mo):</strong> Up to 3 inboxes in rotation — keeps each inbox within safe limits while reaching 250 contacts.</li>
  <li><strong>Campaign Pro (500+ contacts/mo):</strong> 5 or more inboxes — allows high volume across multiple target segments without any single inbox exceeding its threshold.</li>
</ul>

<p>Each inbox goes through its own full warmup cycle before being added to a live campaign. This is why scaling up is not as simple as doubling the list — <strong>every new inbox needs two weeks of warmup first.</strong></p>

<hr>

<h2>How We Run Campaigns End-to-End on Instantly.ai</h2>

<p>Instantly.ai is the platform we use for everything from warmup to sending to analytics. Here is the actual workflow for every campaign we run:</p>

<ol>
  <li><strong>Lead sourcing:</strong> We scrape verified leads from Google Maps matching the client's target profile — industry, city, company type. We run email verification to remove bounces, role-based addresses, and low-confidence entries before a single contact enters Instantly.</li>
  <li><strong>Sequence build:</strong> We create the 3-step email sequence inside Instantly's sequence builder. Email 1 is the cold intro — problem-aware, no pitch, conversational. Email 2 (sent on day 4) adds value: a relevant insight, question, or case study. Email 3 (sent on day 9) is a short, direct breakup — last attempt before we stop.</li>
  <li><strong>Campaign configuration:</strong> We set daily sending limits per inbox (30–50), enable Instantly's smart send timing (which spreads sends throughout the day to avoid detection as automated), and activate reply detection so the sequence stops automatically when a prospect responds.</li>
  <li><strong>Deliverability monitoring:</strong> Throughout the campaign, we monitor bounce rate (must stay below 5%), spam complaint rate (must stay below 0.3%), and open rate. Instantly's dashboard gives us this data daily. If a metric spikes, we pause the campaign and investigate before resuming.</li>
  <li><strong>Monthly reporting:</strong> At month end, we pull the full Instantly analytics export — sent, opened, replied, bounced, unsubscribed — and write a client report with analysis and recommendations for the next month's targeting and copy.</li>
</ol>

<p>Replies go directly to the client's inbox. We do not handle replies — that is the client's job. Our job is to make sure the right people are reading the message and that the infrastructure keeps running cleanly.</p>

<!-- IMAGE: image-03.webp | A screenshot-style illustration of the Instantly.ai campaign dashboard showing sequence steps, sending stats, open rates and reply tracking — dark theme, cyan accents, professional SaaS UI aesthetic -->

<hr>

<h2>What Results Look Like in 2026</h2>

<p>The industry benchmark for a well-configured, well-targeted cold email campaign is a <strong>3–8% reply rate</strong>. On 100 contacts, that is 3–8 replies per month. Not all will convert — but some will.</p>

<p>In 2026, the campaigns that hit the top of that range share three characteristics: hyper-local targeting (not "all businesses in Switzerland" — "dental clinics in Zurich"), a specific, clear offer (not "I do marketing" — "I build patient booking systems for clinics"), and a fully warmed, technically correct infrastructure.</p>

<p>The campaigns that fail share three characteristics: sending from the main domain, no warmup, and a generic pitch that could have been sent to anyone. <strong>The channel works. The execution is what separates results from bounces.</strong></p>

<hr>

<h2>The Bottom Line</h2>

<p>Cold email in 2026 is a technical sport first, a copywriting sport second. The infrastructure — subdomain, DNS records, warmup, inbox rotation — is not a setup task you do once and forget. It is the foundation that determines whether your message ever reaches a human being.</p>

<p>At Lopes2Tech, we handle every layer of this: lead sourcing, technical setup, warmup, sequence writing, campaign management, and monthly reporting. The only thing you do is reply to the conversations we start for you.</p>

<h3>Key Takeaways</h3>
<ul>
  <li><strong>Cold email changed in 2024–2026:</strong> DMARC is now mandatory. Google's spam threshold is 0.3%. Technical setup is non-negotiable.</li>
  <li><strong>The subdomain is not optional:</strong> Never send from your main domain. One blacklist event kills your business email too.</li>
  <li><strong>Warmup takes 14 days minimum:</strong> We run all warmup through Instantly.ai's warmup pool. Skipping it means sending into spam.</li>
  <li><strong>Multiple inboxes are the scaling mechanism:</strong> 30–50 emails/day per inbox is the safe limit. More volume means more inboxes, each individually warmed.</li>
  <li><strong>Instantly.ai handles the execution:</strong> Sequence builder, smart send timing, reply detection, deliverability monitoring — all in one platform.</li>
  <li><strong>Results: 3–8% reply rate</strong> on well-targeted, well-configured campaigns. Hyper-local targeting consistently outperforms broad lists.</li>
</ul>

<p><strong><a href=\"/en/services/cold-email\">See our Cold Email packages and start your first campaign →</a></strong></p>"""

with open("data/blog-posts.json") as f:
    posts = json.load(f)

idx = next(i for i, p in enumerate(posts) if p["slug"] == "cold-email-outreach-switzerland")

posts[idx]["content"] = content
posts[idx]["title"] = "Cold Email in 2026: Infrastructure, Warmup, and Why Most Campaigns Fail Before They Send"
posts[idx]["excerpt"] = "Cold email changed. DMARC is mandatory, spam thresholds dropped, and AI flooded inboxes. Here's the infrastructure, warmup process, and Instantly.ai workflow that actually works."

# Calculate read time
words = len(re.sub('<[^>]+>', '', content).split())
read_time = math.ceil(words / 200)
posts[idx]["readTime"] = f"{read_time} min"

with open("data/blog-posts.json", "w") as f:
    json.dump(posts, f, indent=2, ensure_ascii=False)
    f.write("\n")

# Validate
with open("data/blog-posts.json") as f:
    json.load(f)

print("✅ Article rewritten and validated")
print(f"   Title: {posts[idx]['title']}")
print(f"   Words: {words} → {read_time} min read")

# Excerpt check
excerpt = posts[idx]["excerpt"]
print(f"   Excerpt: {len(excerpt)} chars")
