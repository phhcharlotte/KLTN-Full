export const SERVER_URL = 'http://localhost:3001'

export const Header = (token) => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}
