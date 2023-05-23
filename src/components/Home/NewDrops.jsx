import { Link } from "react-router-dom"
import PropTypes from "prop-types"

NewDrops.propTypes = {
  products: PropTypes.array,
}

// returns components for new arrivals
// props
// products -> array of products
export default function NewDrops({ products }) {
  return (
    <>
      <section className="product__page-card">
        <div className="catalog">
          {products.map((product) => (
            <NewShoe key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}

NewShoe.propTypes = {
  product: PropTypes.object,
}

function NewShoe({ product }) {
  return (
    <div className="card">
      <Link to={`/catalog/products/${product.itemId}`}>
        <img src={product.image} alt="Yeezy boost" loading="lazy" />
      </Link>
      <div className="catalog-info">
        <p className="card-name">{product.shoeName}</p>
        <p className="card-price">${product.shoePrice}</p>
      </div>
    </div>
  )
}
