async function myFunction(): Promise<string> {
    try {
        const rank = await myRank()
        return "firebase " + rank
        
    } catch (error) {
        return "error " + error
    }
}

function myRank() {
    // return Promise.resolve(1)
    return Promise.reject(":V")
}