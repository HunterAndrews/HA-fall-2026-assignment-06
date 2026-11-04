import { useState } from 'react'

interface CommentFormProps {
    initialBody?: string
    submitLabel: string
    onSubmit: (body: string) => void | Promise<void>
    onCancel?: () => void
}

function CommentForm({
    initialBody = '',
    submitLabel,
    onSubmit,
    onCancel,
}: CommentFormProps) {
    const [body, setBody] = useState(initialBody)
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!body.trim()) {
            setError('Comment cannot be empty.')
            return
        }

        setError('')
        setIsSubmitting(true)

        try {
            await onSubmit(body.trim())
            if (!onCancel) {
                setBody('')
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save comment.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="comment-body">Your Comment</label>

                <textarea
                    id="comment-body"
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                    placeholder="Write your comment..."
                    rows={4}
                    disabled={isSubmitting}
                />
            </div>

            {error && (
                <p className="form-error">
                    {error}
                </p>
            )}

            <div className="comment-form-actions">
                <button type="submit" className="form-submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : submitLabel}
                </button>

                {onCancel && (
                    <button
                        type="button"
                        className="form-cancel"
                        onClick={onCancel}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    )
}

export default CommentForm