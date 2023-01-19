import "./PictureList.scss"


export const PictureListItem = (p: {
  name: string
}) => (
  <tr className="PictureListItem">
    <td>{p.name}</td>
  </tr>
)

export const PictureList = () => {
  const list = [
    <PictureListItem name="Test picture 1" />,
    <PictureListItem name="Test picture 2" />,
    <PictureListItem name="Test picture 3" />,
    <PictureListItem name="Test picture 4" />,
    <PictureListItem name="Test picture 5" />,
    <PictureListItem name="Test picture 6" />,
    <PictureListItem name="Test picture 7" />,
    <PictureListItem name="Test picture 8" />
  ]
  return (
    <div className="PictureList">
      <table className="PictureList-table">
        <tr>
          <th>Pictures</th>
        </tr>
        {list}
      </table>
    </div>
  )
}

