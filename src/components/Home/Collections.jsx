import { Link } from "react-router-dom"
import PropTypes from "prop-types"

Collections.propTypes = {
  featuredCollections: PropTypes.array,
}

// component returns the featured collections
// of the main page
// props:
// featuredCollections -> array of featured collections
export default function Collections({ featuredCollections }) {
  return (
    <div className="product__catalog">
      {featuredCollections.map((collection, index) => (
        <FeaturedCollection
          key={collection.id}
          collection={collection}
          picture={collection.image}
          //   collection={collection.name}
          text={collection.name}
          btnText="Shop All"
          btnClass={index === 0 ? "btn accent" : "btn blue"}
        />
      ))}
    </div>
  )
}

FeaturedCollection.propTypes = {
  collection: PropTypes.object,
  btnClass: PropTypes.string,
  btnText: PropTypes.string,
}

// component of returns feature collection component
function FeaturedCollection({ collection, btnClass, btnText }) {
  const pathname = `/catalog/${collection.name}`

  return (
    <div className="product__catalog-all-shoes">
      {<div className="collection-image-placeholder"></div>}
      <img src={collection.picture} alt="all shoes" />
      <div className="buy-button">
        <p className="product__catalog-name">{collection.text}</p>
        <button className={btnClass}>
          <Link
            className="collection-link"
            to={{ pathname: pathname, state: { isCollection: true } }}
          >
            {btnText}
          </Link>
        </button>
      </div>
    </div>
  )
}
