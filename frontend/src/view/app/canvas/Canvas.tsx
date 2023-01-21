import { useEffect, useRef } from 'react'
import { useAppSelector } from '../../../state/hooks'
import { Canvas as Field } from './lib/canvas'
import { Vector } from '../../../state/model/picture/figure/astraction/vector'
import './Canvas.scss'

const CANVAS_ID = "battlefield"
const CANVAS_WIDTH = 600
const CANVAS_HEIGHT = 600

const Canvas = () => {
  const picture = 
    useAppSelector(state => state.pictureExplorer.currentPicture)
  const canvasRef = 
    useRef<HTMLCanvasElement>(null)
  const field = new Field(
    () => canvasRef.current as HTMLCanvasElement,
    {x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2} as Vector
  )

  useEffect(() => {
    field.clear()
    if (picture != null) {
      field.redraw(picture.figure)
    }
    console.log("canvas was updated")
  })

  return (
    <div style={{ width: "100%" }}>
      <div className="Canvas">
        <canvas
          ref={canvasRef}
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
