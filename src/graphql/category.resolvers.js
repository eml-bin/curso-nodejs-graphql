const CategoryService = require('./../services/category.service');
const { checkRolesGQL } = require('../utils/check-rolesGQL');
const { check_jwtGQL } = require('../utils/check-jwtGQL');

const service = new CategoryService();

const addCategory = async (_, { dto }, context) => {

    // Validators
    const user = await check_jwtGQL(context)
    checkRolesGQL(user, 'customer')

    return service.create(dto)
}

module.exports = { addCategory }