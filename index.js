const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const name = process.argv[2]
const number = process.argv[3]
const Person = require('./models/person')
const person = require('./models/person')

app.use(cors())
app.use(express.static('dist'))

morgan.token('body', request => {
    return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json())

app.get('/api/persons', (request,response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformed id'})
        })
})

app.get('/info', (request, response) => {
    const entries = persons.length
    const dateTime = Date()

    response.send(`
        <p>Phonebook has info for ${entries} people</p>
        <p>${dateTime}</p>`)
})

app.delete('/api/persons/:id', (request,response) => {
    
})

app.post('/api/persons', (request,response) => {
    if (body.name === undefined) {
        return response.status(400).json({error: 'name missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })

    // if (persons.find(p => p.name === body.name)) {
    //     return response.status(400).json({
    //         error: `${body.name} already exists`
    //     })
    // }
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})