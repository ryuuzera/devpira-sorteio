'use client';
import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';
import './roulette.css';

const CARD_WIDTH = 75 + 3 * 2;

const PEOPLE_LIST = [
  { name: 'Alice', ticketNumber: 1, photoUrl: 'https://github.com/alice.png' },
  { name: 'Bob', ticketNumber: 2, photoUrl: 'https://github.com/bob.png' },
  { name: 'Keep', ticketNumber: 3, photoUrl: 'https://github.com/keepscreamo.png' },
  { name: 'Fagner', ticketNumber: 4, photoUrl: 'https://github.com/ryuuzera.png' },
  { name: 'Victor', ticketNumber: 8, photoUrl: 'https://github.com/bitones.png' },
  { name: 'Fabricio', ticketNumber: 10, photoUrl: 'https://github.com/faslash.png' },
  { name: 'abpaula77', ticketNumber: 1, photoUrl: 'https://github.com/abpaula77.png' },
  { name: 'murilobeltrame', ticketNumber: 2, photoUrl: 'https://github.com/murilobeltrame.png' },
  { name: 'WellintonRafael', ticketNumber: 3, photoUrl: 'https://github.com/WellintonRafael.png' },
  { name: 'GabrielPimentaAgger', ticketNumber: 4, photoUrl: 'https://github.com/GabrielPimentaAgger.png' },
  { name: 'CassioJhones', ticketNumber: 8, photoUrl: 'https://github.com/CassioJhones.png' },
  { name: 'megatkurniawan', ticketNumber: 10, photoUrl: 'https://github.com/megatkurniawan.png' },
];

function RoulettePage() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinningOutcome, setSpinningOutcome] = useState<any | null>(null); // Alterado para any para acomodar a estrutura de dados
  const wheelRef = useRef<any>(null);

  const spinWheel = (winner: any) => {
    const position = PEOPLE_LIST.indexOf(winner);
    const landingPosition = 12 * CARD_WIDTH * PEOPLE_LIST.length + position * CARD_WIDTH;
    const randomize = Math.floor(Math.random() * CARD_WIDTH);
    const targetPosition = landingPosition + randomize;

    let object = {
      x: Math.floor(Math.random() * 50) / 100,
      y: Math.floor(Math.random() * 20) / 100,
    };

    if (wheelRef.current) {
      wheelRef.current.style.transitionTimingFunction = `cubic-bezier(0,${object.x},${object.y}, 1)`;
      wheelRef.current.style.transitionDuration = '10s';
      wheelRef.current.style.transform = `translate3d(-${targetPosition}px, 0px, 0px)`;

      try {
        setTimeout(() => {
          if (wheelRef.current) {
            setIsSpinning(false);
            setSpinningOutcome(winner);
          }
        }, 11000);
      } finally {
      }
    }
  };

  const handleSpinClick = () => {
    wheelRef.current.style = ``;
    setTimeout(() => {
      setIsSpinning(true);
      const randomIndex = Math.floor(Math.random() * PEOPLE_LIST.length);
      const randomOutcome = PEOPLE_LIST[randomIndex];
      spinWheel(randomOutcome);
    }, 100);
  };

  return (
    <>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <div style={{ width: '100vw' }}>
          <div className='roulette-wrapper'>
            <div className='selector'></div>
            <div className='wheel' ref={wheelRef}>
              {Array.from({ length: PEOPLE_LIST.length * 3 }).map((_, rowIndex) => (
                <div className='row' key={rowIndex}>
                  {PEOPLE_LIST.map((person, index) => (
                    <div className={`card red`} key={index}>
                      <img src={person.photoUrl} alt={person.name} className='photo' />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button onClick={handleSpinClick} className='bg-red-500' disabled={isSpinning}>
          {isSpinning ? 'Spinning...' : 'Spin Wheel'}
        </Button>
        {spinningOutcome !== null && <div className='mt-4 text-white'>The winner is {spinningOutcome.name}!</div>}
      </div>
    </>
  );
}

export default RoulettePage;
