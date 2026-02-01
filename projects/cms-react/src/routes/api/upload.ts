import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

export const Route = createFileRoute("/api/upload")({
  server: {
    handlers: {
      // POST /api/upload - Upload file
      POST: async ({ request }) => {
        // TODO: Implement actual file upload logic
        // This is a placeholder that simulates upload

        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
          return json({ error: "No file provided" }, { status: 400 });
        }

        // Mock response - replace with actual upload logic
        const mockUpload = {
          id: String(Date.now()),
          name: file instanceof File ? file.name : "unknown",
          size: file instanceof File ? file.size : 0,
          type: file instanceof File ? file.type : "unknown",
          url: `/uploads/${Date.now()}-${file instanceof File ? file.name : "file"}`,
          createdAt: new Date().toISOString(),
        };

        return json(mockUpload, { status: 201 });
      },
    },
  },
});
