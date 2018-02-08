const px = require('./lib/px-query-json');


// px.read('http://www.cso.ie/px/pxeirestat/Database/eirestat/Vehicle%20Licensing%20Statistics%20Monthly%20Series/TEM13.px')
px.read('./tem01.px')
console.log(px.metadata())
