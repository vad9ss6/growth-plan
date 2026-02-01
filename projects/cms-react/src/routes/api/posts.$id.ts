import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

// Mock database - replace with actual database
let posts = [
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

export const Route = createFileRoute("/api/posts/$id")({
  server: {
    handlers: {
      // GET /api/posts/:id - Get single post
      GET: async ({ params }: { params: { id: string } }) => {
        const post = posts.find((p) => p.id === params.id);
        if (!post) {
          return json({ error: "Post not found" }, { status: 404 });
        }
        return json(post);
      },

      // PUT /api/posts/:id - Update post
      PUT: async ({
        params,
        request,
      }: {
        params: { id: string };
        request: Request;
      }) => {
        const index = posts.findIndex((p) => p.id === params.id);
        if (index === -1) {
          return json({ error: "Post not found" }, { status: 404 });
        }
        const body = await request.json();
        posts[index] = { ...posts[index], ...body };
        return json(posts[index]);
      },

      // DELETE /api/posts/:id - Delete post
      DELETE: async ({ params }: { params: { id: string } }) => {
        const index = posts.findIndex((p) => p.id === params.id);
        if (index === -1) {
          return json({ error: "Post not found" }, { status: 404 });
        }
        posts = posts.filter((p) => p.id !== params.id);
        return json({ success: true });
      },
    },
  },
});
