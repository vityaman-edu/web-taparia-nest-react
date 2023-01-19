import { useAppDispatch, useAppSelector } from "../../../state/hooks"
import { pictureExplorerAction } from "../../../state/slice/pictureExplorerSlice"
import { Button } from "./Button"
import { Picture } from '../../../state/model/picture/picture'
import "./PictureList.scss"

export const PictureListItem = (p: {
  picture: Picture
}) => {
  const dispatch = useAppDispatch()
  
  return (
    <tr className="PictureListItem">
      <td>{p.picture.name}</td>
      <td>
        <Button 
          content="Load"
          onClick={() => 
            dispatch(pictureExplorerAction.set(p.picture.id))
          }/>
      </td>
    </tr>
  )
}

export const PictureList = () => {
  const pictures = useAppSelector(state => state.pictureExplorer.all)

  const items = pictures.map(picture =>
    <PictureListItem key={picture.id} picture={picture}/>
  )

  return (
    <div className="PictureList">
      <table className="PictureList-table">
        <thead>
          <tr>
            <th>Pictures</th>
            <th>Do</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </table>
    </div>
  )
}

