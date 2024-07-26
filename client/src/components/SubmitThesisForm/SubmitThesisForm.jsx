import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Header, SERVER_URL } from '../../constans'

const SubmitThesisForm = () => {
  const [formData, setFormData] = useState({
    linkDrive: '',
    linkGithub: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${SERVER_URL}/status/updatedocument`, {
        method: 'PUT',
        headers: Header(localStorage.getItem('token')),
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        toast.success('Nộp bài thành công')
      }
    } catch (error) {
      console.error('Failed to submit')
    }
  }

  return (
    <>
      <div className='center'>
        <div className='form-container'>
          <h2>Nộp link bài tập</h2>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <input
                type='text'
                required
                name='linkDrive'
                placeholder='Link Drive'
                value={formData.linkDrive}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                required
                name='linkGithub'
                placeholder='Link Github'
                value={formData.linkGithub}
                onChange={handleChange}
              />
            </div>
            <div className='form-button'>
              <button type='submit' style={{ minWidth: ' 120px' }}>
                Nộp Bài
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SubmitThesisForm
