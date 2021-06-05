import { opn } from 'https://denopkg.com/hashrock/deno-opn/opn.ts';
import { DayOfClass, classLinks, ClassName } from './classLinks.ts';
import { colorize } from 'https://deno.land/x/ink@1.3/mod.ts';
import { normalize } from 'https://deno.land/std@0.97.0/path/mod.ts';
import { exists } from 'https://deno.land/std@0.97.0/fs/mod.ts';
import { askForDetails } from './cli.ts';

const WEEK_DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;

const todaysClassLaunched: Record<string, boolean> = {};

const colorLog = (et: string) => console.log(colorize(et));

function getNMinutesAgo(
  [hours, minutes]: [number, number],
  n: number
): [hours: number, minutes: number] {
  if (minutes < n) hours--;

  minutes -= n;

  return [hours, minutes];
}

function getHourAndMinutes(time: string): [hours: number, minutes: number] {
  const [hour, minutes] = time.split(':');

  return [+hour, +minutes];
}

function getClassesToday(dayOfWeek: DayOfClass, config: typeof classLinks) {
  const classesContent = Object.entries(config);

  const classesToday: { name: ClassName; hour: number; minutes: number; link: string }[] = [];

  for (const [className, classContent] of classesContent) {
    const todayTime = classContent.times.find((time) => time.day === dayOfWeek);

    if (typeof todayTime === 'undefined') continue;

    const [hour, minutes] = getHourAndMinutes(todayTime.time);

    classesToday.push({
      hour,
      minutes,
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

function openClassLink(config: typeof classLinks) {
  const date = new Date();

  const weekDay = WEEK_DAYS[date.getDay()];
  const hour = date.getHours();
  const minutes = date.getMinutes();

  // Today can be a class

  const todayClasses = getClassesToday(weekDay as DayOfClass, config);
  const upcomingClass = todayClasses.find((todayClass) => todayClass.hour >= hour);

  if (typeof upcomingClass === 'undefined') {
    return colorLog(
      '<yellow>No more classes for today 🥳🥳🥳. Feel free to close this window.</yellow>'
    );
  }

  // Get the time 5 minutes before the time
  const [launchHours, launchMinutes] = getNMinutesAgo(
    [upcomingClass.hour, upcomingClass.minutes],
    5
  );

  if (!todaysClassLaunched[upcomingClass.name]) {
    colorLog(
      `<blue>
<b>[RUNNING]</b>
Launching next class <b>${upcomingClass.name} @ ${launchHours}:${launchMinutes}</b>
</blue>`
    );
  }

  if (
    hour === launchHours &&
    minutes >= launchMinutes &&
    !todaysClassLaunched[upcomingClass.name]
  ) {
    // Launch class
    colorLog(`<green><b>[LAUNCHING]</b> Launching <b>${upcomingClass.name}</b></green>`);

    opn(upcomingClass.link);
    todaysClassLaunched[upcomingClass.name] = true;
  }
}

try {
  // Try to read the config file
  const APPDATA_PATH = Deno.env.get('APPDATA') || Deno.env.get('HOME');

  const configFilePath = normalize(`${APPDATA_PATH}/auto-class-launcher-timetable.json`);
  const configFileExists = await exists(configFilePath);

  if (!configFileExists) {
    // Make the file
    const encoder = new TextEncoder();
    await Deno.writeFile(configFilePath, encoder.encode(JSON.stringify(classLinks)));

    await askForDetails(configFilePath);
  } else {
    // Announce all the important things, like repository, the config file URL
    colorLog(`<cyan>
    __          ________ _      _____ ____  __  __ ______  
    \\ \\        / /  ____| |    / ____/ __ \\|  \\/  |  ____| 
     \\ \\  /\\  / /| |__  | |   | |   | |  | | \\  / | |__    
      \\ \\/  \\/ / |  __| | |   | |   | |  | | |\\/| |  __|   
       \\  /\\  /  | |____| |___| |___| |__| | |  | | |____  
        \\/  \\/   |______|______\\_____\\____/|_|  |_|______|       </cyan>`);

    colorLog(
      '\n\nThis is the <green>Auto Class launcher</green> project! Opens up your class links based on your timetable 5 minutes before'
    );

    colorLog(
      `\nThis project works based on a config file stored in your computer. Your timetable and links are there only. `
    );

    colorLog(`Your config file is stored at <green>${configFilePath}</green>.`);

    colorLog(`\n<yellow>Please modify the file for your own purposes.</yellow>`);

    colorLog(
      `\nTo read about how to modify the file and its format, go to <red>https://github.com/PuruVJ/auto-class-launcher</red>.`
    );
  }

  const decoder = new TextDecoder('utf-8');
  const config = JSON.parse(decoder.decode(await Deno.readFile(configFilePath)));

  setInterval(() => openClassLink(config), 10 * 1000);
} catch (e) {
  colorLog(`<red>${e}</red>`);
}
