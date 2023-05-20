import mongoose from 'mongoose';
import { catchingUncaughtExceptions, handleRejections, } from './utils/exceptions/exceptionHandlers.js';
import dotenv from 'dotenv';
catchingUncaughtExceptions;
dotenv.config({ path: './.env' });
import App from './App.js';
const app = new App().getApp();
const password = process.env.DATABASE_PASSWORD || '';
const DB = process.env.DATABASE.replace('<PASSWORD>', password);
mongoose
    .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(() => console.log('DB connection successful'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server connected on port ${PORT}...`));
handleRejections;
//# sourceMappingURL=server.js.map