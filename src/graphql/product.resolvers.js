// Utilizando destructuring en args
const getProduct = (_, { id }) => {
    return {
        id: id,
        name: "Product 1",
        price: 200.50,
        description: 'Bla bla bla',
        image: 'https://example.com/image1',
        createAt: new Date().toISOString()
    }
}

const getProducts = () => {
    return []
}

const addProduct = () => {
    // code
}

module.exports = { 
    getProduct, 
    getProducts
}
