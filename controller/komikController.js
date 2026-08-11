const db = require("../models");

const Komik = db.Komik;
const Penulis = db.Penulis;
const Genre = db.Genre;

async function getAll(req, res) {
    try {
        const komik = await Komik.findAll({
            include: [
                {
                    model: Penulis,
                    as: "penulis",
                    attributes: ["id", "nama", "email"]
                },
                {
                    model: Genre,
                    as: "genre",
                    through: {
                        attributes: []
                    }
                }
            ]
        });

        return res.status(200).json(komik);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

async function create(req, res) {
    try {
        const {
            judul,
            sinopsis,
            tahun_terbit,
            penulis_id,
            genre_ids
        } = req.body;

        let penulis = penulis_id ? await Penulis.findByPk(penulis_id) : null;
        if (!penulis && req.user) {
            penulis = await Penulis.findByPk(req.user.id);
        }
        if (!penulis) {
            penulis = await Penulis.findOne();
        }
        if (!penulis) {
            return res.status(404).json({
                message: "Penulis tidak ditemukan. Silakan jalankan POST /api/register terlebih dahulu."
            });
        }

        const gambar = req.file ? req.file.filename : null;

        const komik = await Komik.create({
            judul,
            sinopsis,
            tahun_terbit,
            gambar,
            penulis_id: penulis.id
        });

        if (genre_ids && genre_ids.length > 0) {
            const genres = await Genre.findAll({
                where: {
                    id: genre_ids
                }
            });

            if (typeof komik.setGenre === 'function') {
                await komik.setGenre(genres);
            } else if (typeof komik.setGenres === 'function') {
                await komik.setGenres(genres);
            }
        }

        const result = await Komik.findByPk(komik.id, {
            include: [
                {
                    model: Penulis,
                    as: "penulis"
                },
                {
                    model: Genre,
                    as: "genre",
                    through: {
                        attributes: []
                    }
                }
            ]
        });

        return res.status(201).json({
            message: "Komik berhasil ditambahkan.",
            data: result || komik
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;

        const {
            judul,
            sinopsis,
            tahun_terbit,
            penulis_id,
            genre_ids
        } = req.body;

        const komik = await Komik.findByPk(id);

        if (!komik) {
            return res.status(404).json({
                message: "Komik tidak ditemukan."
            });
        }

        await komik.update({
            judul,
            sinopsis,
            tahun_terbit,
            penulis_id
        });

        if (genre_ids) {
            const genres = await Genre.findAll({
                where: {
                    id: genre_ids
                }
            });

            if (typeof komik.setGenre === 'function') {
                await komik.setGenre(genres);
            } else if (typeof komik.setGenres === 'function') {
                await komik.setGenres(genres);
            }
        }

        const result = await Komik.findByPk(id, {
            include: [
                {
                    model: Penulis,
                    as: "penulis"
                },
                {
                    model: Genre,
                    as: "genre",
                    through: {
                        attributes: []
                    }
                }
            ]
        });

        return res.status(200).json({
            message: "Komik berhasil diperbarui.",
            data: result || komik
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

async function remove(req, res) {
    try {
        const { id } = req.params;

        const komik = await Komik.findByPk(id);

        if (!komik) {
            return res.status(404).json({
                message: "Komik tidak ditemukan."
            });
        }

        await komik.destroy();

        return res.status(200).json({
            message: "Komik berhasil dihapus."
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    getAll,
    create,
    update,
    remove
};
