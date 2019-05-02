import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-memory'

import Header from './components/Header'
import { Sidebar, SidebarItem } from './components/Sidebar'
import Article from './components/Article'

import './assets/styles/_globals.sass'

const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
})
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

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

ReactDOM.render(
    <ApolloClient client={ client }>
        <App />
    </ApolloClient>,
    document.getElementById("content")
)