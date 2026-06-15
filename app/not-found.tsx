'use client';

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Image src="/images/logo.svg" alt={`${APP_NAME} Logo`} width={80} height={80} />
            <div className="p-6 w-1/3 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold">Page Not Found</h1>
                <p className="mt-4 text-gray-600">The page you are looking for does not exist.</p>
                <Button className="mt-6" onClick={() => window.history.back()}>
                    Go Back
                </Button>
            </div>
        </div>
    );
};

export default NotFound;