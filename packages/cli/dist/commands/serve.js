"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
// describes what to do when a user runs the 'serve' command
const path_1 = __importDefault(require("path")); // part of node standard library that helps calculate paths on a file system
const commander_1 = require("commander");
const local_api_1 = require("local-api");
exports.serveCommand = new commander_1.Command() // customize the Command we create / export 
    // if a user runs 'hacker-canvas serve', it'll execute logic associated with this Command
    .command('serve [filename]')
    .description('Open a file for editing') // shown on display help (--help, -h)
    /*
      option's second argument describes what the option is about.
      third argument is a default value (command line arguments are by default a string value).
      <> indicates required value, [] indicates an optional value that a user may provide
    */
    .option('-p, --port <number>', 'port to run server on', '4005')
    .action((filename = 'hackercanvasNotebok', options) => {
    const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
    (0, local_api_1.serve)(parseInt(options.port), path_1.default.basename(filename), dir);
});
