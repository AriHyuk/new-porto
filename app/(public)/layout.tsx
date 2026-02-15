import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ScrollProgress from "@/components/UI/ScrollProgress";
import MeshBackground from "@/components/UI/MeshBackground";
import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MeshBackground />
      <ScrollProgress />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
