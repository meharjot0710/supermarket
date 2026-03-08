import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="bg-secondary text-secondary-foreground/40 py-24 px-8 border-t border-secondary-foreground/10"
    >
      <ScrollReveal>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest uppercase font-bold mb-8">
            <div className="mb-6 md:mb-0">
              <Image
                src="/logo.png"
                alt="SuperMarketing"
                width={120}
                height={32}
                className="h-8 w-auto brightness-0 invert"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-12 text-center">
              <div>© 2026 SuperMarketing. All rights reserved.</div>
              <div className="flex gap-8 justify-center">
                <a
                  href="#"
                  className="hover:text-secondary-foreground transition-colors underline"
                >
                  Privacy
                </a>
                <a
                  href="/contact"
                  className="hover:text-secondary-foreground transition-colors underline"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
};

export default Footer;
