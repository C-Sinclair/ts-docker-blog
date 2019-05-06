import { Component } from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Header from '../components/Header'
import { Sidebar, SidebarItem } from '../components/Sidebar'
import Article from '../components/Article'
import '../assets/styles/_globals.sass'

class App extends Component {

    state = {
        articles: null
    }

    componentDidMount() {
        // fetch(API_URL)
        //     .then(res => res.json())
        //     .then(articles => {
        //         this.setState({ articles })
        //     })
    }

    render() {
        const { articles } = this.state
        return (
            <Router>
                <Header />
                <Sidebar>
                    { articles ? (
                        articles.map(article => (
                            <SidebarItem key={ article.id }>
                                <Link to={ `/a/${article.id}` }>
                                    { article.title }
                                </Link>
                            </SidebarItem>
                        ))
                    ) : (
                        <div>Loading...</div>
                    )}
                </Sidebar>
                <main>
                    <Route path="/g/:articleId" component={ Article } />
                </main>
            </Router>
        )
    }
}

export default App