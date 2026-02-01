import { Link } from '@tanstack/react-router'

interface Post {
  id: string
  title: string
  status: 'draft' | 'published'
  createdAt: string
}

interface PostListProps {
  posts: Post[]
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="empty-state">
        <p>No posts yet.</p>
        <Link to="/posts/new" className="btn btn-primary">
          Create your first post
        </Link>
      </div>
    )
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <article key={post.id} className="post-item">
          <Link to="/posts/$postId" params={{ postId: post.id }}>
            <h3 className="post-title">{post.title}</h3>
          </Link>
          <div className="post-meta">
            <span className={`status status-${post.status}`}>
              {post.status}
            </span>
            <span className="date">{post.createdAt}</span>
          </div>
        </article>
      ))}
    </div>
  )
}
