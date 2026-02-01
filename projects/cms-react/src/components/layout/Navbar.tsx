export function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="menu-toggle" aria-label="Toggle menu">
          ☰
        </button>
        <span className="breadcrumb">Dashboard</span>
      </div>

      <div className="navbar-right">
        <button className="navbar-btn" aria-label="Notifications">
          🔔
        </button>
        <div className="user-menu">
          <span className="avatar">👤</span>
          <span className="username">Admin</span>
        </div>
      </div>
    </header>
  )
}
