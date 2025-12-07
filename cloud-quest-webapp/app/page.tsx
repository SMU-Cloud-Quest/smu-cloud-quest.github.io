import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { VenueBanner } from "@/components/sections/venue-banner";
import { Countdown } from "@/components/sections/countdown";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <VenueBanner />
      <Countdown />
    </>
  );
}
