import Link from "next/link";

const NavbarLogo = () => (
  <Link href="/" className="flex justify-center items-center gap-x-1">
    <span className="text-2xl font-extrabold tracking-tight">
      <span className="text-customGreen">Talha</span>
      <span className="text-gray-800">ShoppingCart</span>
    </span>
  </Link>
);

export default NavbarLogo;
