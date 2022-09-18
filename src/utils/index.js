export const LOCAL_STORAGE_VARS = {
  USER: 'user',
  TOKEN: 'token',
  GRID: 'grid'
}

export const persistValue = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))

export const getPersistedValue = key => JSON.parse(window.localStorage.getItem(key))

export const removePersistedValues = () => window.localStorage.clear()

export class DateHandler {
  currentDate = null
  constructor() {
    const date = new Date()
    this.currentDate = this.setNewDate(
      date.getFullYear(),
      date.getMonth() + 1
    )
  }

  setNextMonth() {
    this.currentDate = this.setNewDate(
      this.currentDate.nextYear,
      this.currentDate.nextMonth
    )
  }

  setPrevMonth() {
    this.currentDate = this.setNewDate(
      this.currentDate.prevYear,
      this.currentDate.prevMonth
    )
  }

  getDateInfo() {
    return this.currentDate
  }

  setNewDate(year, month) {
    const day = 1
    const lastDay = new Date(year, month, 0).getDate()
    let nextMonth
    let nextYear
    let prevMonth
    let prevYear
    if (month < 12) {
      nextMonth = month + 1
      nextYear = year
    } else {
      nextMonth = 1
      nextYear = year + 1
    }
    if (month > 1) {
      prevMonth = month - 1
      prevYear = year
    } else {
      prevMonth = 12
      prevYear = year - 1
    }
    const from = this.formatDate(year, month, day)
    const to = this.formatDate(year, month, lastDay)
    console.log(from, to)
    return { year, month, day, lastDay, nextYear, nextMonth, prevYear, prevMonth, from, to }
  }

  formatDate(year, month, day) {
    const sYear = year.toString()
    let sMonth = `0${month.toString()}`
    let sDay = `0${day.toString()}`

    if (sMonth.length > 2) {
      sMonth = sMonth.substring(1, 3)
    }
    if (sDay.length > 2) {
      sDay = sDay.substring(1, 3)
    }
    return `${sYear}-${sMonth}-${sDay}`
  }
}
