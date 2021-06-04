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
  times: { day: DayOfClass; hour: number }[];
  link: string;
};

export const classLinks: Record<ClassName, ClassLink> = {
  'diff-equations': {
    link: 'https://meet.google.com/ajp-noxv-zng?authuser=2',
    times: [
      { day: 'mon', hour: 9 },
      { day: 'tue', hour: 11 },
      { day: 'thu', hour: 12 },
      { day: 'fri', hour: 10 },
    ],
  },
  'disc-structures': {
    link: 'https://meet.google.com/txo-tvbd-zvt?authuser=2',
    times: [
      { day: 'tue', hour: 12 },
      { day: 'wed', hour: 12 },
      { day: 'thu', hour: 11 },
      { day: 'fri', hour: 15 },
    ],
  },
  dsa: {
    link: 'https://meet.google.com/iha-ajkk-map?authuser=2',
    times: [
      { day: 'tue', hour: 10 },
      { day: 'thu', hour: 10 },
      { day: 'fri', hour: 14 },
    ],
  },
  'practice-dsa': {
    link: 'https://meet.google.com/iha-ajkk-map?authuser=2',
    times: [{ day: 'tue', hour: 14 }],
  },
  'eng-graphics': {
    link: 'https://meet.google.com/uaa-brhr-rwy?authuser=2',
    times: [
      { day: 'mon', hour: 12 },
      { day: 'thu', hour: 14 },
      { day: 'mon', hour: 12 },
    ],
  },
  'practice-eng-graphics': {
    link: 'https://meet.google.com/uaa-brhr-rwy?authuser=2',
    times: [{ day: 'mon', hour: 14 }],
  },
  'practice-manufacturing': {
    link: 'https://meet.google.com/zif-cotc-gjc?authuser=2',
    times: [{ day: 'thu', hour: 16 }],
  },
  physics: {
    link: 'https://meet.google.com/osh-yivo-sof?authuser=2',
    times: [
      { day: 'mon', hour: 10 },
      { day: 'tue', hour: 9 },
      { day: 'thu', hour: 9 },
      { day: 'fri', hour: 11 },
    ],
  },
  'env-design': {
    link: 'https://meet.google.com/rzb-yajj-xqk?authuser=2',
    times: [{ day: 'fri', hour: 16 }],
  },
};
