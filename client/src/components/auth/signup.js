import { useState } from 'react'
import { connect } from 'react-redux'
import { signUserUp } from '../../actions'
import CenterCard363 from '../centerCard363'
import useForm from '../../use-form-react'
import React from 'react'

const Signup = (props) => {
  const [errMsg, setErrorMsg] = useState('')
  const options = {
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
      userType: 'user',
    },
    callback: () => {
      if (inputs.password == inputs.password2) {
        console.log(inputs)
        props.signUserUp(inputs)
      } else {
        setErrorMsg('password does not matched')
      }
    },
    debug: false,
  }
  const { onSubmit, onChange, inputs, dirty, submitting } = useForm(
    'AdvanceForm',
    options
  )

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col bg-gray-800 justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign Up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="form-group">
              <label className="block text-sm font-medium leading-6 text-white">
                First name
              </label>
              <input
                name="firstName"
                value={inputs.firstName}
                type="text"
                onChange={onChange}
                placeholder="First Name"
                required
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium leading-6 text-white">
                Last name
              </label>
              <input
                name="lastName"
                value={inputs.lastName}
                type="text"
                onChange={onChange}
                placeholder="Last Name"
                required
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium leading-6 text-white">
                Email
              </label>
              <input
                name="email"
                value={inputs.email}
                type="email"
                onChange={onChange}
                placeholder="sample@email.com"
                required
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium leading-6 text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={inputs.password}
                onChange={onChange}
                placeholder="your password"
                required
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium leading-6 text-white">
                Confirm Password
              </label>
              <input
                type="password"
                name="password2"
                value={inputs.password2}
                onChange={onChange}
                placeholder="your password again"
                required
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                disabled={!dirty || submitting}
              >
                Sign Up
              </button>
            </div>
            {errMsg && (
              <div className="alert alert-warning">
                <strong>Oops!</strong> {errMsg}
              </div>
            )}
          </form>
          <p className="mt-10 text-center text-sm text-gray-400">
            Already a member?{' '}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default connect(null, { signUserUp })(Signup)
