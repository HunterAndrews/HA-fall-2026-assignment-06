import { useState } from 'react'
import { Comment } from '../types'
import CommentForm from './CommentForm'

interface CommentListProps {
    comments: Comment[]
    onEdit: (commentId: number, body: string) => void | Promise<void>
    onDelete: (commentId: number) => void | Promise<void>
}

function CommentList({
    comments,
    onEdit,
    onDelete,
}: CommentListProps) {
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null)

    async function handleEditSubmit(commentId: number, body: string) {
        await onEdit(commentId, body)
        setEditingCommentId(null)
    }

    return (
        <section className="comments-section">
            <div className="comments-header">
                <h2>Comments</h2>
                <span className="comments-count">
                    {comments.length}
                </span>
            </div>

            {comments.length === 0 ? (
                <p className="no-comments">
                    No comments yet. Be the first to comment!
                </p>
            ) : (
                <div className="comments-list">
                    {comments.map((comment) => (
                        <div className="comment-card" key={comment.commentId}>
                            {editingCommentId === comment.commentId ? (
                                <CommentForm
                                    key={comment.commentId}
                                    initialBody={comment.body}
                                    submitLabel="Save Changes"
                                    onSubmit={(body) =>
                                        handleEditSubmit(comment.commentId, body)
                                    }
                                    onCancel={() => setEditingCommentId(null)}
                                />
                            ) : (
                                <>
                                    <p className="comment-body">
                                        {comment.body}
                                    </p>

                                    <div className="comment-actions">
                                        <button
                                            type="button"
                                            className="comment-edit"
                                            onClick={() => setEditingCommentId(comment.commentId)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            className="comment-delete"
                                            onClick={() => onDelete(comment.commentId)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}

export default CommentList