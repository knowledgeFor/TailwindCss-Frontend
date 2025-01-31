import { lazy } from 'react'

export const WalletButton = lazy(() =>
  import('@solana/wallet-adapter-react-ui').then((mod) => ({
    default: mod.WalletMultiButton
  }))
)
