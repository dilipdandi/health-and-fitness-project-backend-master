'use strict';
module.exports = (sequelize, DataTypes) => {
    const userHealthMetricsTbl = sequelize.define(
        'tbl_user_health_metrics',
        {
            id: {
                field: 'user_health_metrics_id_pk',
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                comment: 'Auto generated key'
            },
            weight: {
                field: 'weight',
                type: DataTypes.INTEGER,
                comment: 'user weight'
            },
            bloodPressure: {
                field: 'blood_pressure',
                type: DataTypes.INTEGER,
                comment: 'user blood pressure'
            },
            sleepHours: {
                field: 'sleep_hours',
                type: DataTypes.INTEGER,
                comment: 'user sleephours'
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
    userHealthMetricsTbl.associate = function(models) {};
    return userHealthMetricsTbl;
}