import { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { NavLink } from 'react-router-dom'
import React from 'react'

const Signout = (props) => {
  useEffect(() => {
    props.signUserOut()
  }, [])
  return (
    <main className="grid min-h-full place-items-center bg-gray-800 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">🌞</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Bye!
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-300">
          You have been signed out.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <NavLink className="nav-link" to="/public">
            <div className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Go back home
            </div>
          </NavLink>
        </div>
      </div>
    </main>
  )
}

export default connect(null, actions)(Signout)