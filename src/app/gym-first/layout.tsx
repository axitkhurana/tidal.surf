import type { Metadata } from "next";
import Link from "next/link";
import "./gym-first.css";
export const metadata: Metadata = {
  title: { default: "Gym First", template: "%s · Gym First" },
  description: "Block distracting apps. Check in at your gym for a 20-minute session.",
  icons: { icon: "/gym-first/icon.png" },
};
export default function GymFirstLayout({ children }: { children: React.ReactNode }) {
  return <div className="gym-first"><div className="gym-first-wrap">
    <a className="gym-first-skip" href="#gym-first-main">Skip to content</a>
    <header><Link href="/gym-first/" className="gym-first-brand"><img src="/gym-first/icon.png" width="40" height="40" alt="" />Gym First</Link>
      <nav aria-label="Gym First"><Link href="/gym-first/support/">Support</Link><Link href="/gym-first/privacy/">Privacy</Link></nav></header>
    <main id="gym-first-main">{children}</main>
    <footer><Link href="/">Tidal Surf Collective</Link><a href="mailto:hi@tidal.surf">hi@tidal.surf</a></footer>
  </div></div>;
}
