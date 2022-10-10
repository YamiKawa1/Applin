import mongoose from 'mongoose'

// Espero a que se carguen las variables del entorno env
process.nextTick(() => {
    mongoose.connect(process.env.MONGODB_URI)

    .then(() => console.log('database is connected'))
    
    .catch(err => console.log(err));
})
