// src/components/SpinWheel.js
import React, { useEffect, useRef, useState } from 'react';
import './SpinWheel.css'; // We'll define this later]
import Roulette, { Wheel } from 'react-custom-roulette';
import congrats from "./assets/congrats.json";
import aju from "./assets/avatars/aju.jpg";
import Lottie from 'lottie-react';

const data = [
    { option: 'Mansoor', style: { backgroudColor: 'red' }, img: 'mansoor.jpg' },
    { option: 'Uvais', img: 'uvais.jpg' },
    { option: 'Irshad molyar', img: 'irshad.jpg' },
    { option: 'Jinshad', img: 'jinshad.jpg' },
    { option: 'Swalih', img: 'swaih.jpg' },
    { option: 'Nizam', img: 'nizam.jpg' },
    // { option: 'Siraj' },
    { option: 'Ajmal', img: 'aju.jpg' },
    { option: 'Sidhi', img: 'siddi.jpg' },
    { option: 'Mubashir', img: 'mubashir.jpg' },
    // { option: 'Mubashir & Uvais' },
];

const SpinWheel = () => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const animatinRef = useRef();
    const lottieRef = useRef();



    const handleSpinClick = async () => {
        setResult(null)
        animatinRef.current.stop();
        lottieRef.current.classList.remove('z-50')
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * data.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);


        }
    }

    const [result, setResult] = useState(null)







    return (
        <>

            <div className="flex flex-col items-center mt-10">
                <div className='fixed top-0 h-screen w-full' ref={lottieRef}>
                    <Lottie lottieRef={animatinRef} animationData={congrats} loop={false} className='fixed top-0 h-screen w-full' autoplay={false} />
                </div>
                <div className='relative'>

                    <Wheel
                        mustStartSpinning={mustSpin}
                        prizeNumber={prizeNumber}
                        data={data}
                        outerBorderColor="#f2f2f2"
                        outerBorderWidth={10}
                        innerBorderColor="#ffffff"
                        radiusLineColor="#ffffff"
                        radiusLineWidth={3}
                        textDistance={60}
                        innerRadius={10}
                        outerRadius={500}
                        backgroundColors={['#ffcc00']}
                        onStopSpinning={() => {
                            lottieRef.current.classList.add('z-50')
                            setMustSpin(false);
                            setResult(data[prizeNumber])
                            animatinRef.current.play();
                        }}
                    />
                    <button onClick={handleSpinClick} className='bg-red-600 p-2 h-[45px] text-white rounded absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]'>Spin</button>
                </div>
                {/* {result && <div className="mt-4 text-xl">Congratulations!  {result}</div>} */}

            </div>

            {result &&
                <div className='absolute top-0 left-0 h-svh w-full flex justify-center items-center z-20'>
                    <div className='w-[700px] p-6 bg-white shadow-xl aspect-video rounded-md'>
                        <div className='flex flex-col items-center justify-center'>
                            <h1 className='text-2xl font-bold mb-10 text-gray-700'>Congratulations</h1>

                            <div className='h-[200px] aspect-square rounded-full overflow-hidden '>
                                <img src={`assets/avatars/${result.img}`} alt="" className='w-full h-full object-cover' />
                            </div>
                            <h2 className='text-xl mt-10 text-gray-500'>Mr. {result?.option}</h2>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default SpinWheel;
