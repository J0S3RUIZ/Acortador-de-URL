import { useState } from "react";
import fondoRegister from "../assets/fondoRegister.jpg";
import LoginForm from "../components/LoginForm";
import { InteractiveBackground } from "../components/FondoInteractivo";

function Login() {
  return (
    <main className="bg-black text-white w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <InteractiveBackground />

      <div className="flex flex-col items-center justify-center py-10">
        <div className="grid gap-2 text-center mb-10">
          <h1 className="text-4xl font-bold">Iniciar sesión</h1>
          <p className="text-lg text-white/60">Introduce tus credenciales para iniciar sesión</p>
        </div>
        <div className="w-100">
          <LoginForm />
        </div>
      </div>

      <div className="relative h-full overflow-hidden">
        <img
          src={fondoRegister}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </main>
  );
}

export default Login;