import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ArticleForm from '../components/ArticleForm'
import { Article } from '../types'

function EditArticlePage() {
  const { articleId } = useParams()
  const navigate = useNavigate()

  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!articleId) return

    async function fetchArticle() {
      try {
        const response = await fetch(`/articles/${articleId}`)

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Article not found.')
          }
          throw new Error('Failed to load article.')
        }

        const data = await response.json()
        setArticle(data.article ?? data)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Something went wrong.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [articleId])

  async function handleUpdate(data: {
    title: string
    contents: string
  }) {
    try {
      setError('')

      const response = await fetch(`/articles/${articleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update article.')
      }

      navigate(`/articles/${articleId}`)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong.'
      setError(message)
      throw err
    }
  }

  if (loading) {
    return <p className="loading-state">Loading article...</p>
  }

  if (!article) {
    return (
      <section className="edit-article-page">
        <Link to="/" className="back-link">
          ← Back to Articles
        </Link>
        <p className="form-error">
          {error || 'Article not found.'}
        </p>
      </section>
    )
  }

  return (
    <section className="edit-article-page">
      <Link
        to={`/articles/${article.articleId}`}
        className="back-link"
      >
        ← Back to Article
      </Link>

      <div className="form-page-header">
        <h1>Edit Article</h1>
        <p>Make changes to your existing article.</p>
      </div>

      {error && <p className="form-error">{error}</p>}

      <ArticleForm
        key={article.articleId}
        initialData={article}
        onSubmit={handleUpdate}
        submitLabel="Save Changes"
      />
    </section>
  )
}

export default EditArticlePage