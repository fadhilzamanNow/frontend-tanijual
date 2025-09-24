import { createFileRoute } from "@tanstack/react-router";
import logo from "@/images/logowithText.svg";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";
import * as z from "zod";

export const Route = createFileRoute("/(auth)/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const loginSchema = z.object({
    username : z.string({error : "You need to enter this field brother"})
  })

  return (
    <form className="min-h-10 min-w-20 px-4 py-6 rounded-xl bg-white flex flex-col gap-4">
      <div className="flex justify-center items-center">
        <img src={logo} alt="imagelogo" className="w-50 h-20 mb-5" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="Masukkan usernamemu" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" placeholder="Masukkan passwordmu" />
      </div>
      <Button className="bg-blue-600">Login</Button>
      <p className="flex flex-col xl:flex-row  gap-2">
        <span>Apakah anda belum memiliki akun?</span>
        <span className="text-blue-600 underline">Daftar Sekarang</span>
      </p>
    </form>
  );
}
