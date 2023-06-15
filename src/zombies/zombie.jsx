export default function Zombie (props){
    // eslint-disable-next-line react/prop-types
    const {color, x, y, size} = props;    
    const objectStyle = {
        backgroundColor: color,
        height: `${size}px`,
        width: `${size}px`,
        left: `${x}px`,
        top: `${y}px`,
    };

    return(
        <div 
            className="zombie"
            style={objectStyle}
        >
            <img className="bg-transparent object-top fill-none w-[50px] h-[50px] object-none" src="/src/zombies/assets/zombiePic.png"/>
        </div>

    )
}