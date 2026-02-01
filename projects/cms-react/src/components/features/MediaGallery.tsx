interface MediaItem {
  id: string
  name: string
  type: string
  size: string
  url: string
}

interface MediaGalleryProps {
  items: MediaItem[]
  onSelect?: (item: MediaItem) => void
  onDelete?: (id: string) => void
}

export function MediaGallery({ items, onSelect, onDelete }: MediaGalleryProps) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>No media files yet.</p>
        <p className="hint">Upload your first file to get started.</p>
      </div>
    )
  }

  const isImage = (type: string) => type.startsWith('image/')

  return (
    <div className="media-gallery">
      {items.map((item) => (
        <div
          key={item.id}
          className="media-item"
          onClick={() => onSelect?.(item)}
        >
          <div className="media-preview">
            {isImage(item.type) ? (
              <img src={item.url} alt={item.name} />
            ) : (
              <div className="file-icon">📄</div>
            )}
          </div>
          <div className="media-details">
            <span className="media-name" title={item.name}>
              {item.name}
            </span>
            <span className="media-size">{item.size}</span>
          </div>
          {onDelete && (
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(item.id)
              }}
              aria-label="Delete"
            >
              🗑️
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
