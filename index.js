const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


const generateId = () => {
    const maxId = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0

    return String(maxId + 1)
}

const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('---')
    next()
}

app.use(cors())

morgan.token('body', request => {
    return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

//app.use(requestLogger)
app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request,response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    const entries = persons.length
    const dateTime = Date()

    response.send(`
        <p>Phonebook has info for ${entries} people</p>
        <p>${dateTime}</p>`)
})

app.delete('/api/persons/:id', (request,response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request,response) => {
    const body = request.body 

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    if (persons.find(p => p.name === body.name)) {
        return response.status(400).json({
            error: `${body.name} already exists`
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})