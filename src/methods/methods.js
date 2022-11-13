//returns an arrays of only the last week days from an array of shifts (starting from sunday)
export const getThisWeek = (data) => {
  //data -- array of shifts
  const lastSeven = data.slice(0, 7);
  const weekdays = lastSeven.map(
    (shift) => new Array(new Date(shift.timeStart).toString().split(" "))
  );
  let lastSunday = weekdays.find((day) => day[0][0] === "Sun");
  if (!lastSunday) {
    lastSunday = weekdays[0];
  }
  const lastSundayDate = parseInt(lastSunday[0][2]);
  const lastSundayDateObject = lastSeven.find(
    (shift) => new Date(shift.timeStart).getDate() === lastSundayDate
  );
  const lastSundayDateIndex = lastSeven.findIndex(
    (shift) => shift === lastSundayDateObject
  );
  const week = lastSeven.slice(0, lastSundayDateIndex + 1); //week - array of shifts
  return week;
};

//returns array of shifts durations in milliseconds(number) from an array of shift objects
export const shiftsToMilliseconds = (days) => {
  const milliseconds = days.map((shift) => {
    const delta =
      new Date(shift.timeEnd).getTime() - new Date(shift.timeStart).getTime();
    return delta;
  });
  return milliseconds;
};

//returns string of formatted hour from number of milliseconds
export const milisecondsToHours = (milliseconds) => {
  const milsToMins = milliseconds / 60000;
  const hours = Math.floor(milsToMins / 60)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor(milsToMins % 60)
    .toString()
    .padStart(2, "0");
  return `${hours}:${minutes}`;
};

//returns summ of all shifts durations(number) from an array of shifts object
export const countWeeklyMiliseconds = (data) => {
  const daysAfterSunday = getThisWeek(data);
  const miliseconds = shiftsToMilliseconds(daysAfterSunday);
  const weeklyMlsCount = miliseconds.reduce(
    (partialSum, a) => partialSum + a,
    0
  );
  return weeklyMlsCount;
};

export const countDayMilliseconds = (shift) => {
  const delta =
    new Date(shift.timeEnd).getTime() - new Date(shift.timeStart).getTime();
  return delta;
};

//returns a formatted string of workings hours from array of shifts objects
export const countWeeklyHours = (data) => {
  return milisecondsToHours(countWeeklyMiliseconds(data));
};

export const countDayHours = (data) => {
  return milisecondsToHours(countDayMilliseconds(data));
};

//retuns a formatted string of average workings hours from array of shifts objects
export const countAverageDayHours = (data) => {
  const days = getThisWeek(data).length;
  const miliseconds = countWeeklyMiliseconds(data);
  const averageMiliseconds = miliseconds / days;
  const hours = milisecondsToHours(averageMiliseconds);
  return hours;
};

//retuns a formatted string of weekly earnings from array of shifts objects
export const countWeeklyEarningsDemo = (data, baseWage = 47) => {
  const milisecondsThisWeek = countWeeklyMiliseconds(data);
  const hoursThisWeek = milisecondsThisWeek / 1000 / 60 / 60;
  return `${Math.floor(hoursThisWeek * baseWage)} ₪`;
};

export const countDayEarnings = (data, baseWage = 47) => {
  const milisecondsThisDay = countDayMilliseconds(data);
  const hoursThisDay = milisecondsThisDay / 1000 / 60 / 60;
  return `${Math.floor(hoursThisDay * baseWage)} ₪`;
};

export const countEarningsByMiliSeconds = (miliseconds, baseWage = 47) => {
  const hoursThisDay = miliseconds / 1000 / 60 / 60;
  return `${Math.floor(hoursThisDay * baseWage)} ₪`;
};

export const convert12to24 = (timeStr) => {
  console.log(timeStr);
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":");
  if (hours === "12") {
    hours = "00";
  }
  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }
  if (hours.length < 2) {
    hours = `0${hours}`;
  }
  return `${hours}:${minutes}`;
};

export const getFormattedDataFromDay = (timeStart, timeEnd, weekday, wage) => {
  if (!timeEnd) timeEnd = new Date().toISOString();
  let baseDate = new Date(timeStart);
  const optionsDay = { weekday: weekday };
  const num = baseDate.getDate();
  const optionsMonth = { month: "short" };
  const month = new Intl.DateTimeFormat("en-US", optionsMonth).format(baseDate);
  const day = new Intl.DateTimeFormat("en-US", optionsDay).format(baseDate);
  const timeStartToDisplay = convert12to24(
    baseDate.toLocaleTimeString("en-US")
  );
  const timeEndToDisplay = convert12to24(
    new Date(timeEnd).toLocaleTimeString("en-US")
  );
  const earningsToDisplay = countDayEarnings({ timeStart, timeEnd }, wage);
  const workingHours = countDayHours({ timeStart, timeEnd });

  return {
    num,
    month,
    day,
    timeStartToDisplay,
    timeEndToDisplay,
    earningsToDisplay,
    workingHours,
  };
};
