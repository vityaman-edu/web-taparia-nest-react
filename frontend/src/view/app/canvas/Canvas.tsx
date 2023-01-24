import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../state/hooks'
import { Canvas as Field } from './lib/canvas'
import { Vector } from '../../../state/model/picture/figure/astraction/vector'
import './Canvas.scss'
import { postTap } from '../../../state/slice/tableSlice'

const CANVAS_ID = 'battlefield'
const CANVAS_WIDTH = 600
const CANVAS_HEIGHT = 600

const Canvas = () => {
  const [canvasSize, setCanvasSize] = useState(() => {
    const { innerWidth: width, innerHeight: height } = window
    return width > 800 ? 600 : 300
  })

  const dispatch = useAppDispatch()
  const picture = useAppSelector(
    (state) => state.pictureExplorer.currentPicture,
  )
  const taps = useAppSelector((state) => state.table.taps)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const field = new Field(() => canvasRef.current as HTMLCanvasElement, {
    x: canvasSize / 2,
    y: canvasSize / 2,
  } as Vector)

  useEffect(() => {
    field.setMouseClickListener((pos) => {
      dispatch(postTap({ pictureId: picture!.id, pos: pos }))
    })
    field.clear()
    if (picture != null) {
      field.redraw(picture.content)
      taps.forEach((tap) =>
        field.tap(
          new Vector(tap.x, tap.y),
          tap.status == 'HIT' ? '#00FF00' : '#FF0000',
        ),
      )
    }
  })
  
  window.addEventListener('resize', () => {
    const { innerWidth: width, innerHeight: height } = window
    setCanvasSize(width > 800 ? 600 : 300)
  })

  return (
    <div style={{ width: '100%' }}>
      <div className="Canvas">
        <canvas
          ref={canvasRef}
          id={CANVAS_ID}
          width={canvasSize}
          height={canvasSize}
          className="shadow-on-hover"
        ></canvas>
      </div>
    </div>
  )
}

export default Canvas
