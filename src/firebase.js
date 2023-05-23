import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  getDoc,
  doc,
  getFirestore,
} from "firebase/firestore"
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAhvf6wTsBsbveifDu2FOCQ8iTquHA6TuU",
  authDomain: "cheap-hype-seller.firebaseapp.com",
  projectId: "cheap-hype-seller",
  storageBucket: "cheap-hype-seller.appspot.com",
  messagingSenderId: "897578321141",
  appId: "1:897578321141:web:0f12128fcec640d9c471bc",
  measurementId: "G-75KNDQTEJK",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
const storage = getStorage(app)
const analytics = getAnalytics(app)

export const getNewHeat = async () => {
  const newHeatRef = collection(db, "catalog")
  const q = query(
    newHeatRef,
    where("sold", "==", false),
    orderBy("dateAdd", "desc"),
    limit(5)
  )

  const data = await getDocs(q)
  const imagesUrl = await Promise.all(
    data.docs.map((doc) => getMainImageUrl(doc))
  )
  console.log(data)
  return data.docs.map((doc, index) => ({
    id: doc.id,
    ...doc.data(),
    imageMainUrl: imagesUrl[index],
  }))
}

export const getFeaturedCollections = async () => {
  const collectionRef = collection(db, "featured-collection")
  const collectionDocs = getDocs(collectionRef)

  const imageUrl = await Promise.all(
    collectionDocs.docs.map((doc) => getFeatureCollectionImageUrl(doc))
  )
  const collectionData = collectionDocs.docs.map((doc, index) => ({
    id: doc.id,
    ...doc.data(),
    image: imageUrl[index],
  }))
  console.log(collectionData, "collection")
  return collectionData
}

const getMainImageUrl = async (productDoc) =>
  getDownloadURL(
    ref(storage, productDoc.id + "/" + productDoc.data().images.main)
  )

const getFeatureCollectionImageUrl = async (productDoc) =>
  getDownloadURL(ref(storage, `home/${productDoc.data().image}`))

const getMainAndRestImagesUrl = async (productDoc) => {
  const productData = productDoc.data()
  const images = [productData.images.main, ...productData.images.rest]
  return Promise.all(
    images.map((img) => getDownloadURL(ref(`${productDoc.id}/${img}`)))
  )
}
