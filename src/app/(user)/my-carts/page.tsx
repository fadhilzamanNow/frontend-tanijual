'use client'

import { useEffect, useState } from 'react'
import { useAuthGuard } from '@/hooks/useAuthGuard'

const IDR = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

type SavedProduct = {
  id: string
  name: string
  price: number | string
  quantity: number
}

type SavedEntry = {
  id: string
  createdAt: string
  product: SavedProduct
}

type SavedResponse = {
  id: string
  items: SavedEntry[]
}

export default function SavedListPage() {
  const { authorized, checked } = useAuthGuard({ requiredRole: 'user' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState<SavedResponse | null>(null)
  const [refreshToken, setRefreshToken] = useState(0)

  useEffect(() => {
    if (!checked || !authorized) return
    if (typeof window === 'undefined') return

    const token = window.localStorage.getItem('authToken')
    if (!token) {
      setError('You must be logged in to view saved products.')
      return
    }

    const controller = new AbortController()

    async function loadSaved() {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('/api/saved', {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        })

        if (!response.ok) {
          const body = await response.json().catch(() => ({}))
          throw new Error(body?.error ?? 'Unable to fetch saved products')
        }

        const data = (await response.json()) as SavedResponse
        setSaved(data)
      } catch (err) {
        if (controller.signal.aborted) return
        setError(err instanceof Error ? err.message : 'Unexpected error')
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadSaved()
    return () => controller.abort()
  }, [authorized, checked, refreshToken])

  async function handleClearSaved() {
    if (!saved) return
    if (typeof window === 'undefined') return
    const token = window.localStorage.getItem('authToken')
    if (!token) return

    try {
      setLoading(true)
      const response = await fetch('/api/saved', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body?.error ?? 'Failed to clear saved products')
      }

      setRefreshToken((value) => value + 1)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error')
    } finally {
      setLoading(false)
    }
  }

  if (!checked) {
    return <p className="text-sm text-slate-600">Checking permissions…</p>
  }

  if (!authorized) {
    return <p className="text-sm text-slate-600">Redirecting…</p>
  }

  return (
    <section className="space-y-8">
      <header className="space-y-3">
        <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
          Private Route
        </span>
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Saved Products</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Keep your favourite produce handy before continuing the conversation with sellers on WhatsApp.
          </p>
        </div>
      </header>

      {loading && !saved ? <p className="text-sm text-slate-600">Loading list…</p> : null}

      {error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
          <strong className="font-semibold">Error:</strong> {error}
        </div>
      ) : null}

      {!loading && saved && saved.items.length === 0 ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-sm text-emerald-700">
          <h2 className="text-base font-semibold text-emerald-900">No saved produce yet</h2>
          <p className="mt-2 text-emerald-700">Explore the catalogue and save products to revisit later.</p>
        </div>
      ) : null}

      {saved && saved.items.length > 0 ? (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {saved.items.map((item) => (
              <article
                key={item.id}
                className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md"
              >
                <header className="flex-1 space-y-1">
                  <h3 className="text-base font-semibold text-slate-900">{item.product.name}</h3>
                  <p className="text-xs text-slate-500">
                    Saved {new Date(item.createdAt).toLocaleDateString('id-ID')}
                  </p>
                </header>
                <div className="mt-4 space-y-1 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Current price</span>
                    <span className="font-semibold text-slate-900">{IDR.format(Number(item.product.price))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Available stock</span>
                    <span className="font-semibold text-slate-900">{item.product.quantity} unit</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="space-y-4 rounded-xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
            <p className="text-sm text-emerald-700">
              Use these items as a quick reference when you reach out to sellers on WhatsApp.
            </p>
            <button
              type="button"
              onClick={handleClearSaved}
              disabled={loading}
              className="w-full rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:bg-rose-300"
            >
              {loading ? 'Processing…' : 'Clear saved list'}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}
