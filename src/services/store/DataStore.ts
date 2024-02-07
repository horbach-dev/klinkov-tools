import { makeEventEmitter } from './EventEmitter'

const windowStores: { [k: string]: any } = {}

Object.defineProperty(window, '_stores', {
  get () {
    const stores = {}
    Object.keys(windowStores).forEach(key => {
      stores[key] = windowStores[key].state
    })
    return stores
  },
})

export const makeStore = (initialValue: any, storeName: string) => {
  const emitter = makeEventEmitter()

  const store = { state: JSON.parse(JSON.stringify(initialValue)) }

  windowStores[storeName] = store

  return {
    get state () {
      return store.state
    },
    setState (value: any) {
      store.state = value
      emitter.notify(value)
    },
    mergeOntoState (updateData: any) {
      if (typeof updateData === 'function') {
        const newValue = updateData(store.state)
        store.state = { ...store.state, ...newValue }
      } else {
        store.state = { ...store.state, ...updateData }
      }
      emitter.notify(store.state)
    },
    reset () {
      store.state = JSON.parse(JSON.stringify(initialValue))
    },
    subscribe: emitter.subscribe,
  }
}
