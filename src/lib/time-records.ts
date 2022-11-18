import type { FormData } from "../pages/registrar-tiempo";

export type DayOption = "today" | "yesterday" | "other";
export type TimeRecord = {
  startTime: string;
  finishTime: string;
  deltaHours: number;
  day: string;
};

export function getDateStringFromOption(option: DayOption, specificDay?: Date) {
  if (option === "other" && specificDay === undefined) {
    throw new Error(
      "You must provide a specific day when the option is `other`"
    );
  }

  let date: Date;

  switch (option) {
    case "today":
      date = new Date();
      break;
    case "yesterday": {
      date = new Date();
      const currentDate = date.getDate();
      if (currentDate > 0) date.setDate(currentDate - 1);
      break;
    }
    case "other":
      date = specificDay!; // it is safe because of the early throw
      break;
    default: {
      date = new Date();
    }
  }

  return date.toISOString();
}

const CURRENT_RECORDS_KEY = "current-records";

export function getTimeRecords(): TimeRecord[] {
  const records = localStorage.getItem(CURRENT_RECORDS_KEY);
  if (!records) {
    return [];
  }

  const recordsArray = JSON.parse(records) as TimeRecord[];
  return recordsArray;
}

export function saveTimeRecord(data: FormData) {
  const currentRecords = getTimeRecords();
  currentRecords.push({
    startTime: data.startTime,
    finishTime: data.finishTime,
    deltaHours: getDeltaTime(data.startTime, data.finishTime),
    day: getDateStringFromOption(data.day, data.specificDay),
  });

  localStorage.setItem(CURRENT_RECORDS_KEY, JSON.stringify(currentRecords));
}

export function getDeltaTime(startTime: string, finishTime: string): number {
  const baseDate = "2022-01-01 ";
  const startDate = new Date(baseDate + startTime);
  const finishDate = new Date(baseDate + finishTime);

  const deltaMS = finishDate.getTime() - startDate.getTime();
  const deltaHours = deltaMS / 1000 / 60 / 60;
  return Number(deltaHours.toFixed(2));
}
