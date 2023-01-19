import { Canvas as Field } from './lib/canvas'
import { Vector } from '../../../state/model/picture/figure/astraction/vector'
import './Canvas.scss'
import { store } from '../../../state/store'
import { useAppSelector } from '../../../state/hooks'
import { useEffect } from 'react'
import { Drawable } from '../../../state/model/picture/figure/astraction/drawable'

const CANVAS_ID = "battlefield"
const CANVAS_WIDTH = 600
const CANVAS_HEIGHT = 600

const Canvas = () => {
  let field: Field | null = null

  const selectCurrentPicture = useAppSelector(state => {
    const id = state.pictureExplorer.currentId
    const picture = state
      .pictureExplorer.all.find(picture => picture.id === id)
    return picture
  })

  store.subscribe(() => {
    field?.redraw(selectCurrentPicture?.figure as Drawable)
  })

  useEffect(() => {
    field = new Field(
      document.getElementById(CANVAS_ID) as HTMLCanvasElement, { 
        x: CANVAS_WIDTH / 2, 
        y: CANVAS_HEIGHT / 2 
      } as Vector
    )
    field.redraw(selectCurrentPicture?.figure as Drawable)
    field.setMouseClickListener((v) => {
      console.log(v.toString())
    })
  })

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
