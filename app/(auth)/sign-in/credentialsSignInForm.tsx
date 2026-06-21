'use client';

import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signInDefaultValues } from '@/lib/constants';
import { signInWithCredentials } from '@/lib/actions/user-actions';
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

const SignInButton = () => {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="mt-1 h-11 w-full rounded-xl text-sm font-semibold" size="lg" disabled={pending}>
            {pending ? "Signing In..." : "Sign In"}
        </Button>
    );
};

const CredentialsSignInForm = ({ callbackUrl }: { callbackUrl: string }) => {
    const [data, action] = useActionState(signInWithCredentials, {
        success: false,
        message: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-6">
            <form action={action} className="space-y-5">
                <input type="hidden" name="callbackUrl" value={callbackUrl} />

                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground/90">
                        Email
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/80" />
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            autoComplete="email"
                            placeholder="you@example.com"
                            defaultValue={signInDefaultValues.email}
                            className="h-11 w-full rounded-xl border border-border/70 bg-muted/30 pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/40"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-foreground/90">
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/80" />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            required
                            autoComplete="current-password"
                            placeholder="Your password"
                            defaultValue={signInDefaultValues.password}
                            className="h-11 w-full rounded-xl border border-border/70 bg-muted/30 pl-10 pr-10 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/40"
                        />
                        <button
                            type="button"
                            tabIndex={-1}
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-foreground transition-colors"
                        >
                            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                    </div>
                </div>

                <SignInButton />

                {!data.success && data.message && (
                    <p className="text-sm text-red-500 mt-2 text-center">{data.message}</p>
                )}
            </form>

            <p className="pt-1 text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link href="/sign-up" className="font-semibold text-primary underline-offset-4 hover:underline">
                    Sign Up
                </Link>
            </p>
        </div>
    );
};

export default CredentialsSignInForm;
