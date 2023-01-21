import { useAppDispatch, useAppSelector } from "../../../../state/hooks"
import { Picture } from '../../../../state/model/picture/picture'
import { Button } from "./../button/Button"
import { api } from "../../../../web/api/api"
import { pictureExplorerAction } from "../../../../state/slice/pictureExplorerSlice"
import "./PictureList.scss"

export const PictureListItem = (p: {
  picture: Picture.Header
}) => {
  const dispatch = useAppDispatch()
  
  return (
    <tr className="PictureListItem">
      <td>{p.picture.name}</td>
      <td>
        <Button 
          content="Load"
          onClick={async () => {
            const picture = await api.pictures.getById(p.picture.id)
            dispatch(pictureExplorerAction.setCurrentPicture(picture))
          }}/>
      </td>
    </tr>
  )
}

export const PictureList = () => {
  const dispatch = useAppDispatch()
  const pictures = useAppSelector(state => 
    state.pictureExplorer.pictureHeaders
  )
  const userId = useAppSelector(state => 
    state.user.id
  )
  
  api.pictures.getAllByOwnerId(userId).then(pictures => 
    pictures.map(picture => 
      dispatch(pictureExplorerAction.addPicture(picture))
    )
  )

  const items = pictures.map(picture =>
    <PictureListItem 
      key={picture.id} 
      picture={picture}/>
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
