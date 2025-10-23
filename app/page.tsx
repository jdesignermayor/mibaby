import Link from "next/link";
import Navbar from "../components/shared/Navbar";

export default function Home() {
  return (
    <div className="relative h-[calc(95vh)]">
      <Navbar />
      <div className="flex ">
        <Link href="/dashboard"> go to dashboard</Link>
      </div>
    </div>
  );
}
