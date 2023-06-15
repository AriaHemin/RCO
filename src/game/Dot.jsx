export default function Dot (props){
    // eslint-disable-next-line react/prop-types
    const {color, x, y, size, index, onClick} = props;    
    const dotStyle = {
        backgroundColor: color,
        height: `${size}px`,
        width: `${size}px`,
        left: `${x}px`,
        top: `${y}px`,
    };

    return(
        <div 
            className="dot absolute border rounded-full"
            style={dotStyle}
            onClick={() => onClick(index)}
        />

    )
}
