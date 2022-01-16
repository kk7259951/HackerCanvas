"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const serve_1 = require("./commands/serve");
commander_1.program
    .addCommand(serve_1.serveCommand);
/*
  Below will tell Commander to take a look at the command line arguments,
  parse them, figure out what command user is trying to run and execute appropriate command.
*/
commander_1.program.parse(process.argv);
