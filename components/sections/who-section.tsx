"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

// Shared reveal style — use on any element that should fade-in from bottom
export function revealStyle(isVisible: boolean, delay = 0): React.CSSProperties {
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(32px)",
    transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  }
}

function SmileyCsShape() {
  return (
    <svg width="90" height="31" viewBox="0 0 90 31" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g clipPath="url(#clip0_47_362)">
        <path d="M44.9373 3.4826C38.4788 3.4826 33.2244 8.73691 33.2244 15.1954C33.2244 21.6541 38.4788 26.9084 44.9373 26.9084C51.3958 26.9084 56.6501 21.6541 56.6501 15.1954C56.6501 8.73691 51.3958 3.4826 44.9373 3.4826ZM44.9373 30.3909C36.5587 30.3909 29.7422 23.5744 29.7422 15.1954C29.7422 6.81664 36.5587 0 44.9373 0C53.3159 0 60.1324 6.81664 60.1324 15.1954C60.1324 23.5744 53.3159 30.3909 44.9373 30.3909Z" fill="#E60C1D"/>
        <path d="M44.7793 24.3911C40.5318 24.3911 37.0241 21.1616 36.5828 17.0292C36.5328 16.5607 36.8883 16.1479 37.3595 16.1479H39.1751C39.5635 16.1479 39.8942 16.4331 39.9473 16.8178C40.2748 19.1916 42.3169 21.0257 44.7793 21.0257C47.2417 21.0257 49.2838 19.1916 49.6113 16.8178C49.6644 16.4331 49.9951 16.1479 50.3835 16.1479H52.2001C52.6555 16.1479 53.026 16.5365 52.9798 16.9895C52.557 21.1409 49.0405 24.3911 44.7793 24.3911Z" fill="#E60C1D"/>
        <path d="M39.9834 11.3802C39.9834 12.3369 39.2079 13.1123 38.2513 13.1123C37.2947 13.1123 36.5193 12.3369 36.5193 11.3802C36.5193 10.4236 37.2947 9.64819 38.2513 9.64819C39.2079 9.64819 39.9834 10.4236 39.9834 11.3802Z" fill="#E60C1D"/>
        <path d="M52.9189 11.3802C52.9189 12.3369 52.1434 13.1123 51.1869 13.1123C50.2302 13.1123 49.4548 12.3369 49.4548 11.3802C49.4548 10.4236 50.2302 9.64819 51.1869 9.64819C52.1434 9.64819 52.9189 10.4236 52.9189 11.3802Z" fill="#E60C1D"/>
        <path d="M15.1953 3.48308C8.73657 3.48308 3.48226 8.73739 3.48226 15.1958C3.48226 21.6543 8.73657 26.9086 15.1953 26.9086C21.6538 26.9086 26.9081 21.6543 26.9081 15.1958C26.9081 8.73739 21.6538 3.48308 15.1953 3.48308ZM15.1953 30.391C6.81664 30.391 0 23.5746 0 15.1958C0 6.81713 6.81664 0.000488281 15.1953 0.000488281C23.5739 0.000488281 30.3904 6.81713 30.3904 15.1958C30.3904 23.5746 23.5739 30.391 15.1953 30.391Z" fill="#E60C1D"/>
        <path d="M21.5846 22.701C21.5846 23.2656 21.4683 23.681 21.2362 23.9462C21.0035 24.2119 20.6217 24.3609 20.0907 24.3944C19.7749 24.4276 19.4554 24.4481 19.1319 24.4565C18.8081 24.4649 18.5093 24.473 18.2353 24.4816C17.9613 24.4898 17.7251 24.4938 17.5258 24.4938H17.1272C15.3674 24.4938 13.9025 24.3324 12.7319 24.0084C11.5616 23.6849 10.6234 23.1703 9.91796 22.4647C9.21233 21.7592 8.71424 20.8378 8.42386 19.7003C8.13314 18.5635 7.98828 17.1727 7.98828 15.5292C7.98828 13.8856 8.13314 12.4953 8.42386 11.3583C8.71424 10.2211 9.21233 9.29975 9.91796 8.59395C10.6234 7.88849 11.5616 7.37377 12.7319 7.04994C13.9025 6.72628 15.3674 6.56445 17.1272 6.56445H17.5258C17.7251 6.56445 17.9613 6.56849 18.2353 6.57689C18.5093 6.58529 18.8081 6.59369 19.1319 6.60176C19.4554 6.61033 19.7749 6.631 20.0907 6.6641C20.6217 6.69771 21.0035 6.84711 21.2362 7.11228C21.4683 7.37797 21.5846 7.79321 21.5846 8.35734V10.1003C21.5846 10.6319 21.4725 10.9932 21.2485 11.1837C21.0243 11.375 20.6383 11.4538 20.0907 11.4203C19.526 11.3704 18.97 11.3376 18.4221 11.3208C17.8745 11.3044 17.4839 11.2958 17.2517 11.2958C16.6704 11.2958 16.1809 11.3418 15.7824 11.4329C15.3842 11.5243 15.0602 11.7191 14.8113 12.0179C14.5621 12.3167 14.3793 12.7445 14.2635 13.3006C14.1472 13.8568 14.0892 14.5996 14.0892 15.5292C14.0892 16.4426 14.1472 17.1773 14.2635 17.7332C14.3793 18.2896 14.5621 18.7167 14.8113 19.0155C15.0602 19.3143 15.3842 19.5136 15.7824 19.6131C16.1809 19.7129 16.6704 19.7625 17.2517 19.7625C17.4839 19.7625 17.8745 19.7544 18.4221 19.7376C18.97 19.7213 19.526 19.6879 20.0907 19.6381C20.6383 19.605 21.0243 19.6838 21.2485 19.8746C21.4725 20.0658 21.5846 20.4266 21.5846 20.958V22.701Z" fill="#E60C1D"/>
        <path d="M74.7832 3.4826C68.3246 3.4826 63.0703 8.73691 63.0703 15.1954C63.0703 21.6541 68.3246 26.9084 74.7832 26.9084C81.2417 26.9084 86.496 21.6541 86.496 15.1954C86.496 8.73691 81.2417 3.4826 74.7832 3.4826ZM74.7832 30.3909C66.4045 30.3909 59.5879 23.5744 59.5879 15.1954C59.5879 6.81664 66.4045 0 74.7832 0C83.1618 0 89.9783 6.81664 89.9783 15.1954C89.9783 23.5744 83.1618 30.3909 74.7832 30.3909Z" fill="#E60C1D"/>
        <path d="M68.0738 19.7378C68.0901 19.3891 68.1858 19.1152 68.3601 18.9162C68.5345 18.7169 68.771 18.6171 69.0698 18.6171C69.2193 18.6171 69.3768 18.6421 69.543 18.6917C70.4558 18.9744 71.4231 19.215 72.4441 19.4141C73.465 19.6133 74.3903 19.7129 75.2206 19.7129C75.7518 19.7129 76.1003 19.6092 76.2665 19.4017C76.4322 19.1943 76.5156 19.0157 76.5156 18.8663C76.5319 18.7169 76.4658 18.5262 76.3164 18.2934C76.1671 18.061 75.8681 17.9369 75.4199 17.92C72.8962 17.837 70.9788 17.3347 69.6675 16.4133C68.3557 15.4919 67.7002 14.0936 67.7002 12.2174C67.7002 11.1385 67.9076 10.2418 68.3228 9.52797C68.7375 8.81428 69.2939 8.24157 69.9912 7.80986C70.6886 7.37798 71.4853 7.0713 72.3818 6.8883C73.2783 6.7058 74.2078 6.61438 75.1709 6.61438C76.1834 6.61438 77.0883 6.69773 77.8853 6.86326C78.682 7.02945 79.512 7.26186 80.3754 7.56065C80.807 7.71004 81.1474 7.96749 81.3965 8.33266C81.6455 8.69799 81.7533 9.11306 81.7201 9.57771L81.6702 11.321C81.6368 12.0515 81.3131 12.4165 80.6991 12.4165C80.5497 12.4165 80.3837 12.3915 80.201 12.3419C79.3209 12.0599 78.4039 11.8233 77.4494 11.6321C76.4946 11.4413 75.6105 11.3457 74.7973 11.3457C74.2826 11.3457 73.9381 11.4498 73.764 11.6571C73.5896 11.8648 73.5023 12.0431 73.5023 12.1925C73.5023 12.3419 73.5685 12.5328 73.7016 12.7652C73.8342 12.9978 74.133 13.1307 74.5982 13.1635C77.1214 13.2468 79.0388 13.7407 80.3504 14.6452C81.6618 15.5504 82.3177 16.9323 82.3177 18.7915C82.3177 19.904 82.0895 20.8212 81.6329 21.5433C81.1762 22.2654 80.5786 22.8423 79.84 23.2738C79.1011 23.7059 78.275 24.0085 77.3622 24.183C76.449 24.3572 75.5359 24.4445 74.623 24.4445C73.7099 24.4445 72.8214 24.3572 71.9585 24.183C71.0949 24.0085 70.2316 23.7805 69.3687 23.4982C68.9368 23.3485 68.5966 23.0915 68.3475 22.7262C68.0986 22.361 67.9904 21.9461 68.0239 21.4808L68.0738 19.7378Z" fill="#E60C1D"/>
      </g>
      <defs>
        <clipPath id="clip0_47_362">
          <rect width="89.9788" height="30.4097" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export function WhoSection() {
  const { ref: photoRef, isVisible: photoVisible } = useScrollReveal({ threshold: 0.15, rootMargin: "0px 0px -20% 0px" })
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal({ threshold: 0.2, rootMargin: "0px 0px -15% 0px" })
  const { ref: textRef, isVisible: textVisible } = useScrollReveal({ threshold: 0.15, rootMargin: "0px 0px -15% 0px" })
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal({ threshold: 0.15, rootMargin: "0px 0px -10% 0px" })

  return (
    <section id="who" className="w-full">
      <div className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-16 flex flex-col gap-16 md:gap-24">

        {/* Wide photo */}
        <div
          ref={photoRef as React.RefObject<HTMLDivElement>}
          className="w-full overflow-hidden"
          style={{ borderRadius: "12px", ...revealStyle(photoVisible) }}
        >
          <Image
            src="/images/who-photo.jpeg"
            alt="Charlotte Schaerlaecken leest 'Start With Why' van Simon Sinek naast een gele typemachine"
            width={2560}
            height={1440}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* 50/50 title + text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 pb-24">

          {/* Left: Title */}
          <div
            ref={titleRef as React.RefObject<HTMLDivElement>}
            style={revealStyle(titleVisible)}
          >
            <h2
              className="font-serif text-merino-white uppercase leading-none"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700 }}
            >
              Mijn creatieve stack
            </h2>
          </div>

          {/* Right: Text + CTA row */}
          <div className="flex flex-col gap-10">
            <div
              ref={textRef as React.RefObject<HTMLDivElement>}
              style={revealStyle(textVisible)}
            >
              <p
                className="font-sans text-merino-white"
                style={{ fontSize: "18px", fontWeight: 400, lineHeight: "normal" }}
              >
                Hi there, it&apos;s me! 26-jarige internet-raised strateeg, altijd op zoek naar het volgende aha-moment.
                <br /><br />
                Ik ontleed graag campagnes: waarom werkt het, wat zit erachter en wat kan beter? Vanuit online communities en niches haal ik inzichten die ik vertaal naar strategieën, concepten en verhalen die mensen willen blijven kijken. In omgevingen waar ideeën snel bewegen ben ik op mijn gemak. Brainstorms, workshops en samen bouwen met andere creatieven. Met een scherp oog voor trends, een neus voor onverwachte invalshoeken en een sterke organisatorische blik.
              </p>
            </div>

            {/* CTA + shape row */}
            <div
              ref={ctaRef as React.RefObject<HTMLDivElement>}
              className="flex items-center justify-between"
              style={revealStyle(ctaVisible, 200)}
            >
              {/* CTA button */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-merino-white text-rustic-red font-sans text-base font-medium uppercase rounded-full px-3.5 py-1.5 transition-colors duration-200 hover:bg-ruby-red hover:text-merino-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ruby-red"
              >
                Hit My Pager
                <ArrowRight size={16} strokeWidth={2} />
              </a>

              {/* CS shape — same height as button */}
              <SmileyCsShape />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
