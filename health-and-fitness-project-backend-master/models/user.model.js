'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
    const userTbl = sequelize.define(
        'tbl_user',
        {
            id: {
                field: 'user_id_pk',
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                comment: 'Auto generated key'
            },
            name: {
                field: 'name',
                type: DataTypes.STRING(75),
                comment: 'name'
            },
            mobile: {
                field: 'mobile',
                type: DataTypes.STRING(13),
                unique: true,
                comment: 'mobile'
            },
            email: {
                field: 'email',
                type: DataTypes.STRING(50),
                comment: 'email'
            },
            password: {
                field: 'password',
                type: DataTypes.STRING(255),
                allowNull: false,
                comment: 'password'
            },
        },
        {}
    );
    userTbl.associate = function(models) {};
    userTbl.isCorrectPassword = async function(id, password, callback) {
        await userTbl
            .findOne({ where: { id: id } })
            .then((userObj) => {
                bcrypt.compare(password, userObj.password, function(err, same) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(err, same);
                    }
                });
            })
            .catch((err) => {
                callback(err);
            });
    };
    return userTbl;
}
