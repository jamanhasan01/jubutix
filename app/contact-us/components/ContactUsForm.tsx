'use client'

import React, { useState } from 'react'
import Title from '../../components/Title' // Assuming you have this component
import { MoveRight } from 'lucide-react' // Importing an icon for the button
import Button from '../../components/Button'
// --- Reusable Form Field Components ---
// It's better practice to define these outside the main component.

const InputField = ({ type = 'text', placeholder, name, value, onChange, required = false }) => (
  <input
    type={type}
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={onChange}
    required={required}
    className='w-full px-4 py-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow'
  />
)

const TextAreaField = ({ placeholder, name, value, onChange, required = false }) => (
  <textarea
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={onChange}
    required={required}
    rows={5}
    className='w-full px-4 py-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow'
  />
)

// NEW: Component for the dropdown/select field
const SelectField = ({ name, value, onChange, options, required = false }) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    required={required}
    className='w-full px-4 py-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow'
  >
    {options.map((option, index) => (
      <option key={index} value={option} disabled={index === 0}>
        {option}
      </option>
    ))}
  </select>
)

// NEW: Options for the dropdown menu
const serviceOptions = [
  'Select a service you are interested in',
  'Facebook Ads',
  'Google Ads',
  'SEO (Search Engine Optimization)',
]

const ContactForm = () => {
  // 1. State to hold all form data in one object
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: serviceOptions[0], // NEW: Add 'service' to the initial state
    message: '',
  })

  // 2. A single handler function to update state for any input
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // 3. Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('Form Submitted:', formData)
    alert('Thank you for your message! We will get in touch soon.')

    // Optional: Clear the form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: serviceOptions[0], // FIX: Ensure 'service' is also cleared on submit
      message: '',
    })
  }

  return (
    <section className='bg-white py-16 sm:py-24 relative'>
      <div className='container mx-auto px-4'>
        <Title
          title='Send Us a Message'
          subTitle='Have a question or ready to start a project? Fill out the form below and we will get back to you shortly.'
        />
        <form onSubmit={handleSubmit} className='mt-12 max-w-3xl mx-auto'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {/* Name Field */}
            <div>
              <InputField
                placeholder='Name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <InputField
                type='email'
                placeholder='Email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone Field */}
            <div className='md:col-span-2'>
              <InputField
                type='tel'
                placeholder='Phone'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* NEW: Added the Service dropdown to the form */}
            <div className='md:col-span-2'>
              <SelectField
                name='service'
                value={formData.service}
                onChange={handleChange}
                options={serviceOptions}
                required
              />
            </div>

            {/* Message Field */}
            <div className='md:col-span-2'>
              <TextAreaField
                placeholder='Your Message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className='mt-8 text-center'>
            {/* FIX: Replaced custom Button component with a standard <button> for reliability */}
        <Button text='Submit' type='submit' classname='w-full'/>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ContactForm
