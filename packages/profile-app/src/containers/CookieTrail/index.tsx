import * as React from "react";
import { ICookie, IDataPoint, IDomainRange } from "../../common/types";
import {
  getDataPoints,
  getDomain,
  getMillis,
  getRange,
  getTimestamp,
} from "../../common/utils";
import "./CookieTrail.scss";

const TIMELINE_WIDTH = 1000;
const TIMELINE_HEIGHT = 500;

const SAMPLE_DATA: ICookie[] = [
  {
    name: "Mom loved the painting I made for Mother's Day!",
    impact: 80,
    type: "allDay",
    allDay: {
      startDate: "2019-05-09",
      numberOfDays: 1,
    },
  },
  {
    name: "Math Test",
    impact: 90,
    type: "timeInterval",
    timeInterval: {
      startTime: getTimestamp("2019-05-11", "13:00"),
      duration: getMillis(60),
    },
  },
  {
    name: "Counselor said I was a great artist",
    impact: 50,
    type: "timeInterval",
    timeInterval: {
      startTime: getTimestamp("2019-05-15", "14:00"),
      duration: getMillis(15),
    },
  },
  {
    name: "Art Club Poster",
    impact: 92,
    type: "timeInterval",
    timeInterval: {
      startTime: getTimestamp("2019-05-16", "16:00"),
      duration: getMillis(30),
    },
  },
  {
    name: "Track & Field Practice",
    impact: 25,
    type: "timeInterval",
    timeInterval: {
      startTime: getTimestamp("2019-05-16", "17:00"),
      duration: getMillis(120),
    },
  },
  {
    name: "Reading Goal (15 pages)",
    impact: 75,
    type: "timeInterval",
    timeInterval: {
      startTime: getTimestamp("2019-05-17", "22:00"),
      duration: getMillis(30),
    },
  },
];

const mapDataPointsToPixels = (
  dataPoints: IDataPoint[],
  domainRange: IDomainRange,
): IDataPoint[] => {
  const { domain, range, width, height, buffer } = domainRange;
  const [x0, x1] = domain;
  const [y0, y1] = range;
  const [bx0, bx1] = buffer !== undefined ? buffer.domain : [0, 0];
  const [by0, by1] = buffer !== undefined ? buffer.range : [0, 0];
  const scaleX = (x1 - x0) / (width - bx0 - bx1);
  const scaleY = (y1 - y0) / (height - by0 - by1);
  return dataPoints.map(({ x, y, ...dataPoint }) => {
    return {
      ...dataPoint,
      x: (x - x0) / scaleX + bx0,
      y: (y - y0) / scaleY + by0,
    };
  });
};

const renderDataPoint = (height: number) => (item: IDataPoint, i: number) => {
  return <circle key={i} cx={item.x} cy={height - item.y} r={item.r} />;
};

export const CookieTrail = () => {
  const rawData = SAMPLE_DATA;
  const width = TIMELINE_WIDTH;
  const height = TIMELINE_HEIGHT;
  const rawDataPoints = getDataPoints(rawData);
  const domain = getDomain(rawDataPoints);
  const range = getRange(rawDataPoints);
  const dataPoints = mapDataPointsToPixels(rawDataPoints, {
    domain,
    range,
    width,
    height,
    buffer: {
      domain: [10, 10],
      range: [10, 10],
    },
  });

  return (
    <div>
      <h2>Cookie Trail Frontend Demo</h2>
      <svg width={TIMELINE_WIDTH} height={TIMELINE_HEIGHT}>
        <g>{dataPoints.map(renderDataPoint(height))}</g>
      </svg>
    </div>
  );
};
