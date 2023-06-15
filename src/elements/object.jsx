export default function Object (props){
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
            className="dot absolute border rounded-full"
            style={objectStyle}
        />

    )
}