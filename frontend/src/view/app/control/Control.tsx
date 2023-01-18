import React from 'react'
import './Control.scss'

const Control = () => (
    <div className="Control">
        <h2>Control</h2>
        
        <div style={{height: "100%"}}>
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
                    <button 
                        id="create-picture" 
                        type="button" 
                        className="form-button">Create</button>
                    <button 
                        id="get-picture" 
                        type="button" 
                        className="form-button">Get</button>
                    <button 
                        id="list-pictures" 
                        type="button" 
                        className="form-button">List</button>
                    <button 
                        id="reload-pictures" 
                        type="button" 
                        className="form-button">
                            <span className="reload">&#x21bb;</span>
                    </button>
                </div>                         
            </form>
        </div>
    </div>
)

export default Control
