const Sequelize = require('sequelize')

const dbnotes = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/todonotes.db'
})

const Todonotes = dbnotes.define('todonotes', {
    taskId:{
        type: Sequelize.INTEGER
    },
    notes: {
        type: Sequelize.STRING(1000)
    }
})

module.exports = {
    dbnotes, Todonotes
}