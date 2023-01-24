import { useAppDispatch, useAppSelector } from '../../../../state/hooks'
import { Picture } from '../../../../state/model/picture/picture'
import { Button } from './../button/Button'
import {
  PictureExplorer,
  pictureExplorerAction,
} from '../../../../state/slice/pictureExplorerSlice'
import './PictureList.scss'
import { api } from '../../../../state/api'
import { useEffect } from 'react'
import { fetchTaps } from '../../../../state/slice/tableSlice'

export const PictureListItem = (p: { picture: Picture.Header }) => {
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
            dispatch(fetchTaps(picture.id))
            dispatch(
              pictureExplorerAction.setState(PictureExplorer.State.VIEWING),
            )
          }}
        />
      </td>
    </tr>
  )
}

export const PictureList = () => {
  const dispatch = useAppDispatch()
  const pictures = useAppSelector(
    (state) => state.pictureExplorer.pictureHeaders,
  )
  const picturesStatus = useAppSelector((state) => state.pictureExplorer.status)

  useEffect(() => {
    if (picturesStatus == 'idle') {
      dispatch(PictureExplorer.fetchPictures())
    }
  }, [picturesStatus, dispatch])

  const items = pictures.map((picture) => (
    <PictureListItem key={picture.id} picture={picture} />
  ))

  return (
    <div className="PictureList">
      <table className="PictureList-table">
        <thead>
          <tr>
            <th>Pictures</th>
            <th>Do</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </table>
    </div>
  )
}
