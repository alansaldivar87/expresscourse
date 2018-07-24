/**
 * EXPRESS BACKEND SERVICES TUTORIAL
 */

const Joi = require('joi') // Dependency used to validate schemas and data.
const logger = require('./loggerMiddleware')
const express = require('express')
const app = express()

/* 
 * Middlewares! 
 * Note: Middlewares are attached to our express session with the use() method
 */

// Middleware to parse incoming request. 
app.use(express.json())

// Middleware to accept x-www-form-encoded
app.use(express.urlencoded({ extended: true }))

// Static files likes CSS, etc. Requires a folder
app.use(express.static('public'))

// Our custom middleware
app.use(logger)

function validateCustomer (customer) {
  const schema = {
    name: Joi.string().min(3).required() // Translated to: it is valid if property name exists, is a string and has at least three chars.
  }
  return Joi.validate(customer, schema) // Returns a Joi {} for error handling.
}

const customers = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'George' }
]

// GET all customers
app.get('/api/customers', (req, res) => {
  res.send(customers)
})

// GET customer
app.get('/api/customers/:id', (req, res) => {
  const customer = customers.find(c => c.id === parseInt(req.params.id))
  if (!customer) return res.status(404).send('Customer not found')
  res.send(customer)
})

// POST add customer
app.post('/api/customers', (req, res) => {
  // This is equivalent to response.error
  const { error } =  validateCustomer(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const customer = {
    id: customers.lenght + 1,
    name: req.body.name
  }

  customers.push(customer) 
  res.send(customer)
})

// PUT update customer 'name' property
app.put('/api/customers/:id', (req, res) => {
  const customer = customers.find(c => c.id === parseInt(req.params.id))
  if (!customer) return res.status(404).send('The searched customer does not exist.')

  // This is equivalent to response.error
  const { error } =  validateCustomer(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Setter
  customer.name = req.body.name

  // Reposponse to the user
  res.send(`Customer updated: new name:  ${customer.name}`)
})

// DELETE customer
app.delete('/api/customers/:id', (req, res) => {
  const customer = customers.find(c => c.id === parseInt(req.params.id))
  if (!customer) return res.status(404).send('The searched customer does not exist.')

  // This is equivalent to response.error
  const { error } =  validateCustomer(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Then we are going to delete the given customer
  const customerID = customer.indexOf(customer)
  customers.splice(customerID, 1)

  // Reposponse to the user
  res.send(`Customer deleted: ${customer.name}`)
})

// Set the port
const port = process.env.PORT || 5500

// Finally, let's listen the app.
app.listen(port, () => console.log(`Listening on port ${port}...`))