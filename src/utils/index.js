export const LOCAL_STORAGE_VARS = {
  USER: 'user',
  TOKEN: 'token'
}

export const persistValue = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))

export const getPersistedValue = key => JSON.parse(window.localStorage.getItem(key))

export const removePersistedValues = () => window.localStorage.clear()
