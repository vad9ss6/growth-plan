import { createServerFn } from '@tanstack/react-start'

/**
 * Server functions for posts
 * These run ONLY on the server and are type-safe
 */

// Types
interface Post {
  id: string
  title: string
  content: string
  status: 'draft' | 'published'
  createdAt: string
}

interface CreatePostInput {
  title: string
  content: string
  status: 'draft' | 'published'
}

// Mock database - replace with actual database (Prisma, Drizzle, etc.)
let posts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with TanStack Start',
    content: 'TanStack Start is a full-stack React framework...',
    status: 'published',
    createdAt: '2026-01-30',
  },
  {
    id: '2',
    title: 'Building a CMS from Scratch',
    content: 'In this tutorial, we will build a CMS...',
    status: 'draft',
    createdAt: '2026-01-31',
  },
]

/**
 * Get all posts
 */
export const getPosts = createServerFn({ method: 'GET' }).handler(async () => {
  return posts
})

/**
 * Get a single post by ID
 */
export const getPost = createServerFn({ method: 'GET' })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    const post = posts.find((p) => p.id === id)
    if (!post) {
      throw new Error('Post not found')
    }
    return post
  })

/**
 * Create a new post
 */
export const createPost = createServerFn({ method: 'POST' })
  .inputValidator((data: CreatePostInput) => data)
  .handler(async ({ data }) => {
    const newPost: Post = {
      id: String(Date.now()),
      ...data,
      createdAt: new Date().toISOString().split('T')[0],
    }
    posts.push(newPost)
    return newPost
  })

/**
 * Update a post
 */
export const updatePost = createServerFn({ method: 'POST' })
  .inputValidator((data: { id: string; updates: Partial<CreatePostInput> }) => data)
  .handler(async ({ data: { id, updates } }) => {
    const index = posts.findIndex((p) => p.id === id)
    if (index === -1) {
      throw new Error('Post not found')
    }
    posts[index] = { ...posts[index], ...updates }
    return posts[index]
  })

/**
 * Delete a post
 */
export const deletePost = createServerFn({ method: 'POST' })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    const index = posts.findIndex((p) => p.id === id)
    if (index === -1) {
      throw new Error('Post not found')
    }
    posts = posts.filter((p) => p.id !== id)
    return { success: true }
  })
