// src/pages/ThesisPage.jsx
import React, { useState, useEffect } from 'react'
import './CSS/Thesis.css'
import AddThesisForm from '../components/AddThesisForm/AddThesisForm.jsx'
import ThesisTable from '../components/ThesisTable/ThesisTable.jsx'
import Loading from '../components/Loading/index.jsx'
import { Header, SERVER_URL } from '../constans/index.js'

const Thesis = () => {
  const [showForm, setShowForm] = useState(false)
  const [theses, setTheses] = useState([])
  const [loading, setLoading] = useState(false)
  const [deadline, setDeadline] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const role = localStorage.getItem('role')
  const token = localStorage.getItem('token')

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-GB', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const fetchTheses = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${SERVER_URL}/theses`, {
        method: 'GET',
        // headers: {
        //   "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`,
        // },
        headers: Header(token),
      })
      const data = await response.json()
      setTheses(data)
    } catch (error) {
      setLoading(false)
      console.error('Failed to fetch theses', error)
    } finally {
      setLoading(false)
    }
  }
  const fetchDeadline = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/deadlines`, {
        method: 'GET',
        headers: Header(token),
      })
      const data = await response.json()
      setDeadline(formatDate(data.endDate))
    } catch (error) {
      console.error('Failed to fetch Deadline', error)
    }
  }

  useEffect(() => {
    fetchTheses()
    fetchDeadline()
  }, [])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredTheses = theses.filter((item) => item.instructorName.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <>
      {loading && <Loading />}
      <div className='thesis-page'>
        <div className='header-search'>
          <div className='input-search'>
            <input
              type='text'
              placeholder='Tìm theo tên giáo viên ... '
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <i className='bx bx-search'></i>
          </div>
          {role === 'teacher' && (
            <button className='add-thesis-btn' onClick={() => setShowForm(true)}>
              <i className='bx bx-plus'></i>
              Thêm mới
            </button>
          )}
        </div>
        {deadline && <h2>Deadline: {deadline !== 'Invalid Date' && deadline}</h2>}

        {showForm && <AddThesisForm onClose={() => setShowForm(false)} fetchTheses={fetchTheses} />}
        <ThesisTable theses={filteredTheses} fetchTheses={fetchTheses} />
      </div>
    </>
  )
}

export default Thesis
