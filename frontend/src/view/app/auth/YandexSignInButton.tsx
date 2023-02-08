import './YandexSignInButton.scss'

//
export default function YandexSignInButton() {
  return (
    <button
      className="YandexSignInButton"
      onClick={() => {
        const clientId = 'dd47b516d10843ddb0f19fe656cf9fd5'
        window.location.replace(
          `https://oauth.yandex.ru/authorize?response_type=token&client_id=${clientId}`,
        )
      }}
    >
      <img className='YandexSignInButton-logo'
      src="https://yastatic.net/s3/home-static/_/a2/a27610a94f8a0827a6a937c869d95a3e.png"></img>
      <p className="YandexSignInButton-text">Yandex ID</p>
    </button>
  )
}
