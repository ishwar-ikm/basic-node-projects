// Import the gameModel, which represents the MongoDB model for games
const gameModel = require('../models/games');

// Controller functions for handling different routes and actions

// GET request handler for rendering the index page
exports.getIndex = (req, res, next) => {
    gameModel.find()
        .then(games => {
            // Render the index page with the list of games
            res.render('page/index', {
                games: games,
                pageTitle: 'My Top Games',
                editMode: false
            });
        })
        .catch(err => { console.log(err) });
};

// GET request handler for rendering the edit page
exports.getEdit = (req, res, next) => {
    gameModel.find()
        .then(games => {
            // Render the index page in edit mode
            res.render('page/index', {
                games: games,
                pageTitle: 'My Top Games',
                editMode: true
            });
        })
        .catch(err => { console.log(err) });
};

// GET request handler for rendering the add game page
exports.getAddGame = (req, res, next) => {
    // Render the add game page
    res.render('page/addGame', {
        pageTitle: 'Add a Game',
        editMode: true
    });
};

// POST request handler for adding a new game
exports.postAddGame = (req, res, next) => {
    // Extract data from the request body
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const recommendation = req.body.recommendation;
    const description = req.body.description;
    const detail_description = req.body.detail_description;

    // Create a new game using the gameModel
    const game = new gameModel({
        title: title,
        imageUrl: imageUrl,
        recommendation: recommendation,
        description: description,
        detail_description: detail_description,
    });

    // Save the new game to the database
    game.save()
        .then(result => {
            console.log("game added");
            res.redirect('/');
        })
};

// POST request handler for editing an existing game
exports.postEditGame = (req, res, next) => {
    // Extract data from the request body
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const recommendation = req.body.recommendation;
    const description = req.body.description;
    const detail_description = req.body.detail_description;
    const id = req.body.id;

    // Find the game by ID and update its properties
    gameModel.findById(id)
        .then(game => {
            game.title = title;
            game.imageUrl = imageUrl;
            game.recommendation = recommendation;
            game.description = description;
            game.detail_description = detail_description;
            return game.save();
        })
        .then(result => {
            // Redirect to the index page after editing
            res.redirect('/');
        })
};

// GET request handler for rendering a specific game page
exports.getPage = (req, res, next) => {
    // Extract the game ID from the request parameters
    const id = req.params.game;

    // Find the game by ID and render its page
    gameModel.findById(id)
        .then(game => {
            console.log(game);
            res.render('page/page', {
                pageTitle: game.title,
                game: game
            });
        });
};

// GET request handler for rendering the edit page with pre-filled data
exports.getEditPage = (req, res, next) => {
    // Extract the game ID from the request parameters
    const id = req.params.game;

    // Find the game by ID and render the add game page in edit mode
    gameModel.findById(id)
        .then(game => {
            res.render('page/addGame', {
                pageTitle: 'Add a Game',
                editMode: true,
                game: game
            });
        })
        .catch(err => { console.log(err) });
};

// POST request handler for deleting a game
exports.delete = (req, res, next) => {
    // Extract the game ID from the request body
    const id = req.body.id;
    console.log(id);

    // Find the game by ID and delete it
    gameModel.findByIdAndDelete(id)
        .then(() => {
            // Redirect to the index page after deletion
            res.redirect('/');
        })
};
