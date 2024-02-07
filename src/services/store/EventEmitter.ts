export const makeEventEmitter = () => {
  const emitter = {
    subscribers: [] as Function[],
    subscribe: (fn: Function) => {
      emitter.subscribers.push(fn)
      return () => {
        emitter.subscribers = emitter.subscribers.filter(sub => sub !== fn)
      }
    },
    notify: data => emitter.subscribers.forEach((sub: Function) => sub(data)),
  }
  return emitter
}
