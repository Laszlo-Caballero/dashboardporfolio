import Aside from "@/Components/Layout/Aside/Aside";
import { Route, Routes } from "react-router";
import Main from "./Main/Main";
import Proyects from "./Proyects/Proyects";
import Galery from "./Galery/Galery";
import ExperienceRoutes from "@/Routes/ExperienceRoutes";

export default function Dashboard() {
  return (
    <div className="w-full min-h-screen flex flex-1 bg-gray-50 dark:bg-gray-900">
      <Aside />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/proyects" element={<Proyects />} />
        <Route path="/experience/*" element={<ExperienceRoutes />} />
        <Route path="/galery" element={<Galery />} />
      </Routes>
    </div>
  );
}
