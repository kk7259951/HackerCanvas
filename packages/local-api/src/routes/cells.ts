import express from 'express';
/* 
  fs/promises is a submodule equivalent to fs but all the
  different functions inside return promises to allow writing
  async await code instead of callbacks
*/
import fs from 'fs/promises';
import path from 'path';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();

  router.use(express.json()); // body parsing middleware

  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    try {
    // Read the file 
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });

      res.send(JSON.parse(result));
    } catch (err) {
      // @ts-ignore
      if (err.code === 'ENOENT') { // ENOENT = Error No Entity or 'that file does not exist'
        // Add code to create a file and add default cells
        await fs.writeFile(fullPath, '[]', 'utf-8');
        res.send([]); 
      } else {
        // we have an error that was not anticipated so rethrow the error
        throw err;
      }
    }
    // If read throws an error
    // Inspect the error to see if it says the file doesn't exist

    // Read the file
    // Parse a list of cells out of it
    // Send list of cells back to browser 
  });

  router.post('/cells', async (req, res) => {
    // Take the list of cells from the request obj and serialize
    const { cells }: { cells: Cell[] } = req.body; // annotate type of cells as an array of Cell
    // Write the cells into the file 
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    res.send({ status: 'ok' });
  });

  return router;
};