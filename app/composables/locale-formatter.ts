import { DateFormatter, getLocalTimeZone, parseAbsolute } from '@internationalized/date'
import { NumberFormatter } from '@internationalized/number'

export function useLocaleFormatter() {
  const { getLocale } = useI18n()

  function formatDate(datestring: string, options?: Intl.DateTimeFormatOptions) {
    const date = parseAbsolute(datestring, getLocalTimeZone())

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

  return {
    formatDate,
    formatNumber,
  }
}
