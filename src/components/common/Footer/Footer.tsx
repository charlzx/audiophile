import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import DesktopNavigationLink from "@/components/common/Navigation/DesktopNavigation/DesktopNavigationLink/DesktopNavigationLink";
import navigationLinks from "@/data/navigationLinks.json";
import FacebookIcon from "../icons/FacebookIcon";
import InstagramIcon from "../icons/InstagramIcon";
import TwitterIcon from "../icons/TwitterIcon";

export default function Footer() {
  return (
    <footer className="relative bg-neutral-900 pb-[2.37rem] pt-[3.25rem] text-neutral-100 sm:pb-[2.88rem] sm:pt-[3.75rem] 2xl:pb-[3rem] 2xl:pt-[4.69rem]">
      <Container>
        <span className="absolute left-1/2 top-0 block h-[0.25rem] w-[6.3125rem] -translate-x-1/2 bg-orange sm:left-[unset] sm:-translate-x-0"></span>
        <div className="flex flex-col items-center sm:items-stretch">
          <div className="flex flex-col items-center gap-12 sm:items-start sm:justify-between sm:gap-8 lg:flex-row">
            <Logo />
            <ul className="flex flex-col items-center gap-4 sm:flex-row sm:justify-start">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <DesktopNavigationLink href={link.href}>
                    {link.name}
                  </DesktopNavigationLink>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-12 text-center text-base opacity-50 sm:mt-8 sm:text-left lg:max-w-[33.75rem]">
            Audiophile is an all in one stop to fulfill your audio needs.
            We&apos;re a small team of music lovers and sound specialists who
            are devoted to helping you get the most out of personal audio. Come
            and visit our demo facility - we&apos;re open 7 days a week.
          </p>
          <div className="mt-12 flex flex-col justify-between gap-12 sm:flex-row sm:gap-0 lg:mt-20 2xl:mt-12">
            <p className="text-center text-base font-bold opacity-50">
              Copyright 2021. All Rights Reserved
            </p>
            <ul className="flex items-center justify-center gap-4 [&>li>a:hover]:text-orange [&>li>a]:cursor-pointer [&>li>a]:text-neutral-100 [&>li>a]:transition-colors [&>li>a]:duration-300">
              <li>
                <a
                  href="https://www.facebook.com/hngtech/"
                  aria-label="HNG Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/charlzObuzor/"
                  aria-label="My Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/hngtech/"
                  aria-label="HNG Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
