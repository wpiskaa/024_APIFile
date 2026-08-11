require('dotenv').config();
const express = require('express');
const path = require('path');
const { sequelize, ensureDatabaseExists, Penulis, Genre, Komik } = require('./models');
const dataConverterMiddleware = require('./middleware/dataConverterMiddleware');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(dataConverterMiddleware);

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.sendFormatted({
    status: 'success',
    message: 'Welcome to 024_APIFile - REST API Komik, Genre, Penulis',
    materi: 'JSON, XML, YAML representation, auth, and file uploads'
  });
});

const startServer = async () => {
  try {
    await ensureDatabaseExists();
    
    try {
      await sequelize.query('CREATE TABLE IF NOT EXISTS penulis (id SERIAL PRIMARY KEY, nama VARCHAR(255), email VARCHAR(255) UNIQUE, password VARCHAR(255), "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);');
      await sequelize.query('CREATE TABLE IF NOT EXISTS genre (id SERIAL PRIMARY KEY, nama VARCHAR(255), deskripsi TEXT, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);');
      await sequelize.query('CREATE TABLE IF NOT EXISTS komik (id SERIAL PRIMARY KEY, judul VARCHAR(255), sinopsis TEXT, deskripsi TEXT, pengarang VARCHAR(255), penerbit VARCHAR(255), tahun_terbit INTEGER, gambar VARCHAR(255), genre_id INTEGER, penulis_id INTEGER, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);');

      await sequelize.query("SELECT setval('penulis_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM penulis), false);");
      await sequelize.query("SELECT setval('genre_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM genre), false);");
      await sequelize.query("SELECT setval('komik_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM komik), false);");
    } catch (e) {
      // Sequence queries ignored on non-PostgreSQL / fallback
    }

    try {
      if (Penulis && typeof Penulis.sync === 'function') await Penulis.sync();
      if (Genre && typeof Genre.sync === 'function') await Genre.sync();
      if (Komik && typeof Komik.sync === 'function') await Komik.sync();
      await sequelize.sync();
      console.log('Database synchronized successfully.');
    } catch (syncErr) {
      console.warn('Database sync notice:', syncErr.message);
    }

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = app;
