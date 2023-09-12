const passport = require('passport');

const LocalStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.strategy');
const GQLStrategy = require('./strategies/local-graphql.strategy')

passport.use(LocalStrategy);
passport.use(JwtStrategy);
passport.use(GQLStrategy);
