import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../state/hooks'
import { pictureExplorerAction } from '../../../state/slice/pictureExplorerSlice'
import { Button } from './Button'
import { PictureList } from './PictureList'
import { FigureFactory } from '../../../state/model/picture/figure/figureFactory'
import { Utility } from '../../../web/api/utility'
import './Control.scss'

const parseFigure = (text: string) => {
  return FigureFactory.fromJson(
    Utility.deepConvertToMap(JSON.parse(text))
  )
}

let i = 10

const Control = () => {
  const [pictureName, setPictureName] = useState("unnamed")
  const [pictureData, setPictureData] = useState("{}")

  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  return (
    <div className="Control">
      <h2>Control</h2>
          
      <form className="control-form">
        <label>Picture name</label>
        <br/>
        <input 
          type="text" 
          className="shadow-on-hover"
          onChange={(e) => setPictureName(e.target.value)}/>
        <br/>
        <br/>
        <label>Picture data</label>
        <br/>
        <textarea 
          className="picture-data"
          autoComplete="off"
          wrap="off"
          placeholder="{ *picture data* }"
          onChange={(e) => setPictureData(e.target.value)}>
        </textarea>
        <br/>  
        <br/>  
        <div className="control-buttons">
          <Button 
            content="Post"
            onClick={() => {
              const figure = parseFigure(pictureData)
              dispatch(pictureExplorerAction.post({
                id: ++i,
                ownerId: user.id,
                name: pictureName,
                figure: figure
              }))
            }}/>
          <Button 
            content="Get"
            onClick={() => console.log("Get")}/>
          <Button 
            content={<span>&#x21bb;</span>}
            onClick={() => console.log("Reload")}/>
        </div>                         
      </form>
      <PictureList/>
    </div>
  )
}

export default Control
