// describes what to do when a user runs the 'serve' command
import path from 'path'; // part of node standard library that helps calculate paths on a file system
import { Command } from 'commander';
import { serve } from 'local-api';

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command() // customize the Command we create / export 
// if a user runs 'hacker-canvas serve', it'll execute logic associated with this Command
  .command('serve [filename]') 
  .description('Open a file for editing') // shown on display help (--help, -h)
  /* 
    option's second argument describes what the option is about.
    third argument is a default value (command line arguments are by default a string value).
    <> indicates required value, [] indicates an optional value that a user may provide
  */
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action((filename = 'hackercanvasNotebok', options: { port: string }) => {
    const dir = path.join(process.cwd(), path.dirname(filename));

     serve(parseInt(options.port), path.basename(filename), dir, !isProduction);
  });