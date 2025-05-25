import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"

//components
import SmoothieCard from "../components/SmoothieCard"

const Home = () => {
const [fetchError, setFetchError] = useState(null)
const [smoothies, setSmoothies] = useState(null)
const [orderBy, setOrderby] = useState('created_at')

useEffect( () => {
  const fetchSmoothies = async () => {
    const { data, error } = await supabase
      .from('Smoothies')
      .select()
      .order(orderBy, { ascending: false })
    if (error) {
      setFetchError('Could not fetch the smoothies')
      setSmoothies(null)
      console.log(error)
    }
    if (data) {
      setSmoothies(data)
      setFetchError(null)
    }
  }

  fetchSmoothies()

}, [orderBy])

  return (
    <div className="page home">
      {fetchError && (<p className="error">{fetchError}</p>)}
      {smoothies && (
        <div className="smoothies">
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderby('created_at')}>Date Created</button>
            <button onClick={() => setOrderby('title')}>Title</button>
            <button onClick={() => setOrderby('rating')}>Rating</button>
            {orderBy}
          </div>
          {/* order by buttons */}
          <div className="smoothies-grid">
            {smoothies.map(smoothie => (
              <SmoothieCard key={smoothie.id} smoothie={smoothie}/>
            ))} 
          </div>
        </div>
      )}
    </div>
  )
}

export default Home