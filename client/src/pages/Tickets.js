import React, { useEffect } from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

import { ChevronRightIcon } from '@heroicons/react/20/solid'

import RaiseTicketForm from '../components/RaiseTicketForm'
import EditTicketForm from '../components/EditTicketForm'

function TicketList(props) {
  const {
    raisedTickets,
    setOpenEditTicket,
    setEditTicket,
    setRaisedTickets,
    deleteTicket,
  } = props

  function handleEditTicket(raisedTicket) {
    setOpenEditTicket(true)
    setEditTicket(raisedTicket)
  }

  function handleDeleteTicket(raisedTicket) {
    const ticketId = raisedTicket.ticketId
    const newRaisedTickets = raisedTickets.filter(
      (ticket) => ticket.ticketId !== raisedTicket.ticketId
    )
    setRaisedTickets(newRaisedTickets)
    // timeout to allow for animation

    deleteTicket('tickets', ticketId)
  }

  function renderDate(date) {
    const dateObj = new Date(date)
    const day = dateObj.getDate()
    const month = dateObj.getMonth() + 1
    const year = dateObj.getFullYear()
    return `${day}/${month}/${year}`
  }

  return (
    // scroll from tailwind
    <ul role="list" className="divide-y divide-white/5 overflow-y-scroll h-96">
      {raisedTickets?.length &&
        raisedTickets.map((raisedTicket) => (
          <div
            className="border shadow-md rounded-lg p-6 mb-4"
            key={raisedTicket.ticketId}
          >
            <li className="relative flex items-center space-x-4 py-4">
              <div className="min-w-0 flex-auto">
                <div className="flex items-center gap-x-3">
                  <div className="flex-none rounded-full p-1">
                    <div className="h-2 w-2 rounded-full bg-current" />
                  </div>
                  <h2 className="min-w-0 text-sm font-semibold leading-6 text-gray-900">
                    <div className="flex gap-x-2">
                      <span className="truncate">
                        {raisedTicket.issueTitle}
                      </span>
                      <span className="text-gray-400">/</span>
                      <span className="whitespace-nowrap">
                        {raisedTicket.issueType}
                      </span>
                      <span className="absolute inset-0" />
                    </div>
                  </h2>
                </div>
                <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                  <p className="truncate">{raisedTicket.issueDescription}</p>
                  <svg
                    viewBox="0 0 2 2"
                    className="h-0.5 w-0.5 flex-none fill-gray-300"
                  >
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  {raisedTicket.status == 'Not Started' && (
                    <p className="rounded-full flex-none text-xs font-bold border-current text-blue-400">
                      {raisedTicket.status}
                    </p>
                  )}
                  {raisedTicket.status == 'In Progress' && (
                    <p className="rounded-full flex-none text-xs font-bold border-current text-green-400">
                      {raisedTicket.status}
                    </p>
                  )}
                  {raisedTicket.status == 'Completed' && (
                    <p className="rounded-full flex-none text-xs font-bold border-current text-green-400">
                      {raisedTicket.status}
                    </p>
                  )}
                  {raisedTicket.status == 'Closed' && (
                    <p className="rounded-full flex-none text-xs font-bold border-current text-gray-400">
                      {raisedTicket.status}
                    </p>
                  )}
                </div>
              </div>
              {raisedTicket.priority == 'High' && (
                <div className="rounded-full flex-none py-1 px-2 text-xs font-medium bg-red-300 border-current	">
                  {raisedTicket.priority}
                </div>
              )}
              {raisedTicket.priority == 'Medium' && (
                <div className="rounded-full flex-none py-1 px-2 text-xs font-medium bg-yellow-200 border-current">
                  {raisedTicket.priority}
                </div>
              )}
              {raisedTicket.priority == 'Low' && (
                <div className="rounded-full flex-none py-1 px-2 text-xs font-medium bg-green-200 border-current">
                  {raisedTicket.priority}
                </div>
              )}
              <ChevronRightIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </li>

            <div className="flex row justify-between">
              <div>
                <p className="text-xs text-gray-500">
                  Created {renderDate(raisedTicket.createdAt)}
                </p>
              </div>
              <div>
                <button
                  onClick={() => handleDeleteTicket(raisedTicket)}
                  className="mr-3 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Delete Ticket
                </button>
                <button
                  onClick={() => handleEditTicket(raisedTicket)}
                  className="rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Edit Ticket
                </button>
              </div>
            </div>
          </div>
        ))}
    </ul>
  )
}

function TicketListContainer(props) {
  const {
    raisedTickets,
    setOpenEditTicket,
    setEditTicket,
    setRaisedTickets,
    actions,
  } = props
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">
        <div className="mt-4">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Your Raised Tickets
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Listed tickets are sorted by priority.
          </p>
        </div>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <TicketList
          raisedTickets={raisedTickets}
          setRaisedTickets={setRaisedTickets}
          setOpenEditTicket={setOpenEditTicket}
          setEditTicket={setEditTicket}
          actions={actions}
          deleteTicket={props.deleteTicket}
        />
      </div>
    </div>
  )
}

const TicketListPage = (props) => {
  const { actions, listTickets, tickets, profile } = props
  const [raisedTickets, setRaisedTickets] = useState([])
  const [openEditTicket, setOpenEditTicket] = useState(false)
  const [editTicket, setEditTicket] = useState({})

  console.log('props!!!!:::', props)

  useEffect(() => {
    if (!raisedTickets?.length) {
      const url = 'tickets/byUser'
      const userEmail = profile?.email
      if (userEmail) {
        listTickets(url, userEmail)
      }
    }
  }, [profile])

  useEffect(() => {
    if (tickets?.length) {
      setRaisedTickets(tickets)
    }
    if (!profile) {
      props.getProfile()
    }
  }, [tickets, profile])

  useEffect(() => {
    if (!profile) {
      props.getProfile()
    }
  }, [])

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 bg-gray-800 p-16">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className="mx-auto max-w-8xl flex flex-row gap-6 justify-center">
        <RaiseTicketForm
          setRaisedTickets={setRaisedTickets}
          raisedTickets={raisedTickets}
        />
        {raisedTickets.length ? (
          <TicketListContainer
            raisedTickets={raisedTickets}
            setRaisedTickets={setRaisedTickets}
            setOpenEditTicket={setOpenEditTicket}
            setEditTicket={setEditTicket}
            actions={actions}
            deleteTicket={props.deleteTicket} // Ensure you pass this down
          />
        ) : (
          // loading divs
          <button
            type="button"
            className="relative block w-96 rounded-lg border-2 border-dashed border-gray-500 p-12 text-center"
          >
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
              />
            </svg>
            <span className="mt-2 block text-sm text-gray-400">
              Maybe you have no tickets raised.
            </span>
          </button>
        )}
        {openEditTicket ? (
          <EditTicketForm
            ticketToEdit={editTicket}
            setEditTicket={setEditTicket}
            setOpenEditTicket={setOpenEditTicket}
            actions={actions}
            updateTicket={props.updateTicket}
            setRaisedTickets={setRaisedTickets}
            raisedTickets={raisedTickets}
          />
        ) : null}
      </div>
    </div>
  )
}

function mapStateToProps({ tickets, user }) {
  console.log('user:::', user)
  return {
    tickets: tickets.tickets,
    selectedTicket: tickets.selectedTicket,
    profile: user.profile,
  }
}

export default connect(mapStateToProps, actions)(TicketListPage)
