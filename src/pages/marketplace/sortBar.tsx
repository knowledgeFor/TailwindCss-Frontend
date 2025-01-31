import React, { useState } from 'react'
import { AgentOptions, AgentSortLists } from '../../constants/agent'
import SvgIconComponent from '../../components/SvgIconComponent'
import { CategoryType } from '../../types/product'
interface MarketplaceSortProps {
  data: CategoryType
  onChange: (sort: { category: string; sort: string }) => void
}

const MarketplaceSortBar: React.FC<MarketplaceSortProps> = ({
  data,
  onChange
}) => {
  const [categoryHovered, setCategoryHovered] = useState<boolean>(false)
  const [sortByHovered, setSortByHovered] = useState<boolean>(false)
  return (
    <div className="w-full flex flex-row justify-between lg:flex-col lg:w-[200px] p-4 bg-gray rounded-xl">
      <div
        className="flex lg:block items-center gap-4 cursor-pointer lg:cursor-default relative"
        onMouseOver={() => setCategoryHovered(true)}
      >
        <div className="font-bold text-lg text-left lg:text-center border-0 lg:border-b-2 lg:border-b-green">
          Categories
        </div>
        <div className="block lg:hidden">
          <SvgIconComponent name="down" size="20px" />
        </div>
        <div
          onMouseOut={() => setCategoryHovered(false)}
          className={`w-[200px] bg-gray px-4 pt-3 pb-10 ${categoryHovered ? 'block' : 'hidden'} lg:hidden absolute rounded-lg top-[44px] left-[-16px] z-[200]`}
        >
          {AgentOptions.map((option: any) => (
            <div
              key={option.value}
              className={`w-full cursor-pointer p-1 border-2 rounded-md border-gray ${data.category === option.value && 'border-white-400'}`}
              onClick={() => onChange({ ...data, category: option.value })}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
      <div className={`w-full pt-3 pb-10 hidden lg:block`}>
        {AgentOptions.map((option: any) => (
          <div
            key={option}
            className={`w-full cursor-pointer p-1 border-2 rounded-md border-gray ${data.category === option.value && 'border-white-400'}`}
            onClick={() => onChange({ ...data, category: option.value })}
          >
            {option.label}
          </div>
        ))}
      </div>
      <div
        className="flex lg:block items-center gap-4 cursor-pointer lg:cursor-default relative"
        onMouseOver={() => setSortByHovered(true)}
      >
        <div className="font-bold text-lg text-left lg:text-center border-0 lg:border-b-2 lg:border-b-green">
          Sort by
        </div>
        <div className="block lg:hidden">
          <SvgIconComponent name="down" size="20px" />
        </div>
        <div
          onMouseOut={() => setSortByHovered(false)}
          className={`w-[200px] bg-gray px-4 pt-3 pb-10 ${sortByHovered ? 'block' : 'hidden'} lg:hidden absolute rounded-lg top-[44px] right-[-16px] z-[200]`}
        >
          {AgentSortLists.map((sort) => (
            <div
              key={sort}
              className={`w-full cursor-pointer p-1 border-2 rounded-md border-gray ${data.sort === sort && 'border-white-400'}`}
              onClick={() => onChange({ ...data, sort: sort })}
            >
              {sort}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full pt-3 pb-10 hidden lg:block">
        {AgentSortLists.map((sort) => (
          <div
            key={sort}
            className={`w-full cursor-pointer p-1 border-2 rounded-md border-gray ${data.sort === sort && 'border-white-400'}`}
            onClick={() => onChange({ ...data, sort })}
          >
            {sort}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MarketplaceSortBar
