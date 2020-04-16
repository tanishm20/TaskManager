const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/todos.db'
})

const Todos = db.define('todo', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(100)
    },
    due: {
        type: Sequelize.DATE
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    priority: {
        type: Sequelize.STRING(100)
    }
})

module.exports = {
    db, Todos
}