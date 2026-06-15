"use client";

import { useTheme } from "next-themes";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import { useSyncExternalStore } from "react";

const useIsClient = () =>
    useSyncExternalStore(() => () => {}, () => true, () => false);

const ModeToggle = () => {
    const mounted = useIsClient();
    const { theme, setTheme } = useTheme();

    if (!mounted) return null;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="focus-visible:ring-0 focus-visible:ring-offset-0">
                    {theme === "light" ? <SunIcon /> : theme === "dark" ? <MoonIcon /> : <SunMoonIcon />}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked={theme === "system"} onClick={() => setTheme("system")}>
                    System
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={theme === "dark"} onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={theme === "light"} onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ModeToggle;