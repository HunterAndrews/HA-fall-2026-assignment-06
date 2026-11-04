import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ArticleForm from '../components/ArticleForm'

function CreateArticlePage() {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  async function handleCreate(data: {
    title: string
    contents: string
  }) {
    try {
      setError('')

      const response = await fetch('/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to create article.')
      }

      const result = await response.json()
      const newArticle = result.article ?? result

      navigate(`/articles/${newArticle.articleId}`)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong.'
      setError(message)
      throw err
    }
  }

  return (
    <section className="create-article-page">
      <Link to="/" className="back-link">
        ← Back to Articles
      </Link>

      <div className="form-page-header">
        <h1>Create Article</h1>
        <p>Share your thoughts and ideas with the community.</p>
      </div>

      {error && <p className="form-error">{error}</p>}

      <ArticleForm
        onSubmit={handleCreate}
        submitLabel="Publish Article"
      />
    </section>
  )
}

export default CreateArticlePage