import React, { useEffect, useState } from 'react'
import './RegisteredStudent.css'
import RgtStudentItem from '../RgtStudentItem/RgtStudentItem'
import Pagination from '../Pagination/Pagination'
import Loading from '../Loading'
import { toast } from 'react-toastify'
import { Header, SERVER_URL } from '../../constans'

const RegisteredStudent = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem('token')

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const handleDeleteStudent = async (id, memberId, index) => {
    try {
      let updatedData = [...data]

      updatedData[index].members = updatedData[index].members.filter((mbId) => mbId !== memberId)
      setData(updatedData)

      await deleteStudentRequest(id, memberId)
    } catch (error) {
      console.error('Failed to delete student', error)
      toast.error('Có lỗi xảy ra vui lòng thử lại')
    }
  }

  const deleteStudentRequest = async (id, memberId) => {
    try {
      if (!token) {
        throw new Error('Token is missing. Please log in again.')
      }

      const response = await fetch(`${SERVER_URL}/theses/deletemember/${id}`, {
        method: 'PUT',
        headers: Header(token),
        body: JSON.stringify({ deleteCode: memberId }),
      })
      if (!response.ok) {
        throw new Error('Failed to delete member. Please try again.')
      }
    } catch (error) {
      console.error('Failed to DELETE member', error)
    }
  }
  const deleteStudentStatusRequest = async (studentCode) => {
    try {
      const response = await fetch(`${SERVER_URL}/status/delete`, {
        method: 'DELETE',
        headers: Header(token),
        body: JSON.stringify({ studentCode: studentCode }),
      })
      if (!response.ok) {
        throw new Error('Failed to delete member. Please try again.')
      }
    } catch (error) {
      console.error('Failed to DELETE status', error)
    }
  }

  const fetchData = async () => {
    try {
      if (!token) {
        throw new Error('Token is missing. Please log in again.')
      }
      setLoading(true)
      const response = await fetch(`${SERVER_URL}/theses/getbyteachercode`, {
        method: 'GET',
        headers: Header(token),
      })
      const receivedData = await response.json()

      setData(receivedData)
    } catch (error) {
      setLoading(false)
      console.error('Failed to fetch theses', error)
      toast.error('Có lỗi xảy ra vui lòng thử lại')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      {loading && <Loading />}
      <table className='rgt-student-table'>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên Đề Tài</th>
            <th className='width-70'>Danh Sách Sinh Viên Đã Đăng Ký</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((thesis, index) => (
            <tr key={thesis._id}>
              <td>{index + 1}</td>
              <td>{thesis.thesisName}</td>
              <td className='width-70'>
                {thesis.members.map((memberId) => (
                  <RgtStudentItem
                    key={memberId} // Thêm key cho mỗi item
                    index={index}
                    studentCode={memberId}
                    id={thesis._id}
                    handleDeleteStudent={handleDeleteStudent}
                    deleteStudentStatusRequest={deleteStudentStatusRequest}
                  />
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!data.length ? (
        <div className='no-data'>
          <i className='bx bx-error-alt'></i>Không có dữ liệu
        </div>
      ) : null}
      {data.length > 10 && (
        <Pagination
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      )}
    </>
  )
}

export default RegisteredStudent
