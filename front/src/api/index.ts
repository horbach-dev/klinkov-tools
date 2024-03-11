import axios from 'axios'
import { CommonError } from '$utils/commoError'
import { FormError } from '$utils/formError'
import { getServerLink } from '$utils/getServerLink'

const FIELD_ERROR_CODE = 10001
const ALERT_ERROR_CODE = 10101

export const client = axios.create({
  baseURL: getServerLink(),
})

export function setToken(token) {
  if (!token) {
    return
  }

  client.defaults.headers.common.Authorization = token
    ? 'Bearer ' + token
    : null
}

export const request = (endpoint, options = {}) => {
  const ready = client(endpoint, options)
    .then((response) => {
      return response
    })
    .catch((error) => {
      if (error.message === 'Network Error') {
        // showAlert(ALERT_ERROR, "Проверьте интернет соединение", 5000);
      }

      if (!error.response || !error.response.data) {
        throw error
      }

      const errorCode = error.response.data.code

      // if (errorCode === 2300) {
      //   store.dispatch(logout())
      //
      //   history.push({
      //     pathname: '/login'
      //   })
      // }

      if (error.response.data) {
        if (errorCode === FIELD_ERROR_CODE) {
          const fieldErrors = error.response.data.info

          if (fieldErrors) {
            const preparedErrors = {}

            fieldErrors.map(e => {
              preparedErrors[e.param] = e.msg

              return e
            })

            throw new FormError(preparedErrors)
          }
        }

        if (errorCode === ALERT_ERROR_CODE) {

          if(error.response.data.message) {
            throw new Error(error.response.data.message)
          }
        }
      }

      if (errorCode) {
        const errorMessage = error.response.data.message || 'Ошибка сервера'

        // showAlert(ALERT_ERROR, errorMessage, 3000);
        throw new CommonError(errorMessage, error.response.status)
      }

      throw error
    })

  return {
    ready,
  }
}

const api = {
  uploadImage: (file: any, onUploadProgress) => {
    return request('/upload-image', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: file,
      onUploadProgress,
    })
  },
  generateImage: (id: string) => {
    return request(`/generate-image/${id}`)
  },
  deleteImage: (id: string) => {
    return request(`/delete-image/${id}`)
  }
}

export default api
