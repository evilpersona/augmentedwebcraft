import HeroLogo from "./HeroLogo"
import { IconLogo, FullLogo } from "./Logo"
import ScalableLogo from "./ScalableLogo"
export default function Header(){

    return(
        <header className="w-screen h-screen flex items-start justify-between">
        <HeroLogo />
        </header>
    )
}