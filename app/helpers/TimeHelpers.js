import moment from 'moment';

export const getDayEntries = (entries, date) => {
  let dayEntries = [];
  entries.map((ent, index) => {
    if (moment(ent.entry.created_at).dayOfYear() === moment(date).dayOfYear()) {
      ent.index = index;
      dayEntries.push(ent);
    }
  })
  dayEntries.dayString =  moment(date).format('ddd');
  dayEntries.longDayString =  moment(date).format('dddd');
  return dayEntries;
}

export const toTimeString = (hours, minutes) => {
  let minutesToHours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  hours = hours + minutesToHours;
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${hours}:${minutes}`;
}
