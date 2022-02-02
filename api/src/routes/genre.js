const server = require("express").Router();
const { Genre } = require('../db.js');

// GET /genres:
// Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
server.get('/', async (req, res,) => {
    try {
        let genreLocal = await Genre.findAll({
          attributes: { exclude: ['createdAt', 'updatedAt']}
        });
        res.status(200).send(genreLocal);
    } catch (err) {
      return 'An error was encountered while obtaining API data, please try again.'
    }
});

module.exports = server;