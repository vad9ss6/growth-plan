import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

// Mock database - replace with actual database
const posts = [
  {
    id: "1",
    title: "Getting Started with TanStack Start",
    content: "Content...",
    status: "published",
    createdAt: "2026-01-30",
  },
  {
    id: "2",
    title: "Building a CMS from Scratch",
    content: "Draft...",
    status: "draft",
    createdAt: "2026-01-31",
  },
];

export const Route = createFileRoute("/api/posts")({
  server: {
    handlers: {
      // GET /api/posts - List all posts
      GET: async () => {
        return json(posts);
      },

      // POST /api/posts - Create a new post
      POST: async ({ request }) => {
        const body = await request.json();
        const newPost = {
          id: String(posts.length + 1),
          ...body,
          createdAt: new Date().toISOString().split("T")[0],
        };
        posts.push(newPost);
        return json(newPost, { status: 201 });
      },
    },
  },
});
