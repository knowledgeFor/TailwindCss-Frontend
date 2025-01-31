import React, { useState, useEffect } from 'react'
import MarketplaceSortBar from './sortBar'
import { ProductType, CategoryType } from '../../types/product'
import MarketplaceProduct from './products'
import Loading from '../../components/LoadingComponent'
import { getAllMarketPlaces } from '../../api/marketplaceService'

const transformMarketPlaceObject = (dataArray: any[]): ProductType[] => {
  return dataArray.map((data) => ({
    id: data.id,
    name: data.title || 'Unnamed Bot',
    description: data.description || 'No description available.',
    price: `${data.price} SOL`, // Assuming 'SOL' as the currency
    type: data.category.charAt(0).toUpperCase() + data.category.slice(1), // Capitalize first letter of category
    certified: data.status === 'active', // Mark certified if status is 'active'
    image: data.image || 'images/default.png' // Placeholder image
  }))
}

const MarketPlacePage: React.FC = () => {
  const [sortData, setSortData] = useState<CategoryType>({
    category: '',
    sort: 'New'
  })
  const [marketPlaces, setMarketPlaces] = useState<ProductType[]>([])
  const [filteredMarketPlaces, setFilteredMarketPlaces] = useState<
    ProductType[]
  >([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAllMarketPlaces = async () => {
      try {
        const response = await getAllMarketPlaces()

        if (response.success) {
          const transformedData = transformMarketPlaceObject(response?.listings)
          setMarketPlaces(transformedData)
          setFilteredMarketPlaces(transformedData) // Initialize filtered state
        }
      } catch (err: any) {
        // setError(`Failed to fetch agents: ${err.message}`);
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAllMarketPlaces()
  }, [])

  useEffect(() => {
    // Filter by category whenever `sortData` changes
    const filteredData =
      sortData.category !== ''
        ? marketPlaces.filter(
            (item) =>
              item.type.toLowerCase() === sortData.category.toLowerCase()
          )
        : marketPlaces
    setFilteredMarketPlaces(filteredData)
  }, [sortData, marketPlaces]) // Include dependencies for re-filtering

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full flex flex-col z-50 gap-2 md:gap-7 p-4 md:p-0 md:pt-4">
          <div className="w-full md:flex hidden text-3xl font-bold text-white">
            Marketplace
          </div>
          <div className="flex flex-col lg:flex-row items-start z-50 gap-4 lg:gap-2 xl:gap-4 2xl:gap-7">
            <MarketplaceSortBar
              data={sortData}
              onChange={(sortData) => setSortData(sortData)}
            />
            <div className="w-full flex flex-wrap gap-4 2xl:gap-7">
              <MarketplaceProduct products={filteredMarketPlaces} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MarketPlacePage
