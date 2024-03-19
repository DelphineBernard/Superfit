import Product from "./Product.js";
import Role from "./Role.js";
import User from "./User.js";

User.hasMany(Product, { foreignKey: "user_id", as: "products" });
Product.belongsTo(User, { foreignKey: "user_id", as: "user" });

Role.hasMany(User, { foreignKey: "role_id", as: "users" });
User.belongsTo(Role, { foreignKey: "role_id", as: "role"});

export { User, Product, Role };