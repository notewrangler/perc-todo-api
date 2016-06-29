var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = require('./todos');
var todoNextId = todos.length;

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('Todo API Root');
});

app.get('/todos', function(req, res) {
    res.json(todos);
});

app.get('/todos/:id', function(req, res) {

    var todoId = parseInt(req.params.id, 10);
    var matchItem = _.findWhere(todos, {id: todoId});

    if (matchItem) {
        res.json(matchItem);
    } else {
        res.status(404).send();
    }
    res.send('Asking for todo with id of ' + req.params.id)
});

app.post('/todos', function (req, res) {
    var body = _.pick(req.body, 'description', 'completed');

    if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
        return res.status(400)
    }

    body.description = body.description.trim();

    todoNextId++;
    body.id = todoNextId;
    todos.push(body);
    res.json(todos);
});

app.delete('/todos/:id', function(req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchItem = _.findWhere(todos, {id: todoId});
    if (matchItem) {
        todos = _.without(todos, matchItem);
        res.json(matchItem);
    } else {
        res.status(404).json({"error": "No Todo Item found with that ID"});
    }
});

app.put('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchItem = _.findWhere(todos, {id: todoId});
    var body = _.pick(req.body, 'description', 'completed');
    var validAttributes = {};

    if (!matchItem) {
        return res.status(404).send();
    }

    if (body.hasOwnProperty('completed') && _.isBoolean(body.completed) )  {
        validAttributes.completed = body.completed;
    } else if (body.hasOwnProperty('completed')) {
        return res.status(400).send();
    }

    if (body.hasOwnProperty('description') && _.isString('description') && body.description.trim().length > 0) {
        validAttributes.description = body.description;
    } else if (body.hasOwnProperty('description')) {
        return res.status(400).send();
    }

     _.extend(matchItem, validAttributes);
     res.json(matchItem);
});

app.listen(PORT, function() {
    console.log('Express listening on port ' + PORT);
});
