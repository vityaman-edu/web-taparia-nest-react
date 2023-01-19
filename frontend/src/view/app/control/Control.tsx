import './Control.scss'
import { PictureList } from './PictureList'
import { Button } from './Button'

const Control = () => (
  <div className="Control">
    <h2>Control</h2>
        
    <form className="control-form">
      <label>Picture name</label>
      <br/>
      <input 
        type="text" 
        id="picture-name" 
        name="picture-name"
        className="shadow-on-hover"/>
      <br/>
      <br/>
      <label>Picture data</label>
      <br/>
      <textarea 
        id="picture-data" 
        className="picture-data"
        autoComplete="off"
        wrap="off"
        placeholder="{ *picture data* }">
      </textarea>
      <br/>  
      <br/>  
      <div className="control-buttons">
        <Button id="create-picture"  content="Create"/>
        <Button id="get-picture"     content="Get"/>
        <Button id="list-pictures"   content="List"/>
        <Button id="reload-pictures" content={
          <span className="reload">&#x21bb;</span>
        }/>
      </div>                         
    </form>
    <PictureList/>
  </div>
)

export default Control
