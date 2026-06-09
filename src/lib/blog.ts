export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  sections: {
    heading?: string;
    body: string[];
  }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "agent-memory",
    title: "Agents Do Not Need More Memory. They Need Better State.",
    date: "2026-06-09",
    description:
      "A field guide to agent memory as governed state: write policy, store, retrieval policy, validation loop, system archetypes, failure modes, and evals.",
    sections: [],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
