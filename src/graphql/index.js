const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')

const { loadFiles } = require('@graphql-tools/load-files')

const { buildContext } = require("graphql-passport")

const { typeDefs: scalarsTypeDefs, resolvers: scalarsResolvers } = require('graphql-scalars')

const { 
    // ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default')

const resolvers = require('./resolvers')

const useGraphQL = async (app) => {
    
    const typeDefs = [
        ...await loadFiles('./src/**/*.graphql'),
        scalarsTypeDefs
    ]

    const allResolvers = [
        resolvers,
        scalarsResolvers
    ]

    const server = new ApolloServer({
        typeDefs,
        resolvers: allResolvers,
        playground: true,
        plugins: [
            ApolloServerPluginLandingPageLocalDefault({ footer: false })
        ]
    })

    await server.start()
    app.use(
        '/graphql',
        expressMiddleware(server, {
          context: async ({ req, res }) => buildContext({ req, res }),
        }),
    );
}

module.exports = useGraphQL 