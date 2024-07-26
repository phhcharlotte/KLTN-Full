// src/components/AddThesisForm.jsx
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Header, SERVER_URL } from '../../constans'

const AddThesisForm = ({ onClose, fetchTheses }) => {
  const [formData, setFormData] = useState({
    semester: '',
    year: '',
    thesisName: '',
    studentQuantity: '',
    require: '',
  })

  useEffect(() => {
    // const code = localStorage.getItem("code");
    // const fullname = localStorage.getItem("fullname");
    // const instructorName = code && fullname ? `${code} - ${fullname}` : "";
    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   instructor: instructorName,
    // }));
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const token = localStorage.getItem('token')
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${SERVER_URL}/theses/`, {
        method: 'POST',
        headers: Header(token),
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        fetchTheses()
        onClose()
        toast.success('Tạo đề tài mới thành công')
      } else {
        const errorText = await response.text()
        toast.error(`${errorText}`)
      }
    } catch (error) {
      console.error('Failed to add thesis', error)
    }
  }

  return (
    <>
      <div className='form-overlay'>
        <div className='form-container'>
          <h2 className='modal-title'>Thêm Đề Tài</h2>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <input
                required
                type='text'
                name='semester'
                placeholder='Học kỳ: 1, 2, 3,...'
                value={formData.semester}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <input
                required
                type='text'
                name='year'
                placeholder='Năm học'
                value={formData.year}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
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
              <button type='submit'>Đăng ký</button>
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

export default AddThesisForm
