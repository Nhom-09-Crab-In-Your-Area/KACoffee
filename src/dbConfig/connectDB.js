const mongoose = require('mongoose')
//need to be creditial
const url = `mongodb+srv://dbAdminAuto:weeabooconnect@cluster0.x2zsu.mongodb.net/KACoffeeDB?retryWrites=true&w=majority`

const connectionParams={
    useNewUrlParser: true
}
let connect = ()=>{
    console.log('Connecting...')
    mongoose.connect(url,connectionParams)
        .then( () => {
            console.log('Connected to database ');
        })
        .catch( (err) => {
            console.error(`Error connecting to the database. \n${err}`);
    })
};

module.exports = connect;