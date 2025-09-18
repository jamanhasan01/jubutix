'use client'

import React, { useState } from 'react'

import Title from './Title'
import Button from './Button'


interface InputFieldProps {
  type?: string // '?' makes the prop optional
  placeholder: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}

// Defines the props for the textarea field
interface TextAreaFieldProps {
  placeholder: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  required?: boolean
}

interface SelectFieldProps {
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: string[]
  required?: boolean
}

// Defines the shape of our form's state object
interface FormData {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

const InputField: React.FC<InputFieldProps> = ({
  type = 'text',
  placeholder,
  name,
  value,
  onChange,
  required = false,
}) => (
  <input
    type={type}
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={onChange}
    required={required}
    className='w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all'
  />
)

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  placeholder,
  name,
  value,
  onChange,
  required = false,
}) => (
  <textarea
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={onChange}
    required={required}
    rows={5}
    className='w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all'
  />
)

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  value,
  onChange,
  options,
  required = false,
}) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    required={required}
    className='w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all'
  >
    {options.map((option, index) => (
      <option key={index} value={option} disabled={index === 0}>
        {option}
      </option>
    ))}
  </select>
)

// --- Main Contact Form Component ---

const serviceOptions: string[] = [
  'Select a service you are interested in',
  'Facebook Ads',
  'Google Ads',
  'SEO (Search Engine Optimization)',
]

const ContactUsForm: React.FC = () => {
  // 1. State to hold all form data, now typed with our FormData interface
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: serviceOptions[0],
    message: '',
  })


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // 3. Handle form submission, with the event correctly typed.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Basic validation to ensure a real service is selected
    if (formData.service === serviceOptions[0]) {
      alert('Please select a service.')
      return
    }

   
    
    alert('Thank you for your message! We will get in touch soon.')

    // Reset the form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: serviceOptions[0],
      message: '',
    })
  }

  return (
    <section className='bg-gray-50'>
      <div className='container '>
        <Title
          title='Send Us a Message'
          subTitle='Have a question or ready to start a project? Fill out the form below and we will get back to you shortly.'
        />
        <form
          onSubmit={handleSubmit}
          className='mt-12 max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg'
        >
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {/* Name Field */}
            <div className='md:col-span-1'>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
                Name
              </label>
              <InputField
                placeholder='John Doe'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Field */}
            <div className='md:col-span-1'>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                Email
              </label>
              <InputField
                type='email'
                placeholder='john.doe@example.com'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone Field */}
            <div className='md:col-span-2'>
              <label htmlFor='phone' className='block text-sm font-medium text-gray-700 mb-1'>
                Phone (Optional)
              </label>
              <InputField
                type='tel'
                placeholder='(123) 456-7890'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Service Dropdown */}
            <div className='md:col-span-2'>
              <label htmlFor='service' className='block text-sm font-medium text-gray-700 mb-1'>
                Service of Interest
              </label>
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
              <label htmlFor='message' className='block text-sm font-medium text-gray-700 mb-1'>
                Your Message
              </label>
              <TextAreaField
                placeholder='Tell us about your project or question...'
                name='message'
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className='mt-4 text-center'>
            <Button text='Send Message' classname='w-full' />
          </div>
        </form>
      </div>
    </section>
  )
}

export default ContactUsForm
