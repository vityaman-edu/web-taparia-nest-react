import { useState } from "react"
import { Button } from "./../button/Button"
import { useAppDispatch, useAppSelector } from "../../../../state/hooks"
import { FigureFactory } from '../../../../state/model/picture/figure/figureFactory'
import { Utility } from '../../../../web/api/utility'
import "./PictureDataViewer.scss"

const parseFigure = (text: string) => 
  FigureFactory.fromJson(
    Utility.deepConvertToMap(JSON.parse(text))
  )

export const PictureDataViewer = () => {
  const [pictureName, setPictureName] = useState("unnamed")
  const [pictureData, setPictureData] = useState("{}")
  const [isEditing, setIsEditing] = useState(true)
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  
  return (
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
      {
        isEditing && <Button 
          content="Save" 
          onClick={() => setIsEditing(false)}/>
      }
      {
        !isEditing && <Button 
          content="New" 
          onClick={() => setIsEditing(true)}/>
      }
    </form>
  )
}
