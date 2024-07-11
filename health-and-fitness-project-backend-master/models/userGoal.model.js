'use strict';
module.exports = (sequelize, DataTypes) => {
    const userGoalTbl = sequelize.define(
        'tbl_user_goal',
        {
            id: {
                field: 'user_goal_id_pk',
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                comment: 'Auto generated key'
            },
            goalName: {
                field: 'goal_name',
                type: DataTypes.STRING(30),
                comment: 'goal name'
            },
            goalDate: {
                field: 'goal_date',
                type: DataTypes.DATEONLY,
                comment: 'goal date'
            },
            weight: {
                field: 'weight',
                type: DataTypes.INTEGER,
                comment: 'user weight'
            },
            goalStatus: {
                field: 'goal_status',
                type: DataTypes.STRING(30),
                comment: 'goal status'
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
    userGoalTbl.associate = function(models) {};
    return userGoalTbl;
}