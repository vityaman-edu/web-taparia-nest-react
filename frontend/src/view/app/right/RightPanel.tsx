import './RightPanel.scss'
import Table from './table/Table'

const RightPanel = () => {
  return (
    <div className="RightPanel">
      <h2 className="RightPanel-header">Results</h2>
      <Table />
      <div className="RightPanel-music">
        <iframe
          width="80%"
          height="10%"
          src="https://music.yandex.com/iframe/#track/109958639/24367796"
        >
          Слушайте{' '}
          <a href="https://music.yandex.com/album/24367796/track/109958639">
            O.M.S.K. Phonk
          </a>{' '}
          — <a href="https://music.yandex.com/artist/3414566">Смешарики</a> на
          Яндекс Музыке
        </iframe>
      </div>
    </div>
  )
}

export default RightPanel
