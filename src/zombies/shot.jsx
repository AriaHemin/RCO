export default function Shot (props){
    // eslint-disable-next-line react/prop-types
    const {x, y} = props;    
    const objectStyle = {
        backgroundColor: "red",
        height: `16px`,
        width: `4px`,
        left: `${x}px`,
        top: `${y}px`,
    };

    return(
        <div 
            className="shot"
            style={objectStyle}
        ></div>

    )
}