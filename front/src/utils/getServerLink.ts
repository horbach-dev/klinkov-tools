const DOMAIN_SERVER = process.env.DOMAIN
const LOCAL_SERVER = process.env.LOCAL
const MODE = process.env.MODE

export const getServerLink = (path?: string) => {
  const domain = MODE === 'dev' ? LOCAL_SERVER : DOMAIN_SERVER
  // const domain = '/'

  if (path) {
    if (path.startsWith('/')) {
      return `${domain}${path}`
    }

    return `${domain}/${path}`
  }

  return domain
}
