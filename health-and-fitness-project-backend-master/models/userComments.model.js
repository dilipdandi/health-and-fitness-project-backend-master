'use strict';
module.exports = (sequelize, DataTypes) => {
    const userCommentsTbl = sequelize.define(
        'tbl_user_comments',
        {
            id: {
                field: 'user_comments_id_pk',
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                comment: 'Auto generated key'
            },
            blogId: {
                field: 'blog_id',
                type: DataTypes.INTEGER,
                comment: 'blog id'
            },
            userName: {
                field: 'user_name',
                type: DataTypes.STRING(75),
                comment: 'user name'
            },
            comment: {
                field: 'comment',
                type: DataTypes.TEXT,
                comment: 'comment'
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
    userCommentsTbl.associate = function(models) {};
    return userCommentsTbl;
}