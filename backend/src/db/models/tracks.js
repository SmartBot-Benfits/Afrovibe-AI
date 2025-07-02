const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const tracks = sequelize.define(
    'tracks',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

title: {
        type: DataTypes.TEXT,

      },

genre: {
        type: DataTypes.ENUM,

        values: [

"afrobeat",

"amapiano",

"afroswing",

"lo-fi"

        ],

      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  tracks.associate = (db) => {

    db.tracks.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.tracks.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return tracks;
};

