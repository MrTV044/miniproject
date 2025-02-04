import Link from "next/link";
// import Image from "next/image";

export default function Navbar() {
  "const user = readCookies();";
  return (
    <nav>
      <div className="flex justify-between px-10 font-InterThigt items-center">
        <div className="p-3 text-[40px] font-black text-orange-600">
          QuickTix
        </div>

        <ul className="hidden md:flex gap-5 pb-2 font-InterThigt font-semibold">
          <Link href="/" className="">
            Home
          </Link>

          <Link href="" className="p-3 rounded-full  hover:hover:bg-gray-200">
            Create Event
          </Link>
          {/* <Link
            href="/"
            className={`${
              user.role === "customer" ? "hidden" : "flex"
            } p-3 rounded-full  hover:hover:bg-gray-200`}
          >
            Create Event
          </Link> */}

          <Link href="/" className="p-3 rounded-full  hover:hover:bg-gray-200">
            Log In
          </Link>

          <Link href="/" className="p-3 rounded-full  hover:hover:bg-gray-200">
            Sign Up
          </Link>
        </ul>
      </div>

      <div className="border border-black border-t-[1px] border-b-[1px] "></div>
    </nav>
  );
}
