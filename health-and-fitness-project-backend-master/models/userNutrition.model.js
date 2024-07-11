'use strict';
module.exports = (sequelize, DataTypes) => {
    const userNutritionTbl = sequelize.define(
        'tbl_user_nutrition',
        {
            id: {
                field: 'user_nutrition_id_pk',
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                comment: 'Auto generated key'
            },
            foodName: {
                field: 'food_name',
                type: DataTypes.STRING(50),
                comment: 'food name'
            },
            mealTime: {
                field: 'meal_name',
                type: DataTypes.STRING(30),
                comment: 'meal name'
            },
            calories: {
                field: 'calories',
                type: DataTypes.INTEGER,
                comment: 'food calories'
            },
            userIdFk:{
                field: 'user_id_fk',
                type: DataTypes.INTEGER,
                references: {
                    model: 'tbl_user',
                    key: 'user_id_pk'
                },
                comment: 'user table foreign key'
            },
        }
    );
    userNutritionTbl.associate = function(models) {};
    return userNutritionTbl;
}