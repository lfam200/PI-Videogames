//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require("dotenv").config();
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require('axios');
const { Genre, Platform} = require('./src/db');
const { API_URL, API_KEY, GENRES_ALL, PLATFORMS_ALL } = process.env;

// Syncing all the models at once.
const PORT = process.env.PORT;

conn.sync({ force: false }).then(() => {
  server.listen(PORT, async () => {
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console

    //Fetch and store API Genres in Local
    await axios
      .get(`${API_URL}${GENRES_ALL}?key=${API_KEY}`)
      .then((res) => {
        const result = res.data.results;
        if(result.length > 0){
          result.map(r => {
            Genre.findOrCreate({
              where: {
              id: r.id,
              name: r.name
            }})
          })
        }
      })
      .catch((err) => console.error(err));

    //Fetch and store API Platforms in Local
    await axios
        .get(`${API_URL}${PLATFORMS_ALL}?key=${API_KEY}`)
        .then((res) => {
          const result = res.data.results;
          if(result.length > 0){
            result.map(r => {
              Platform.findOrCreate({
                where: {
                  id: r.id,
                  name: r.name
                }})
            })
          }
        })
        .catch((err) => console.error(err));
  });
});
