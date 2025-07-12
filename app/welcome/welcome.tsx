import { IconLogo } from "~/components/Logo";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
export function Welcome() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only">Skip to main content</a>
    
    <main className="flex-col h-screen w-screen items-start justify-center gap-2 snap-y snap-mandatory overflow-y-scroll" id="main">
      <header className="w-screen flex items-center gap-4 sticky top-0">
    <IconLogo color="white" className="w-[200px]" />
    <h1 className="text-white text-7xl">Augmented Webcraft</h1>
    </header>
      <div className="flex w-screen h-screen snap-always snap-center pt-12">
         
      </div>
      <div className="flex items-center justify-center w-screen h-screen snap-always snap-center  pt-12">
        Services
      </div>
      <div className="flex items-center justify-center w-screen h-screen snap-always snap-center pt-12">
        Lead Gen
      </div>
    </main>
    </>
  );
}
