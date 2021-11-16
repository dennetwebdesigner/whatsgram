const express = require('express')
const { resolve } = require('path')

const app = express()

app.use(express.static(resolve(__dirname, '..', '..', 'views')))
app.set('views', resolve(__dirname, '..', '..', 'views'))
app.engine('html', require('ejs').renderFile)
app.set('views engine', 'html')

const views = [
    { method: 'get', path: '/cadastrar', file: 'sign.html' },
    { method: 'get', path: '/entrar', file: 'sign.html' },
    { method: 'get', path: '/:id', file: 'index.html' },
    { method: 'get', path: '/', file: 'index.html' },
]

bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.bodyParser())

views.forEach((view) => {
    if (view.method == 'get') {
        app.get(view.path, async(req, res) => {
            return res.render(view.file, { data: 'test' })
        })
    } else if (view.method == 'post') {
        app.post(view.path, async(req, res) => {
            return res.render(view.file, { data: 'test' })
        })
    }
})

app.use(function(req, res, next) {
    res.status(404);
    res.render('404.html')
})


module.exports = app