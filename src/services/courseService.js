import axios from 'axios'

const BASE_URL = '/backend/api/courses'

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

export const getCourses = () => request(async () => (await axios.get(BASE_URL)).data)
export const createCourse = (course) => request(async () => (await axios.post(BASE_URL, course)).data)
export const updateCourse = (id, course) => request(async () => (await axios.put(`${BASE_URL}/${id}`, course)).data)
export const deleteCourse = (id) => request(async () => { await axios.delete(`${BASE_URL}/${id}`) })
