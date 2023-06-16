import { useCallback, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { objectsState } from './atom';
import Zombie from './zombie';
import Survivor from './survivor';

export default function ZombiesRco (){
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

    const spawnDot = useCallback(() => {
        updateObjects((oldDots) => [...oldDots, createDot()]);
    }, [updateObjects]);


    useEffect(() => {
        intervalRef.current = setInterval(spawnDot, 3000);
        requestRef.current = requestAnimationFrame(advanceStep);
    }, [advanceStep, spawnDot])

    return(
        <div className="main">
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
                <Survivor/>
            </div>
        </div>
    )

}
