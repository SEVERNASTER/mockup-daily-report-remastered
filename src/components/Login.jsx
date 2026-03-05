import React, { useState } from 'react';
import {
    User,
    Lock,
    Globe,
    Eye,
    EyeOff,
    AlertCircle,
    Loader2
} from 'lucide-react';

const Login = ({ onLoginSuccess }) => {
    // --- State ---
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [language, setLanguage] = useState('English');

    // Loading & Error states
    const [isLoading, setIsLoading] = useState(false);
    const [loginMethod, setLoginMethod] = useState(null); // 'credentials' | 'microsoft'
    const [showValidationErrors, setShowValidationErrors] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // e.g., "Invalid credentials"

    const languages = ["English", "Español", "Português"];

    // --- Handlers ---
    const handleLoginWithCredentials = (e) => {
        e.preventDefault();
        setErrorMessage('');
        setShowValidationErrors(true);

        if (!username || !password) return;

        // Mock Loading State
        setIsLoading(true);
        setLoginMethod('credentials');
        setTimeout(() => {
            setIsLoading(false);
            setLoginMethod(null);

            if (username === 'admin' && password === '123') {
                if (onLoginSuccess) onLoginSuccess();
            } else {
                setErrorMessage('Invalid username or password.');
            }
        }, 1500);
    };

    const handleMicrosoftLogin = () => {
        setIsLoading(true);
        setLoginMethod('microsoft');
        setTimeout(() => {
            setIsLoading(false);
            setLoginMethod(null);
        }, 1500);
    };

    // --- Reusable Input Class ---
    const inputClass = "w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-11 py-3 text-sm focus:outline-none focus:border-[#4a89dc] focus:ring-4 focus:ring-[#4a89dc]/10 focus:bg-white transition-all shadow-sm";

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans selection:bg-[#4a89dc] selection:text-white">

            <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-500">

                {/* Subtle Top Accent Line */}
                <div className="h-1.5 w-full bg-[#0f172a]"></div>

                {/* Floating Language Selector */}
                <div className="absolute top-4 right-4 z-10">
                    <div className="relative group">
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            disabled={isLoading}
                            className="appearance-none bg-transparent hover:bg-slate-50 border border-transparent hover:border-slate-200 text-slate-500 hover:text-slate-700 text-xs font-bold rounded-lg pl-8 pr-6 py-1.5 cursor-pointer outline-none transition-all"
                        >
                            {languages.map((lang) => (
                                <option key={lang} value={lang}>{lang}</option>
                            ))}
                        </select>
                        <Globe className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 group-hover:text-slate-600 pointer-events-none transition-colors" />
                    </div>
                </div>

                <div className="p-8 sm:p-10">

                    {/* Header & Logo */}
                    <div className="flex flex-col items-center text-center mb-8 mt-2">
                        <div className="mb-4">
                            <img
                                src="/bestLogo.png"
                                alt="BEST Logo"
                                className="h-24 w-auto object-contain"
                            />
                        </div>
                        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">BEST Reports</h1>
                        <p className="text-sm font-medium text-slate-500 mt-1">Sign in to manage your daily reports</p>
                    </div>

                    {/* Global Error Banner */}
                    {errorMessage && (
                        <div className="mb-6 flex items-start gap-3 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 animate-in fade-in slide-in-from-top-2">
                            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                            <p className="text-sm font-medium">{errorMessage}</p>
                        </div>
                    )}

                    <form onSubmit={handleLoginWithCredentials} className="space-y-5">

                        {/* Username Field */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">Username</label>
                            <div className="relative">
                                <User className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${showValidationErrors && !username ? 'text-rose-400' : 'text-slate-400'}`} />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    disabled={isLoading}
                                    placeholder="Enter your username"
                                    className={`${inputClass} ${showValidationErrors && !username ? '!border-rose-400 focus:!border-rose-500 focus:!ring-rose-500/10' : ''}`}
                                />
                            </div>
                            {showValidationErrors && !username && (
                                <p className="text-xs font-semibold text-rose-500 ml-1 mt-1 animate-in fade-in">Username is required</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">Password</label>
                            <div className="relative">
                                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${showValidationErrors && !password ? 'text-rose-400' : 'text-slate-400'}`} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                    placeholder="••••••••"
                                    className={`${inputClass} ${showValidationErrors && !password ? '!border-rose-400 focus:!border-rose-500 focus:!ring-rose-500/10' : ''}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 focus:outline-none rounded-md transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {showValidationErrors && !password && (
                                <p className="text-xs font-semibold text-rose-500 ml-1 mt-1 animate-in fade-in">Password is required</p>
                            )}
                        </div>

                        {/* Standard Login Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-[#0f172a] hover:bg-slate-800 transition-all duration-200 shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                        >
                            {isLoading && loginMethod === 'credentials' ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    {/* --- SSO Divider --- */}
                    <div className="my-7 flex items-center gap-3">
                        <div className="h-px flex-1 bg-slate-200"></div>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Or continue with</span>
                        <div className="h-px flex-1 bg-slate-200"></div>
                    </div>

                    {/* Microsoft Login Button */}
                    <button
                        type="button"
                        onClick={handleMicrosoftLogin}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl text-sm font-bold text-slate-700 bg-white border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading && loginMethod === 'microsoft' ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin text-[#0f172a]" />
                                Connecting to Microsoft...
                            </>
                        ) : (
                            <>
                                {/* Microsoft Logo SVG */}
                                <svg className="h-5 w-5" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="1" y="1" width="9" height="9" fill="#F25022" />
                                    <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
                                    <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
                                    <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
                                </svg>
                                Microsoft Login
                            </>
                        )}
                    </button>

                </div>
            </div>

            {/* Subtle Footer */}
            <p className="absolute bottom-6 text-xs font-medium text-slate-400">
                © {new Date().getFullYear()} BEST Reports System. All rights reserved.
            </p>

        </div>
    );
};

export default Login;