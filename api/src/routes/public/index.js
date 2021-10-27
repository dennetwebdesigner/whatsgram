const express = require('express')
const { resolve } = require('path')

const app = express()

app.use(express.static(resolve(__dirname, '..', '..', 'public')))
app.set('views', resolve(__dirname, '..', '..', 'public'))
app.engine('html', require('ejs').renderFile)
app.set('views engine', 'html')

const views = [
    { path: '/cadastrar', file: 'index.html' },
    { path: '/', file: 'index.html' },
]

views.forEach((view) => {
    app.use(view.path, async(req, res) => {

        const pathExist = await views.find(item => req.url == item.path)


        if (!pathExist) {
            return res.send('erro ')
        }

        return res.render(view.file)
    })
})

// app.use('/', (req, res) => {
//     res.render('index.html')
// })

// app.use('/cadastro', (req, res) => {
//     res.render('index.html')
// })


module.exports = app