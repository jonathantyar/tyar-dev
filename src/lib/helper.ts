import moment from 'moment';

export function formatDate(dateString: string, format: string): string {
  const date = moment(dateString);
  const formattedDate = date.format(format);
  return formattedDate;
}