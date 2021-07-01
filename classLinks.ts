export type DayOfClass = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export type ClassLink = {
  times: { day: DayOfClass; time: string }[];
  link?: string;
};

export const classLinks: Record<string, ClassLink> = {
  'Discrete Structures': {
    link: 'https://meet.google.com/txo-tvbd-zvt?authuser=2',
    times: [
      { day: 'tue', time: '12:00' },
      { day: 'wed', time: '12:00' },
      { day: 'thu', time: '11:00' },
      { day: 'fri', time: '15:00' },
    ],
  },
  DSA: {
    link: 'https://meet.google.com/iha-ajkk-map?authuser=2',
    times: [
      { day: 'tue', time: '10:00' },
      { day: 'thu', time: '10:00' },
      { day: 'fri', time: '14:00' },
    ],
  },
  'DSA Practise': {
    link: 'https://meet.google.com/iha-ajkk-map?authuser=2',
    times: [{ day: 'tue', time: '14:00' }],
  },
  'Engineering Graphics': {
    link: 'https://meet.google.com/uaa-brhr-rwy?authuser=2',
    times: [
      { day: 'mon', time: '12:00' },
      { day: 'thu', time: '14:00' },
      { day: 'mon', time: '12:00' },
    ],
  },
  'Engineering Graphics Practise': {
    link: 'https://meet.google.com/uaa-brhr-rwy?authuser=2',
    times: [{ day: 'mon', time: '14:00' }],
  },
  'Design & Manufacturing Lab': {
    times: [{ day: 'thu', time: '16:00' }],
  },
  Waves: {
    link: 'https://meet.google.com/osh-yivo-sof?authuser=2',
    times: [
      { day: 'mon', time: '10:00' },
      { day: 'tue', time: '9:00' },
      { day: 'thu', time: '9:00' },
      { day: 'fri', time: '11:00' },
    ],
  },
  'Environmental Design': {
    times: [{ day: 'fri', time: '16:00' }],
  },
};
