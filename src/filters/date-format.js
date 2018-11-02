import moment from 'moment'

export function dateFormatBRLocale (timestamp) {
  if (timestamp) {
    moment.locale('pt-br')
    return moment(timestamp, 'YYYY-MM-DD').format('DD/MM/YYYY')
  }

  return ''
}
