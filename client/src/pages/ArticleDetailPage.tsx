import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CommentList from '../components/CommentList'
import CommentForm from '../components/CommentForm'
import { Article, Comment } from '../types'

function ArticleDetailPage() {
  const { articleId } = useParams()
  const navigate = useNavigate()

  const [article, setArticle] = useState<Article | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!articleId) return

    async function fetchArticleData() {
      try {
        setLoading(true)
        setError('')

        const [articleResponse, commentsResponse] = await Promise.all([
          fetch(`/articles/${articleId}`),
          fetch(`/articles/${articleId}/comments`),
        ])

        if (!articleResponse.ok) {
          if (articleResponse.status === 404) {
            throw new Error('Article not found.')
          }
          throw new Error('Failed to load article.')
        }

        const articleData = await articleResponse.json()
        setArticle(articleData.article ?? articleData)

        if (commentsResponse.ok) {
          const commentsData = await commentsResponse.json()
          setComments(
            Array.isArray(commentsData)
              ? commentsData
              : commentsData.comments ?? []
          )
        } else {
          setComments([])
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Something went wrong.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchArticleData()
  }, [articleId])

  async function handleDeleteArticle() {
    const confirmed = window.confirm(
      'Are you sure you want to delete this article?'
    )

    if (!confirmed) return

    try {
      setError('')
      const response = await fetch(`/articles/${articleId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete article.')
      }

      navigate('/')
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to delete article.'
      )
    }
  }

  async function handleAddComment(body: string) {
    setError('')
    const response = await fetch(
      `/articles/${articleId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body }),
      }
    )

    if (!response.ok) {
      throw new Error('Failed to add comment.')
    }

    const data = await response.json()
    const newComment: Comment = data.comment ?? data

    setComments((previousComments) => [
      ...previousComments,
      newComment,
    ])
  }

  async function handleEditComment(commentId: number, body: string) {
    setError('')
    const response = await fetch(
      `/articles/${articleId}/comments/${commentId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body }),
      }
    )

    if (!response.ok) {
      throw new Error('Failed to update comment.')
    }

    setComments((previousComments) =>
      previousComments.map((comment) =>
        comment.commentId === commentId
          ? { ...comment, body }
          : comment
      )
    )
  }

  async function handleDeleteComment(commentId: number) {
    try {
      setError('')
      const response = await fetch(
        `/articles/${articleId}/comments/${commentId}`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        throw new Error('Failed to delete comment.')
      }

      setComments((previousComments) =>
        previousComments.filter(
          (comment) => comment.commentId !== commentId
        )
      )
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to delete comment.'
      )
    }
  }

  if (loading) {
    return <p className="loading-state">Loading article...</p>
  }

  if (error && !article) {
    return (
      <section className="article-detail-page">
        <Link to="/" className="back-link">
          ← Back to Articles
        </Link>
        <p className="form-error">{error}</p>
      </section>
    )
  }

  if (!article) {
    return (
      <section className="article-detail-page">
        <Link to="/" className="back-link">
          ← Back to Articles
        </Link>
        <p>Article not found.</p>
      </section>
    )
  }

  return (
    <section className="article-detail-page">
      <Link to="/" className="back-link">
        ← Back to Articles
      </Link>

      {error && <p className="form-error">{error}</p>}

      <article className="article-detail">
        <div className="article-detail-header">
          <h1>{article.title}</h1>

          <div className="article-actions">
            <Link
              to={`/articles/${article.articleId}/edit`}
              className="article-btn-edit"
            >
              Edit Article
            </Link>

            <button
              type="button"
              className="article-btn-delete"
              onClick={handleDeleteArticle}
            >
              Delete Article
            </button>
          </div>
        </div>

        <div className="article-detail-content">
          <p>{article.contents}</p>
        </div>
      </article>

      <div className="comments-container">
        <CommentList
          comments={comments}
          onEdit={handleEditComment}
          onDelete={handleDeleteComment}
        />

        <div className="add-comment-section">
          <h3>Add a Comment</h3>

          <CommentForm
            submitLabel="Post Comment"
            onSubmit={handleAddComment}
          />
        </div>
      </div>
    </section>
  )
}

export default ArticleDetailPage