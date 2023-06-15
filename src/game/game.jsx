import { useCallback, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { dotsState } from './atom';
import Dot from './Dot';
import { SPEED_STEP, SPAWN_INTERVAL } from './constants';
import { createDot } from './utils';

const Game = () => {
    const [dots, updateDots] = useRecoilState(dotsState);
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