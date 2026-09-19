import axios from 'axios'

export const getDashboardStats = async () => {
  try {
    const [students, courses, enrollments] = await Promise.all([
      axios.get('/backend/api/students'),
      axios.get('/backend/api/courses'),
      axios.get('/backend/api/enrollments'),
    ])

    return {
      students: students.data.length,
      courses: courses.data.length,
      enrollments: enrollments.data.length,
    }
  } catch (error) {
    const data = error.response?.data
    const message = data?.message || data?.error || error.message || 'Error de conexión con el servidor'
    throw new Error(message)
  }
}
