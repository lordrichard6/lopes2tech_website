import BlogPostContent from "./BlogPostContent";
import blogPostsEn from "@/data/blog-posts.json";

interface BlogPost {
    slug: string;
}

export async function generateStaticParams() {
    const locales = ["en", "pt", "de"];
    const slugs = (blogPostsEn as BlogPost[]).map((p) => p.slug);
    return locales.flatMap((locale) =>
        slugs.map((slug) => ({ locale, slug }))
    );
}

export default function BlogPostPage() {
    return <BlogPostContent />;
}
