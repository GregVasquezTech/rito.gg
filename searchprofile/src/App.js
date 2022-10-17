import './App.css';
import{ useState} from 'react';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';



function App() {
  const [searchText, setSearchText] = useState('')
  const [gameList, setGameList] = useState([])

  function getPlayerGames(event) {
    axios.get("http://localhost:4000/pastgames")
    .then(function(response) {
      setGameList(response.data)
    }).catch(function (error) {
      console.log(error)
    })
  }

  console.log(gameList)
  return (
    <div className="App">
      <Navbar />
      <h2 className='header'>rito.gg</h2>
      <input type="text" placeholder='Search yourself or a summoner' onChange={e => setSearchText(e.target.value)}></input>
      <button onClick={getPlayerGames(gameList)}>Search</button>
      {gameList.length !== 0 ?
      <>
        <p>We have data</p>
        {
          gameList.map((gameData, index) => 
            <>
              <h2>Game {index + 1}</h2>
              <div>
                {gameData.info.participants.map((data, participantIndex) =>
                  <p>PLAYER {participantIndex + 1}: {data.summonerName}, KDA: {data.kills} / {data.deaths} / {data.assists} </p>
                )
                }
              </div>
            </>
          )
        }
      </>
      :
      <>
        <p>We have no data!</p>
      </>
      
      }
    </div>
  );
}

export default App;
