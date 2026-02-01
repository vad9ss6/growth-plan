import { Link, useRouterState } from '@tanstack/react-router'

const navItems = [
  { to: '/', label: 'Dashboard', icon: '📊' },
  { to: '/posts', label: 'Posts', icon: '📝' },
  { to: '/media', label: 'Media', icon: '🖼️' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
]

export function Sidebar() {
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/'
    return currentPath.startsWith(path)
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>CMS</h2>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`nav-item ${isActive(item.to) ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p>TanStack Start CMS</p>
        <p className="version">v0.1.0</p>
      </div>
    </aside>
  )
}
