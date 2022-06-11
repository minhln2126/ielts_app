const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Connect to database successfully!');
    } catch (error) {
        console.log('Fail to connect the database!', error);
    }
}

module.exports = { connect };