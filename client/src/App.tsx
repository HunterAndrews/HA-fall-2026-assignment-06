import { Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'

import ArticlesPage from './pages/ArticlesPage'
import ArticleDetailPage from './pages/ArticleDetailPage'
import CreateArticlePage from './pages/CreateArticlePage'
import EditArticlePage from './pages/EditArticlePage'

function App() {
    return (
        <>
            <Navbar />

            <main className="main-content">
                <Routes>
                    <Route path="/" element={<ArticlesPage />} />
                    <Route path="/articles" element={<ArticlesPage />} />

                    <Route
                        path="/articles/create"
                        element={<CreateArticlePage />}
                    />

                    <Route
                        path="/articles/:articleId"
                        element={<ArticleDetailPage />}
                    />

                    <Route
                        path="/articles/:articleId/edit"
                        element={<EditArticlePage />}
                    />

                    <Route
                        path="*"
                        element={
                            <div className="empty-state">
                                <h2>Page Not Found</h2>
                                <p style={{ margin: '10px 0 20px' }}>
                                    The page you are looking for does not exist.
                                </p>
                                <Link to="/" className="back-link">
                                    ← Return to Articles
                                </Link>
                            </div>
                        }
                    />
                </Routes>
            </main>
        </>
    )
}

export default App