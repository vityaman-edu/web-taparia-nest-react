import React from 'react'
import { toast } from 'react-hot-toast'

export class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props)
  }

  componentDidCatch(error: any, errorInfo: React.ErrorInfo): void {
    toast.error(error.json.message)
  }

  render() {
    return (this.props as any).children
  }
}
