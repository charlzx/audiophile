import AudioGearSection from "@/components/common/AudioGearSection/AudioGearSection";
import CategorySection from "@/components/common/CategorySection/CategorySection";
import HeroSection from "@/components/home/HeroSection/HeroSection";
import Yx1EarphonesSection from "@/components/home/Yx1EarphonesSection/Yx1EarphonesSection";
import Zx7SpeakerSection from "@/components/home/Zx7SpeakerSection/Zx7SpeakerSection";
import Zx9SpeakerSection from "@/components/home/Zx9SpeakerSection/Zx9SpeakerSection";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/utils/animations";

export default function Home() {
  return (
    <motion.main 
      className="pb-[7.5rem] md:pb-[6rem] xl:pb-[10rem]"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={fadeInUp}>
        <HeroSection className="pb-[6.875rem] pt-[calc(6.875rem+var(--navigation-height))] xl:pb-[9.875rem] xl:pt-[calc(8rem+var(--navigation-height))]" />
      </motion.div>
      <motion.div variants={fadeInUp}>
        <CategorySection className="mt-[5.75rem] lg:mt-[9.1875rem]" />
      </motion.div>
      <motion.div variants={fadeInUp}>
        <Zx9SpeakerSection className="mt-[7.5rem] lg:mt-[6rem] xl:mt-[3rem]" />
      </motion.div>
      <motion.div variants={fadeInUp}>
        <Zx7SpeakerSection className="mt-[1.5rem] md:mt-[2rem] xl:mt-[3rem]" />
      </motion.div>
      <motion.div variants={fadeInUp}>
        <Yx1EarphonesSection className="mt-[1.5rem] md:mt-[2rem] xl:mt-[3rem]" />
      </motion.div>
      <motion.div variants={fadeInUp}>
        <AudioGearSection className="mt-[7.5rem] md:mt-[6rem] xl:mt-[12.5rem]" />
      </motion.div>
    </motion.main>
  );
}
