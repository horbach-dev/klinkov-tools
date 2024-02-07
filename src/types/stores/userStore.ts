export type TUserStore = TGuestUser & TRegisteredUser

export type TGuestUser = {
  isGuest: true

}

export type TRegisteredUser = {
  isGuest: boolean
  isAdmin: boolean
  inAdmin: boolean
  nickname: string
  email?: string
  images?: {
    avatar?: string
    header?: string
    gallery?: string[]
  },
  accountType: 'client' | 'model'
}
