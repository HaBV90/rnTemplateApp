import 'dayjs/locale/ja';

import dayjs, {ManipulateType, OpUnitType} from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (date: Date | string, format: string) => {
  return dayjs(date).tz('Asia/Tokyo').format(format);
};

export const fromNow = (date: Date) => {
  return dayjs(date).tz('Asia/Tokyo').locale('ja').fromNow(true);
};

export const addDate = (date: Date, value: number, unit?: ManipulateType) =>
  dayjs(date).add(value, unit).toDate();

export const diffOfDate = (date1: Date, date2: Date, unit?: OpUnitType) =>
  dayjs(date1).diff(date2, unit);

export const getExpiresAt = (date: Date, offset: number) => {
  return dayjs(date)
    .tz('Asia/Tokyo')
    .add(-(offset % 1440), 'minute')
    .endOf('day')
    .add(offset, 'minute')
    .toDate();
};
