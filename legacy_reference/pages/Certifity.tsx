import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Tipe data untuk sertifikat dari API
interface Certificate {
  id: number;
  name: string;
  issuer: string;
  issued_at: string;
  image: string;
  certificate_url: string;
}

export default function Certificate() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const topControls = useAnimation();
  const bottomControls = useAnimation();
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  const isTopInView = useInView(topRef, { once: true });
  const isBottomInView = useInView(bottomRef, { once: true });

  useEffect(() => {
    if (isTopInView) topControls.start("visible");
  }, [isTopInView, topControls]);

  useEffect(() => {
    if (isBottomInView) bottomControls.start("visible");
  }, [isBottomInView, bottomControls]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await fetch("https://admin-panel.oktovet.store/api/certificates");
        if (!res.ok) throw new Error("Failed to fetch certificates");
        const data = await res.json();
        setCertificates(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  const fallbackImage = "https://via.placeholder.com/600x400?text=Certificate+Image+Not+Available";
  const handleImageError = (e: any) => {
    e.target.src = fallbackImage;
  };

  const settingsTop = {
    infinite: true,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  const settingsBottom = {
    infinite: true,
    speed: 5000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    pauseOnHover: true,
    rtl: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10 } },
  };

  if (loading) return <p className="text-center text-gray-600">Loading certificates...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center py-24" id="certificates">
      <div className="max-w-6xl w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative inline-block">
            <span className="absolute -inset-1 -skew-y-3 bg-blue-100 dark:bg-blue-900 opacity-30 rounded-lg"></span>
            <h2 className="relative text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Certifications
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Here are some of the certifications I've earned throughout my professional journey.
          </p>
        </motion.div>

        {/* Top Slider */}
        <motion.div className="overflow-hidden w-full mb-12" ref={topRef} initial="hidden" animate={topControls} variants={containerVariants}>
          <Slider {...settingsTop}>
            {certificates.map((cert) => (
              <motion.div key={`top-${cert.id}`} className="p-4" variants={itemVariants}>
                <a href={cert.certificate_url} target="_blank" rel="noopener noreferrer">
                  <div className="relative overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800 group">
                    <img
                      src={`https://admin-panel.oktovet.store/api/certificates/${cert.image}`}
                      alt={cert.name}
                      className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
                      onError={handleImageError}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-4">
                      <h3 className="text-white text-center text-lg font-semibold mb-1">{cert.name}</h3>
                      <p className="text-white/80 text-center text-sm">{cert.issuer}</p>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </Slider>
        </motion.div>

        {/* Bottom Slider */}
        <motion.div className="overflow-hidden w-full" ref={bottomRef} initial="hidden" animate={bottomControls} variants={containerVariants}>
          <Slider {...settingsBottom}>
            {certificates.map((cert) => (
              <motion.div key={`bottom-${cert.id}`} className="p-4" variants={itemVariants}>
                <a href={cert.certificate_url} target="_blank" rel="noopener noreferrer">
                  <div className="relative overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800 group">
                    <img
                      src={`https://admin-panel.oktovet.store/api/certificates${cert.image}`}
                      alt={cert.name}
                      className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
                      onError={handleImageError}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-4">
                      <h3 className="text-white text-center text-lg font-semibold mb-1">{cert.name}</h3>
                      <p className="text-white/80 text-center text-sm">{cert.issuer}</p>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </Slider>
        </motion.div>
      </div>
    </section>
  );
}
