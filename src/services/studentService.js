import axios from 'axios'

const BASE_URL = '/backend/api/students'

const getErrorMessage = (error) => {
  const data = error.response?.data
  const fields = data?.fields

  if (fields && typeof fields === 'object') {
    return Object.values(fields).join(' ')
  }

  return data?.message || data?.error || error.message || 'Error de conexión con el servidor'
}

const request = async (callback) => {
  try {
    return await callback()
  } catch (error) {
    const normalized = new Error(getErrorMessage(error))
    normalized.status = error.response?.status
    normalized.code = error.response?.data?.code
    normalized.details = error.response?.data?.fields
    throw normalized
  }
}

export const getStudents = () => request(async () => (await axios.get(BASE_URL)).data)
export const createStudent = (student) => request(async () => (await axios.post(BASE_URL, student)).data)
export const updateStudent = (id, student) => request(async () => (await axios.put(`${BASE_URL}/${id}`, student)).data)
export const deleteStudent = (id) => request(async () => { await axios.delete(`${BASE_URL}/${id}`) })
