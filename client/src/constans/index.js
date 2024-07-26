export const SERVER_URL = 'https://kltn-full-backend.onrender.com'

export const Header = (token) => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}
