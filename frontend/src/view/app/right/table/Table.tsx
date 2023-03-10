import { useAppSelector } from '../../../../state/hooks'
import { Tap } from '../../../../state/model/picture/tap'
import './Table.scss'

const TableItem = (p: { tap: Tap }) => {
  const asString = (date: Date) => {
    const hours = '0' + date.getHours()
    const minutes = '0' + date.getMinutes()
    const formattedTime = hours.slice(-2) + ':' + minutes.slice(-2)
    return formattedTime
  }

  return (
    <tr className="TableItem">
      <td>{asString(p.tap.createdAt)}</td>
      <td>{p.tap.x.toFixed(1)}</td>
      <td>{p.tap.y.toFixed(1)}</td>
      <td>{p.tap.status}</td>
    </tr>
  )
}

const Table = () => {
  const taps = useAppSelector((state) => state.table.taps)

  const items = taps.map((tap) => <TableItem key={tap.id} tap={tap} />)

  return (
    <div className="Table">
      <table className="Table-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>X</th>
            <th>Y</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </table>
    </div>
  )
}

export default Table
