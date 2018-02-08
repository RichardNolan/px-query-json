const px = require('./lib/px-query-json');


// let readPX = px.read('http://www.cso.ie/px/pxeirestat/Database/eirestat/Vehicle%20Licensing%20Statistics%20Monthly%20Series/TEM13.px')
let readPX = px.read('./tem01.px')

readPX.then(data=>{
    // console.log(px.metadata())
    console.log(px.data())
},err=>{
    console.log("Failed to read any data, the chosen file may not be a PC-axis file (.px)")
});

