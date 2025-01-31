import React, { useRef } from 'react'
import SvgIconComponent from './SvgIconComponent'

interface Column {
  title: string // Column header
  dataIndex: string // Field from the data source
  key: string // Unique key for the column
}

interface TableProps {
  height: string
  data: { [key: string]: string | number }[] // The table rows
  columns: Column[] // The table headers to display
}

const FixedHeaderTable: React.FC<TableProps> = ({ height, data, columns }) => {
  const bodyRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  // Sync horizontal scroll between header and body
  const handleScroll = () => {
    if (bodyRef.current && headerRef.current) {
      headerRef.current.scrollLeft = bodyRef.current.scrollLeft
    }
  }

  return (
    <div className="max-w-full block font-circularBook w-full">
      <div className="relative">
        {/* Table Header */}
        <div
          ref={headerRef}
          className="overflow-hidden min-w-full w-full block text-sm text-left text-white border-b-[2px] border-b-green"
        >
          <div className="flex">
            {columns.map((col) => (
              <div
                key={col.key}
                style={{ minWidth: '300px' }}
                className="px-3 text-bold py-6 font-normal"
              >
                {col.title}
              </div>
            ))}
          </div>
        </div>
        {/* Table Body */}
        <div
          ref={bodyRef}
          onScroll={handleScroll}
          className={`overflow-auto block ${height} min-h-[150px] relative`}
        >
          {data.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="inline-block min-w-full border-b-[1px] border-b-[#FFFFFF40]"
            >
              <div className={`flex items-center`}>
                {columns.map((col, colIndex) => (
                  <div
                    key={col.key + colIndex}
                    style={{ minWidth: '300px' }}
                    className={`block px-6 py-4 font-bold whitespace-nowrap text-sm leading-[64px]`}
                  >
                    <div
                      className={`${colIndex === 0 && 'flex flex-row items-center'}`}
                    >
                      {colIndex === 0 && (
                        <div className="p-3 border border-white-100 rounded-xl mr-9">
                          <SvgIconComponent
                            name={row['icon'] as string}
                            size="38px"
                            color="#00FF5B"
                          />
                        </div>
                      )}
                      {row[col.dataIndex]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FixedHeaderTable
