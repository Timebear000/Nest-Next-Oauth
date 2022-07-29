export function getCurrentDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const today = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();
  return new Date(
    Date.UTC(year, month, today, hours, minutes, seconds, milliseconds),
  );
}
export function getCurrentDay(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const today = date.getDate();
  return new Date(Date.UTC(year, month, today));
}
export function UTCtoKR(date: Date) {
  date.setHours(date.getHours() - 9);
  const year = date.getFullYear();
  const month = date.getMonth();
  const today = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();
  return new Date(
    Date.UTC(year, month, today, hours, minutes, seconds, milliseconds),
  );
}
const week_day: string[] = ['일', '월', '화', '수', '목', '금', '토'];
export function GetWeekDay(date: Date) {
  date.setHours(date.getHours() - 9);
  return week_day[date.getDay()];
}
export function DateToPushString(date: Date) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const today = date.getUTCDate();

  return `${year}.${month}. ${today}`;
}
