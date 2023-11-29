const Sequelize = require('sequelize');
const url = process.env.DATABASE_URL || "mysql://root@localhost:3306/BBDD_reputacion";
const sequelize = new Sequelize(url);

const User = require('./user')(sequelize);
const Token = require('./token')(sequelize);

// Relación 1-to-N entre User y Token
User.hasMany(Token, { as: 'tokens', foreignKey: 'userId' });
Token.belongsTo(User, { foreignKey: 'userId' });

module.exports = sequelize;