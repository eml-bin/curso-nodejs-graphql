const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')

const { 
    // ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default')


// Definición de GraphQL, se necesita al menos una definición de tipo para inicializar
const typeDefs = `
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'hola mundo'
    }
}

const useGraphQL = async (app) => {
    const server = new ApolloServer({
        typeDefs,
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