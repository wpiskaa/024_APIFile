const { DataTypes } = require('sequelize');
const { sequelize, ensureDatabaseExists } = require('../config/db');

const Penulis = require('./penulis')(sequelize, DataTypes);
const Genre = require('./genre')(sequelize, DataTypes);
const Komik = require('./komik')(sequelize, DataTypes);

// Associations
Genre.hasMany(Komik, { foreignKey: 'genre_id', as: 'komik', onDelete: 'SET NULL' });
Komik.belongsTo(Genre, { foreignKey: 'genre_id', as: 'genre' });

Penulis.hasMany(Komik, { foreignKey: 'penulis_id', as: 'komik', onDelete: 'SET NULL' });
Komik.belongsTo(Penulis, { foreignKey: 'penulis_id', as: 'penulis' });

Komik.belongsToMany(Genre, {
  through: 'komik_genre',
  foreignKey: 'komik_id',
  otherKey: 'genre_id',
  as: 'genres'
});
Genre.belongsToMany(Komik, {
  through: 'komik_genre',
  foreignKey: 'genre_id',
  otherKey: 'komik_id',
  as: 'komiks'
});

const db = {
  sequelize,
  ensureDatabaseExists,
  Penulis,
  Genre,
  Komik
};

module.exports = db;
