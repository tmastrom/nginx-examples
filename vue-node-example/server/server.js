const express = require('express')
const path = require('path')
const app = express() 
const port = 3000


const replica = process.env.APP_NAME

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
    console.log(`Request served by node app ${replica}`)
})

app.use('/health', (req, res) => {
    res.send('up')
    console.log(`Request served by node app ${replica}`)
})

app.listen(port, () => {
    console.log(`node app ${replica} is listening on port ${port}`)
})