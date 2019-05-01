import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Header from './components/Header'
import { Sidebar, SidebarItem } from './components/Sidebar'
import Article from './components/Article'

import './assets/styles/_globals.sass'

const API_URL = ""

class App extends Component {

    state = {
        articles: null
    }

    componentDidMount() {
        fetch(API_URL)
            .then(res => res.json())
            .then(articles => {
                this.setState({ articles })
            })
    }

    render() {
        const { articles } = this.state
        return (
            <Router>
                <div>
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
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("content"))