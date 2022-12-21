import { MagnifyingGlassPlus } from 'phosphor-react';

import './styles/main.css';

import { useState, useEffect } from 'react';

import logoImg from './assets/logo-nlw-esports.svg'
import { GameBanner } from './components/GameBanner';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {

  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
    .then(response => response.json())
    .then(data => {
      setGames(data)
    })
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => {
          return (
            <GameBanner
            key={game.id}
            title={game.title}
            bannerUrl={game.bannerUrl}
            adsCount={game._count.ads} />
          )
        })}


      </div>

      <div className='pt-1 bg-nlw-gradient self-stretch mt-8 rounded-lg overflow-hidden'>
        <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center'>
          <div>
            <strong className='text-2xl text-white font-black block'>Não encontrou seu duo?</strong>
            <span className='text-zinc-400 block'>Publique um anúncio para encontrar novos players!</span>
          </div>

          <button className='py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3'>
            <MagnifyingGlassPlus size={24}/>
            Publicar anúncio
          </button>
        </div>
      </div>

    </div>
  )
}

export default App
