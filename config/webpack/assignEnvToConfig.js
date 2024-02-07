module.exports = config => {
  const { BACKEND_PORT = '3000' } = process.env
  config.backendPort = parseInt(BACKEND_PORT, 10) || 3000
}
