// hội đồng
import React, { useEffect, useState } from 'react'
import CouncilTable from '../components/CouncilTable/CouncilTable'
import { Header, SERVER_URL } from '../constans'

const Council = () => {
  const [data, setData] = useState([])
  const name = localStorage.getItem('fullname')
  const token = localStorage.getItem('token')

  const fetchData = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/status/getlist`, {
        method: 'GET',
        headers: Header(token),
      })
      if (!response.ok) {
      }
      const listData = await response.json()
      setData(listData)
    } catch (error) {}
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      <div>
        <CouncilTable data={data} name={name} />
      </div>
    </>
  )
}

export default Council
