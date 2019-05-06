import * as React from 'react'
import { BrowserRouter as Link } from 'react-router-dom'
import styles from './sidebar.module.sass'

const Sidebar = articles => (
    <nav className={styles.sidebar}>
        Sidebar is functional

        { articles ? (
            <ul>
                { articles.map(article => SidebarItem(article)) }
            </ul>
        ) : (
            <div>Loading...</div>
        )}
    </nav>
)

const SidebarItem = article => {
    <li key={ article.id }>
        <Link to={ `/a/${article.id}` }>
            { article.title }
        </Link>
    </li>
}

export default Sidebar