var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = require('./todos');

app.get('/', function(req, res) {
    res.send('Todo API Root');
});

app.get('/todos', function(req, res) {
    res.json(todos);
});

app.get('/todos/:id', function(req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchItem;

    todos.forEach( function(todo) {
        if (todoId === todo.id) {
            matchItem = todo;
        }
    });

    if (matchItem) {
        res.json(matchItem);
    } else {
        res.status(404).send();
    }
    res.send('Asking for todo with id of ' + req.params.id)
});

app.listen(PORT, function() {
    console.log('Express listening on port ' + PORT);
});
