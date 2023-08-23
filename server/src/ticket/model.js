import mongoose from 'mongoose'

// Define the model
const TicketSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    required: true,
  },
  issueTitle: {
    type: String,
    required: true,
  },
  issueDescription: {
    type: String,
    required: true,
  },
  issueType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Not Started',
    enum: ['Not Started', 'In Progress', 'Completed', 'Closed'],
  },
  priority: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  assignedTo: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  closedBy: {
    type: String,
  },
})

// Create a model based on the schema
const Ticket = mongoose.model('Ticket', TicketSchema)

// Export the model
export default Ticket
