// src/components/EditThesisForm.jsx
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { SERVER_URL } from '../../constans'
const EditThesisForm = ({ onClose, fetchTheses, id, data }) => {
  const [formData, setFormData] = useState({
    thesisName: '',
    instructor: '',
    studentQuantity: 1,
    require: '',
  })

  useEffect(() => {
    if (data) {
      setFormData(data)
    }
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'studentQuantity' ? parseInt(value, 10) : value,
    }))
  }

  const token = localStorage.getItem('token')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${SERVER_URL}/theses/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        fetchTheses()
        onClose()
        toast.success('Sửa thông tin thành công')
      } else {
        const errorText = await response.text()
        console.error('Failed to edit thesis', errorText)
      }
    } catch (error) {
      console.error('Failed to edit thesis', error)
    }
  }

  return (
    <>
      <div className='form-overlay'>
        <div className='form-container'>
          <h2 className='modal-title'>Sửa Đề Tài</h2>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              {' '}
              <input
                required
                type='text'
                name='thesisName'
                placeholder='Tên đề tài'
                value={formData.thesisName}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <input
                required
                type='text'
                name='instructor'
                placeholder='Người hướng dẫn'
                value={formData.instructor}
                readOnly
              />
            </div>
            <div className='form-group'>
              <input
                required
                type='number'
                min='0'
                max='5'
                name='studentQuantity'
                placeholder='Số lượng'
                value={formData.studentQuantity}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <input
                required
                type='text'
                name='require'
                placeholder='Yêu cầu'
                value={formData.require}
                onChange={handleChange}
              />
            </div>
            <div className='form-button'>
              <button type='submit'>Xong</button>
              <button type='button' onClick={onClose}>
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditThesisForm
