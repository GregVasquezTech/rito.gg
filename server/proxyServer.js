const express = require('express')
const cors = require('cors')
const axios = require('axios')

var app = express()

app.use(cors())

const API_KEY = "";

function getPlayerPUUID(playerName) {
    return axios.get("https://na1.api.riotgames.com" + "/lol/summoner/v4/summoners/by-name/" + playerName + "?api_key=" + API_KEY)
        .then(response => {
            console.log(response.data)
            return response.data.puuid
        }).catch(err => err)
}

//Get pastgames
// localhost:4000/pastgames
app.get('/pastgames', async (req, res) => {
    const playerName = "vlotz"
    // PUUID
    const PUUID = await getPlayerPUUID(playerName);
    const API_CALL = "https://americas.api.riotgames.com" + "/lol/match/v5/matches/by-puuid/" + PUUID + "/ids" + "?api_key=" + API_KEY

    // Get API_CALL
    // Return a llist of game IDS  s
    const gameIDs = await axios.get(API_CALL)
        .then(response => response.data )
        .catch(err => err)
    
    // A list of game IDs
    console.log(gameIDs)

    // loop through game IDs
    // at each loop, get the information based off ID (API_CALL)
    var matchDataArray = []
    for(var i = 0; i < gameIDs.length - 15; i++){
        const matchID = gameIDs[i]
        const matchData = await axios.get("https://americas.api.riotgames.com/" + "lol/match/v5/matches/" + matchID + "?api_key=" + API_KEY)
            .then(response => response.data)
            .catch(err => err)
        matchDataArray.push(matchData)
    }

    // save information in an array, give array as JSON response to user
    res.json(matchDataArray)
})


app.listen(4000, function() {
    console.log("Server started on port 4000")
})