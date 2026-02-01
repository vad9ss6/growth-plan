import { createFileRoute } from '@tanstack/react-router'

// Mock data - replace with actual API call
const getMedia = async () => {
  return [
    { id: '1', name: 'hero-image.jpg', type: 'image/jpeg', size: '245 KB', url: '/placeholder.jpg' },
    { id: '2', name: 'logo.png', type: 'image/png', size: '12 KB', url: '/placeholder.jpg' },
    { id: '3', name: 'document.pdf', type: 'application/pdf', size: '1.2 MB', url: '/placeholder.pdf' },
  ]
}

export const Route = createFileRoute('/media/')({
  loader: async () => await getMedia(),
  component: MediaPage,
})

function MediaPage() {
  const media = Route.useLoaderData()

  const handleUpload = () => {
    // TODO: Implement file upload
    console.log('Upload clicked')
  }

  return (
    <div className="media-page">
      <div className="page-header">
        <h1>Media Library</h1>
        <button onClick={handleUpload} className="btn btn-primary">
          + Upload File
        </button>
      </div>

      <div className="media-grid">
        {media.map((item) => (
          <div key={item.id} className="media-card">
            <div className="media-preview">
              {item.type.startsWith('image/') ? (
                <div className="image-placeholder">🖼️</div>
              ) : (
                <div className="file-placeholder">📄</div>
              )}
            </div>
            <div className="media-info">
              <span className="media-name">{item.name}</span>
              <span className="media-size">{item.size}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
