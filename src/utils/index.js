export const LOCAL_STORAGE_VARS = {
  USER: 'user'
}

export const persistValue = (key, value) =>
  window.localStorage.setItem(key, value)

export const getPersistedValue = key => window.localStorage.getItem(key)

export const removePersistedValues = () => window.localStorage.clear()
