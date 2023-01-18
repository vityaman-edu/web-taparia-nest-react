import './Canvas.scss'

const CANVAS_ID = "battlefield"
const CANVAS_WIDTH = 600
const CANVAS_HEIGHT = 600

function Canvas() {
    return (
        <div style={{
            width: "100%",
        }}>
            <div className="Canvas">
                <canvas 
                    id={CANVAS_ID} 
                    width={CANVAS_WIDTH} 
                    height={CANVAS_HEIGHT}
                    className="shadow-on-hover">                    
                </canvas>
            </div>
        </div>
    )
}

export default Canvas
