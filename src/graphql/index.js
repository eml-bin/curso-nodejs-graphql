const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')

const { loadFiles } = require('@graphql-tools/load-files')

const { 
    // ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default')

const resolvers = require('./resolvers')

const useGraphQL = async (app) => {
    const server = new ApolloServer({
        typeDefs: await loadFiles('./src/**/*.graphql'),
        resolvers,
        playground: true,
        plugins: [
            ApolloServerPluginLandingPageLocalDefault({ footer: false })
        ]
    })

    await server.start()
    app.use(
        '/graphql',
        expressMiddleware(server, {
          context: async ({ req }) => ({ token: req.headers.token }),
        }),
    );
}

module.exports = useGraphQL 