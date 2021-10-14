import { useQuery } from 'react-query'
import axios from 'axios'

const getCafeAsync = async () => {
  const response = await axios.get('http://localhost:3000/api/getcafe')
  return response.data
}

const useCafe = () => {
  return useQuery('cafe', getCafeAsync)
}

export default useCafe
