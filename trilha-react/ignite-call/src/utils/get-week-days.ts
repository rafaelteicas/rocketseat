export function getWeekDays() {
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })

  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2024, 3, day))))
    .map((weekDay) =>
      weekDay.substring(0, 1).toLocaleUpperCase().concat(weekDay.substring(1)),
    )
}
