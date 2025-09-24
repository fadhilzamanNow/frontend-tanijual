import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  console.log("this is the auth layout")
  return (
    <div className="min-h-screen w-full bg-slate-100 flex justify-center items-center">
      <Outlet />
    </div>
  )
}
