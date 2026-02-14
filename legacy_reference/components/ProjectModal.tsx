import { motion, AnimatePresence } from "framer-motion";
import { modalVariants } from "../utils/animation";
import { Project } from "../hooks/useProjects";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// Optional: create icon mapping for known technologies
const techIconMap: Record<string, JSX.Element> = {
  react: <i className="devicon-react-original text-xl text-blue-500" />,
  laravel: <i className="devicon-laravel-plain text-xl text-red-500" />,
  tailwindcss: <i className="devicon-tailwindcss-plain text-xl text-teal-500" />,
  "framer-motion": <i className="fas fa-wave-square text-purple-500" />,
  typescript: <i className="devicon-typescript-plain text-blue-600" />,
};

type ProjectModalProps = {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
};

const ProjectModal = ({ selectedProject, setSelectedProject }: ProjectModalProps) => {
  if (!selectedProject) return null;

  return (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={e => e.stopPropagation()}
          >
            {/* Gambar */}
            <div className="relative h-64 sm:h-80 bg-gray-200 dark:bg-gray-700">
              {selectedProject.thumbnail ? (
                <img
                  src={selectedProject.thumbnail}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  No Image Available
                </div>
              )}
              <button
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Konten */}
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
                  {selectedProject.title}
                </h2>

                <div className="flex gap-3">
                  {selectedProject.code_url && (
                    <a
                      href={selectedProject.code_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <FaGithub className="text-gray-800 dark:text-gray-200" />
                      <span className="font-medium text-gray-800 dark:text-gray-200">Code</span>
                    </a>
                  )}

                  {selectedProject.live_demo_url && (
                    <a
                      href={selectedProject.live_demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <FaExternalLinkAlt />
                      <span className="font-medium">Live Demo</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {selectedProject.full_description || selectedProject.short_description}
                </p>
              </div>

              {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300"
                      >
                        {techIconMap[tech.toLowerCase()] || (
                          <span className="text-xs font-medium">{tech}</span>
                        )}
                        <span className="text-sm font-medium capitalize">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Category:{" "}
                  <span className="font-medium capitalize">
                    {selectedProject.category || "Uncategorized"}
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
