import CreateExperience from "@/Pages/Dashboard/CreateExperience/CreateExperience";
import Experience from "@/Pages/Dashboard/Experience/Experience";
import UpdateExperience from "@/Pages/Dashboard/UpdateExperience/UpdateExperience";
import { Route, Routes } from "react-router";

export default function ExperienceRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Experience />} />
      <Route path="/create" element={<CreateExperience />} />
      <Route path="/update/:id" element={<UpdateExperience />} />
    </Routes>
  );
}
