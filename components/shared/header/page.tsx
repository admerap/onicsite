import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import Menu from "./menu";

const Header = () => {
    return (
        <header className="w-full border-b border-gray-200">
            <div className="mx-auto max-w-7xl w-full flex items-center justify-between p-5 md:px-10">
                <div className="flex justify-start items-center">
                    <Link href="/" className="flex justify-start items-center">
                        <Image src="/images/logo.svg" alt={`${APP_NAME} Logo`} width={40} height={40} />
                        <span className="hidden md:block ml-2 text-2xl font-bold">{APP_NAME}</span>
                    </Link>
                </div>
                <Menu />
            </div>
        </header>
    );
};

export default Header;