import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  const [siteName, setSiteName] = useState('My CMS')
  const [siteDescription, setSiteDescription] = useState('A content management system built with TanStack Start')

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Save settings via server function
    console.log('Saving settings:', { siteName, siteDescription })
  }

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
      </div>

      <form onSubmit={handleSave} className="settings-form">
        <section className="settings-section">
          <h2>General</h2>
          
          <div className="form-group">
            <label htmlFor="siteName">Site Name</label>
            <input
              id="siteName"
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="siteDescription">Site Description</label>
            <textarea
              id="siteDescription"
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
              rows={3}
            />
          </div>
        </section>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Save Settings
          </button>
        </div>
      </form>
    </div>
  )
}
