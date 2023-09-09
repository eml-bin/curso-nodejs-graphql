const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')

const { 
    // ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default')


// Definición de GraphQL, se necesita al menos una definición de tipo para inicializar
const typeDefs = `
    type Query {
        hello: String!
        getPerson(name: String, age: Int): String
        getInt: Int
        getFloat(num: Float): Float!
        getString: String
        getBoolean: Boolean
        getID: ID
        getNums(numbers: [Int!]!): [Int]
        getProduct: Product
    }

    type Product {
        id: ID!
        name: String!
        price: Float!
        description: String!
        image: String!
        createAt: String!
    } 
`;

const resolvers = {
    Query: {
        hello: () => "hi!",
        getPerson: (_, args) => `Hi, my name is ${args.name}, my age is ${args.age}`,
        getInt: () => null, 
        getFloat: (_, args) => args.num,  
        getString: () => "word",
        getBoolean: () => true, 
        getID: () => "123FFF",
        getNums: (_, args) => args.numbers,
        getProduct: () => {
            return {
                id: 1234,
                name: "Product 1",
                price: 200.50,
                description: 'Bla bla bla',
                image: 'https://example.com/image1',
                createAt: new Date().toISOString()
            }
        }
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