import TicketModel from './model'

const extractTicketInfo = (req) => ({
  ticketId: req.body.ticketId,
  issueTitle: req.body.issueTitle,
  issueDescription: req.body.issueDescription,
  issueType: req.body.issueType,
  status: req.body.status,
  priority: req.body.priority,
  createdAt: req.body.createdAt,
  updatedAt: req.body.updatedAt,
  assignedTo: req.body.assignedTo,
  createdBy: req.body.createdBy,
  closedBy: req.body.closedBy,
})

export default {
  createTicket: async (req, res, next) => {
    try {
      console.log('Here on server: ', req.body)
      const newTicketInformation = extractTicketInfo(req)
      const newTicket = new TicketModel(newTicketInformation)
      await newTicket.save()
      res.status(201).send(newTicket)
    } catch (error) {
      next(error)
    }
  },

  updateTicket: async (req, res, next) => {
    try {
      const ticketId = req.params.ticketId
      const newTicketInformation = extractTicketInfo(req)
      const updatedTicket = await TicketModel.findOneAndUpdate(
        { ticketId: ticketId },
        newTicketInformation,
        { new: true }
      )
      if (!updatedTicket) {
        res.status(404).send({ error: 'Ticket not found.' })
        return
      }
      res.status(200).send(updatedTicket)
    } catch (error) {
      next(error)
    }
  },

  deleteTicket: async (req, res, next) => {
    try {
      const ticketId = req.params.ticketId

      // find ticket by ticketId then delete
      const deletedTicket = await TicketModel.findOneAndDelete({
        ticketId: ticketId,
      })

      if (!deletedTicket) {
        res.status(404).send({ error: 'Ticket not found.' })
        return
      }
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  },

  listTickets: async (req, res, next) => {
    try {
      // Optional pagination parameters, set default values if not provided
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 10
      const skip = (page - 1) * limit

      // Query the database
      const tickets = await TicketModel.find().skip(skip).limit(limit)
      const total = await TicketModel.countDocuments()

      // Send the paginated results
      res.status(200).send({
        data: tickets,
        meta: {
          currentPage: page,
          totalItems: total,
          itemsPerPage: limit,
          totalPages: Math.ceil(total / limit),
        },
      })
    } catch (error) {
      next(error)
    }
  },

  listTicketsByUser: async (req, res, next) => {
    try {
      // Optional pagination parameters, set default values if not provided
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 10
      const skip = (page - 1) * limit
      const userEmail = req.body.userEmail

      console.log('req.query:::', req.query)
      console.log('req.body:::', req.body)

      console.log('userEmail!????!!:::', userEmail)

      // Query the database to get all tickets created by the user
      const tickets = await TicketModel.find({ createdBy: userEmail })
      const total = await TicketModel.countDocuments()

      // Send the paginated results
      res.status(200).send({
        data: tickets,
        meta: {
          currentPage: page,
          totalItems: total,
          itemsPerPage: limit,
          totalPages: Math.ceil(total / limit),
        },
      })
    } catch (error) {
      next(error)
    }
  },
}
