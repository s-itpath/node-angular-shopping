const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.product= require("../models/product.model.js")(sequelize, Sequelize)
db.cart= require('../models/cart.model.js')(sequelize,Sequelize)

sequelize.sync()
    .then(() => {
        console.log('MySQL Database and Tables Created!');
    })
    .catch((err) => {
        console.log('Error:', err);
    });



db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
// db.product.belongsToMany(db.user,{
//   through:"user_roles",
//   foreignKey:"userId"
// }),
// db.user.belongsToMany(db.product,{
//   through:"user_roles",
//   foreignKey:"userId"
// })



db.ROLES = ["user", "admin"];

module.exports = db;