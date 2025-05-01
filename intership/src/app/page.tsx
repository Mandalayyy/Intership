import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center bg-gray-100 text-gray-800">
       <Link
          href="/dashboard"
        >
         <h1 className="text-2xl">Dashboard</h1>
        </Link>
    </div>
  );
}
