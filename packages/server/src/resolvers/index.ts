import { Resolver, Query } from 'type-graphql'

@Resolver()
export class ArticleResolver {
    private articlesCollection: Article[] = []

    @Query(() => [Article])
    async articles() {
        return await this.articlesCollection
    }
}