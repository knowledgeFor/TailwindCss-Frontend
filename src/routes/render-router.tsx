import { FC, lazy } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'

import LayoutComponent from '../layout'
import AgentsDashboard from '../pages/agents'
import InDepthAgentEditor from '../pages/agents/inDepthAgentEditor'
import AgentApiAutomation from '../pages/agents/apiAutomation'
const NotFound = lazy(() => import('../pages/not-found'))
const RevenuePage = lazy(() => import('../pages/revenue'))
const BuildAgentPage = lazy(() => import('../pages/buildagent'))
const MarketPlacePage = lazy(() => import('../pages/marketplace'))
const StakingPage = lazy(() => import('../pages/staking'))
const TokenLauncherLP = lazy(() => import('../pages/tokenlauncher'))

const routes = [
  {
    path: '/',
    element: <LayoutComponent />,
    children: [
      {
        path: '',
        element: <Navigate to="home" />
      },
      {
        path: 'home',
        element: <RevenuePage />
      },
      {
        path: 'marketplace',
        element: <MarketPlacePage />
      },
      {
        path: 'buildagent',
        element: <BuildAgentPage />
      },
      {
        path: 'staking',
        element: <StakingPage />
      },
      {
        path: 'agents',
        element: <AgentsDashboard />
      },
      {
        path: 'in-depth-agent-editor',
        element: <InDepthAgentEditor />
      },
      {
        path: 'token-launcher-lp',
        element: <TokenLauncherLP />
      },
      {
        path: 'agent/api-automation',
        element: <AgentApiAutomation />
      },
      {
        path: 'launcher',
        element: <StakingPage />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]

const RenderRouter: FC = () => {
  const element = useRoutes(routes)
  return element
}

export default RenderRouter
