import { program } from 'commander';
import { serveCommand } from './commands/serve';

program
  .addCommand(serveCommand);

/* 
  Below will tell Commander to take a look at the command line arguments, 
  parse them, figure out what command user is trying to run and execute appropriate command.  
*/
program.parse(process.argv);