import mongoose from 'mongoose';
import dotenv from 'dotenv';
process.on('uncaughtException', err => {
    console.log('Uncaught Error!');
    console.log(err.name, err.message);
    process.exit(1);
});
dotenv.config({ path: './.env' });
import App from './app.js';
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
process.on('unhandledRejection', (err) => {
    console.log('Unhandled Error!');
    console.log(err.name, err.message);
    process.exit(1);
});
//# sourceMappingURL=server.js.map