import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";

export default function Home() {
  return (
    <main className="flex h-screen bg-black items-center justify-center">
      <Spotlight />
      <div className='text-center'>
        <h1 className="text-white font-bold text-7xl text-center">Cursive</h1>
        <p className="text-muted-foreground text-xl text-center w-1/2 mx-auto mt-6">
          Discover the future of teamwork with SyncPad - your go-to platform for
          real-time whiteboarding and document creation. Elevate collaboration,
          spark creativity, and boost productivity effortlessly. Join us and
          redefine the way you work together!
        </p>
        <button className="inline-flex h-12 mt-6 animate-shimmer items-center justify-center rounded-md border border-primary  bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-primary-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          Get Started
        </button>
      </div>
    </main>
  );
}
