import {
  LIST_TICKETS,
  UPDATE_TICKET,
  DELETE_TICKET,
  CREATE_TICKET,
} from '../actions/types'

let INITIAL_STATE = {
  tickets: [],
  selectedTicket: null, // For operations on a single ticket like update or delete
  errorMessage: '',
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LIST_TICKETS:
      return { ...state, tickets: action.payload }

    case UPDATE_TICKET:
      return {
        ...state,
        tickets: state.tickets.map((ticket) =>
          ticket.ticketId === action.payload.ticketId ? action.payload : ticket
        ),
        selectedTicket: action.payload,
      }

    case DELETE_TICKET:
      return {
        ...state,
        tickets: state.tickets.filter(
          (ticket) => ticket.ticketId !== action.payload.ticketId
        ),
        selectedTicket: null,
      }

    case CREATE_TICKET:
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
      }

    default:
      return state
  }
}
