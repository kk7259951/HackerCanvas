"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCellsRouter = void 0;
const express_1 = __importDefault(require("express"));
/*
  fs/promises is a submodule equivalent to fs but all the
  different functions inside return promises to allow writing
  async await code instead of callbacks
*/
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const createCellsRouter = (filename, dir) => {
    const router = express_1.default.Router();
    router.use(express_1.default.json()); // body parsing middleware
    const fullPath = path_1.default.join(dir, filename);
    router.get('/cells', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Read the file 
            const result = yield promises_1.default.readFile(fullPath, { encoding: 'utf-8' });
            res.send(JSON.parse(result));
        }
        catch (err) {
            // @ts-ignore
            if (err.code === 'ENOENT') { // ENOENT = Error No Entity or 'that file does not exist'
                // Add code to create a file and add default cells
                yield promises_1.default.writeFile(fullPath, '[]', 'utf-8');
                res.send([]);
            }
            else {
                // we have an error that was not anticipated so rethrow the error
                throw err;
            }
        }
        // If read throws an error
        // Inspect the error to see if it says the file doesn't exist
        // Read the file
        // Parse a list of cells out of it
        // Send list of cells back to browser 
    }));
    router.post('/cells', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // Take the list of cells from the request obj and serialize
        const { cells } = req.body; // annotate type of cells as an array of Cell
        // Write the cells into the file 
        yield promises_1.default.writeFile(fullPath, JSON.stringify(cells), 'utf-8');
        res.send({ status: 'ok' });
    }));
    return router;
};
exports.createCellsRouter = createCellsRouter;
