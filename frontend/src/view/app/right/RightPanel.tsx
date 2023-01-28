import './RightPanel.scss'
import Table from './table/Table'

const RightPanel = () => {
  return (
    <div className="RightPanel">
      <h2 className="RightPanel-header">Results</h2>
      <div className="RightPanel-table">
      <Table />
      </div>
      <div className="RightPanel-music">
        
      </div>
    </div>
  )
}

export default RightPanel
