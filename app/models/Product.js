import { Model, DataTypes } from "sequelize";

import sequelize from "../database.js";

class Product extends Model {}

Product.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, { 
    sequelize,
    modelName: "Product",
    tableName: "product",
    timestamps: false
});

export default Product;