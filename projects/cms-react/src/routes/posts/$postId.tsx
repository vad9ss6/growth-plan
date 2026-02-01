import { createFileRoute, Link } from '@tanstack/react-router'

// Mock data - replace with actual API call
const getPost = async (id: string) => {
  const posts: Record<string, { id: string; title: string; content: string; status: string }> = {
    '1': { id: '1', title: 'Getting Started with TanStack Start', content: 'This is the content...', status: 'published' },
    '2': { id: '2', title: 'Building a CMS from Scratch', content: 'Draft content here...', status: 'draft' },
    '3': { id: '3', title: 'Docker for Frontend Developers', content: 'Docker tutorial content...', status: 'published' },
  }
  return posts[id] || null
}

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    const post = await getPost(params.postId)
    if (!post) {
      throw new Error('Post not found')
    }
    return post
  },
  component: PostDetailPage,
})

function PostDetailPage() {
  const post = Route.useLoaderData()
  const { postId } = Route.useParams()

  return (
    <div className="post-detail-page">
      <div className="page-header">
        <Link to="/posts" className="back-link">
          ← Back to Posts
        </Link>
        <div className="actions">
          <button className="btn btn-secondary">Edit</button>
          <button className="btn btn-danger">Delete</button>
        </div>
      </div>

      <article className="post-content">
        <h1>{post.title}</h1>
        <span className={`status status-${post.status}`}>{post.status}</span>
        <div className="content">
          <p>{post.content}</p>
        </div>
      </article>
    </div>
  )
}
