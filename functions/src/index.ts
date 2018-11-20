import * as functions from 'firebase-functions';

export const onMessageCreate = functions.database
.ref('rooms/messages/{messageId}')
.onCreate((snapshot, context) => {
    const messageId = context.params.messageId
    console.log(`new msg ${messageId} in room chat`)
    
    const messageData = snapshot.val()
    const text = addText(messageData.text)
    return snapshot.ref.update({text: text})
})

function addText(text:string):string {
    return text.replace(/\bpizza\b/g, 'dead')
}