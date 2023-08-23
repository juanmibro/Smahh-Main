import React from 'react'
import { useState } from 'react'

export default function EditTicketForm(props) {
  const { ticketToEdit, setRaisedTickets, raisedTickets } = props
  const [issueTitle, setIssueTitle] = useState(ticketToEdit.issueTitle)
  const [issueDescription, setIssueDescription] = useState(
    ticketToEdit.issueDescription
  )
  const [issueType, setIssueType] = useState(ticketToEdit.issueType)
  const [priority, setPriority] = useState(ticketToEdit.priority)
  const [status, setStatus] = useState(ticketToEdit.status)

  const updateTicketLocally = (tickets, updatedTicket) => {
    return tickets.map((ticket) =>
      ticket.ticketId === updatedTicket.ticketId ? updatedTicket : ticket
    )
  }

  const handleEditTicket = () => {
    const editedTicket = {
      ...ticketToEdit,
      issueTitle,
      issueDescription,
      issueType,
      priority,
      status,
    }
    const ticketId = ticketToEdit.ticketId
    props.updateTicket('tickets', ticketId, editedTicket)

    props.setOpenEditTicket(false)
  }

  return (
    <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-6">
      <div className="px-4 py-5 sm:px-6 border-b">
        <div className="mt-4">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Edit Ticket (Staff)
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Make changes to the ticket below and save.
          </p>
        </div>
      </div>
      <div className="px-4 py-6 sm:p-8">
        <div className="grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="first-name"
              className="block text-xs leading-6 text-gray-500"
            >
              Issue Title
            </label>
            <div>
              <div className="block w-full text-sm pt-1.5 text-gray-900">
                {issueTitle}
              </div>
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="first-name"
              className="block text-xs leading-6 text-gray-500"
            >
              Issue Description
            </label>
            <div>
              <div className="block w-full text-sm pt-1.5 text-gray-900">
                {issueDescription}
              </div>
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="country"
              className="block text-xs leading-6 text-gray-500"
            >
              Service Needed
            </label>
            <div>
              <div
                id="country"
                name="country"
                className="block w-full text-sm pt-1.5 text-gray-900"
              >
                {issueType}
              </div>
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="status"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Status
            </label>
            <div className="mt-2">
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option>Not Started</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>Closed</option>
              </select>
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="priority"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Priority
            </label>
            <div className="mt-2">
              <select
                id="priority"
                name="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
          onClick={() => props.setOpenEditTicket(false)}
        >
          Cancel
        </button>
        <div
          onClick={handleEditTicket}
          className="cursor-pointer rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Save Changes
        </div>
      </div>
    </form>
  )
}
