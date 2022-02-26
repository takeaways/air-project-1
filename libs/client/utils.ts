import { formatInTimeZone } from "date-fns-tz";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { ko } from "date-fns/locale";

export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

export function koreanTime(
  date: string | number | Date,
  from: boolean = false,
  format: string = "yyyy.MM.dd(E) HH:mm:ss",
) {
  if (from) {
    return formatDistanceToNow(new Date(date).getTime(), {
      locale: ko,
      addSuffix: true,
    });
  }

  return formatInTimeZone(date, "Asia/Seoul", format, {
    locale: ko,
  });
}
