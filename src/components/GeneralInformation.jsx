import React from 'react';
import { Briefcase, Users, Clock, MapPin, Lock, AlertCircle } from 'lucide-react';

const GeneralInformation = () => {
    // Reusable classes to keep the code DRY and consistent
    const inputClasses = "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 transition-all duration-200 hover:border-blue-400 focus:border-[#4a89dc] focus:outline-none focus:ring-4 focus:ring-[#4a89dc]/10 shadow-sm";
    const readOnlyClasses = "w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-slate-500 cursor-not-allowed shadow-sm font-medium";
    const labelClasses = "block text-sm font-semibold text-slate-700 mb-1.5";

    return (
        <form className="space-y-8 animate-fade-slide">

            {/* --- Section 1: Project Details (Read-only System Data) --- */}
            <div className="bg-slate-50/50 rounded-xl border border-slate-200 p-6 shadow-md">
                <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-3">
                    <Briefcase className="h-5 w-5 text-slate-500" />
                    <h3 className="text-lg font-bold text-slate-800">Project Details</h3>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-1 relative">
                        <label className={labelClasses}>Customer</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input type="text" value="COCHA" readOnly className={readOnlyClasses} />
                        </div>
                    </div>

                    <div className="space-y-1 relative">
                        <label className={labelClasses}>Project Name</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input type="text" value="torre america" readOnly className={readOnlyClasses} />
                        </div>
                    </div>

                    <div className="space-y-1 relative">
                        <label className={labelClasses}>Product Type</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input type="text" value="ESS" readOnly className={readOnlyClasses} />
                        </div>
                    </div>

                    <div className="space-y-1 relative">
                        <label className={labelClasses}>Team Leader</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input type="text" value="Cesar Arias" readOnly className={readOnlyClasses} />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Section 2: Contact & Service Info --- */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-md">
                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
                    <Users className="h-5 w-5 text-[#4a89dc]" />
                    <h3 className="text-lg font-bold text-slate-800">Service & Contacts</h3>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-1">
                        <label className={labelClasses}>Service Type</label>
                        <input type="text" defaultValue="Maintenance/Inspection" className={inputClasses} />
                    </div>

                    <div className="space-y-1">
                        <label className={labelClasses}>Contact Name</label>
                        <input type="text" placeholder="Enter site contact name" className={inputClasses} />
                    </div>

                    {/* Example of a Proper Error State */}
                    <div className="space-y-1">
                        <label className={labelClasses}>Phone No <span className="text-rose-500">*</span></label>
                        <div className="relative">
                            <input
                                type="tel"
                                defaultValue="555-abc"
                                className="w-full rounded-lg border border-rose-400 bg-rose-50 px-4 py-2.5 text-slate-900 transition-all duration-200 focus:border-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-500/10 shadow-sm pr-10"
                            />
                            <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-rose-500" />
                        </div>
                        <p className="text-xs font-medium text-rose-500 mt-1">Please enter a valid numeric phone number.</p>
                    </div>

                    <div className="space-y-1">
                        <label className={labelClasses}>E-mail</label>
                        <input type="email" placeholder="Enter contact email" className={inputClasses} />
                    </div>

                    <div className="space-y-1">
                        <label className={labelClasses}>Rest Service Engineers</label>
                        <input type="text" placeholder="Enter rest service engineers" className={inputClasses} />
                    </div>

                    <div className="space-y-1">
                        <label className={labelClasses}>Total FSE on site</label>
                        <input type="number" min="0" placeholder="0" className={inputClasses} />
                    </div>
                </div>
            </div>

            {/* --- Section 3: Time Tracking --- */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-md">
                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
                    <Clock className="h-5 w-5 text-[#4a89dc]" />
                    <h3 className="text-lg font-bold text-slate-800">Time & Attendance</h3>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-1">
                        <label className={labelClasses}>Start Time</label>
                        <input type="time" className={inputClasses} />
                    </div>

                    <div className="space-y-1">
                        <label className={labelClasses}>End Time</label>
                        <input type="time" className={inputClasses} />
                    </div>

                    <div className="space-y-1">
                        <label className={labelClasses}>Idle Time (Hours)</label>
                        <input type="number" min="0" placeholder="0" className={inputClasses} />
                    </div>

                    <div className="space-y-1">
                        <label className={labelClasses}>Reason for Idle Time</label>
                        <input type="text" placeholder="Brief reason for delay..." className={inputClasses} />
                    </div>
                </div>
            </div>

            {/* --- Section 4: Logistics --- */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-md">
                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
                    <MapPin className="h-5 w-5 text-[#4a89dc]" />
                    <h3 className="text-lg font-bold text-slate-800">Travel Information</h3>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-1">
                        <label className={labelClasses}>Hotel Address</label>
                        <input type="text" placeholder="Enter hotel address" className={inputClasses} />
                    </div>

                    <div className="space-y-1">
                        <label className={labelClasses}>Site Address</label>
                        <input type="text" placeholder="Enter site address" className={inputClasses} />
                    </div>
                </div>
            </div>

        </form>
    );
};

export default GeneralInformation;