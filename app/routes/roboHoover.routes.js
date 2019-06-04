module.exports = (app) => {
    const roboHoover = require('../controllers/roboHoover.controllers.js');

    app.post("/dirt-patches",roboHoover.cleanDirtPatches);
}