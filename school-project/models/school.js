'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const School = sequelize.define(
    'schools',
    {
      name: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      active: {
        type: DataTypes.BOOLEAN,
      },
      email: {
        type: DataTypes.STRING,
      },
      contact: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      // comments: {
      //   type: [DataTypes.INTEGER],
      //   references: {
      //     model: {
      //       tableName: "comments",
      //       schema: "schema",
      //     },
      //     key: "id",
      //   },
      //   allowNull: false,
      // },
    },
    {}
  );

  School.associate = function (models) {
    School.belongsTo(models.users, {
      foreignKey: 'schoolAdmin',
      onDelete: 'CASCADE',
    });
  };
  return School;
};
