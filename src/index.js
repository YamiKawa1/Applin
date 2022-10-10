import app from './app.js'

app.listen(process.env.PORT, () => {
    console.log(`working on ${process.env.HOST}:${process.env.PORT}`);
});

