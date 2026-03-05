import React, { useState, useRef, useEffect } from 'react';
import {
    User,
    Lock,
    Globe,
    Eye,
    EyeOff,
    AlertCircle,
    Loader2,
    ShieldCheck,
    FileText,
    LockKeyhole,
    ChevronDown,
    Check
} from 'lucide-react';

const Login = ({ onLoginSuccess }) => {
    // --- State ---
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [language, setLanguage] = useState('English');
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);

    // Refs for clicking outside
    const languageRef = useRef(null);

    // Loading & Error states
    const [isLoading, setIsLoading] = useState(false);
    const [loginMethod, setLoginMethod] = useState(null); // 'credentials' | 'microsoft'
    const [showValidationErrors, setShowValidationErrors] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const languages = ["English", "Español", "Português"];

    // Handle clicking outside language selector
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (languageRef.current && !languageRef.current.contains(event.target)) {
                setIsLanguageOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // --- Handlers ---
    const handleLoginWithCredentials = (e) => {
        e.preventDefault();
        setErrorMessage('');
        setShowValidationErrors(true);

        if (!username || !password) return;

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

    // Reusable Input Class
    const inputClass = "w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-11 py-3.5 text-sm focus:outline-none focus:border-[#4a89dc] focus:ring-4 focus:ring-[#4a89dc]/10 focus:bg-white transition-all shadow-sm";

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-8 font-sans selection:bg-[#4a89dc] selection:text-white">

            {/* --- Main Split Card --- */}
            <div className="w-full max-w-[1000px] bg-white rounded-3xl shadow-2xl overflow-hidden flex animate-in fade-in zoom-in-95 duration-500 min-h-[600px]">

                {/* =========================================
                    LEFT SIDE: BRANDING HERO (Hidden on Mobile)
                ========================================= */}
                <div className="hidden lg:flex w-1/2 bg-[#0f172a] p-12 flex-col justify-between relative overflow-hidden">

                    {/* Abstract Background Glows */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#4a89dc]/20 blur-3xl pointer-events-none"></div>

                    {/* Logo & Headline */}
                    <div className="relative z-10">
                        {/* Safe background for the logo in case it's a dark logo */}
                        <div className="bg-white/5 backdrop-blur-sm p-4 rounded-3xl inline-block mb-10 border border-white/10 shadow-inner">
                            <img
                                src="/bestLogo.png"
                                alt="BEST Logo"
                                className="h-20 w-auto object-contain"
                            />
                        </div>

                        <h1 className="text-4xl font-extrabold text-white leading-tight mb-5">
                            Daily Report <br />
                            <span className="text-[#4a89dc]">Management System</span>
                        </h1>
                        <p className="text-slate-300 text-lg leading-relaxed max-w-md font-medium">
                            The secure platform for service engineers to log, track, and document operations in the field.
                        </p>
                    </div>

                    {/* Feature Bullets */}
                    <div className="relative z-10 space-y-5">
                        <div className="flex items-center gap-4 text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5 w-max">
                            <ShieldCheck className="h-5 w-5 text-[#4a89dc]" />
                            <span className="text-sm font-semibold tracking-wide">Secure on-site access</span>
                        </div>
                        <div className="flex items-center gap-4 text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5 w-max">
                            <FileText className="h-5 w-5 text-[#4a89dc]" />
                            <span className="text-sm font-semibold tracking-wide">Centralized daily reports</span>
                        </div>
                    </div>
                </div>

                {/* =========================================
                    RIGHT SIDE: LOGIN FORM
                ========================================= */}
                <div className="w-full lg:w-1/2 p-8 sm:p-12 relative flex flex-col justify-center">

                    {/* Floating Custom Language Selector */}
                    <div className="absolute top-6 right-6 z-20" ref={languageRef}>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                                disabled={isLoading}
                                className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl pl-3 pr-2.5 py-2.5 cursor-pointer outline-none transition-all shadow-sm group active:scale-95"
                            >
                                <Globe className={`h-4 w-4 text-slate-400 transition-colors ${isLanguageOpen ? 'text-[#4a89dc]' : 'group-hover:text-[#4a89dc]'}`} />
                                <span>{language}</span>
                                <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-300 ${isLanguageOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isLanguageOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-100 rounded-xl shadow-xl py-2 z-30 animate-in fade-in slide-in-from-top-2 duration-200">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang}
                                            type="button"
                                            onClick={() => {
                                                setLanguage(lang);
                                                setIsLanguageOpen(false);
                                            }}
                                            className="w-full flex items-center justify-between px-4 py-2 text-xs font-bold text-slate-600 hover:text-[#4a89dc] hover:bg-blue-50 transition-colors"
                                        >
                                            {lang}
                                            {language === lang && <Check className="h-3.5 w-3.5 text-[#4a89dc]" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="max-w-sm w-full mx-auto mt-4 lg:mt-0">

                        {/* Mobile-only Logo */}
                        <div className="lg:hidden mb-10">
                            <img
                                src="/bestLogo.png"
                                alt="BEST Logo"
                                className="h-16 w-auto object-contain"
                            />
                        </div>

                        <div className="mb-8">
                            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
                            <p className="text-slate-500 text-sm mt-1.5 font-medium">Sign in to access your account</p>
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
                                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">Work Username</label>
                                <div className="relative">
                                    <User className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${showValidationErrors && !username ? 'text-rose-400' : 'text-slate-400'}`} />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        disabled={isLoading}
                                        placeholder="name@bestreports.com"
                                        className={`${inputClass} ${showValidationErrors && !username ? '!border-rose-400 focus:!border-rose-500 focus:!ring-rose-500/10' : ''}`}
                                    />
                                </div>
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
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-[#4a89dc] hover:bg-blue-50 focus:outline-none rounded-lg transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Sign In Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-[#4a89dc] hover:bg-blue-600 transition-all duration-200 shadow-md shadow-blue-500/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
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
                        <div className="my-8 flex items-center gap-4">
                            <div className="h-px flex-1 bg-slate-200"></div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Or sign in with</span>
                            <div className="h-px flex-1 bg-slate-200"></div>
                        </div>

                        {/* Microsoft SSO Button */}
                        <button
                            type="button"
                            onClick={handleMicrosoftLogin}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mb-8"
                        >
                            {isLoading && loginMethod === 'microsoft' ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin text-[#0f172a]" />
                                    Connecting...
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
                                    Sign in with Microsoft
                                </>
                            )}
                        </button>

                        {/* Security Disclaimer (Matches your reference image) */}
                        {/* <div className="mt-8 pt-6 border-t border-slate-100 flex items-start gap-3">
                            <LockKeyhole className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Internal Use Only</h4>
                                <p className="text-[11px] text-slate-400 leading-relaxed">
                                    This system contains confidential information. Unauthorized access is strictly prohibited. <a href="#" className="text-[#4a89dc] hover:underline">Help Desk</a>
                                </p>
                            </div>
                        </div> */}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
