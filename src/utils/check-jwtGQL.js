const boom = require('@hapi/boom')

async function check_jwtGQL(context) {
    
    // { session: false } porque jwt no retiene una sesión
    const { user } = await context.authenticate('jwt', { session: false })

    if (!user) {
        throw boom.unauthorized('jwt is not valid')
    }
    
    return user
}

module.exports = { check_jwtGQL }