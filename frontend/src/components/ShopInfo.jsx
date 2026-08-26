import React from 'react'
import { useSelector } from "react-redux"
const ShopInfo = ({ isOwner }) => {

  const { seller } = useSelector((state) => state.seller)
  return (
    <>
      <div>
        <div>
          <div>
            <img src={seller?.avatar} alt="" />
          </div>
          <h3>{seller.name}</h3>
          <p>{seller.description}</p>
        </div>
        <div>
          <h5>Address</h5>
          <h4>
            {seller.address}
          </h4>
        </div>
        <div>
          <h5>Phone Number </h5>
          <h4>
            {seller.phoneNumber}
          </h4>
        </div>
        <div>
          <h5>Total Products</h5>
          <h4>
            10 //make dynamic
          </h4>
        </div>
        <div>
          <h5>Shop Ratings </h5>
          <h4>
            4  //make dynamic
          </h4>
        </div>
        <div>
          <h5>Joined On </h5>
          <h4>
            {seller.createdAt.slice(0, 10)}
          </h4>
        </div>
        {isOwner && (
          <div>
            
          </div>
        )}
      </div>
    </>

  )
}

export default ShopInfo