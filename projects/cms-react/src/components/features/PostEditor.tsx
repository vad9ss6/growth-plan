import { useState } from 'react'

interface PostEditorProps {
  initialTitle?: string
  initialContent?: string
  initialStatus?: 'draft' | 'published'
  onSave: (data: { title: string; content: string; status: 'draft' | 'published' }) => void
  onCancel: () => void
}

export function PostEditor({
  initialTitle = '',
  initialContent = '',
  initialStatus = 'draft',
  onSave,
  onCancel,
}: PostEditorProps) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [status, setStatus] = useState<'draft' | 'published'>(initialStatus)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ title, content, status })
  }

  return (
    <form onSubmit={handleSubmit} className="post-editor">
      <div className="editor-header">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title..."
          className="title-input"
          required
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
          className="status-select"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="editor-content">
        {/* TODO: Replace with rich text editor (TipTap, Slate, etc.) */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your content here..."
          className="content-textarea"
          rows={20}
          required
        />
      </div>

      <div className="editor-footer">
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save Post
        </button>
      </div>
    </form>
  )
}
