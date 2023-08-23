import { connect } from 'react-redux'
import * as actions from '../actions'
import { NavLink } from 'react-router-dom'
import React from 'react'

// import "./App.css";

// importing pages
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Dialog } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'

const Header = ({ authenticated }) => {
  const renderSignButton = () => {
    if (authenticated) {
      return (
        <div className="text-sm font-semibold leading-6 text-white">
          <NavLink className="nav-link" to="/signout">
            Sign out
          </NavLink>
        </div>
      )
    } else {
      return [
        <NavLink to="/signin" className="nav-link">
          <div
            className="text-sm font-semibold leading-6 text-indigo-500 ml-5 border px-3 py-1.5 rounded-md bg-indigo-50 hover:bg-indigo-200"
            // no two lines below
            key="1"
          >
            Sign in
          </div>
        </NavLink>,
        <NavLink to="/signup" className="nav-link">
          <div
            className="text-sm font-semibold leading-6 text-indigo-100 ml-5 px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700"
            key="2"
          >
            Sign Up
          </div>
        </NavLink>,
      ]
    }
  }

  const navigation = [
    { name: 'Home', page: '/public' },
    { name: 'About', page: '/about' },
    { name: 'Contact', page: '/contact' },
    { name: 'Services', page: '/services' },

  ]


  const NavHeader = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [profile, setProfile] = useState({})

    const getUserProfile = () =>
      axios.get(`/user/profile`).then((r) => {
        setProfile(r.data)
      })

    useEffect(() => {
      getUserProfile()
    }, [authenticated])

    console.log('profileXXXX:::', profile)

    return (
      <header className="bg-gray-900">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <NavLink className="navbar-brand" to="/">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt=""
                />
              </a>
            </NavLink>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12 items-center">
            {navigation.map((item) => (
              <NavLink className="nav-link" to={item.page}>
                <button
                  key={item.name}
                  className="text-sm mr-6 font-semibold leading-6 text-white"
                >
                  {item.name}
                </button>
              </NavLink>
            ))}
            {profile.userType === 'staff' || profile.userType === 'user' && (
              <NavLink className="nav-link" to="/account">
                <button
                  key="Staff Tickets"
                  // onClick={() => setActivePageName(item.name)}
                  className="text-sm mr-6 font-semibold leading-6 text-white"
                >
                  Profile
                </button>
              </NavLink>
            )}
            {profile.userType === 'staff' && (
              <NavLink className="nav-link" to="/ticketsStaff">
                <button
                  key="Staff Tickets"
                  // onClick={() => setActivePageName(item.name)}
                  className="text-sm mr-6 font-semibold leading-6 text-white border px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700"
                >
                  All Tickets
                </button>
              </NavLink>
            )}
            {profile.userType === 'user' && (
              <NavLink className="nav-link" to="/tickets">
                <button
                  key="User Tickets"
                  // onClick={() => setActivePageName(item.name)}
                  className="text-sm mr-6 font-semibold leading-6 text-white border px-3 py-1.5 rounded-md bg-yellow-600 hover:bg-yellow-700"
                >
                  Raise a Ticket
                </button>
              </NavLink>
            )}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {renderSignButton()}
          </div>
        </nav>
      </header>
    )
  }

  return (
    <>
      <NavHeader />
    </>
  )
}

function mapStateToProps({ auth }) {
  return {
    authenticated: auth.authenticated,
  }
}

export default connect(mapStateToProps, actions)(Header)
