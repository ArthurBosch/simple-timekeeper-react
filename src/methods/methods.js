//returns an arrays of only the last week days from an array of shifts (starting from sunday)
export const getThisWeek = (data) => {
  //data -- array of shifts
  const lastSeven = data.slice(0, 7);
  const weekdays = lastSeven.map(
    (shift) => new Array(new Date(shift.startTime).toString().split(" "))
  );
  const lastSunday = weekdays.find((day) => day[0][0] === "Sun");
  const lastSundayDate = parseInt(lastSunday[0][2]);
  const lastSundayDateObject = lastSeven.find(
    (shift) => new Date(shift.startTime).getDate() === lastSundayDate
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
      new Date(shift.endTime).getTime() - new Date(shift.startTime).getTime();
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
    new Date(shift.endTime).getTime() - new Date(shift.startTime).getTime();
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
  return `${parseInt(hoursThisWeek * baseWage)} ₪`;
};

export const countDayEarnings = (data, baseWage = 47) => {
  const milisecondsThisDay = countDayMilliseconds(data);
  const hoursThisDay = milisecondsThisDay / 1000 / 60 / 60;
  return `${parseInt(hoursThisDay * baseWage)} ₪`;
};
