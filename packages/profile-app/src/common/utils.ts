import moment from "moment";
import { ICookie, IDataPoint } from "./types";

export const getTimestamp = (date: string, time: string) => {
  return moment(`${date} ${time} +1000`, "YYYY-MM-DD HH:mm Z").valueOf();
};

export const getMillis = (minutes: number) => {
  return minutes * 60 * 1000;
};

const getRadiusFromHours = (hours: number) => {
  return (1 - Math.exp(-1 * hours)) * 10;
};

const getRadiusFromMillis = (millis: number) => {
  const hours = millis / 1000 / 60 / 60;
  return getRadiusFromHours(hours);
};

const convertCookieToDataPoint = (cookie: ICookie) => {
  if (cookie.type === "timeInterval") {
    const timeInterval = cookie.timeInterval!;
    return {
      r: getRadiusFromMillis(timeInterval.duration),
      x: timeInterval.startTime,
      y: cookie.impact,
    };
  } else if (cookie.type === "allDay") {
    const allDay = cookie.allDay!;
    return {
      r: getRadiusFromHours(allDay.numberOfDays * 24),
      x: moment(allDay.startDate, "YYYY-MM-DD").valueOf(),
      y: cookie.impact,
    };
  }
};

export const getDataPoints = (cookies: ICookie[]): IDataPoint[] => {
  return cookies
    .map(convertCookieToDataPoint)
    .filter(point => point !== undefined) as IDataPoint[];
};

export const getDomain = (dataPoints: IDataPoint[]): [number, number] => {
  const xPoints = dataPoints.map(point => point.x);
  return [Math.min(...xPoints), Math.max(...xPoints)];
};

export const getRange = (dataPoints: IDataPoint[]): [number, number] => {
  const yPoints = dataPoints.map(point => point.y);
  return [Math.min(...yPoints), Math.max(...yPoints)];
};
