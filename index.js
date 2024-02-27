const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

app.use(bodyParser.urlencoded())

const User = mongoose.model('User', { // users
    firstName: String,
    lastName: String,
    class: Number
})

const Child = mongoose.model('Child', { // children
    firstName: String,
    lastName: String,
    class: Number
})

app.get('/', (req, res) => {
  res.send('Our first Node Express Server!')
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json({
            status: 'SUCCESS',
            data: users
        })
    } catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: 'Something went wrong!'
        })
    }
})

app.listen(process.env.PORT, () => {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log('Server is up :)'))
        .catch((error) => console.log(error))
})

/*
    - Database (DB): Permanent Storage
        - Two types:
            - 1. SQL (Relational DB)
                - Table and Row format
                - Eg: MySQL, PostgreSQL, SQLite, etc
            - 2. NoSQL (Non-Relational DB)
                - Collection and Document format
                - Eg: MongoDB, AWS DynamoDB, etc

    - MongoDB
    - Mongoose: MongoDB Driver/ ODM (Object Data Modelling)
    - Schema/Models
*/

/*
    REST APIs:
    CRUD Opeartions:
        - GET (Read)
        - POST (Create)
        - PUT (Updating)
        - DELETE (Deleting)

    E-Commerce:
    - Customers
        - GET /customers (Read)
        - POST /customers (Create)
        - PUT /customers/:id (Updating)
        - DELETE /customers/:id (Deleting)

    - Sellers
        - GET /sellers (Read)
        - POST /sellers (Create)
        - PUT /sellers/:id (Updating)
        - DELETE /sellers/:id (Deleting)
*/