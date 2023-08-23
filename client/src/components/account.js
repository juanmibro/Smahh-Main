import { useState, useEffect } from 'react'
import axios from 'axios'
import CenterCard363 from './centerCard363'
import useForm from '../use-form-react'
import React from 'react'

const Account = () => {
  const [editing, setEditing] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [status, setStatus] = useState('')
  const [profile, setProfile] = useState({})
  const options = {
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    callback: () => {
      updateUserProfile(inputs)
    },
    debug: false,
  }
  const { setInputs, onSubmit, onChange, inputs, dirty, reset } = useForm(
    'AdvanceForm',
    options
  )
  const tryConnect = () =>
    axios.get(`/auth-ping`).then((r) => setStatus(r.data))
  const getUserProfile = () =>
    axios.get(`/user/profile`).then((r) => {
      setProfile(r.data)
      setInputs({
        firstName: r.data.name.first,
        lastName: r.data.name.last,
        email: r.data.email,
      })
      setErrMsg()
    })
  const updateUserProfile = () => {
    axios
      .post(`/user/profile`, inputs)
      .then(() => cancelForm())
      .catch((e) => setErrMsg(`${e.response.data}. Please try it again.`))
  }
  useEffect(() => {
    tryConnect()
    getUserProfile()
  }, [])
  const switchEditing = () => {
    setEditing(!editing)
  }
  const cancelForm = () => {
    setEditing(false)
    reset()
    getUserProfile()
  }
  const renderButtons = () => {
    if (editing) {
      return (
        <div className="flex">
          <button
            disabled={!dirty}
            type="submit"
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Save Change
          </button>
          <button
            className="rounded-md bg-red-600 px-3 ml-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={cancelForm}
          >
            Cancel
          </button>
        </div>
      )
    } else {
      return (
        <button
          className="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
          onClick={switchEditing}
        >
          Update Information
        </button>
      )
    }
  }
  const renderProfileForm = () => {
    return (
      <form
        className="grid w-64 grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6"
        onSubmit={onSubmit}
      >
        <div className="col-span-full">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            First Name:
          </label>
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            disabled={!editing}
            type="text"
            name="firstName"
            onChange={onChange}
            value={inputs.firstName}
            placeholder="First Name"
            required
          />
        </div>

        <div className="col-span-full">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Last Name:
          </label>
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            disabled={!editing}
            type="text"
            name="lastName"
            onChange={onChange}
            value={inputs.lastName}
            placeholder="Last Name"
            required
          />
        </div>

        <div className="col-span-full">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Email:
          </label>
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            disabled
            readOnly
            type="email"
            name="email"
            onChange={onChange}
            value={inputs.email}
            placeholder="sample@email.com"
            required
          />
        </div>
        {dirty && (
          <div className="col-span-full">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Password:
            </label>
            <input
              type="password"
              name="password"
              onChange={onChange}
              value={inputs.password}
              className={
                errMsg
                  ? 'block w-full rounded-md border-0 py-1.5 text-red-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                  : 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              }
              placeholder="your password"
              required
            />
            {errMsg && (
              <div className="invalid-feedback text-red-400">{errMsg}</div>
            )}
          </div>
        )}
        <div className="col-span-full">{renderButtons()}</div>
      </form>
    )
  }
  return (
    <>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 bg-gray-800 p-16">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-6xl flex flex-row gap-12">
          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-6">
            <div className="px-4 py-5 sm:px-6 border-b">
              <div className="ml-4 mt-4">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  {profile?.userType === 'staff'
                    ? 'Staff Profile'
                    : 'User Profile'}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Server status: {status} ☀
                </p>
              </div>
            </div>
            <div className="">
              <div className="px-4 py-6 sm:p-8">
                {profile && renderProfileForm()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Account
