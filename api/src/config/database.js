// Option 2: Passing parameters separately (other dialects)
module.exports = {
    dialect: 'mysql',
    host: '127.0.0.1',
    database: 'whatsgram',
    username: 'root',
    password: '',
    logging: false,
    define: {
        timestamp: true,
        underscored: true,
        underscoredAll: true,
    }
}