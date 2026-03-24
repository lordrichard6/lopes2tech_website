import blogPostsEn from "@/data/blog-posts.json";
import blogPostsDe from "@/data/blog-posts-de.json";
import blogPostsPt from "@/data/blog-posts-pt.json";
import blogPostsFr from "@/data/blog-posts-fr.json";
import blogPostsIt from "@/data/blog-posts-it.json";

const BASE_URL = "https://lopes2tech.ch";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
}

const blogPostsByLocale: Record<string, BlogPost[]> = {
  en: blogPostsEn as BlogPost[],
  de: blogPostsDe as BlogPost[],
  pt: blogPostsPt as BlogPost[],
  fr: blogPostsFr as BlogPost[],
  it: blogPostsIt as BlogPost[],
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const posts = blogPostsByLocale[locale] || blogPostsByLocale.en;

  const rssItems = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE_URL}/${locale}/insights/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/${locale}/insights/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>paulo@lopes2tech.ch (${post.author})</author>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
      <enclosure url="${BASE_URL}${post.image}" type="image/webp" />
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Lopes2Tech Insights</title>
    <link>${BASE_URL}/${locale}/insights</link>
    <description>Expert articles on AI workflows, technical SEO, web development, and business automation for Swiss businesses.</description>
    <language>${locale}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/${locale}/insights/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${BASE_URL}/logo_w.svg</url>
      <title>Lopes2Tech</title>
      <link>${BASE_URL}</link>
    </image>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
