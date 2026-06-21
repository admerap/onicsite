import Link from "next/link";
import { auth } from "@/auth";
import { signOutAction } from "@/lib/actions/user-actions";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserIcon } from "lucide-react";

const UserButton = async ({ mobile = false }: { mobile?: boolean }) => {
    const session = await auth();

    if (!session) {
        return (
            <Button asChild>
                <Link href="/sign-in">
                    <UserIcon className="size-4" /> Sign In
                </Link>
            </Button>
        );
    }

    const initial = session.user?.name?.charAt(0).toUpperCase() ?? "U";

    if (mobile) {
        return (
            <div className="w-full flex flex-col gap-1">
                <div className="px-2 py-1.5">
                    <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground truncate">{session.user?.email}</p>
                </div>
                <form action={signOutAction} className="w-full">
                    <Button className="w-full justify-start gap-2" variant="ghost" type="submit">
                        <LogOut className="size-4" />
                        Sign Out
                    </Button>
                </form>
            </div>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full size-8 p-0 font-medium">
                    {initial}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground truncate">{session.user?.email}</p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="p-0">
                    <form action={signOutAction} className="w-full">
                        <Button className="w-full justify-start gap-2" variant="ghost" type="submit">
                            <LogOut className="size-4" />
                            Sign Out
                        </Button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserButton;