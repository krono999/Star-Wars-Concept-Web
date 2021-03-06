import axios from 'axios'
import React, { Suspense, useEffect, useState } from 'react'
import Scene from './components/Scene/Scene'
import { OrbitControls, Stars } from '@react-three/drei';
//Components
import Planet from './components/Planet/Planet';
import PlanetMars from '../src/components/PlanetMars/PlanetMars.js'
import MilleniumFalcon from '../src/components/MilleniumFalcon/MilleniumFalcon'
// import NavBar from '../src/components/NavBar/NavBar'
import LoadingComponent from '../../Zenvia/src/components/Loading/Loading'
// import AudioPlayers from '../../Zenvia/src/components/AudioPlayer/AudioPlayer'
import SideNav from '../src/components/SideNav/SideNav'

function App() {
  // const [characters, setCharacters] = useState([] || [{}])
  const [movies, setMovies] = useState([])
  const [characters, setCharacters] = useState([])
  let array = [];
  const endP = [
    'https://swapi.dev/api/people/?page=1',
    'https://swapi.dev/api/people/?page=2',
    'https://swapi.dev/api/people/?page=3',
    'https://swapi.dev/api/people/?page=4',
    'https://swapi.dev/api/people/?page=5',
    'https://swapi.dev/api/people/?page=6',
    'https://swapi.dev/api/people/?page=7',
    'https://swapi.dev/api/people/?page=8',
    'https://swapi.dev/api/people/?page=9'
  ]


  const getCharacters = () => {

    try {
      axios.all(endP.map((endpoint) => axios.get(endpoint))).then(
        (data) => {
          data.map((res) => array.push(res.data.results))

          setCharacters(array.flat(2))
        },
      )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    async function getMovies() {
      let { data } = await axios.get('https://swapi.dev/api/films/')

      setMovies(data.results)
    }

    getCharacters()
    getMovies()
  }, [])
  // console.log('characters', characters)
  // console.log('movies', movies)

  if (characters.length && movies.length) {
    return <div style={{ height: '100vh', overflow: 'hideen' }} >
      <SideNav characters={characters} movies={movies} />
      <Scene >
        <Suspense fullback={'loading'} >
          <color attach={'background'} args={['black']} />
          <Suspense fullback={null} >
            <MilleniumFalcon />
            <Planet />
            <PlanetMars />
          </Suspense>
          <Stars stars={1000} factor={4} saturation={0} radius={300} /* fade  */ count={1000} />
          <directionalLight intensity={4} color={'purple'} />
          <ambientLight color="#ffffff" intensity={0.2} position={[-1, 2, 4]} />
          <pointLight
            intensity={1}
            castShadow
            color={'red'}
          />
          <OrbitControls autoRotate />
        </Suspense>
      </ Scene >
    </div>

  } else {
    return <LoadingComponent />
  }
}

export default App;
