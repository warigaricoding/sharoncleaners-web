var admin = require('firebase-admin');
var serviceAccount =require('./sharoncleaners-web-firebase-adminsdk-duxyo-0c6b33a8e8.json')
admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
})
console.log("hi from admin")