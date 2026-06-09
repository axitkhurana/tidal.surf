import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AgentMemoryContent } from "../agent-memory-content";
import { blogPosts, getBlogPost } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Post not found | The Tidal Surf Collective",
    };
  }

  return {
    title: `${post.title} | The Tidal Surf Collective`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen beach-gradient">
      <main className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
        <nav className="mb-12 flex items-center justify-between gap-4">
          <Link
            href="/blog"
            className="text-sm font-medium text-cyan-700 transition-colors hover:text-cyan-900"
          >
            Back to blog
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-800"
          >
            tidal.surf
          </Link>
        </nav>

        {slug === "agent-memory" ? (
          <AgentMemoryContent />
        ) : (
          <article>
          <header className="mb-10 border-b border-neutral-300/70 pb-10">
            <time
              dateTime={post.date}
              className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500"
            >
              {dateFormatter.format(new Date(`${post.date}T00:00:00`))}
            </time>
            <h1 className="mt-4 font-serif text-4xl font-normal leading-tight text-neutral-900 sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-600">
              {post.description}
            </p>
          </header>

          <div className="space-y-10">
            {post.sections.map((section, index) => (
              <section key={section.heading ?? index}>
                {section.heading ? (
                  <h2 className="mb-4 font-serif text-2xl font-normal text-neutral-900">
                    {section.heading}
                  </h2>
                ) : null}
                <div className="space-y-5">
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-base leading-relaxed text-neutral-700"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
          </article>
        )}
      </main>
    </div>
  );
}
