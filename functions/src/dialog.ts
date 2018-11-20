import * as admin from "firebase-admin"
// import { promisify } from "util";
// import { resolve } from "dns";
const serviceAccount = require('../testfunctions-b91e6-firebase-adminsdk-rnq8d-2b304a0a2c.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

(async () => {
    await chat('pizzachat', 'fear', 'asdasdasd pizza')
    await chat('pizzachat', 'joy', 'qpizza')
    await chat('pizzachat', 'dis', 'rty pizza')
    await chat('pizzachat', 'ang', 'pizza 123')
    process.exit(0)
})()
.catch(err => {console.error(err)})

async function chat(room:string, name:string, text:string ) {
    const messagesRef = admin.database().ref('rooms').child('messages')
    await messagesRef.push({name, text})
    console.log(`${name}: ${text}`)
    await sleep(2000)
}

function sleep(ms: number){
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}