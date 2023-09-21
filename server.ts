import app from './config/express';
import { start } from './config/mongoose';

const PORT = process.env.PORT || 3000;

start();
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
