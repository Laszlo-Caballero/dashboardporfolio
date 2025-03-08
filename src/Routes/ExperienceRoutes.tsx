import CreateExperience from "@/Pages/Dashboard/CreateExperience/CreateExperience";
import Experience from "@/Pages/Dashboard/Experience/Experience";
import { Route, Routes } from "react-router";

export default function ExperienceRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Experience />} />
      <Route path="/create" element={<CreateExperience />} />
    </Routes>
  );
}
