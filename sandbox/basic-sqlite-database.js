var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1,250]
        }
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false

    }
});

sequelize.sync().then(function () {
    console.log('Synced');

    Todo.create({
        description: 'Feel the Bern',
        completed: false
        }).then(function() {
        return Todo.findAll({
            where: {
                id: {
                $gt: 3}
            }
        });
    }).then(function (todos){
            if (todos) {
                todos.forEach(function(todo) {
                    console.log(todo.toJSON());
                })
            } else {
                console.log('no todo found');
            }
        }).catch(function(e) {
            console.log(e);
    });
});
