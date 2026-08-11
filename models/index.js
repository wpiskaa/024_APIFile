const { DataTypes } = require('sequelize');
const { sequelize, ensureDatabaseExists } = require('../config/db');

const Penulis = require('./penulis')(sequelize, DataTypes);
const Genre = require('./genre')(sequelize, DataTypes);
const Komik = require('./komik')(sequelize, DataTypes);

// Associations
Penulis.hasMany(Komik, { foreignKey: 'penulis_id', as: 'komik' });
Komik.belongsTo(Penulis, { foreignKey: 'penulis_id', as: 'penulis' });

Komik.belongsToMany(Genre, {
  through: 'komik_genre',
  foreignKey: 'komik_id',
  otherKey: 'genre_id',
  as: 'genre'
});

Genre.belongsToMany(Komik, {
  through: 'komik_genre',
  foreignKey: 'genre_id',
  otherKey: 'komik_id',
  as: 'komik'
});

const db = {
  sequelize,
  ensureDatabaseExists,
  Penulis,
  Genre,
  Komik
};

module.exports = db;
