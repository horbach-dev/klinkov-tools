import { makeStore, TStoreType } from '$services/store'

import { TUserStore } from '$types/stores/userStore'

const defaultState = {
  isGuest: false,
  popup: null
}

const UserStore: TStoreType<TUserStore> = makeStore(defaultState, 'user')

export default UserStore
