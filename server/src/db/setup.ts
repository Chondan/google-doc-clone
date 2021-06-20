import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const db = mongoose.connection;

// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'connection error:'));

export { db };
