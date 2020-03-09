export interface IDataPoint {
  r: number;
  x: number;
  y: number;
}

export interface ICookie {
  name: string;
  impact: number; // range: [0-100]
  type: "timeInterval" | "allDay";
  timeInterval?: {
    startTime: number; // timestamp in ms
    duration: number; // amount of time elapsed in ms
  };
  allDay?: {
    startDate: string;
    numberOfDays: number; // [1-n]
  };
}

export interface IDomainRange {
  domain: [number, number];
  range: [number, number];
  width: number;
  height: number;
  buffer?: {
    domain: [number, number];
    range: [number, number];
  };
}
