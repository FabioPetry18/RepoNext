"use client"
import Image from "next/image";
import confetti from 'canvas-confetti';
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const segundaEtapaRef = useRef<HTMLDivElement | null>(null);
  const [ativarAnimacao, setAtivarAnimacao] = useState(false);


  let duration = 5 * 1000;
let animationEnd = Date.now() + duration;
let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function confete(){
  let interval : any = setInterval(function() {
    let timeLeft = animationEnd - Date.now();
  
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
  
    let particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
  
}


const scrollParaSegundaEtapa = () => {
  console.log("teste")
  if (segundaEtapaRef.current) {
    segundaEtapaRef.current.scrollIntoView({ behavior: 'smooth' });
    confete();
  }
};
useEffect(() => {
  const handleScroll = () => {
    if (segundaEtapaRef.current) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.01, // Quando 50% ou mais do elemento estiver visível
      };

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // O elemento está visível na tela, ative a animação
          setAtivarAnimacao(true);
        } else {
          // O elemento não está visível na tela, desative a animação
          setAtivarAnimacao(false);
        }
      }, options);

      observer.observe(segundaEtapaRef.current);
    }
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);

const classeBase = " max-w-screen-sm w-screen h-screen max-w-full h-screen max-w-sm p-4 bg-white  flex items-center justify-center";

// Classe de animação que pode ser adicionada ou removida com base no estado ativarAnimacao
const classeAnimacao = ativarAnimacao
  ? "animate-fade-down animate-once animate-duration-[2000ms] animate-delay-300"
  : "";

  return (
    <>
    <div className="w-screen h-screen max-w-full bg-pink-500 xsm:bg-purple-500 flex justify-center items-center">
      <div className="max-w-screen-sm mx-16 text-center">
      <p className="animate-wiggle-more animate-infinite text-white font-semibold text-6xl mb-5">
          Luana
        </p>
        <h1 className="text-white font-semibold text-2xl">De acordo com o conselho dos adoradores de melões 🍈, a partir de agora além de você ser uma adoradora de melão, você é uma... </h1>
        
      <div onClick={() => {scrollParaSegundaEtapa()}} className={`z-10 flex-none max-w-full  bg-yellow-600 w-20 h-20 rounded-full absolute top-0/2 bottom-1  left-1/2 xsm:left-[170px]  transform -translate-x-1/2 -translate-y-1/2 animate-bounce cursor-pointer`}>
        <svg onClick={() => {scrollParaSegundaEtapa()}} className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ' width="20" height="14" viewBox="0 0 20 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M0.592285 0.114337C0.218185 0.269955 -0.0699531 0.920173 0.0149447 1.41728C0.0533571 1.64266 1.4787 3.5497 4.83664 7.86854L9.60369 14H9.99908H10.3945L15.1645 7.86466C18.9478 2.99882 19.9455 1.65522 19.987 1.3707C20.0978 0.610421 19.4787 -0.149975 18.8918 0.0255098C18.7272 0.0747186 17.2488 1.89464 14.3234 5.64947L9.99819 11.2007L5.718 5.69297C2.75509 1.88026 1.35503 0.154641 1.16865 0.0859084C0.998588 0.023113 0.786299 0.0336161 0.592285 0.114337Z" fill="currentColor"/>
        </svg>
      </div>       
    </div>
  </div>
  <div ref={segundaEtapaRef} className='w-screen h-screen max-w-full  flex items-center justify-center'>
    {ativarAnimacao &&(      
        <div  className={`${classeBase} ${classeAnimacao}`}>
            <h1 className="font-extrabold text-7xl bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">PESSOA <span className="underline">LEGAL!</span></h1>
        </div>     
      )}
  </div>
  </>
);
}
