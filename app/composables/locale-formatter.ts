import { type CalendarDate, DateFormatter, getLocalTimeZone, parseAbsolute } from '@internationalized/date'
import { NumberFormatter } from '@internationalized/number'

export function useLocaleFormatter() {
  const { getLocale } = useI18n()

  function parseDateTime(dateOrString: Date | string) {
    const datestring = dateOrString instanceof Date ? dateOrString.toISOString() : dateOrString

    return parseAbsolute(datestring, getLocalTimeZone())
  }

  function parsePeriod(period: string) {
    const [year, month] = period.split('-')

    return new Date(Number(year), Number(month) - 1, 1)
  }

  function formatDate(datestring: string, options?: Intl.DateTimeFormatOptions) {
    const date = parseDateTime(datestring)

    const formatter = new DateFormatter(getLocale(), options)

    return formatter.format(date.toDate())
  }

  function formatNumber(value: number) {
    const formatter = new NumberFormatter(getLocale(), {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    })

    return [formatter.format(value), '₽'].join('\xA0')
  }

  function formatPeriod({ month, year }: Pick<CalendarDate, 'month' | 'year'>) {
    return `${year}-${String(month).padStart(2, '0')}`
  }

  return {
    formatDate,
    formatNumber,
    formatPeriod,
    parseDateTime,
    parsePeriod,
  }
}
