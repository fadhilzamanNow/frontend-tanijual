'use client'

import { useEffect, useMemo, useState } from 'react'
import { useAuthGuard } from '@/hooks/useAuthGuard'

const IDR = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

type Product = {
  id: string
  name: string
  quantity: number
  price: number | string
  createdAt: string
}

export default function SellerDashboardPage() {
  const { authorized, checked } = useAuthGuard({ requiredRole: 'seller' })
  const [sellerName, setSellerName] = useState('Seller')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const storedName = window.localStorage.getItem('sellerName')
    if (storedName) {
      setSellerName(storedName)
    }
  }, [checked])

  useEffect(() => {
    if (!checked || !authorized) return
    if (typeof window === 'undefined') return

    const token = window.localStorage.getItem('authToken')
    if (!token) {
      setError('Missing authentication token. Please sign in again.')
      return
    }

    const controller = new AbortController()

    async function loadProducts() {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('/api/seller/products', {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        })

        if (!response.ok) {
          const body = await response.json().catch(() => ({}))
          throw new Error(body?.error ?? 'Unable to fetch products')
        }

        const data = (await response.json()) as Product[]
        setProducts(data)
      } catch (err) {
        if (controller.signal.aborted) return
        setError(err instanceof Error ? err.message : 'Unexpected error occurred')
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadProducts()
    return () => controller.abort()
  }, [authorized, checked])

  const content = useMemo(() => {
    if (loading) {
      return <p className="text-sm text-slate-600">Loading your catalogue…</p>
    }

    if (error) {
      return (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
          <strong className="font-semibold">Error:</strong> {error}
        </div>
      )
    }

    if (products.length === 0) {
      return (
        <div className="rounded-xl border border-orange-200 bg-orange-50 p-6 text-sm text-orange-700">
          <h3 className="text-base font-semibold text-orange-900">No products yet</h3>
          <p className="mt-2 text-orange-700">Start by adding your first harvest so buyers can discover your produce.</p>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Your Products</h3>
          <span className="text-sm text-slate-500">{products.length} listed</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {products.map((product) => {
            const createdAt = new Date(product.createdAt)
            return (
              <article
                key={product.id}
                className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md"
              >
                <header className="flex-1">
                  <h4 className="text-base font-semibold text-slate-900">{product.name}</h4>
                  <p className="mt-1 text-xs text-slate-500">
                    Added {createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </header>
                <dl className="mt-4 space-y-1 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <dt>Stock</dt>
                    <dd className="font-semibold text-slate-900">{product.quantity} unit</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Price</dt>
                    <dd className="font-semibold text-slate-900">{IDR.format(Number(product.price))}</dd>
                  </div>
                </dl>
              </article>
            )
          })}
        </div>
      </div>
    )
  }, [error, loading, products])

  if (!checked) {
    return <p className="text-sm text-slate-600">Checking permissions…</p>
  }

  if (!authorized) {
    return <p className="text-sm text-slate-600">Redirecting…</p>
  }

  return (
    <section className="space-y-8">
      <header className="space-y-3">
        <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-600">
          Seller Workspace
        </span>
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Hello, {sellerName}</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Monitor your latest produce and keep your catalogue up to date. Buyers will discover your freshest harvest
            right here.
          </p>
        </div>
      </header>

      {content}
    </section>
  )
}
