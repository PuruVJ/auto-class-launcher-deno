import Ask from 'https://deno.land/x/ask@1.0.6/mod.ts';
import { colorize } from 'https://deno.land/x/ink@1.3/mod.ts';

const ask = new Ask(); // global options are also supported! (see below)

async function askForDetails(configPath: string) {
  const isIIITDMStudent = await ask.input({
    name: 'is-cse-student',
    type: 'confirm',
    message: 'Are you a IIITDMK CSE Student? [y/n]',
    default: 'y',
    validate: (val) => ['y', 'n'].includes(val?.toLowerCase() || ''),
  });

  if (isIIITDMStudent['is-cse-student']?.toLowerCase() === 'n') {
    // Not CSE student. Show the prompt
    console.log(
      colorize(`\nHi!! This script is made specially for IIITDMK CSE student of 2nd sem. 
So you'll have to do some modifications to the timetable config yourselves.\n
Visit <red>https://github.com/PuruVJ/auto-class-launcher</red> to see how to change the configuration`)
    );
  }

  console.log(
    colorize(
      `\n
<yellow>
Your config file is saved as 
<green>${configPath}</green>
</yellow>`
    )
  );
}

export { askForDetails };
