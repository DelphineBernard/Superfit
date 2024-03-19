import { Model, DataTypes } from "sequelize";

import sequelize from "../database.js";

class Role extends Model {}

Role.init({
    name:{
        type: DataTypes.TEXT,
        allowNull: false
    }
}, { 
    sequelize,
    modelName: "Role",
    tableName: "role"
});

export default Role;