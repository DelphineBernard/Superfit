import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

import sequelize from "../database.js";

class User extends Model {}

User.init({
    email:{
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    telephone: {
        type: DataTypes.TEXT,
    },
    address: {
        type: DataTypes.TEXT,
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, { 
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    },
    sequelize,
    modelName: "User",
    tableName: "user",
    timestamps: false
});

export default User;