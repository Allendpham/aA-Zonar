const DevCard = ({dev}) =>{
const {name, img, linkedin, portfolio} = dev
  return (
    <div className="dev-card">
      <img className="dev-pic" src={img} />
      <h4>{name}</h4>
      <div className="dev-button-container">
        <button
        className="dev-button"
        onClick={() => window.open(linkedin)}>
          <i class="fa-brands fa-linkedin"></i>
        </button>
        <button
        className="dev-button"
        onClick={() => window.open(portfolio)}>
      <i class="fa-solid fa-rocket"></i>        </button>
      </div>
    </div>
  )
}

export default DevCard
