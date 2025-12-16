import fondoRegister from "../assets/fondoRegister.jpg";
import RegisterForm from "../components/RegisterForm";
import { InteractiveBackground } from "../components/FondoInteractivo";

function Register() {
  return (
    <main className="text-white bg-black w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <InteractiveBackground/>

      <div className="flex flex-col items-center justify-center py-10">
        <div className="grid gap-2 text-center mb-10">
          <h1 className="text-4xl font-bold">Crear una cuenta</h1>
          <p className="text-lg text-white/60">Introduce tu correo para crear una cuenta</p>
        </div>
        <div className="w-100">
          <RegisterForm />
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

export default Register;