import { FallbackProps } from 'react-error-boundary'

const fallbackRender = ({
  error,
  resetErrorBoundary
}: {
  error: Record<'message', string>
  resetErrorBoundary: FallbackProps['resetErrorBoundary']
}) => {
  return (
    <div role="alert">
      <span>Something went wrong:</span>
      <pre className="text-red-500">{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export default fallbackRender
