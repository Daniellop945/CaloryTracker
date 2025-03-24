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
    <div className="bg-gray-800 min-h-dvh">
        <div className="flex bg-violet-800 p-4 justify-center text-amber-50 font-bold">
          <h1>Calory Tracker</h1>
        </div>
        <div>
        <ContextProvider>
          <Formulario/>
        </ContextProvider>
        </div>
      </div>
  );
}
