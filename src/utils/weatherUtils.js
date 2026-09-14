export const formatLocalTime = (timestamp, timezoneOffset) => {
  const localTimestamp = (timestamp + timezoneOffset) * 1000

  return new Date(localTimestamp).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  })
}

export const formatLocalDate = (timestamp, timezoneOffset) => {
  const localTimestamp = (timestamp + timezoneOffset) * 1000

  return new Date(localTimestamp).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })
}

export const formatVisibility = (visibilityInMeters) => {
  if (visibilityInMeters === undefined) {
    return "N/A"
  }

  return `${(visibilityInMeters / 1000).toFixed(1)} km`
}

export const formatForecastHour = (timestamp, timezoneOffset) => {
  const localTimestamp = (timestamp + timezoneOffset) * 1000

  return new Date(localTimestamp).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  })
}

export const formatForecastDay = (timestamp, timezoneOffset) => {
  const localTimestamp = (timestamp + timezoneOffset) * 1000

  return new Date(localTimestamp).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
}

const getLocalDateKey = (timestamp, timezoneOffset) => {
  const date = new Date((timestamp + timezoneOffset) * 1000)

  const year = date.getUTCFullYear()

  const month = String(date.getUTCMonth() + 1).padStart(2, "0")

  const day = String(date.getUTCDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

const getLocalHour = (timestamp, timezoneOffset) => {
  const date = new Date((timestamp + timezoneOffset) * 1000)

  return date.getUTCHours()
}

export const buildDailyForecast = (forecastList, timezoneOffset) => {
  const groupedDays = {}

  forecastList.forEach((item) => {
    const dayKey = getLocalDateKey(item.dt, timezoneOffset)

    if (!groupedDays[dayKey]) {
      groupedDays[dayKey] = []
    }

    groupedDays[dayKey].push(item)
  })

  return Object.entries(groupedDays)
    .slice(0, 5)
    .map(([dateKey, items]) => {
      const temperatures = items.map((item) => item.main.temp)

      const minTemperature = Math.min(...temperatures)

      const maxTemperature = Math.max(...temperatures)

      const precipitationProbability = Math.max(...items.map((item) => item.pop || 0))

      const representativeItem = items.reduce((closestItem, currentItem) => {
        const closestDistance = Math.abs(getLocalHour(closestItem.dt, timezoneOffset) - 12)

        const currentDistance = Math.abs(getLocalHour(currentItem.dt, timezoneOffset) - 12)

        return currentDistance < closestDistance ? currentItem : closestItem
      })

      return {
        dateKey,
        timestamp: representativeItem.dt,
        minTemperature,
        maxTemperature,
        precipitationProbability,
        weather: representativeItem.weather[0],
      }
    })
}
