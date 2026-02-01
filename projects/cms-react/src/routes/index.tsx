import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  // Mock stats - replace with actual data
  const stats = {
    totalPosts: 12,
    publishedPosts: 8,
    draftPosts: 4,
    mediaFiles: 24,
  };
  console.log(stats);
  const recentPosts = [
    {
      id: "1",
      title: "Getting Started with TanStack Start",
      status: "published",
    },
    { id: "2", title: "Building a CMS from Scratch", status: "draft" },
    { id: "3", title: "Docker for Frontend Developers", status: "published" },
  ];

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">📝</span>
          <div className="stat-info">
            <span className="stat-value">{stats.totalPosts}</span>
            <span className="stat-label">Total Posts</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">✅</span>
          <div className="stat-info">
            <span className="stat-value">{stats.publishedPosts}</span>
            <span className="stat-label">Published</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📋</span>
          <div className="stat-info">
            <span className="stat-value">{stats.draftPosts}</span>
            <span className="stat-label">Drafts</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🖼️</span>
          <div className="stat-info">
            <span className="stat-value">{stats.mediaFiles}</span>
            <span className="stat-label">Media Files</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <section className="dashboard-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions">
          <Link to="/posts/new" className="btn btn-primary">
            + New Post
          </Link>
          <Link to="/media" className="btn btn-secondary">
            Upload Media
          </Link>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>Recent Posts</h2>
          <Link to="/posts" className="view-all">
            View all →
          </Link>
        </div>
        <div className="recent-posts">
          {recentPosts.map((post) => (
            <div key={post.id} className="post-card">
              <Link to="/posts/$postId" params={{ postId: post.id }}>
                <h3>{post.title}</h3>
              </Link>
              <span className={`status status-${post.status}`}>
                {post.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          border: 1px solid var(--gray-200);
        }

        .stat-icon {
          font-size: 2rem;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: 700;
        }

        .stat-label {
          color: var(--gray-500);
          font-size: 0.875rem;
        }

        .dashboard-section {
          background: white;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
          border: 1px solid var(--gray-200);
        }

        .dashboard-section h2 {
          font-size: 1.25rem;
          margin-bottom: 16px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .section-header h2 {
          margin-bottom: 0;
        }

        .view-all {
          color: var(--primary-color);
          text-decoration: none;
          font-size: 0.875rem;
        }

        .view-all:hover {
          text-decoration: underline;
        }

        .quick-actions {
          display: flex;
          gap: 12px;
        }

        .recent-posts .post-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
