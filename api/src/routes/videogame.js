require("dotenv").config();
const { GAMES_ALL, SEARCH_GAMES, GAMES_ID, API_URL, API_KEY } = process.env;
const axios = require("axios");
const { Router} = require("express");
const { Videogame, Genre, Platform } = require("../db.js");
const { Op } = require("sequelize");

const server = Router();

// GET /videogames:
// Obtener un listado de los videojuegos
// Debe devolver solo los datos necesarios para la ruta principal
// GET /videogames?name="...":
// Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
// Si no existe ningún videojuego mostrar un mensaje adecuado
server.get("/", async (req, res) => {
  const searchGame = req.query.name || "";

  const query = searchGame ? {
    include: [Genre, Platform],
    where: {
      name: {
        [Op.iLike]: `%${searchGame}%`,
      },
    },
  } : { include: [Genre, Platform]};

  try {
    const videogamesLocal = await Videogame.findAll(query);

    const resLocal = videogamesLocal.map((e) => {
      return {
        id: e.id,
        name: e.name,
        image: e.imageUrl,
        rating: e.rating,
        genres: e.genres && e.genres.map((g) => g.name).join(", "),
        source: "Created",
      };
    });

    let videogamesApi;
    let resApi = [];
    for (let i = 1; i <= 5; i++) {
      await axios
        .get(`${API_URL}${GAMES_ALL}?search=${searchGame}&key=${API_KEY}&page=${i}`)
        .then((g) => {
          videogamesApi = g.data.results.map((game) => {
            return {
              id: game.id,
              name: game.name,
              image: game.background_image,
              rating: game.rating,
              genres: game.genres && game.genres.map((g) => g.name).join(", "),
              source: "Api",
            };
          });
          resApi = resApi.concat(videogamesApi);
        })
    }
    const resultGames = [...resApi, ...resLocal];
    console.log(resultGames.length);
    resultGames.length > 0 
    ? res.status(200).send(resultGames)
    : res.status(404).send("Not found the game");
  } catch (err) {
    return 'An error was encountered while obtaining data, please try again.'
  } 
});

// GET /videogame/{idVideogame}:
// Obtener el detalle de un videojuego en particular
// Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// Incluir los géneros asociados
server.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let videogameLocal = await Videogame.findByPk(id, { include: [Genre, Platform]});
    if(videogameLocal){
      const videogameFoundLocal = {
        id: videogameLocal.id,
        name: videogameLocal.name,
        description: videogameLocal.description,
        released: videogameLocal.released,
        rating: videogameLocal.rating,
        imageUrl: videogameLocal.imageUrl,
        platforms: videogameLocal.platforms.map(p => p.name).join(", "),
        genres: videogameLocal.genres.map(g => g.name).join(", ")
      };
      res.status(200).json(videogameFoundLocal);
    }else{
      await axios
        .get(`${API_URL}${GAMES_ALL}/${id}?key=${API_KEY}`)
        .then((index) => {
          const videogameApi = index.data;
          const videogameFoundApi = {
            id: videogameApi.id,
            name: videogameApi.name,
            description: videogameApi.description_raw,
            released: videogameApi.released,
            rating: videogameApi.rating,
            imageUrl: videogameApi.background_image,
            platforms: videogameApi.platforms.map((p) => p.platform.name).join(", "),
            genres: videogameApi.genres.map((g) => g.name).join(", "),
          };
          res.status(200).json(videogameFoundApi);
        })
    } 
  } catch (err) {
    return 'An error was encountered while obtaining data, please try again.'
  }
});

// POST /videogame:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
// Crea un videojuego en la base de datos
server.post("/", async (req, res, next) => {
  console.log(req.body);
  try {
    const { name, description, released, rating, platforms, genres, imageUrl } = req.body;
      
    let id = Date.now();
    let videogamePost = await Videogame.create({
      id:id,
      name: name,
      description: description,
      released: released,
      rating: rating,
      imageUrl: imageUrl,
    });

    genres.map(async (genre) => {
      const searchGenre = await Genre.findOne({ where: { name: genre } });
      await videogamePost.addGenre(searchGenre.id);
    });
    platforms.map(async (platform) => {
      const searchPlatform = await Platform.findOne({ where: { name: platform } });
      await videogamePost.addPlatform(searchPlatform.id);
    });
    res.status(200).send("Successfully created");
  } catch (err) {
    return 'An error was encountered while saving the data, please try again.'
  }
});

module.exports = server;
