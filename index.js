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

app.get('/', (req, res) => {
  res.send('Our first Node Express Server!')
})

// READ (GET)
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

// CREATE (POST)
app.post('/users', async (req, res) => {
    const { firstName, lastName, classNumber } = req.body
    try {
        await User.create({
            firstName,
            lastName,
            class: classNumber
        })
        res.json({
            status: 'SUCCESS'
        })
    } catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: 'Something went wrong!'
        })
    }
})

// UPDATE (PATCH)
app.patch('/users/:id', async (req, res) => {
    const { id } = req.params
    const { firstName, lastName, classNumber } = req.body
    try {
        await User.findByIdAndUpdate(id, {
            firstName,
            lastName,
            class: classNumber
        })
        res.json({
            status: 'SUCCESS'
        })
    } catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: 'Something went wrong!'
        })
    }
})

// DELETE (DELETE)
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params
    try {
        await User.findByIdAndDelete(id)
        res.json({
            status: 'SUCCESS'
        })
    } catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: 'Something went wrong!'
        })
    }
})

// SEARCH
// app.get('/users', async (req, res) => {
//     try {
//         console.log(req.query)
//         const users = await User.find(req.query)
//         res.json({
//             status: 'SUCCESS',
//             data: users
//         })
//     } catch (error) {
//         res.status(500).json({
//             status: 'FAILED',
//             message: 'Something went wrong!'
//         })
//     }
// })


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
    REST APIs: Representational State Transfer
    CRUD Opeartions:
        - GET (Read)
        - POST (Create)
        - PUT/PATCH (Update)
        - DELETE (Delete)

    E-Commerce:
    - Customers
        - GET /customers (Read)
        - POST /customers (Create)
        - PUT /customers/:id (Update)
        - DELETE /customers/:id (Delete)

    - Sellers
        - GET /sellers (Read)
        - POST /sellers (Create)
        - PUT /sellers/:id (Update)
        - DELETE /sellers/:id (Delete)
*/