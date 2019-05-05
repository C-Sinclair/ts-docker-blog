import { ApolloServer } from 'apollo-server-express'
import * as Express from 'express'
import { buildSchema, Resolver, Query } from 'type-graphql'
import { ArticleResolver } from './resolvers'
import 'reflect-metadata'
import * as path from 'path'
import * as http from 'http'
import mongoose from 'mongoose'
import * as bodyParser from 'body-parser'

const PORT = process.env.PORT || 80
const NODE_ENV = process.env.NODE_ENV || 'development'

const publicIndex = path.resolve(__dirname, "../../client/dist/index.html")

mongoose.connect(`mongodb://localhost:27017`) // could be mongo (container_name) if localhost fails

const main = async () => {

    const schema = await buildSchema({
        resolvers: [ 
            ArticleResolver 
        ]
    })

    const apolloServer = new ApolloServer({ schema })

    const app = Express()

    apolloServer.applyMiddleware({ app })

    app.set('port', PORT)

    app.use(bodyParser.json())
    app.use('/data', )

    app.use(Express.static(path.resolve(__dirname, '../../client')))
    app.use(Express.static(path.resolve(__dirname, '../../../node_modules')))

    app.get('/*', (req: Express.Request, res: Express.Response) => {
        res.sendFile(publicIndex)
    })

    if (NODE_ENV === 'development') {
        app.use((err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
            res.status(err.status || 500)
            res.json({
                error: err,
                message: err.message
            })
        })
    }

    app.use((req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
        let err = new Error("Not Found")
        next(err)
    })

    // Production error - no stacktrace
    app.use((err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
        res.status(err.status || 500)
        res.json({
            error: {},
            message: err.message
        })
    })

    const server: http.Server = app.listen(PORT)
}

main()