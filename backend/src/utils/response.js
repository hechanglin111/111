function success(data = null, message = null) {
  return { success: true, data, message }
}

function error(message, statusCode = 400) {
  return { success: false, data: null, message }
}

module.exports = { success, error }
