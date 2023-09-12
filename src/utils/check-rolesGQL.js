const boom = require('@hapi/boom')

function checkRolesGQL(user, ...roles) {
    if (!roles.includes(user.role)) {
        throw boom.unauthorized("your role is not allow")
    }
}

module.exports = { checkRolesGQL }