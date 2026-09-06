import { Hero } from "@/features/hero/Hero";
import { About } from "@/features/about/About";
import { Curiosity } from "@/features/curiosity/Curiosity";
import { Projects } from "@/features/projects/Projects";
import { Music } from "@/features/music/Music";
import { Leadership } from "@/features/leadership/Leadership";
import { Beyond } from "@/features/beyond/Beyond";
import { Growing } from "@/features/growing/Growing";
import { Future } from "@/features/future/Future";
import { Resume } from "@/features/resume/Resume";
import { Contact } from "@/features/contact/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Curiosity />
      <Projects />
      <Music />
      <Leadership />
      <Beyond />
      <Growing />
      <Future />
      <Resume />
      <Contact />
    </>
  );
}
