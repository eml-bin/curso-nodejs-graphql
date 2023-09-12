const ProductsService = require('./../services/product.service');
const service = new ProductsService();

// Utilizando destructuring en args
const getProduct = (_, { id }) => {
    return service.findOne(id);
}

const getProducts = () => {
    return service.find({});
}

const addProduct = (_, { dto }) => {
    return service.create(dto)
}

const updateProduct = (_, { id, dto }) => {
    return service.update(id, dto)
}

const deleteProduct = async (_, { id }) => {
    await service.delete(id)
    return id
}

// Parent es el contexto, acceder a la información de una jerarquía más arriba
const getProductsByCategory = async (parent) => {

    // id de la categoría
    const id = parent.dataValues.id
    return service.getByCategory(id)
}

module.exports = { 
    getProduct, 
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory
}
