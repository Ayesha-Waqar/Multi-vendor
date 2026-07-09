import React , {useState , useEffect} from 'react'
import { productData } from '../../../static/data'
import styles from "../../../styles/styles"
import ProductCard from '../ProductCard/ProductCard'
const BestDeals = () => {
    const [data , setData] = useState([])
    useEffect(()=>{
        const d= productData && productData.sort((a,b)=>b.total_sell - a.total_sell)
        const firstFive = d.slice(0,5)
         setData(firstFive)
    },[])
  return (
    <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1> Best Deals</h1>
        </div>
        <div>
          {
            data && data.map((i,index)=>(
              <ProductCart data={i} key={index}/>
            ))
          }
        </div>
      
    </div>
  )
}

export default BestDeals