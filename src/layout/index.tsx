import React, { Suspense, useState } from 'react'

import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'

import fallbackRender from './error-boundary/fallbackRender'
import SideBar from './sidebar'

const LayoutComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  return (
    <div className="min-h-screen bg-black items-start md:flex font-inter md:gap-7 md:p-7 font-circular">
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`relative flex ${
          isOpen
            ? 'md:min-w-[calc(100vw-384px)]'
            : 'md:min-w-[calc(100vw-180px)]'
        } md:gap-7 min-h-full min-w-[100vw-32px]`}
      >
        <ErrorBoundary fallbackRender={fallbackRender}>
          <Suspense
            fallback={
              <div className="w-full h-full flex justify-center items-center">
                <span>Loading...</span>
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default LayoutComponent
