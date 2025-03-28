import type { Route } from "./+types/home"
import { Formulario } from "../components/ui/formulario"
import { ContextProvider} from '../contexts/calorieContext'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Calory Tracker" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <ContextProvider>
      <div className="bg-gray-800 min-h-svh min-w-svw">
        <div className="flex bg-violet-800 p-4 justify-center text-amber-50 font-bold">
          <h1>Calory Tracker</h1>
        </div>
        <div className="flex-col-reverse bg-violet-400 p-10 pt-2 m-5 mb-0 rounded-2xl">
          <Formulario/>
        </div>
      </div>
    </ContextProvider>
  );
}
