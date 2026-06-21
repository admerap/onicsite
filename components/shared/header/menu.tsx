import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import Link from "next/link";
import { EllipsisVertical, ShoppingCart, UserIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import UserButton from "./user-button";

const Menu = () => {
    return (
        <div className="flex justify-end gap-3 px-5">
            <nav className="hidden md:flex w-full max-w-xs gap-1">
                <ModeToggle />
                <Button variant="ghost" asChild>
                    <Link href="/cart">
                        <ShoppingCart className="size-4" /> Cart
                    </Link>
                </Button>
                <UserButton />
            </nav>
            <nav className="md:hidden">
                <Sheet>
                    <SheetTrigger className="align-middle">
                        <EllipsisVertical className="size-5" />
                    </SheetTrigger>
                    <SheetContent className="flex flex-col items-start p-4 gap-1">
                        <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
                        <ModeToggle />
                        <Button asChild variant="ghost" className="w-full justify-start">
                            <Link href="/cart">
                                <ShoppingCart className="size-4" /> Cart
                            </Link>
                        </Button>
                        <div className="w-full border-t my-1" />
                        <UserButton mobile />
                    </SheetContent>
                </Sheet>
            </nav>
        </div>
    );
};

export default Menu;