import { useState, useEffect } from "react";
import HealthBar from "./healthBar";

export default function Survivor (){
    const [position, setPosition] = useState(220)
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
            console.log("tsh")
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
            <div className=" inline-block w-16 h-16" style={
                { 
                    transform: `translateX(${position}px) translateY(430px) rotate(270deg) `
                }
            } >
                <img src="/src/zombies/assets/surviver.png" />
            </div>
        </>
    )
}
