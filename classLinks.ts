export type ClassName =
  | 'diff-equations'
  | 'physics'
  | 'eng-graphics'
  | 'practice-eng-graphics'
  | 'dsa'
  | 'practice-dsa'
  | 'disc-structures'
  | 'practice-manufacturing'
  | 'env-design';

export type DayOfClass = 'mon' | 'tue' | 'wed' | 'thu' | 'fri';

export type ClassLink = {
  times: { day: DayOfClass; time: string }[];
  link?: string;
};

export const classLinks: Record<ClassName, ClassLink> = {
  'diff-equations': {
    link: 'https://meet.google.com/ajp-noxv-zng?authuser=2',
    times: [
      { day: 'mon', time: '9:00' },
      { day: 'tue', time: '11:00' },
      { day: 'thu', time: '12:00' },
      { day: 'fri', time: '10:00' },
    ],
  },
  'disc-structures': {
    link: 'https://meet.google.com/txo-tvbd-zvt?authuser=2',
    times: [
      { day: 'tue', time: '12:00' },
      { day: 'wed', time: '12:00' },
      { day: 'thu', time: '11:00' },
      { day: 'fri', time: '15:00' },
    ],
  },
  dsa: {
    link: 'https://meet.google.com/iha-ajkk-map?authuser=2',
    times: [
      { day: 'tue', time: '10:00' },
      { day: 'thu', time: '10:00' },
      { day: 'fri', time: '14:00' },
    ],
  },
  'practice-dsa': {
    link: 'https://meet.google.com/iha-ajkk-map?authuser=2',
    times: [{ day: 'tue', time: '14:00' }],
  },
  'eng-graphics': {
    link: 'https://meet.google.com/uaa-brhr-rwy?authuser=2',
    times: [
      { day: 'mon', time: '12:00' },
      { day: 'thu', time: '14:00' },
      { day: 'mon', time: '12:00' },
    ],
  },
  'practice-eng-graphics': {
    link: 'https://meet.google.com/uaa-brhr-rwy?authuser=2',
    times: [{ day: 'mon', time: '14:00' }],
  },
  'practice-manufacturing': {
    times: [{ day: 'thu', time: '16:00' }],
  },
  physics: {
    link: 'https://meet.google.com/osh-yivo-sof?authuser=2',
    times: [
      { day: 'mon', time: '10:00' },
      { day: 'tue', time: '9:00' },
      { day: 'thu', time: '9:00' },
      { day: 'fri', time: '11:00' },
    ],
  },
  'env-design': {
    times: [{ day: 'fri', time: '16:00' }],
  },
};
