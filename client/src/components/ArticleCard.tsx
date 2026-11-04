import { Link } from 'react-router-dom'
import { Article } from '../types'

interface ArticleCardProps {
    article: Article
}

function ArticleCard({ article }: ArticleCardProps) {
    const preview =
        article.contents && article.contents.length > 150
            ? article.contents.substring(0, 150) + '...'
            : article.contents || ''

    return (
        <article className="article-card">
            <div className="article-card-content">
                <h2 className="article-card-title">
                    {article.title}
                </h2>

                <p className="article-card-preview">
                    {preview}
                </p>

                <Link
                    to={`/articles/${article.articleId}`}
                    className="article-card-link"
                >
                    Read Article →
                </Link>
            </div>
        </article>
    )
}

export default ArticleCard