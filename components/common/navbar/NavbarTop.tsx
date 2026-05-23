import MainLayout from "../layouts/main/MainLayout";
import Link from "next/link";
import { useRef } from "react";

import currencies from "./currencies";
import languages from "./languages";
import { WordRotate } from "@/components/ui/word-rotate";
import { cn } from "@/lib/utils";

interface NavbarTopProps {
  stickToTop?: boolean;
}

const NavbarTop: React.FC<NavbarTopProps> = ({ stickToTop = false }) => {
  const currencyRef = useRef<HTMLSelectElement>(null);
  const languageRef = useRef<HTMLSelectElement>(null);

  const handleLanguageChange = () => {
    console.log(languageRef.current?.value);
  };

  const handleCurrencyChange = () => {
    console.log(currencyRef.current?.value);
  };

  return (
    <MainLayout className={cn("bg-primary ", stickToTop && "sticky top-0 z-50")}>
      <div className="flex justify-between items-center text-white h-10 text-sm">
        {/* Left: empty after phone removal */}
        <div className="navbar-top-left" />

        {/* Centre: promotions + shop link */}
        <div className="flex items-center gap-x-2">
          <div className="hidden md:flex items-center gap-x-2">
            <WordRotate
              className="text-xl font-medium text-black dark:text-white"
              words={[
                "Get 50% off on selected items",
                "Free delivery on orders over $50",
                "Exclusive vouchers for new customers",
                "Buy 1 get 1 free on all accessories",
                "Limited time: 30% off storewide",
                "Sign up and get a $10 discount",
              ]}
            />
            {" | "}
          </div>
          <Link href="/shop" title="Shop" aria-label="Shop">
            Shop Now
          </Link>
        </div>

        {/* Right: currency + language selects */}
        <div className="flex justify-between items-center gap-x-3">
          <select
            title="Currency"
            aria-label="Currency"
            name="currency"
            className="bg-transparent border-none outline-none"
            onChange={handleCurrencyChange}
            ref={currencyRef}
          >
            {currencies?.map((currency) => (
              <option className="text-slate-950" value={currency} key={currency}>
                {currency}
              </option>
            ))}
          </select>
          <select
            title="Language"
            aria-label="Language"
            name="language"
            className="bg-transparent border-none outline-none"
            onChange={handleLanguageChange}
            ref={languageRef}
          >
            {languages?.map((language) => (
              <option className="text-slate-950" value={language} key={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
      </div>
    </MainLayout>
  );
};

export default NavbarTop;
