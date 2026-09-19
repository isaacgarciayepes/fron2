import axios from 'axios'

const BASE_URL = '/backend/api/enrollments'

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

export const getEnrollments = () => request(async () => (await axios.get(BASE_URL)).data)
export const createEnrollment = (enrollment) => request(async () => (await axios.post(BASE_URL, enrollment)).data)
export const updateEnrollment = (id, enrollment) => request(async () => (await axios.put(`${BASE_URL}/${id}`, enrollment)).data)
export const deleteEnrollment = (id) => request(async () => { await axios.delete(`${BASE_URL}/${id}`) })
