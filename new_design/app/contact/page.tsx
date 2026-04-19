import Link from "next/link";
import { SiteHeaderBar } from "../components/site-header-bar";
import { ContactForm } from "./contact-form";

export const metadata = {
  title: "Contact us | SuperMarketing",
  description:
    "Get in touch for wholesale enquiries, partnerships, or general questions.",
};

function defaultMessageFor(from: string | undefined) {
  if (from === "brands") {
    return "Hello, I am enquiring on behalf of a brand / supplier regarding wholesale distribution.";
  }
  if (from === "retailers") {
    return "Hello, I represent an independent store / retailer and would like more information about opening an account.";
  }
  if (from === "careers") {
    return "Hello, I would like to enquire about a career opportunity at SuperMarketing.";
  }
  return "";
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: Promise<{ from?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const initialMessage = defaultMessageFor(sp.from);

  return (
    <div className="bg-white pb-24">
      <SiteHeaderBar />

      <section
        className="text-white"
        style={{ backgroundColor: "var(--mac-hero-blue)" }}
      >
        <div className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <h1 className="font-heading text-4xl font-bold uppercase tracking-tight sm:text-5xl md:text-6xl">
            Contact us
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            Get in touch for wholesale enquiries, partnerships, or general questions.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-5xl gap-12 px-5 sm:px-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="mb-6 text-lg font-bold uppercase tracking-tight text-black">
              Business details
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-[var(--mac-muted)]">
              <p>
                <span className="mb-1 block font-bold text-black">SuperMarketing</span>
                FMCG wholesaler & distributor
              </p>
              <p>
                <span className="mb-1 block font-bold text-black">Enquiries</span>
                Contact us via the form or your usual account manager.
              </p>
              <p>
                <span className="mb-1 block font-bold text-black">National coverage</span>
                Serving independent supermarkets and retailers across Australia.
              </p>
            </div>
          </div>
          <div className="lg:col-span-3">
            <h2 className="mb-6 text-lg font-bold uppercase tracking-tight text-black">
              Enquiry form
            </h2>
            <ContactForm initialMessage={initialMessage} />
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-[var(--mac-header-gray)] py-12">
        <div className="mx-auto max-w-7xl px-5 text-center sm:px-8">
          <Link
            href="/"
            className="text-sm font-semibold text-[var(--mac-teal)] hover:underline"
          >
            ← Back to home
          </Link>
        </div>
      </section>
    </div>
  );
}
