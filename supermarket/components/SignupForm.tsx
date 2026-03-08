"use client";

import { useState } from "react";
import { toast } from "sonner";
import ScrollReveal from "@/components/ScrollReveal";
import { useCms } from "@/lib/useCms";
import type { FormContent } from "@/types/cms";

interface FormState {
  legalName: string;
  tradingAs: string;
  businessStructure: string;
  businessAddress: string;
  registeredOffice: string;
  postalAddress: string;
  natureOfBusiness: string;
  abn: string;
  acn: string;
  businessPhone: string;
  metcashNumber: string;
  altMobile: string;
  accountsName: string;
  accountsPhone: string;
  accountsFax: string;
  accountsEmail: string;
  orderingEmail: string;
  promotionsEmail: string;
  dir1Name: string;
  dir1Address: string;
  dir1Phone: string;
  dir2Name: string;
  dir2Address: string;
  dir2Phone: string;
  dir3Name: string;
  dir3Address: string;
  dir3Phone: string;
  ref1Name: string;
  ref1Phone: string;
  ref1Email: string;
  ref2Name: string;
  ref2Phone: string;
  ref2Email: string;
  ref3Name: string;
  ref3Phone: string;
  ref3Email: string;
  usePurchaseOrders: boolean;
  creditLimit: string;
  accountType: string;
  referredBy: string;
  sig1Name: string;
  sig1Position: string;
  sig2Name: string;
  sig2Position: string;
  acceptTerms: boolean;
}

const initialState: FormState = {
  legalName: "",
  tradingAs: "",
  businessStructure: "",
  businessAddress: "",
  registeredOffice: "",
  postalAddress: "",
  natureOfBusiness: "",
  abn: "",
  acn: "",
  businessPhone: "",
  metcashNumber: "",
  altMobile: "",
  accountsName: "",
  accountsPhone: "",
  accountsFax: "",
  accountsEmail: "",
  orderingEmail: "",
  promotionsEmail: "",
  dir1Name: "",
  dir1Address: "",
  dir1Phone: "",
  dir2Name: "",
  dir2Address: "",
  dir2Phone: "",
  dir3Name: "",
  dir3Address: "",
  dir3Phone: "",
  ref1Name: "",
  ref1Phone: "",
  ref1Email: "",
  ref2Name: "",
  ref2Phone: "",
  ref2Email: "",
  ref3Name: "",
  ref3Phone: "",
  ref3Email: "",
  usePurchaseOrders: false,
  creditLimit: "",
  accountType: "",
  referredBy: "",
  sig1Name: "",
  sig1Position: "",
  sig2Name: "",
  sig2Position: "",
  acceptTerms: false,
};

const FormField = ({
  label,
  required,
  type = "text",
  value,
  onChange,
  colSpan,
  maxLength = 200,
}: {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  colSpan?: boolean;
  maxLength?: number;
}) => (
  <div className={colSpan ? "md:col-span-2" : ""}>
    <label className="form-label-sm">
      {label}
      {required && "*"}
    </label>
    <input
      type={type}
      className="form-input-underline"
      required={required}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
    />
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="md:col-span-2 mt-8 mb-2">
    <h4 className="brand-font text-lg border-b border-foreground/10 pb-3 text-card-foreground">
      {children}
    </h4>
  </div>
);

const SignupForm = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [sending, setSending] = useState(false);

  const set =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const formContent = useCms<FormContent | null>("/api/cms/forms?formId=signup", null);
  const signupContent = formContent && formContent.formId === "signup" ? formContent : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.acceptTerms) {
      toast.error("Please accept the Terms & Conditions to submit.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formId: "signup", ...form }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Submission failed. Please try again.");
        return;
      }
      toast.success(signupContent?.confirmationMessage ?? "Application submitted successfully! We'll be in touch.");
      setForm(initialState);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const formTitle = signupContent?.title ?? "Retailer Signup";
  const introText = signupContent?.introText ?? "";
  const submitLabel = signupContent?.submitButtonText ?? "Submit Application";

  return (
    <section id="signup" className="py-32 px-8 bg-background">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-8">
            <h2 className="brand-font text-4xl md:text-5xl mb-4 text-foreground">
              {formTitle}
            </h2>
            {introText ? (
              <p className="text-sm text-foreground/60 font-medium max-w-2xl mx-auto mb-4 whitespace-pre-line">
                {introText}
              </p>
            ) : (
              <>
                <p className="text-sm text-foreground/60 font-medium max-w-2xl mx-auto mb-4">
                  Supermarketing is a trusted wholesale distributor of natural and
                  FMCG products in Australia, supplying better-for-you snacks,
                  pantry staples, protein and supplements, as well as eco-living and
                  cleaning products.
                </p>
                <p className="text-sm text-foreground/60 font-medium max-w-2xl mx-auto mb-4">
                  We are a one-stop partner for retailers, offering expert market
                  insights, reliable service, and hands-on sales support — with
                  access to 4,000+ quality products from 250+ Australian and
                  international brands.
                </p>
              </>
            )}
            <p className="text-sm font-bold text-destructive uppercase tracking-widest">
              We do not sell directly to the public.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <form
            onSubmit={handleSubmit}
            className="bg-card p-8 md:p-14 shadow-2xl border border-foreground/5"
          >
            <h3 className="brand-font text-2xl mb-8 border-b border-foreground pb-4 text-card-foreground">
              Application for Credit Account
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
              <SectionTitle>Your Details</SectionTitle>
              <FormField
                label="Company Legal Name"
                required
                value={form.legalName}
                onChange={set("legalName")}
              />
              <FormField
                label="Trading As"
                required
                value={form.tradingAs}
                onChange={set("tradingAs")}
              />
              <div>
                <label className="form-label-sm">Business Structure*</label>
                <select
                  className="form-input-underline bg-transparent appearance-none cursor-pointer"
                  required
                  value={form.businessStructure}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      businessStructure: e.target.value,
                    }))
                  }
                >
                  <option value="">Select...</option>
                  <option value="company">Company</option>
                  <option value="partnership">Partnership</option>
                  <option value="sole-trader">Sole Trader</option>
                  <option value="trust">Trust</option>
                </select>
              </div>
              <FormField
                label="Nature of Business / Occupation"
                required
                value={form.natureOfBusiness}
                onChange={set("natureOfBusiness")}
              />
              <FormField
                label="Business Trading Address"
                required
                value={form.businessAddress}
                onChange={set("businessAddress")}
                colSpan
              />
              <FormField
                label="Registered Office Address"
                required
                value={form.registeredOffice}
                onChange={set("registeredOffice")}
                colSpan
              />
              <FormField
                label="Postal Address"
                required
                value={form.postalAddress}
                onChange={set("postalAddress")}
                colSpan
              />
              <FormField
                label="ABN"
                required
                value={form.abn}
                onChange={set("abn")}
                maxLength={20}
              />
              <FormField
                label="ACN"
                value={form.acn}
                onChange={set("acn")}
                maxLength={20}
              />
              <FormField
                label="Business Phone"
                required
                type="tel"
                value={form.businessPhone}
                onChange={set("businessPhone")}
                maxLength={20}
              />
              <FormField
                label="Metcash Number"
                value={form.metcashNumber}
                onChange={set("metcashNumber")}
                maxLength={30}
              />
              <FormField
                label="Alternate Business Mobile Numbers"
                value={form.altMobile}
                onChange={set("altMobile")}
                colSpan
                maxLength={50}
              />

              <SectionTitle>Accounts Contact Details</SectionTitle>
              <FormField
                label="Accounts Contact Name"
                required
                value={form.accountsName}
                onChange={set("accountsName")}
              />
              <FormField
                label="Accounts Phone"
                required
                type="tel"
                value={form.accountsPhone}
                onChange={set("accountsPhone")}
                maxLength={20}
              />
              <FormField
                label="Accounts Fax"
                value={form.accountsFax}
                onChange={set("accountsFax")}
                maxLength={20}
              />
              <FormField
                label="Accounts Email"
                required
                type="email"
                value={form.accountsEmail}
                onChange={set("accountsEmail")}
              />
              <FormField
                label="Ordering Email"
                type="email"
                value={form.orderingEmail}
                onChange={set("orderingEmail")}
              />
              <FormField
                label="Promotions Email"
                type="email"
                value={form.promotionsEmail}
                onChange={set("promotionsEmail")}
              />

              <SectionTitle>Directors / Partners / Individual Traders</SectionTitle>
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-4"
                >
                  <FormField
                    label={`Director ${n} — Name`}
                    value={
                      form[`dir${n}Name` as keyof FormState] as string
                    }
                    onChange={set(`dir${n}Name` as keyof FormState)}
                  />
                  <FormField
                    label="Address"
                    value={
                      form[`dir${n}Address` as keyof FormState] as string
                    }
                    onChange={set(`dir${n}Address` as keyof FormState)}
                  />
                  <FormField
                    label="Phone"
                    type="tel"
                    value={
                      form[`dir${n}Phone` as keyof FormState] as string
                    }
                    onChange={set(`dir${n}Phone` as keyof FormState)}
                    maxLength={20}
                  />
                </div>
              ))}

              <SectionTitle>Credit References (Three Required)</SectionTitle>
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-4"
                >
                  <FormField
                    label={`Reference ${n} — Name`}
                    required
                    value={
                      form[`ref${n}Name` as keyof FormState] as string
                    }
                    onChange={set(`ref${n}Name` as keyof FormState)}
                  />
                  <FormField
                    label="Phone"
                    required
                    type="tel"
                    value={
                      form[`ref${n}Phone` as keyof FormState] as string
                    }
                    onChange={set(`ref${n}Phone` as keyof FormState)}
                    maxLength={20}
                  />
                  <FormField
                    label="Email / Fax"
                    required
                    value={
                      form[`ref${n}Email` as keyof FormState] as string
                    }
                    onChange={set(`ref${n}Email` as keyof FormState)}
                  />
                </div>
              ))}

              <SectionTitle>Account Details</SectionTitle>
              <div className="flex items-center gap-3 md:col-span-2">
                <input
                  type="checkbox"
                  id="purchaseOrders"
                  checked={form.usePurchaseOrders}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      usePurchaseOrders: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 accent-primary"
                />
                <label htmlFor="purchaseOrders" className="form-label-sm mb-0">
                  Do you use Purchase Orders?
                </label>
              </div>
              <FormField
                label="Credit Limit Required"
                required
                value={form.creditLimit}
                onChange={set("creditLimit")}
                maxLength={30}
              />
              <div>
                <label className="form-label-sm">Account Type*</label>
                <select
                  className="form-input-underline bg-transparent appearance-none cursor-pointer"
                  required
                  value={form.accountType}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, accountType: e.target.value }))
                  }
                >
                  <option value="">Select...</option>
                  <option value="7-day">7 Day Account</option>
                  <option value="prepaid">Prepaid Account</option>
                </select>
              </div>
              <FormField
                label="Referred By"
                value={form.referredBy}
                onChange={set("referredBy")}
                colSpan
              />

              <SectionTitle>Authorised Signatures</SectionTitle>
              <FormField
                label="Signatory 1 — Full Name"
                required
                value={form.sig1Name}
                onChange={set("sig1Name")}
              />
              <FormField
                label="Position"
                required
                value={form.sig1Position}
                onChange={set("sig1Position")}
              />
              <FormField
                label="Signatory 2 — Full Name"
                value={form.sig2Name}
                onChange={set("sig2Name")}
              />
              <FormField
                label="Position"
                value={form.sig2Position}
                onChange={set("sig2Position")}
              />

              <div className="md:col-span-2 mt-8 bg-background p-6 border border-foreground/5">
                <p className="text-xs text-foreground/60 leading-relaxed mb-4">
                  I certify that the information provided is true and correct and
                  that I am authorised to make this application. I have read and
                  understood the Conditions of Trade of Supermarketing Pty Ltd
                  and agree to be bound by them. I authorise the use of my
                  personal information in accordance with the Privacy Act.
                </p>
                <p className="text-[10px] text-foreground/40 mb-4">
                  • Primary Contact details will be listed as the main account
                  contact. • Credit requests containing more than one
                  consignment will be automatically rejected.
                </p>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={form.acceptTerms}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        acceptTerms: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 accent-primary"
                    required
                  />
                  <label
                    htmlFor="acceptTerms"
                    className="text-xs font-bold text-foreground"
                  >
                    I accept the Terms & Conditions *
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-secondary text-secondary-foreground py-6 brand-font text-lg hover:opacity-90 transition-all uppercase tracking-widest mt-12 shadow-xl disabled:opacity-50"
            >
              {sending ? "Submitting…" : submitLabel}
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SignupForm;
