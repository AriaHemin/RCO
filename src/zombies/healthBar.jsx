function HealthBar (props) {
    // eslint-disable-next-line react/prop-types
    let health = props.health
    
    return(
        <div className="fixed top-2 left-1" >
            <div className="flex row" >
                <div className={`${health >= 1 ? "bg-red-700" : "white"} w-[20px] h-[20px] mx-1 `} ></div>
                <div className={`${health >= 2 ? "bg-red-700" : "white"} w-[20px] h-[20px] mx-1 `} ></div>
                <div className={`${health === 3 ? "bg-red-700" : "white"} w-[20px] h-[20px] mx-1 `} ></div>
            </div>
        </div>
    )
}

export default HealthBar