import { opn } from 'https://denopkg.com/hashrock/deno-opn/opn.ts';
import { DayOfClass, classLinks, ClassName } from './classLinks.ts';
import { colorize } from 'https://deno.land/x/ink@1.3/mod.ts';

const WEEK_DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;

const todaysClassLaunched: Partial<Record<ClassName, boolean>> = {};

function getTimesOfClassesToday(dayOfWeek: DayOfClass) {
  const classesContent = Object.entries(classLinks);

  const classesToday: { name: ClassName; hour: number; link: string }[] = [];

  for (const [className, classContent] of classesContent) {
    const todayTime = classContent.times.find((time) => time.day === dayOfWeek);

    // Also populate `todaysClassLaunched`

    if (typeof todayTime === 'undefined') continue;

    classesToday.push({
      hour: todayTime.hour,
      link: classContent.link,
      name: className as ClassName,
    });
  }

  if (Object.keys(todaysClassLaunched).length === 0) {
    // Fill up the object
    for (const classToday of classesToday) {
      todaysClassLaunched[classToday.name] = false;
    }
  }

  return classesToday.sort((a, b) => a.hour - b.hour);
}

function openClassLink() {
  const date = new Date();

  const weekDay = WEEK_DAYS[date.getDay()];
  const hour = date.getHours();
  const minutes = date.getMinutes();

  if (!['mon', 'tue', 'wed', 'thu', 'fri'].includes(weekDay)) return;

  // Today can be a class

  const todayClasses = getTimesOfClassesToday(weekDay as DayOfClass);
  const upcomingClass = todayClasses.find((todayClass) => todayClass.hour > hour);

  if (typeof upcomingClass === 'undefined') {
    return console.log(
      colorize(
        '<yellow>No more classes for today 🥳🥳🥳\n Feel free to close this window.</yellow>'
      )
    );
  }

  if (!todaysClassLaunched[upcomingClass.name]) {
    console.log(
      colorize(
        `<blue><b>[RUNNING]</b> Running! Launching next class <b>${upcomingClass?.name} @ ${
          upcomingClass.hour - 1
        }:55</b></blue>`
      )
    );
  }

  if (
    hour === upcomingClass.hour - 1 &&
    minutes >= 55 &&
    !todaysClassLaunched[upcomingClass.name]
  ) {
    // Launch class
    console.log(
      colorize(`<green><b>[LAUNCHING]</b> Launching <b>${upcomingClass.name}</b></green>`)
    );

    opn(upcomingClass.link);
    todaysClassLaunched[upcomingClass.name] = true;
  }
}

function main() {
  setInterval(() => openClassLink(), 10 * 1000);
}

try {
  main();
} catch (e) {
  console.log(colorize(`<red>${e}</red>`));
}
