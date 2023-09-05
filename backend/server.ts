import express from 'express';
 
// Initialize the express engine
const app: express.Application = express();
 
// Take a port 3000 for running server.
const port: number = 3001;
 
// Handling '/' Request
app.get('/', (req, res) => {
    res.send("TypeScript With Express");
});
 
// Server setup
app.listen(port, () => {
    console.log(`Server running to http://localhost:${port}/`);
});