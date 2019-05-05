const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const path = require('path')

app.use(express.static(path.join('../dist')))

