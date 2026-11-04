import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                Articles & Comments
                </Link>

        <div className="navbar-links">
            <Link to="/" className="navbar-link">
            Articles
            </Link>

            <Link to="/articles/create" className="navbar-button">
            Create Article
            </Link>
            </div>
        </div>
    </nav>
  )
}

export default Navbar