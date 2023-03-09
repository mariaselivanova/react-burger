import LoaderStyle from './Loader.module.css';

function Loader() {
  return (
    <div className={LoaderStyle.wrap}>
      <span className={LoaderStyle.loader}></span>
    </div>
  )
}

export default Loader
