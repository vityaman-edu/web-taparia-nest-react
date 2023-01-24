import { useState } from "react"
import { Button } from "./../button/Button"
import { useAppDispatch, useAppSelector } from "../../../../state/hooks"
import { FigureFactory } from '../../../../state/model/picture/figure/figureFactory'
import { Utility } from '../../../../web/api/utility'
import { PictureExplorer, pictureExplorerAction } from "../../../../state/slice/pictureExplorerSlice"
import { Picture } from "../../../../state/model/picture/picture"
import "./PictureDataViewer.scss"
import { useEffect } from "react"
import { api } from "../../../../state/api"
import { fetchTaps } from "../../../../state/slice/tableSlice"

const parseFigure = (text: string) => 
  FigureFactory.fromJson(
    Utility.deepConvertToMap(JSON.parse(text))
  )

export const PictureDataViewer = () => {
  const dispatch = useAppDispatch()
  const currentPicture = 
    useAppSelector(state => state.pictureExplorer.currentPicture)
  const state = useAppSelector(state => state.pictureExplorer.state)
  const user = useAppSelector(state => state.user)
  const [pictureName, setPictureName] = useState("")
  const [pictureData, setPictureData] = useState("")
  
  const trySetCurrentPicture = (name: string, data: string) => {
    const figure = parseFigure(data)
    const picture = new Picture(-1, user.id, name, figure)
    dispatch(pictureExplorerAction.setCurrentPicture(
      new Picture(-1, user.id, picture.name, picture.figure)
    ))
  }

  useEffect(() => {
    if (state == PictureExplorer.State.VIEWING) {
      setPictureName(currentPicture.name)
      setPictureData(JSON.stringify(currentPicture.figure, null, 2))
    }
  })

  return (
    <form className="control-form">
      <label>Picture name</label>
      <br/>
      <input 
        type="text" 
        className="shadow-on-hover"
        disabled={state == PictureExplorer.State.VIEWING}
        value={(
          (state == PictureExplorer.State.VIEWING)
            ? (currentPicture.name)
            : (pictureName)
        )}
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
        disabled={state == PictureExplorer.State.VIEWING}
        value={(
          (state == PictureExplorer.State.VIEWING)
            ? (JSON.stringify(currentPicture.figure, null, 2))
            : (pictureData)
        )}
        onChange={(e) => setPictureData(e.target.value)}>
      </textarea>
      <br/>
      <br/>
      {
        state == PictureExplorer.State.EDITING && <Button 
          content="Save" 
          onClick={async () => {
            trySetCurrentPicture(pictureName, pictureData)
            // TODO: dispatch using async thunk
            const name = currentPicture.name
            const figure = currentPicture.figure
            const pictureId = await api.pictures.post(name, figure)
            dispatch(pictureExplorerAction.setCurrentPicture(
              new Picture(pictureId, user.id, name, figure)
            ))
            dispatch(fetchTaps(pictureId))
            dispatch(pictureExplorerAction.setState(
              PictureExplorer.State.VIEWING
            ))
          }}/>
      }
      {
        state == PictureExplorer.State.EDITING && <Button 
          content="Sync" 
          onClick={async () => {
            trySetCurrentPicture(pictureName, pictureData)
          }}/>
      }
      {
        state == PictureExplorer.State.VIEWING && <Button 
          content="New" 
          onClick={() => {
            dispatch(pictureExplorerAction.setState(
              PictureExplorer.State.EDITING
            ))
          }}/>
      }
    </form>
  )
}
