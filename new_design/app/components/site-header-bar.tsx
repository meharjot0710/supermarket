import { MacLogo } from "./mac-logo";

export function SiteHeaderBar() {
  return (
    <header className="border-b border-neutral-200/80 bg-[var(--mac-header-gray)]">
      <div className="mx-auto flex max-w-7xl items-center px-5 py-4 sm:px-8">
        <MacLogo variant="brand" />
      </div>
    </header>
  );
}
