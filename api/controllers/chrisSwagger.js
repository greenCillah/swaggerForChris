'use strict';
// Include our "db"
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/swaggerForChris');
var util = require('util');

// schema here for now
var dataSchema = mongoose.Schema({
    id: String,
    name: String
});

// Exports all the functions to perform on the db
// module.exports = {getAll, save, getOne, update, delMovie};
module.exports = {
    getAll,
    getOneByID,
    getOneByName,
    saveNew,
    updateByID
};

//GET /movie operationId
function getAll(req, res, next) {

    var model = mongoose.model('movie', dataSchema);

    model.find({}, function (err, data) {
        if (err) throw err;

        res.json(data);
    });

}

//GET /movie/name/{name} operationId
function getOneByName(req, res, next) {

    var resName = req.swagger.params.name.value; //req.swagger contains the path parameters

    var model = mongoose.model('movie', dataSchema);

    model.find({
        name: resName
    }, function (err, data) {

        if (err) throw err;

        if (data) {
            res.json(data);
        } else {
            res.status(204).send();
        }

    });

}

//GET /movie/{id} operationId
function getOneByID(req, res, next) {

    var id = req.swagger.params.id.value; //req.swagger contains the path parameters

    var model = mongoose.model('movie', dataSchema);

    model.findById(mongoose.Types.ObjectId(id), function (err, data) {

        if (err) throw err;

        if (data) {
            res.json(data);
        } else {
            res.status(204).send();
        }

    });
}

//POST /movie operationId
function saveNew(req, res, next) {

    var model = mongoose.model('movie', dataSchema);

    model.create(req.body, function (err, data) {
        if (err) throw err;
        res.json(" description: Movie added to the list!");

    });
}

//PUT /movie/{id} operationId
function updateByID(req, res, next) {

    var id = req.swagger.params.id.value; //req.swagger contains the path parameters

    var movie = req.body;

    var model = mongoose.model('movie', dataSchema);

    model.findByIdAndUpdate(mongoose.Types.ObjectId(id), {
        $set: movie
    }, function (err, data) {

        if (err) throw err;

        res.json(" description: Updated and saved");

    });

}

/*
//DELETE /movie/{id} operationId
function delMovie(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    if (db.remove(id)) {
        res.json({
            success: 1,
            description: "Movie deleted!"
        });
    } else {
        res.status(204).send();
    }
 
}
 
*/
