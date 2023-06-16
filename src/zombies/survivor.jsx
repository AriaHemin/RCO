import { useState, useEffect } from "react";
import HealthBar from "./healthBar";

export default function Survivor (props){
    // eslint-disable-next-line react/prop-types
    const {position, setPosition, spawnShot} = props
    const [health, setHealth] = useState(3)

    useEffect(() => {
        function move (p){
            function moveRight(){
                setPosition(position + 20)
            }

            function moveLeft(){
                setPosition(position - 20)
            }

            p === "right" ? moveRight() : null
            p === "left" ? moveLeft() : null
        }

        function shoot (){
            spawnShot()
        }

        const handleKeyDown = e => {
            e.key === "ArrowRight" ? move("right") : null 
            e.key === "ArrowLeft" ? move("left") : null 
            e.key === " " ? shoot() : null
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };

      });


    return(
        <>
            <HealthBar health={health} setHealth={setHealth}/>
            <div className=" absolute w-16 h-16" style={
                { 
                    transform: `translateX(${position}px) translateY(430px) rotate(270deg) `
                }
            } >
                <img src="/src/zombies/assets/surviver.png" />
            </div>
        </>
    )
}
