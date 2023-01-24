import { PictureList } from "./list/PictureList"
import { PictureDataViewer } from "./viewer/PictureDataViewer"
import "./Control.scss"

const Control = () => {
  return (
    <div className="Control">
      <h2 className="Control-header">Control</h2>
      <PictureDataViewer/>
      <PictureList/>
    </div>
  )
}

export default Control
