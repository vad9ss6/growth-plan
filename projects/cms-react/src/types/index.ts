/**
 * Shared types for the CMS
 */

// Post types
export interface Post {
  id: string
  title: string
  content: string
  status: PostStatus
  createdAt: string
  updatedAt?: string
}

export type PostStatus = 'draft' | 'published'

export interface CreatePostInput {
  title: string
  content: string
  status: PostStatus
}

export interface UpdatePostInput {
  title?: string
  content?: string
  status?: PostStatus
}

// Media types
export interface MediaItem {
  id: string
  name: string
  type: string
  size: number
  url: string
  createdAt: string
}

export interface UploadResponse {
  id: string
  name: string
  url: string
  size: number
  type: string
}

// Settings types
export interface SiteSettings {
  siteName: string
  siteDescription: string
  logo?: string
  favicon?: string
}

// API response types
export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface ApiError {
  message: string
  code?: string
  status: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
