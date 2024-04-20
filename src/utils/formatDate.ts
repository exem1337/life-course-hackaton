export enum DateFormat {
  dateMonthYear = 'dd mmm yyyy',
  hourMinute = 'hh mm',
  Full = 'dd mm yyyy hh mm',
}

export function formatDate({ date }: { date: Date }, { format = DateFormat.dateMonthYear }: {format?: DateFormat}): string {
  const months = [
    'янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек',
  ];
  switch (format) {
    case DateFormat.dateMonthYear:
      return `${date?.getDate()} ${months[date?.getMonth()]} ${date?.getFullYear()}`;
    case DateFormat.hourMinute:
      return `${date?.getHours()}:${date?.getMinutes()}`;
    case DateFormat.Full:
      return `${date?.getDate()} ${months[date?.getMonth()]} ${date?.getFullYear()}, ${date?.getHours()}:${date?.getMinutes()}`
  }
}
