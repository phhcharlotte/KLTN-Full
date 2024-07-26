// src/pages/NotificationsPage.jsx
import React, { useState, useEffect } from 'react'
import './CSS/Notification.css'
import { Header, SERVER_URL } from '../constans'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [message, setMessage] = useState('')
  // const [readNotif, setReadNotif] = useState("");
  const token = localStorage.getItem('token')

  const getNotification = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/notifications`, {
        method: 'GET',
        headers: Header(token),
      })
      const data = await response.json()
      setNotifications(data)
    } catch (error) {
      console.error('Failed to fetch notifications', error)
    }
  }

  const handleReadNotification = async (id) => {
    try {
      await fetch(`${SERVER_URL}/notifications/${id}`, {
        method: 'PUT',
        headers: Header(token),
      })
      // if (response.ok) {
      //   getNotification();
      // }
    } catch (error) {
      console.error('Failed to mark notification as read', error)
    }
  }
  const handleDeleteNotification = async () => {
    try {
      await fetch(`${SERVER_URL}/notifications/delete`, {
        method: 'Delete',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      getNotification()
    } catch (error) {}
  }

  useEffect(() => {
    getNotification()
  }, [])

  return (
    <>
      <div className='notification'>
        <ul className='notification-list'>
          {notifications.map((notif) => (
            <li
              key={notif._id}
              onClick={() => {
                notif.isRead = true
                setMessage(notif.message)
                handleReadNotification(notif._id)
              }}
              className={notif.isRead ? '' : 'bold'}
            >
              {notif.message}
            </li>
          ))}
          {!notifications.length ? (
            <div className='no-data'>
              <i className='bx bx-error-alt'></i>Không có dữ liệu
            </div>
          ) : null}
        </ul>

        <button className='delete-notif' onClick={() => handleDeleteNotification()}>
          Xóa Thông báo đã đọc
        </button>
        <div className='notification-content'>{message && <div className='show-content'>{message}</div>}</div>
      </div>
    </>
  )
}

export default Notifications
