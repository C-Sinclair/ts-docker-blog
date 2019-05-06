import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Article from './components/Article'
import './assets/styles/_globals.sass'

class App extends React.Component {

    state = {
        articles: null
    }

    render() {
        const { articles } = this.state
        return (
            <Router>
                <Header />
                { Sidebar(articles) }
                <main>
                    <Route path="/g/:articleId" component={ Article } />
                </main>
            </Router>
        )
    }
}

export default App