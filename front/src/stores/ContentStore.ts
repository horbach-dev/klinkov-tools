import { makeStore, TStoreType } from '$services/store'

import { TContentStore } from '$types/stores/contentStore'

const defaultState = {
  links: null,
  cryptoExchange: null,
}

const ContentStore: TStoreType<TContentStore> = makeStore(defaultState, 'content')

export default ContentStore
