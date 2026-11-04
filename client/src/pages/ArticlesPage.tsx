import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ArticleCard from '../components/ArticleCard'
import { Article } from '../types'

function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const delay = search === '' ? 0 : 250

    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true)
        setError('')

        const query = search.trim()
          ? `?title_contains=${encodeURIComponent(search.trim())}`
          : ''

        const response = await fetch(`/articles${query}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Failed to fetch articles.')
        }

        const data = await response.json()
        setArticles(Array.isArray(data) ? data : data.articles ?? [])
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          return
        }
        setError(
          err instanceof Error ? err.message : 'Something went wrong.'
        )
      } finally {
        setLoading(false)
      }
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [search])

  return (
    <section className="articles-page">
      <div className="page-header">
        <div>
          <h1>Articles</h1>
          <p>Discover articles and join the conversation.</p>
        </div>

        <Link to="/articles/create" className="form-submit">
          Create Article
        </Link>
      </div>

      <div className="article-search">
        <input
          type="text"
          placeholder="Search articles by title..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {loading && <p className="loading-state">Loading articles...</p>}

      {error && <p className="form-error">{error}</p>}

      {!loading && !error && articles.length === 0 && (
        <p className="empty-state">
          {search
            ? 'No articles match your search.'
            : 'No articles yet. Create the first article!'}
        </p>
      )}

      {!loading && !error && articles.length > 0 && (
        <div className="articles-grid">
          {articles.map((article) => (
            <ArticleCard
              key={article.articleId}
              article={article}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default ArticlesPage