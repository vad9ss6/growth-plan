/**
 * API client helpers for the CMS
 */

const API_BASE = '/api'

interface RequestOptions extends RequestInit {
  params?: Record<string, string>
}

/**
 * Base fetch wrapper with error handling
 */
async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options

  let url = `${API_BASE}${endpoint}`
  if (params) {
    const searchParams = new URLSearchParams(params)
    url += `?${searchParams.toString()}`
  }

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
    ...fetchOptions,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }))
    throw new Error(error.message || `HTTP error! status: ${response.status}`)
  }

  return response.json()
}

/**
 * API methods
 */
export const api = {
  get: <T>(endpoint: string, params?: Record<string, string>) =>
    request<T>(endpoint, { method: 'GET', params }),

  post: <T>(endpoint: string, data: unknown) =>
    request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  put: <T>(endpoint: string, data: unknown) =>
    request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: 'DELETE' }),

  upload: async <T>(endpoint: string, file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`)
    }

    return response.json() as Promise<T>
  },
}

/**
 * Posts API
 */
export const postsApi = {
  getAll: () => api.get<Post[]>('/posts'),
  getById: (id: string) => api.get<Post>(`/posts/${id}`),
  create: (data: CreatePostInput) => api.post<Post>('/posts', data),
  update: (id: string, data: UpdatePostInput) => api.put<Post>(`/posts/${id}`, data),
  delete: (id: string) => api.delete<{ success: boolean }>(`/posts/${id}`),
}

/**
 * Media API
 */
export const mediaApi = {
  getAll: () => api.get<MediaItem[]>('/media'),
  upload: (file: File) => api.upload<MediaItem>('/upload', file),
  delete: (id: string) => api.delete<{ success: boolean }>(`/media/${id}`),
}

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

interface UpdatePostInput {
  title?: string
  content?: string
  status?: 'draft' | 'published'
}

interface MediaItem {
  id: string
  name: string
  type: string
  size: number
  url: string
}
