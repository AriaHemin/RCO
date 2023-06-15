import { useCallback, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { objectsState } from './atom';
import Object from '../elements/object';

export default function Rco1 (){
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
                const newY = dot.y + 10 * 5 / 60;
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
        intervalRef.current = setInterval(spawnDot, 1000);
        requestRef.current = requestAnimationFrame(advanceStep);
    }, [advanceStep, spawnDot])

    return(
        <div className="main">
            <div className="field" ref={fieldRef}>
                {objects.map((dot, index) => {
                    const x = (
                        fieldRef.current.offsetWidth - dot.size
                    ) * dot.x / 100
                    return <Object
                        key={`dot-${index}`} 
                        {...dot}
                        x={x}
                    />
                })}
            </div>
        </div>
    )

}

/*
import { SPEED_STEP, SPAWN_INTERVAL } from './constants';
import { createDot } from './utils';

const Game = () => {
    const requestRef = useRef();
    const intervalRef = useRef();
    const fieldRef = useRef();

    const advanceStep = useCallback(() => {
        updateDots((oldDots) => {
            const newDots = [];
            for (let dot of oldDots) {
                const newY = dot.y + SPEED_STEP * 5 / 60;
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
    }, [updateDots]);

    const spawnDot = useCallback(() => {
        updateDots((oldDots) => [...oldDots, createDot()]);
    }, [updateDots]);


    useEffect(() => {
        intervalRef.current = setInterval(spawnDot, SPAWN_INTERVAL);
        requestRef.current = requestAnimationFrame(advanceStep);
    }, [advanceStep, spawnDot])

    return (
        <div className="main">
            <div className="field" ref={fieldRef}>
                {dots.map((dot, index) => {
                    const x = (
                        fieldRef.current.offsetWidth - dot.size
                    ) * dot.x / 100
                    return <Dot
                        key={`dot-${index}`} 
                        {...dot}
                        x={x}
                        index={index} 
                    />;
                })}
            </div>
        </div>
    );
}

export default Game;
*/