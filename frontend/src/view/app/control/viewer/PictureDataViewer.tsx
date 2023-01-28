import { useState } from 'react'
import { Button } from './../button/Button'
import { useAppDispatch, useAppSelector } from '../../../../state/hooks'
import {
  PictureExplorer,
  pictureExplorerAction,
} from '../../../../state/slice/pictureExplorerSlice'
import './PictureDataViewer.scss'
import { useEffect } from 'react'

export const PictureDataViewer = () => {
  const dispatch = useAppDispatch()
  const currentPicture = useAppSelector(
    (state) => state.pictureExplorer.currentPicture,
  )
  const state = useAppSelector((state) => state.pictureExplorer.state)
  const [pictureName, setPictureName] = useState('')
  const [pictureData, setPictureData] = useState('')

  useEffect(() => {
    if (currentPicture != null && state == PictureExplorer.State.VIEWING) {
      setPictureName(currentPicture.name)
      setPictureData(JSON.stringify(currentPicture.content, null, 2))
    }
  })

  return (
    <form className="control-form">
      <label>Picture name</label>
      <br />
      <input
        type="text"
        className="shadow-on-hover"
        disabled={
          state == PictureExplorer.State.VIEWING ||
          state == PictureExplorer.State.COMMITED
        }
        value={
          (state == PictureExplorer.State.VIEWING ||
            state == PictureExplorer.State.COMMITED) &&
          currentPicture != null
            ? currentPicture.name
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
        disabled={
          state == PictureExplorer.State.VIEWING ||
          state == PictureExplorer.State.COMMITED
        }
        value={
          state == PictureExplorer.State.VIEWING && currentPicture != null
            ? JSON.stringify(currentPicture.content, null, 2)
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
      {state == PictureExplorer.State.EDITING && pictureName != '' && (
        <>
          <Button
            content="Commit"
            onClick={async () => {
              dispatch(
                PictureExplorer.setParsedPictureDraft({
                  name: pictureName,
                  content: pictureData,
                }),
              )
              dispatch(
                pictureExplorerAction.setState(PictureExplorer.State.COMMITED),
              )
            }}
          />
          <Button
            content="Sync"
            onClick={async () => {
              dispatch(
                PictureExplorer.setParsedPictureDraft({
                  name: pictureName,
                  content: pictureData,
                }),
              )
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
