import app from './app.js'

app.listen(process.env.PORT || 4001, () => {
    console.log(`working on ${process.env.HOST}:${process.env.PORT}`);
});

