import { useState } from 'react'
import { Article } from '../types'

interface ArticleFormProps {
    initialData?: Article
    onSubmit: (data: { title: string; contents: string }) => void | Promise<void>
    submitLabel: string
}

function ArticleForm({
    initialData,
    onSubmit,
    submitLabel,
}: ArticleFormProps) {
    const [title, setTitle] = useState(initialData?.title || '')
    const [contents, setContents] = useState(initialData?.contents || '')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!title.trim() || !contents.trim()) {
            setError('Please fill out both the title and contents.')
            return
        }

        setError('')
        setIsSubmitting(true)

        try {
            await onSubmit({
                title: title.trim(),
                contents: contents.trim(),
            })
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to submit article.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form className="article-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="article-title">Article Title</label>

                <input
                    id="article-title"
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Enter your article title..."
                    disabled={isSubmitting}
                />
            </div>

            <div className="form-group">
                <label htmlFor="article-contents">Article Contents</label>

                <textarea
                    id="article-contents"
                    value={contents}
                    onChange={(event) => setContents(event.target.value)}
                    placeholder="Write your article here..."
                    rows={10}
                    disabled={isSubmitting}
                />
            </div>

            {error && (
                <p className="form-error">
                    {error}
                </p>
            )}

            <button type="submit" className="form-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : submitLabel}
            </button>
        </form>
    )
}

export default ArticleForm