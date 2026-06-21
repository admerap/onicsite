'use client';

import { User, Mail, Lock, Eye, EyeOff, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signUpDefaultValues } from '@/lib/constants';
import { signUpUser } from '@/lib/actions/user-actions';
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

const passwordRules = [
    { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
    { label: "One uppercase letter (A-Z)", test: (p: string) => /[A-Z]/.test(p) },
    { label: "One lowercase letter (a-z)", test: (p: string) => /[a-z]/.test(p) },
    { label: "One number (0-9)", test: (p: string) => /[0-9]/.test(p) },
];

const SignUpButton = () => {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="mt-1 h-11 w-full rounded-xl text-sm font-semibold" size="lg" disabled={pending}>
            {pending ? "Creating Account..." : "Create Account"}
        </Button>
    );
};

const CredentialsSignUpForm = ({ callbackUrl }: { callbackUrl: string }) => {
    const [data, action] = useActionState(signUpUser, {
        success: false,
        message: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [password, setPassword] = useState(signUpDefaultValues.password);
    const [confirmPassword, setConfirmPassword] = useState(signUpDefaultValues.confirmPassword);
    const [passwordTouched, setPasswordTouched] = useState(false);

    const confirmTouched = confirmPassword.length > 0;
    const passwordsMatch = password === confirmPassword;

    return (
        <div className="space-y-6">
            <form action={action} className="space-y-5">
                <input type="hidden" name="callbackUrl" value={callbackUrl} />

                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground/90">
                        Full Name
                    </label>
                    <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/80" />
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            autoComplete="name"
                            placeholder="John Doe"
                            defaultValue={signUpDefaultValues.name}
                            className="h-11 w-full rounded-xl border border-border/70 bg-muted/30 pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/40"
                        />
                    </div>
                </div>

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
                            defaultValue={signUpDefaultValues.email}
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
                            autoComplete="new-password"
                            placeholder="Min. 8 characters"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setPasswordTouched(true); }}
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

                    {passwordTouched && (
                        <ul className="mt-2 space-y-1 pl-1">
                            {passwordRules.map((rule) => {
                                const met = rule.test(password);
                                return (
                                    <li key={rule.label} className={`flex items-center gap-1.5 text-xs transition-colors ${met ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                                        {met
                                            ? <Check className="size-3 shrink-0" />
                                            : <X className="size-3 shrink-0 text-red-400" />
                                        }
                                        {rule.label}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground/90">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/80" />
                        <input
                            type={showConfirm ? "text" : "password"}
                            name="confirmPassword"
                            id="confirmPassword"
                            required
                            autoComplete="new-password"
                            placeholder="Repeat your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`h-11 w-full rounded-xl border bg-muted/30 pl-10 pr-10 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:ring-3 focus:ring-ring/40 ${
                                confirmTouched
                                    ? passwordsMatch
                                        ? 'border-green-500 focus:border-green-500'
                                        : 'border-red-400 focus:border-red-400'
                                    : 'border-border/70 focus:border-ring'
                            }`}
                        />
                        <button
                            type="button"
                            tabIndex={-1}
                            onClick={() => setShowConfirm((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-foreground transition-colors"
                        >
                            {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                    </div>
                    {confirmTouched && !passwordsMatch && (
                        <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                    )}
                </div>

                <SignUpButton />

                {!data.success && data.message && (
                    <p className="text-sm text-red-500 mt-2 text-center">{data.message}</p>
                )}
            </form>

            <p className="pt-1 text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/sign-in" className="font-semibold text-primary underline-offset-4 hover:underline">
                    Sign In
                </Link>
            </p>
        </div>
    );
};

export default CredentialsSignUpForm;
