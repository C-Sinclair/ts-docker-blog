import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/Header'
import './assets/styles/_globals.sass'

const Index = () => {
    return (
        <div>
            <Header />
            React is functional
        </div>
    )
}

ReactDOM.render(<Index />, document.getElementById("content"))