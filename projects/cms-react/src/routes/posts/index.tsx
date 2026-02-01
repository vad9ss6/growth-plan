import { createFileRoute, Link } from '@tanstack/react-router'

// Mock data - replace with actual API call
const getPosts = async () => {
  return [
    { id: '1', title: 'Getting Started with TanStack Start', status: 'published', createdAt: '2026-01-30' },
    { id: '2', title: 'Building a CMS from Scratch', status: 'draft', createdAt: '2026-01-31' },
    { id: '3', title: 'Docker for Frontend Developers', status: 'published', createdAt: '2026-01-29' },
  ]
}

export const Route = createFileRoute('/posts/')({
  loader: async () => await getPosts(),
  component: PostsPage,
})

function PostsPage() {
  const posts = Route.useLoaderData()

  return (
    <div className="posts-page">
      <div className="page-header">
        <h1>Posts</h1>
        <Link to="/posts/new" className="btn btn-primary">
          + New Post
        </Link>
      </div>

      <div className="posts-list">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-info">
              <Link to="/posts/$postId" params={{ postId: post.id }}>
                <h3>{post.title}</h3>
              </Link>
              <span className={`status status-${post.status}`}>{post.status}</span>
            </div>
            <div className="post-meta">
              <span>{post.createdAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
