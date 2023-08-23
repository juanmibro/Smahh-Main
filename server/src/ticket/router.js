import TicketController from './controller' // Assuming your ticket controller is named 'ticketController.js'
const router = require('express').Router()

// Fetching all tickets with pagination
router.get('/all', TicketController.listTickets)

router.put('/byUser', TicketController.listTicketsByUser)

// Creating a new ticket
router.post('/createTicket', TicketController.createTicket)

// Updating an existing ticket
router.put('/:ticketId', TicketController.updateTicket)

// Deleting an existing ticket
router.delete('/:ticketId', TicketController.deleteTicket)

export default router
