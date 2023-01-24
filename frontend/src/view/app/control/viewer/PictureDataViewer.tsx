import { useState } from 'react'
import { Button } from './../button/Button'
import { useAppDispatch, useAppSelector } from '../../../../state/hooks'
import { FigureFactory } from '../../../../state/model/picture/figure/figureFactory'
import { Utility } from '../../../../web/api/utility'
import {
  PictureExplorer,
  pictureExplorerAction,
} from '../../../../state/slice/pictureExplorerSlice'
import { Picture } from '../../../../state/model/picture/picture'
import './PictureDataViewer.scss'
import { useEffect } from 'react'
import { api, userId } from '../../../../state/api'
import { fetchTaps } from '../../../../state/slice/tableSlice'

const parseFigure = (text: string) =>
  FigureFactory.fromJson(Utility.deepConvertToMap(JSON.parse(text)))

export const PictureDataViewer = () => {
  const dispatch = useAppDispatch()
  const currentPicture = useAppSelector(
    (state) => state.pictureExplorer.currentPicture,
  )
  const state = useAppSelector((state) => state.pictureExplorer.state)
  const [pictureName, setPictureName] = useState('')
  const [pictureData, setPictureData] = useState('')

  const trySetCurrentPicture = (name: string, data: string) => {
    dispatch(pictureExplorerAction.setOk())
    try {
      const figure = parseFigure(data)
      const picture = new Picture(0, userId(), name, figure)
      dispatch(
        pictureExplorerAction.setCurrentPicture(
          new Picture(0, userId(), picture.name, picture.content),
        ),
      )
    } catch (e) {
      dispatch(pictureExplorerAction.setError((e as any).message))
      throw e
    }
  }

  useEffect(() => {
    if (state == PictureExplorer.State.VIEWING) {
      setPictureName(currentPicture!.name)
      setPictureData(JSON.stringify(currentPicture!.content, null, 2))
    }
  })

  return (
    <form className="control-form">
      <label>Picture name</label>
      <br />
      <input
        type="text"
        className="shadow-on-hover"
        disabled={state == PictureExplorer.State.VIEWING}
        value={
          state == PictureExplorer.State.VIEWING
            ? currentPicture!.name
            : pictureName
        }
        onChange={(e) => setPictureName(e.target.value)}
      />
      <br />
      <br />
      <label>Picture data</label>
      <br />
      <textarea
        className="picture-data"
        autoComplete="off"
        wrap="off"
        placeholder="{ *picture data* }"
        disabled={state == PictureExplorer.State.VIEWING}
        value={
          state == PictureExplorer.State.VIEWING
            ? JSON.stringify(currentPicture!.content, null, 2)
            : pictureData
        }
        onChange={(e) => setPictureData(e.target.value)}
      ></textarea>
      <br />
      <br />
      {state == PictureExplorer.State.COMMITED && (
        <>
          <Button
            content="Save"
            onClick={async () => {
              if (currentPicture != null) {
                dispatch(PictureExplorer.postPicture(currentPicture))
                dispatch(
                  pictureExplorerAction.setState(PictureExplorer.State.VIEWING),
                )
              }
            }}
          />
          <Button
            content="Edit"
            onClick={async () => {
              dispatch(
                pictureExplorerAction.setState(PictureExplorer.State.EDITING),
              )
            }}
          />
        </>
      )}
      {state == PictureExplorer.State.EDITING && (
        <>
          <Button
            content="Commit"
            onClick={async () => {
              trySetCurrentPicture(pictureName, pictureData)
              dispatch(
                pictureExplorerAction.setState(PictureExplorer.State.COMMITED),
              )
            }}
          />
          <Button
            content="Sync"
            onClick={async () => {
              trySetCurrentPicture(pictureName, pictureData)
            }}
          />
        </>
      )}
      {state == PictureExplorer.State.VIEWING && (
        <Button
          content="New"
          onClick={() => {
            dispatch(
              pictureExplorerAction.setState(PictureExplorer.State.EDITING),
            )
          }}
        />
      )}
    </form>
  )
}
