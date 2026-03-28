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

function CsShape() {
  return (
    <svg width="175" height="70" viewBox="0 0 175 70" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M42.497 49.9557C42.497 51.0982 42.2592 51.9319 41.7835 52.4692C41.3079 53.0065 40.5256 53.3091 39.4428 53.3708C38.7982 53.4388 38.1411 53.482 37.4839 53.4943C36.8268 53.5067 36.2072 53.5252 35.6502 53.5437C35.0869 53.5623 34.605 53.5684 34.1982 53.5684H33.3846C29.786 53.5684 26.7881 53.2411 24.3911 52.5865C21.9941 51.9319 20.079 50.8944 18.6333 49.4679C17.1876 48.0413 16.1674 46.1825 15.5791 43.8852C14.9846 41.5879 14.6904 38.7842 14.6904 35.4679C14.6904 32.1517 14.9846 29.3418 15.5791 27.0507C16.1737 24.7595 17.1938 22.8945 18.6333 21.468C20.0727 20.0414 21.9941 19.0039 24.3911 18.3493C26.7881 17.6947 29.7797 17.3674 33.3846 17.3674H34.1982C34.605 17.3674 35.0869 17.3736 35.6502 17.3921C36.2072 17.4107 36.8205 17.423 37.4839 17.4415C38.1473 17.4601 38.7982 17.5033 39.4428 17.565C40.5318 17.633 41.3079 17.9356 41.7835 18.4667C42.2592 19.0039 42.497 19.8438 42.497 20.9801V24.5002C42.497 25.5747 42.2654 26.3034 41.8086 26.6863C41.3517 27.0692 40.5631 27.2298 39.4428 27.1618C38.285 27.063 37.1522 26.9951 36.032 26.958C34.9117 26.9272 34.1106 26.9086 33.6349 26.9086C32.4458 26.9086 31.4445 27.0013 30.6309 27.1865C29.8173 27.3718 29.1539 27.767 28.6469 28.3661C28.14 28.9651 27.7645 29.8358 27.5266 30.9536C27.2888 32.0776 27.1699 33.5782 27.1699 35.4494C27.1699 37.3206 27.2888 38.778 27.5266 39.8958C27.7645 41.0197 28.14 41.8781 28.6469 42.4833C29.1539 43.0885 29.8173 43.49 30.6309 43.6876C31.4445 43.8914 32.4458 43.9902 33.6349 43.9902C34.1106 43.9902 34.9117 43.9717 36.032 43.9408C37.1522 43.9099 38.2913 43.842 39.4428 43.737C40.5631 43.669 41.3517 43.8296 41.8086 44.2125C42.2654 44.5954 42.497 45.3241 42.497 46.3986V49.9187V49.9557Z" fill="#F2F1DF"/>
      <path d="M130.333 44.1625C130.364 43.4644 130.561 42.9133 130.911 42.5153C131.262 42.1172 131.735 41.9151 132.337 41.9151C132.639 41.9151 132.952 41.9641 133.29 42.0621C135.122 42.6255 137.065 43.1092 139.119 43.5073C141.172 43.9053 143.029 44.1074 144.701 44.1074C145.77 44.1074 146.471 43.8992 146.803 43.4828C147.135 43.0664 147.301 42.7112 147.301 42.4112C147.332 42.1111 147.203 41.7314 146.902 41.266C146.6 40.8006 146.004 40.5496 145.1 40.519C140.028 40.3536 136.174 39.3493 133.542 37.5061C130.905 35.6629 129.589 32.8644 129.589 29.1106C129.589 26.949 130.007 25.1547 130.844 23.7279C131.68 22.3011 132.792 21.1499 134.194 20.2864C135.596 19.423 137.194 18.8106 138.996 18.4432C140.797 18.0758 142.666 17.8921 144.602 17.8921C146.637 17.8921 148.457 18.0574 150.056 18.3881C151.654 18.7188 153.326 19.1842 155.06 19.7843C155.927 20.0844 156.609 20.5987 157.113 21.3275C157.611 22.0562 157.833 22.889 157.765 23.8198L157.667 27.3103C157.599 28.7738 156.947 29.5025 155.718 29.5025C155.416 29.5025 155.084 29.4535 154.716 29.3556C152.945 28.7922 151.107 28.3145 149.189 27.9349C147.271 27.5552 145.494 27.3592 143.858 27.3592C142.826 27.3592 142.131 27.5675 141.781 27.9839C141.43 28.4003 141.258 28.7554 141.258 29.0555C141.258 29.3556 141.393 29.7352 141.658 30.2006C141.922 30.666 142.524 30.9293 143.459 30.9967C148.531 31.162 152.379 32.154 155.017 33.9605C157.654 35.7731 158.97 38.541 158.97 42.2581C158.97 44.4871 158.509 46.318 157.593 47.7632C156.677 49.2084 155.472 50.3658 153.99 51.2292C152.502 52.0926 150.842 52.6989 149.01 53.0479C147.172 53.397 145.34 53.5684 143.508 53.5684C141.676 53.5684 139.887 53.3909 138.153 53.0479C136.42 52.6989 134.686 52.2396 132.952 51.6762C132.085 51.3762 131.403 50.8618 130.899 50.1331C130.401 49.4044 130.18 48.5715 130.247 47.6407L130.346 44.1503L130.333 44.1625Z" fill="#F2F1DF"/>
      <path d="M143.919 4.33145C131.261 4.33145 120.364 11.9775 115.64 22.8757C110.935 11.9405 100.013 4.25122 87.3236 4.25122C74.6345 4.25122 63.7617 11.9034 59.0381 22.8078C54.296 11.9466 43.4231 4.32528 30.7898 4.32528C13.8111 4.32528 0 18.0746 0 34.9773C0 51.8801 13.8111 65.6294 30.7898 65.6294C43.4541 65.6294 54.3518 57.9771 59.0753 47.0727C63.8175 57.9339 74.6903 65.5553 87.3236 65.5553C99.9569 65.5553 110.879 57.9093 115.603 47.011C120.308 57.9463 131.23 65.6355 143.919 65.6355C160.898 65.6355 174.709 51.8862 174.709 34.9835C174.709 18.0807 160.898 4.33145 143.919 4.33145ZM30.7898 58.6066C17.704 58.6066 7.06052 48.0108 7.06052 34.9835C7.06052 21.9562 17.704 11.3604 30.7898 11.3604C43.8757 11.3604 54.5191 21.9562 54.5191 34.9835C54.5191 48.0108 43.8757 58.6066 30.7898 58.6066Z" fill="#F2F1DF"/>
      <path d="M87.1226 3.63086C104.141 3.63095 117.985 17.5386 117.985 34.752C117.985 51.9655 104.142 65.8739 87.1226 65.874C70.1035 65.874 56.2603 51.9656 56.2603 34.752C56.2605 17.5385 70.1036 3.63086 87.1226 3.63086Z" stroke="#F2F1DF" strokeWidth="7.26168"/>
    </svg>
  )
}

export function WhoSection() {
  const { ref: photoRef, isVisible: photoVisible } = useScrollReveal({ threshold: 0.1 })
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal({ threshold: 0.2 })
  const { ref: textRef, isVisible: textVisible } = useScrollReveal({ threshold: 0.2 })
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal({ threshold: 0.2 })

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
              <CsShape />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
