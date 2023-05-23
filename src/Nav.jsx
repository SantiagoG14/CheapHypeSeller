import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
// import ShoppingBag from "./bag"
import { useApp } from "./contexts/AppContext"
import LogoUrl from "./assets/Logo.jpg"

function Nav() {
  const { shoppingBag } = useApp()
  const location = useLocation()

  const CheckoutNav = () => {
    return (
      <header className="checkout-nav">
        <Link to="/" className="checkout-nav-logo">
          <img
            className="checkout-nav-image"
            src={LogoUrl}
            alt="Cheap Hype Seller Logo"
          />
        </Link>
      </header>
    )
  }

  if (location.pathname !== "/success") {
    return (
      <>
        {location.pathname === "/checkout" ? (
          <CheckoutNav />
        ) : (
          <MainNav shoppingBag={shoppingBag} />
        )}
      </>
    )
  } else {
    return <></>
  }
}

const MainNav = () => {
  const [activeDropDown, setActive] = useState(false)

  const handleActiveList = () => {
    setActive(!activeDropDown)
  }

  const handleClickLogo = () => {
    setActive(false)
  }
  return (
    <header>
      <Link to="/" className="logo" onClick={handleClickLogo}>
        <img src={LogoUrl} alt="Cheap Hype Seller Logo" />
      </Link>
      <input type="checkbox" id="toggle-nav" className="toggle-nav" />
      <nav>
        <ul className="list">
          <div key="item1" className="nav-shoes-list">
            <li key="item2" className="list-items">
              <Link
                to="/catalog/shoes"
                className="list-link"
                onClick={() => setActive(false)}
              >
                Shoes
              </Link>
              <span onClick={() => handleActiveList()}>
                <i className="fas fa-angle-down list-link-dropdown"></i>
              </span>
            </li>
            <ul key="item3" className={activeDropDown ? "active" : ""}>
              <li key="item4" className="shoes-list-item">
                <Link
                  to="/catalog/shoes/adidas"
                  className="shoes-list-link"
                  onClick={handleActiveList}
                >
                  Adidas
                </Link>
              </li>
              <li key="item5" className="shoes-list-item">
                <Link
                  to="/catalog/shoes/nike"
                  className="shoes-list-link"
                  onClick={handleActiveList}
                >
                  Nike
                </Link>
              </li>
            </ul>
          </div>
          <li key="item7" className="list-items">
            <Link to="/catalog/clothes" className="list-link">
              Clothes
            </Link>
          </li>
          <li key="item8" className="list-items">
            <Link to="/catalog/accessories" className="list-link">
              Accessories
            </Link>
          </li>
        </ul>
      </nav>
      <label htmlFor="toggle-nav" className="toggle-nav-label">
        <span></span>
      </label>

      <div className="nav-icons">
        <ShoppingBag numberOfItems={10} />
      </div>
    </header>
  )
}

const ShoppingBag = ({ numberOfItems }) => {
  return (
    <Link to="/checkout" className="shopping-bag-link">
      <div className="shopping-bag">
        <span className="material-symbols-outlined">shopping_bag</span>
        <span className="number-of-items">
          <p>{numberOfItems > 9 ? "9+" : numberOfItems}</p>
        </span>
      </div>
    </Link>
  )
}

export default Nav
