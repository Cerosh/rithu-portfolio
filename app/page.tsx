import { Hero } from "@/features/hero/Hero";
import { About } from "@/features/about/About";
import { Leadership } from "@/features/leadership/Leadership";
import { Projects } from "@/features/projects/Projects";
import { OutOfSchoolLeadership } from "@/features/out-of-school-leadership/OutOfSchoolLeadership";
import { Growing } from "@/features/growing/Growing";
import { Future } from "@/features/future/Future";
import { Resume } from "@/features/resume/Resume";
import { Contact } from "@/features/contact/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Leadership />
      <Projects />
      <OutOfSchoolLeadership />
      <Growing />
      <Future />
      <Resume />
      <Contact />
    </>
  );
}
