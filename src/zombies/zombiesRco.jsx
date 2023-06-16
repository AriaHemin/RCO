import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { objectsState } from './atom';
import Zombie from './zombie';
import Survivor from './survivor';
import Shot from './shot';

export default function ZombiesRco (){
    const [position, setPosition] = useState(350)
    const [shots, updateShots] = useState([])
    const [objects, updateObjects] = useRecoilState(objectsState);
    const requestRef = useRef();
    const intervalRef = useRef();
    const fieldRef = useRef();

    let createDot = () => {
        let x = Math.floor(Math.random() * 100);
        return {
            color: "black",
            size: 50,
            x,
            y: 0,
          }
    };

    let spawnShot = () =>{
        updateShots((oldShots) => [...oldShots, createShot()]);
    }

    let createShot = () => {
        let x = position
        return {
            x,
            y: 420,
          }
    };


    const advanceStep = useCallback(() => {
        updateObjects((oldDots) => {
            const newDots = [];
            for (let dot of oldDots) {
                const newY = dot.y + 5 * 5 / 60;
                if (newY <= fieldRef.current.offsetHeight - dot.size / 2) {
                    newDots.push(
                        {
                            ...dot,
                            y: newY,
                        }
                    );
                }
            }
            return newDots;
        });
        requestRef.current = requestAnimationFrame(advanceStep);
    }, [updateObjects]);


    const advanceShot = useCallback(() => {
        updateShots((oldDots) => {
            const newDots = [];
            for (let dot of oldDots) {
                console.log("shot", dot.y)
                const newY = dot.y - 15 * 5 / 60;
                if (true) {
                    newDots.push(
                        {
                            ...dot,
                            y: newY,
                        }
                    );
                }
            }
            return newDots;
        });
        requestRef.current = requestAnimationFrame(advanceShot);
    }, [updateShots]);

    const spawnDot = useCallback(() => {
        updateObjects((oldDots) => [...oldDots, createDot()]);
    }, [updateObjects]);


    useEffect(() => {
        intervalRef.current = setInterval(spawnDot, 3000);
        requestRef.current = requestAnimationFrame(advanceStep);
        requestRef.current = requestAnimationFrame(advanceShot)
    }, [advanceStep, spawnDot, advanceShot])

    return(
        <div className="main" >
            <div style={{
                backgroundImage: `url("/src/zombies/assets/background__r172093591.gif")`,
            }} className="field object-cover bg-bottom" ref={fieldRef}>
                {objects.map((dot, index) => {
                    const x = (
                        fieldRef.current.offsetWidth - dot.size
                    ) * dot.x / 100
                    return <Zombie
                        key={`dot-${index}`} 
                        {...dot}
                        x={x}
                    />
                })}
                {shots.map((dot, index) => {
                    const x = dot.x + 26
                    return <Shot
                        key={`dot-${index}`} 
                        {...dot}
                        x={x}
                    />
                })}
                <Survivor setPosition={setPosition} position={position} spawnShot={spawnShot} />
            </div>
        </div>
    )

}
