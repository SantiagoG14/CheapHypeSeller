import Collections from "./components/Home/Collections"
import NewDrops from "./components/Home/NewDrops"
import { useState, useEffect } from "react"
import { getNewHeat, getFeaturedCollections } from "./firebase"

export default function Home() {
  const [featuredCollections, setFeaturedCollections] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    let isSubscribed = true
    if (isSubscribed) {
      // gets featured collections
      getFeaturedCollections().then((featuredCollections) =>
        setFeaturedCollections(featuredCollections)
      )

      // gets new drops or "new heat"
      getNewHeat().then((newHeat) => {
        if (isSubscribed) {
          setProducts(newHeat)
        }
      })
    }

    return () => (isSubscribed = false)
  }, [])

  return (
    <>
      <Title title="Our Collection" />
      <Collections featuredCollections={featuredCollections} />
      <Title title="New Heat" />
      <NewDrops products={products} />
    </>
  )
}

function Title({ title }) {
  return (
    <div>
      <h1 className="title">{title}</h1>
    </div>
  )
}
