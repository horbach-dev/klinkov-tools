import { useCallback, useMemo, useSyncExternalStore } from 'react'
import { TStoreType } from '$services/store'

/**
 * Необходимо вторым аргументом функцию ***computed***,
 * таким обрахом хук будет контролировать выбранные поля в сторе и не
 * вызовет лишних перерендеров внутри компонента
 *
 * Пример использования хука в функциональных компонентах
  ```
    const [{ name }, setUserState] = useStore<UserStoreType>(UserStore, user => ({ name: user.name }))

    const setStateWithObj = () => {
      setUserState({ name: 'antonio' })
    }

    const setStateWithCallback = () => {
      setUserState(prev => ({ ...prev, name: 'antonio' }))
    }
  ```
 */
const useStore = <S, C>(
  store: TStoreType<S>,
  computed?: (store: S) => C,
): [C, TStoreType<S>['mergeOntoState']] => {
  const updateCallback = useCallback(() => {
    return computed ? JSON.stringify(computed(store.state)) : null
  }, [])

  const state = useSyncExternalStore(store.subscribe, updateCallback)

  return useMemo(() => [state ? JSON.parse(state) : null, store.mergeOntoState], [state])
}

export default useStore
