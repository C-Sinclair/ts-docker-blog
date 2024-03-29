import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import App from './App'

const link = createHttpLink({
    uri: 'http://localhost/data'
})
const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
})

ReactDOM.render(
    <ApolloProvider client={ client }>
        <App />
    </ApolloProvider>
    ,
    document.getElementById("content")
)