/**
 * EXPRESS BACKEND SERVICES TUTORIAL
 */

const Joi = require('joi') // Dependency used to validate schemas and data.
const express = require('express')
const app = express()

// JSON Middleware to parse responses
app.use(express.json())

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
  const schema = {
    name: Joi
  }
  customers.push(customer) 
  res.send()
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