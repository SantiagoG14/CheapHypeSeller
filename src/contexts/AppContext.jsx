import { useState, useContext, createContext, useEffect } from "react"
import { signInAnonymously } from "firebase/auth"
import { auth, db } from "../firebase"
import { doc, onSnapshot, setDoc } from "firebase/firestore"

const AppContext = createContext()

export const useApp = () => useContext(AppContext)

export default function AppContextProvider({ children }) {
  const [user, setUser] = useState({ user: null })
  const [shoppingBag, setShoppingBag] = useState()

  useEffect(() => {
    signInAnonymously(auth).then((user) => {
      console.log("success", user)
      setUser(user)
      const bagRef = doc(db, "bags", user.user.uid)

      setDoc(bagRef, { bag: [] }, { merge: true }).catch((err) =>
        console.log(err)
      )

      onSnapshot(bagRef, (snapshot) => {
        console.log(snapshot.data())
        setShoppingBag(snapshot)
      })
    })
  }, [])
  const value = { user, shoppingBag }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
