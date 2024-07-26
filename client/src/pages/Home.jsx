import React, { useEffect, useState } from 'react'
import ShowThesisTable from '../components/ShowThesisTable/ShowThesisTable'
import ShowThesisTableForAdmin from '../components/ShowThesisTableForAdmin/ShowThesisTableForAdmin'
import Loading from '../components/Loading'
import { SERVER_URL } from '../constans'
const Home = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [listTeacher, setListTeacher] = useState([])
  const role = localStorage.getItem('role')

  const fetchHomeData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${SERVER_URL}/api`)
      const dataResponse = await response.json()
      setData(dataResponse)
    } catch (error) {
      setLoading(false)
      console.error('Failed to fetch data', error)
    } finally {
      setLoading(false)
    }
  }
  const getTeacherList = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${SERVER_URL}/users/teacher`)
      const dataResponse = await response.json()
      setListTeacher(dataResponse)
    } catch (error) {
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHomeData()
    getTeacherList()
  }, [])

  return (
    <>
      <div className='page'>
        {loading && <Loading />}

        {role === 'admin' ? (
          <ShowThesisTableForAdmin listTeacher={listTeacher} data={data} setData={setData} />
        ) : (
          <ShowThesisTable data={data} />
        )}
      </div>
    </>
  )
}

export default Home
