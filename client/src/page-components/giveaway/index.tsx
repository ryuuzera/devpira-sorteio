'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import QRCode from 'qrcode.react';
import { useEffect, useRef, useState } from 'react';
import './roulette.css';
import io from 'socket.io-client'

const GiveawayPage = (props) => {
  const [users, setUsers] = useState(props.users ?? []);
  const CARD_WIDTH = 128 + 3 * 2;

  useEffect(() => {
    const socket = io("http://localhost:4000")
  })
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetch(`http://localhost:5000/api/v1/user`)
  //       .then((res) => res.json())
  //       .then((res) => {
  //         setUsers(res);
  //       });
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, []);

  const [isSpinning, setIsSpinning] = useState(false);
  const [spinOpen, setSpinOpen] = useState(false);
  const [spinningOutcome, setSpinningOutcome] = useState<any | null>(null); // Alterado para any para acomodar a estrutura de dados
  const wheelRef = useRef<any>(null);

  const spinWheel = (winner: any) => {
    const position = users.indexOf(winner);
    const landingPosition = 12 * CARD_WIDTH * users.length + position * CARD_WIDTH;
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

      setTimeout(() => {
        if (wheelRef.current) {
          setIsSpinning(false);
          setSpinningOutcome(winner);
        }
      }, 11000);
    }
  };

  const handleSpinClick = () => {
    wheelRef.current.style = ``;
    setTimeout(() => {
      setSpinOpen(true);
      setTimeout(() => {
        setIsSpinning(true);
        const randomIndex = Math.floor(Math.random() * users.length);
        const randomOutcome = users[randomIndex];
        spinWheel(randomOutcome);
      }, 3000);
    }, 100);
  };

  return (
    <>
      <div className="h-screen bg-slate-800 relative overflow-hidden">
        <div className="flex flex-col p-3">
          <div className="text-xl text-white m-2">Novo Sorteio</div>
          <div className="flex flex-row h-52 gap-3">
            <div className="w-[25%] h-auto bg-slate-700 rounded-md flex flex-col items-center justify-center gap-2">
              <Link href={'/join'}>
                <QRCode value={`${process.env.NEXT_PDEPLOY_URL}/join`} />
              </Link>
              <h1>Participe utilizando o QR Code</h1>
            </div>
            <div className="w-full h-auto bg-slate-700 rounded-md flex items-center justify-center">
              <Button onClick={() => handleSpinClick()} className="bg-red-300">
                Sortear
              </Button>
            </div>
          </div>
          <div className="text-xl text-white m-2">{users?.length} Usuários</div>
          <div className="h-full max-h-[calc(100vh-330px)] overflow-auto w-full flex flex-row flex-wrap items-start gap-4 p-4 rounded-md transition-all">
            {users?.length > 0 &&
              users?.map((_, index: number) => (
                <div key={_.name + index} className="h-32 w-32 bg-slate-200 rounded-md overflow-clip relative flex items-center justify-center">
                  <Image
                    src={_.avatarUrl?.includes(`_profile_400x400`) ? '/users-img/' + _.avatarUrl : _.avatarUrl}
                    key={_.name + index + 1}
                    alt={_.name}
                    height={128}
                    width={128}
                    quality={90}
                    style={{ objectFit: 'cover', width: '105%', height: '105%' }}
                  />
                  <div className="absolute flex w-full items-center justify-center text-center p-1">
                    <h1 key={_.name + index + 2} className="text-white">
                      {_.name}
                    </h1>
                  </div>
                </div>
              ))}
          </div>

          <div
            className={`${spinOpen ? 'flex' : 'hidden'} flex-col h-full justify-evenly absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
          >
            <div className="absolute inset-0 backdrop-filter bg-[rgba(0,0,0,0.4)] backdrop-blur-sm"></div>
            <div className="bg-slate-800 h-80 items-center relative flex justify-center width-full mx-0 my-auto flex-col">
              <div className="absolute z-10 top-1/2 left-1/2 -translate-y-1/2 h-44 w-[3px] bg-slate-400"></div>
              <div className="flex w-full" ref={wheelRef}>
                {Array.from({ length: users.length * 30 }).map((_, rowIndex) => (
                  <div className="flex" key={rowIndex}>
                    {users.map((_, index) => (
                      <div className={`h-32 w-32 m-[3px] rounded-sm flex items-center justify-center bg-white overflow-hidden text-sm`} key={index}>
                        <Image
                          src={_.avatarUrl?.includes(`_profile_400x400`) ? '/users-img/' + _.avatarUrl : _.avatarUrl}
                          alt={_.name}
                          key={_.name + index + 1}
                          height={128}
                          width={128}
                          quality={90}
                          style={{ objectFit: 'cover', width: '105%', height: '105%' }}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              {!isSpinning && spinningOutcome?.name && (
                <div className="text-white w-full text-center absolute bottom-2">
                  <span>O vencedor é {spinningOutcome?.name}!</span>
                  <Button onClick={handleSpinClick} className='ml-4'>Sortear novamente</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GiveawayPage;
