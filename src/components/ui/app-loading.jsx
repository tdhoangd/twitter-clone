import { Logo } from "@/components/logo";

export default function AppLoading() {
  return (
    <main className="bg-color-bg text-color-text-main w-screen h-screen z-[800]">
      <div className="flex flex-col justify-center items-center w-screen h-screen overflow-hidden ">
        <Logo size={60} />
      </div>
    </main>
  );
}
