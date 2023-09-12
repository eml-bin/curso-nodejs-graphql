// Directorio de resolvers

const { getProduct, getProducts, addProduct, updateProduct, deleteProduct } = require('./product.resolvers')
const { addCategory } = require('./category.resolvers')
const { login } = require('./auth.resolvers')

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
        // Products
        product: getProduct,
        products: getProducts
    },
    Mutation: {
        addProduct,
        updateProduct,
        deleteProduct,
        login,
        addCategory
    }
}

module.exports = resolvers;