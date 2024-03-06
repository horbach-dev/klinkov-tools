const DOMAIN_SERVER = process.env.DOMAIN
const LOCAL_SERVER = process.env.LOCAL
const MODE = process.env.MODE

export const getServerLink = (path?: string) => {
  return MODE === 'dev' ? LOCAL_SERVER : DOMAIN_SERVER
}
