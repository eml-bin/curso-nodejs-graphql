// Directorio de resolvers

const { getProduct, getProducts, addProduct, updateProduct, deleteProduct } = require('./product.resolvers')
const { addCategory } = require('./category.resolvers')
const { login } = require('./auth.resolvers')
const { RegularExpression } = require('graphql-scalars')

const CategoryNameType = new RegularExpression('CategoryNameType', /^[a-zA-Z0-9]{3,8}$/)

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
    },
    CategoryNameType
}

module.exports = resolvers;