import { cn } from "@/lib/utils";

export const metadata = {
  title: "Home / X",
  description: "Not a real X - built with Nextjs and Tailwindcss",
};

export default function MainLayout({ children }) {
  return (
    <main
      className={cn(
        "w-full 2sm:w-[600px] 2md:w-[920px] 2lg:w-[990px] mr-0 2md:mr-20 lg:mr-0",
        "flex flex-col items-stretch justify-stretch"
      )}
    >
      <div className="flex items-stretch justify-between w-full min-h-full grow ">
        {children}
      </div>
    </main>
  );
}
