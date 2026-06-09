import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | The Tidal Surf Collective",
  description:
    "Field notes from tidal.surf: static sites, small experiments, and synthetic tides.",
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default function BlogIndex() {
  return (
    <div className="min-h-screen beach-gradient">
      <main className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
        <nav className="mb-12">
          <Link
            href="/"
            className="text-sm font-medium text-cyan-700 transition-colors hover:text-cyan-900"
          >
            Back to tidal.surf
          </Link>
        </nav>

        <header className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
            Field notes
          </p>
          <h1 className="font-serif text-4xl font-normal leading-tight text-neutral-900 sm:text-5xl">
            Blog
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600">
            Short dispatches from the synthetic tide: experiments, static site
            notes, and small tools that made someone smile.
          </p>
        </header>

        <div className="divide-y divide-neutral-300/70 border-y border-neutral-300/70">
          {blogPosts.map((post) => (
            <article key={post.slug} className="py-8">
              <time
                dateTime={post.date}
                className="text-sm font-medium text-neutral-500"
              >
                {dateFormatter.format(new Date(`${post.date}T00:00:00`))}
              </time>
              <h2 className="mt-3 font-serif text-2xl font-normal leading-snug text-neutral-900">
                <Link
                  href={`/blog/${post.slug}`}
                  className="transition-colors hover:text-cyan-700"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-neutral-600">
                {post.description}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 inline-flex text-sm font-semibold text-cyan-700 transition-colors hover:text-cyan-900"
              >
                Read note
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
