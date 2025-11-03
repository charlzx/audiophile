import AudioGearSection from "@/components/common/AudioGearSection/AudioGearSection";
import CategorySection from "@/components/common/CategorySection/CategorySection";
import HeroSection from "@/components/home/HeroSection/HeroSection";
import Yx1EarphonesSection from "@/components/home/Yx1EarphonesSection/Yx1EarphonesSection";
import Zx7SpeakerSection from "@/components/home/Zx7SpeakerSection/Zx7SpeakerSection";
import Zx9SpeakerSection from "@/components/home/Zx9SpeakerSection/Zx9SpeakerSection";

export default function Home() {
  return (
    <main className="pb-[7.5rem] md:pb-[6rem] xl:pb-[10rem]">
      <HeroSection className="pb-[6.875rem] pt-[calc(6.875rem+var(--navigation-height))] xl:pb-[9.875rem] xl:pt-[calc(8rem+var(--navigation-height))]" />
      <CategorySection className="mt-[5.75rem] lg:mt-[9.1875rem]" />
      <Zx9SpeakerSection className="mt-[7.5rem] lg:mt-[6rem] xl:mt-[3rem]" />
      <Zx7SpeakerSection className="mt-[1.5rem] md:mt-[2rem] xl:mt-[3rem]" />
      <Yx1EarphonesSection className="mt-[1.5rem] md:mt-[2rem] xl:mt-[3rem]" />
      <AudioGearSection className="mt-[7.5rem] md:mt-[6rem] xl:mt-[12.5rem]" />
    </main>
  );
}
