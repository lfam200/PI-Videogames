import Header from '../Header';
import './styles.css'
const NotFoundPage = () => {
  return (
    <div>
      <Header/>
      <div className="container_home">
        <div className="notFound">
          <h1>404</h1>
          <h2>PAGE NOT FOUND </h2>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage;