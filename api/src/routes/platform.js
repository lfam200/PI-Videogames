const server = require("express").Router();
const { Platform } = require('../db.js');

server.get('/', async (req, res) => {
    try {
        let platformLocal = await Platform.findAll({
          attributes: { exclude: ['createdAt', 'updatedAt']}
        });
        res.status(200).send(platformLocal);
    }  catch (err) {
      return 'An error was encountered while obtaining API data, please try again.'
    }
});

module.exports = server;