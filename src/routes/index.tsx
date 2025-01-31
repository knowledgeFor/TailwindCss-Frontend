import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import RenderRouter from './render-router'

const Routes = () => {
  return (
    <Suspense>
      <BrowserRouter>
        <RenderRouter />
      </BrowserRouter>
    </Suspense>
  )
}

export default Routes
