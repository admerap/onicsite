import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import Link from "next/link";
import { EllipsisVertical, ShoppingCart, UserIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

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
                <Button asChild>
                    <Link href="/sign-in">
                        <UserIcon className="size-4" /> Sign In
                    </Link>
                </Button>
            </nav>
            <nav className="md:hidden">
                <Sheet>
                    <SheetTrigger className="align-middle">
                        <EllipsisVertical className="size-5" />
                    </SheetTrigger>
                    <SheetContent className="flex flex-col items-start">
                        <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
                        <ModeToggle />
                        <Button asChild variant="ghost">
                            <Link href="/cart">
                                <ShoppingCart className="size-4" /> Cart
                            </Link>
                        </Button>
                        <Button>
                            <Link href="/sign-in">
                                <UserIcon className="size-4" /> Sign In
                            </Link>
                        </Button>
                    </SheetContent>
                </Sheet>
            </nav>
        </div>
    );
};

export default Menu;