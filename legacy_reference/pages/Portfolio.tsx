import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { Project } from "../hooks/useProjects";
import ProjectHeader from "../components/ProjectHeaders";
import ProjectFilters from "../components/ProjectFilter";
import ProjectsGrid from "../components/ProjectGrid";
import ProjectModal from "../components/ProjectModal";
import NoResultsFound from "../components/NoResultFound";

export default function Projects() {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "web" | "design" | "backend">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Fetch data from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`https://admin-panel.oktovet.store/api/projects`);
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjectsData(data); // If your API returns a plain array
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter & Search
  const filteredProjects = projectsData
    .filter((project) => {
      const category = project.category?.toLowerCase() || "";
      return (
        activeFilter === "all" ||
        (activeFilter === "web" && category.includes("web")) ||
        (activeFilter === "design" && category.includes("design")) ||
        (activeFilter === "backend" && category.includes("backend"))
      );
    })
    .filter((project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.short_description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <ProjectHeader />

        {/* Filter & Search */}
        <ProjectFilters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Loading & Error */}
        {isLoading && <p className="text-center text-gray-600">Loading projects...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Project Grid */}
        {!isLoading && !error && (
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              <ProjectsGrid
                ref={ref}
                controls={controls}
                displayedProjects={displayedProjects}
                setSelectedProject={setSelectedProject}
              />
            ) : (
              <NoResultsFound
                resetFilters={() => {
                  setSearchQuery("");
                  setActiveFilter("all");
                }}
              />
            )}
          </AnimatePresence>
        )}

        {/* Show More / Less */}
        {!isLoading && !error && filteredProjects.length > 3 && (
          <div className="flex justify-center mt-12">
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:from-purple-600 hover:to-blue-600 shadow-md transition-all duration-300"
            >
              {showAll ? "Show Less" : `View All (${filteredProjects.length})`}
            </motion.button>
          </div>
        )}

        {/* Project Detail Modal */}
        <ProjectModal
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      </div>
    </div>
  );
}
