import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


admin.initializeApp();
export const getUsersAdmin = functions.https.onRequest(async (request, response) => {
    try {
        const snapshot = await admin.firestore().doc('users/').get()
        const data = snapshot.data()
        response.send(data)
    } catch (error) {
        console.log(error)
        response.status(500).send(error)
    }
})

export const getUsersAdminStatus = functions.https.onRequest(async (request, response) => {
    try {
        const adminSnapshot = await admin.firestore().doc('activeUsers/admin').get()
        const users = adminSnapshot.data().users;
        const promises = [];
        for (const user in users) {
            const p = admin.firestore().doc(`users/${user}`).get();
            promises.push(p);
        }
        const userSnapshots = await Promise.all(promises)
        const results = [];
        userSnapshots.forEach(userSnap => {
            const data = userSnap.data();
            data.user = userSnap.id
            results.push(data);
        });
        response.send(results);
    } catch (error) {
        console.log(error)
        response.status(500).send(error)
    }
})













