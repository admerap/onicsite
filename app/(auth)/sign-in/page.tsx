import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CredentialsSignInForm from "./credentialsSignInForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to your account",
};

const SignInPage = async (props: {
    searchParams: Promise<{
        callbackUrl?: string;
    }>
}) => {
    const { callbackUrl } = await props.searchParams;
    const session = await auth();
    if (session) {
        return redirect(callbackUrl || "/");
    }
    return (
        <div className="w-full max-w-md mx-auto px-4">
            <Card className="border-border/60 shadow-xl shadow-black/5">
                <CardHeader className="space-y-3 pb-2">
                    <Link href="/" className="flex justify-center items-center">
                        <Image src="/images/logo.svg" alt={`${APP_NAME} Logo`} width={70} height={70} />
                    </Link>
                    <CardTitle className="text-center text-2xl font-semibold tracking-tight">Sign In to {APP_NAME}</CardTitle>
                    <CardDescription className="text-center text-sm leading-relaxed">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-2">
                    <CredentialsSignInForm callbackUrl={callbackUrl || "/"} />
                </CardContent>
            </Card>
        </div>
    );
};

export default SignInPage;