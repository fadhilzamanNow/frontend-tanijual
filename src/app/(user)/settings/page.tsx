'use client'

import { useAuthGuard } from '@/hooks/useAuthGuard'

export default function UserSettingsPage() {
  const { authorized, checked } = useAuthGuard({ requiredRole: 'user' })

  if (!checked) {
    return <p className="text-sm text-slate-600">Checking permissions…</p>
  }

  if (!authorized) {
    return <p className="text-sm text-slate-600">Redirecting…</p>
  }

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
          Private Route
        </span>
        <h1 className="text-3xl font-semibold text-slate-900">Account Settings</h1>
        <p className="max-w-2xl text-sm text-slate-600">
          Review personal information, manage addresses, and update your security preferences. These controls will
          appear here once the full feature set is in place.
        </p>
      </header>

      <div className="rounded-2xl border border-emerald-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
        <p>
          You&apos;re signed in as a buyer. Upcoming work will surface profile forms, notification preferences, and shipping
          information in this space.
        </p>
      </div>
    </section>
  )
}
