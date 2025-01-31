import React, { useState, useEffect } from 'react'

import SvgIconComponent from '../../components/SvgIconComponent'
import { ProductType } from '../../types/product'

interface ProductProps {
  products: ProductType[]
}
const MarketplaceProduct: React.FC<ProductProps> = ({ products }) => {
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({})

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(favorites).length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
  }, [favorites])

  const toggleFavorite = (id: string) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id] // Toggle favorite state
    }))
  }
  return (
    <React.Fragment>
      {products.map((product, index) => (
        <div
          key={index}
          className="2xl:w-[calc(50%-14px)] w-full flex flex-row gap-3 bg-gray px-3 py-3 rounded-xl"
        >
          <div className="">
            <div className="lg:w-[210px] w-[109px] lg:h-[210px] h-[109px] relative ">
              <img src={product.image} className="w-full h-full rounded-lg" />
              <div className="absolute bottom-2 left-2 text-xs flex flex-row items-center gap-1 z-50 bg-green text-black py-[2px] lg:py-1 px-2 rounded-2xl">
                <SvgIconComponent name="certified" size="12px" />
                <div className="text-[10px] text-circularBook lg:text-lg">
                  {product.certified ? 'Certified' : 'Uncertified'}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1 lg:gap-2 py-2">
            <div className="flex flex-row justify-between items-start">
              <div className="text-green font-bold text-[8px] lg:text-sm">
                {product.type}
              </div>
              <div onClick={() => toggleFavorite(product.id)}>
                <SvgIconComponent
                  name="favorite"
                  size="12px"
                  cursor={true}
                  color={favorites[product.id] ? '#00FF5B' : 'currentColor'}
                />
              </div>
            </div>
            <div className="w-full font-bold text-white-full text-[12px] lg:text-2xl">
              {product.name}
            </div>
            <div className="w-full text-white-full text-[9px] lg:text-lg">
              {product.description}
            </div>
            <div className="w-full h-[3px] rounded-divider bg-green" />
            <div className="flex flex-row justify-between items-center">
              <div className="text-white-full font-bold  text-[10px] lg:text-xl">
                Price: {product.price}
              </div>
              <a
                href="/buildagent"
                className="px-3 py-[2px] lg:py-1 bg-green rounded-base text-black text-[10px] lg:text-sm font-bold cursor-pointer"
              >
                Buy Bot
              </a>
            </div>
          </div>
        </div>
      ))}
    </React.Fragment>
  )
}

export default MarketplaceProduct
