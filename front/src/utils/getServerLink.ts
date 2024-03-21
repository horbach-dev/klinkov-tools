const DOMAIN_SERVER = process.env.DOMAIN || 'https://192.168.1.10'
const LOCAL_SERVER = process.env.LOCAL || 'http://45.141.78.176'
const MODE = process.env.MODE || 'dev'

export const getServerLink = () => {
  return MODE !== 'dev' ? DOMAIN_SERVER : LOCAL_SERVER
}
