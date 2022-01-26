import type { Day, Month, Datetime } from "./_types";

const enDayShort: Day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const enDayLong: Day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const thDayShort: Day = [
  "อาทิตย์",
  "จันทร์",
  "อังคาร",
  "พุธ",
  "พฤหัส",
  "ศุกร์",
  "เสาร์",
];
const thDayLong: Day = [
  "วันอาทิตย์",
  "วันจันทร์",
  "วันอังคาร",
  "วันพุธ",
  "วันพฤหัสบดี",
  "วันศุกร์",
  "วันเสาร์",
];

export const day: Datetime<Day> = {
  en: {
    short: enDayShort,
    long: enDayLong,
  },
  th: {
    short: thDayShort,
    long: thDayLong,
  },
};

const enMonthShort: Month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const enMonthLong: Month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const thMonthShort: Month = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];
const thMonthLong: Month = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

export const month: Datetime<Month> = {
  en: {
    short: enMonthShort,
    long: enMonthLong,
  },
  th: {
    short: thMonthShort,
    long: thMonthLong,
  },
};
