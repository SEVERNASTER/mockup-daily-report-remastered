import React from 'react';
import {
    Check, HardHat, Glasses, Wrench, Shirt, Shield,
    LifeBuoy, Footprints, HandMetal, Zap, Lock,
    ToolCase, Users, AlertTriangle, Flame, DoorClosed
} from 'lucide-react';

// Data arrays upgraded with specific icons for that premium look
const essentialItems = [
    { label: "Safety Helmet", icon: HardHat },
    { label: "Safety Glasses", icon: Glasses },
    { label: "Basic Hand Tool", icon: Wrench },
    { label: "PPE Cloth", icon: Shirt },
    { label: "Face Shield", icon: Shield },
    { label: "Hi-Vis Safety Vest", icon: LifeBuoy },
    { label: "Safety Shoes", icon: Footprints },
    { label: "Insulated Gloves", icon: HandMetal },
    { label: "Arc Flash Suit", icon: Zap },
];

const considerationItems = [
    { label: "Lockout Tagout Process", icon: Lock },
    { label: "Special Tools Needed", icon: ToolCase },
    { label: "Two Workers Troubleshoot", icon: Users },
];

const potentialHazardsItems = [
    { label: "Work Near Live Voltages", icon: Zap },
    { label: "Falling Objects", icon: HardHat },
    { label: "Flammable Goods Onsite", icon: Flame },
    { label: "Confined Space", icon: DoorClosed },
];

// The Merged UI Component: Beautiful, high-contrast, interactive cards
const CheckboxCard = ({ label, icon: Icon }) => (
    <label className="relative flex items-center justify-between p-3.5 sm:p-4 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-white hover:border-emerald-400 hover:shadow-md transition-all duration-300 group shadow-sm">

        {/* Hidden checkbox that drives the CSS state */}
        <input type="checkbox" className="peer absolute opacity-0 w-0 h-0" />

        {/* Selected State Background Overlay */}
        <div className="absolute inset-0 rounded-xl border-2 border-transparent peer-checked:border-emerald-500 peer-checked:bg-emerald-50/40 transition-all pointer-events-none"></div>

        {/* Left side: Icon + Text */}
        <div className="flex items-center gap-3 z-10">
            <div className="text-slate-400 group-hover:text-emerald-500 peer-checked:text-emerald-600 transition-colors duration-300">
                {Icon && <Icon className="w-5 h-5" />}
            </div>
            <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 peer-checked:text-emerald-800 transition-colors duration-300">
                {label}
            </span>
        </div>

        {/* Right side: Animated Checkmark Badge matching your screenshot */}
        <div className="z-10 w-6 h-6 rounded bg-emerald-500 text-white flex items-center justify-center opacity-0 scale-50 peer-checked:opacity-100 peer-checked:scale-100 transition-all duration-300 shadow-sm">
            <Check className="w-4 h-4 stroke-[3]" />
        </div>
    </label>
);

const SafetyForm = () => {
    return (
        <form className="space-y-10 animate-fade-slide">

            {/* --- Section 1: PPE --- */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md">
                <h3 className="text-xl font-bold text-[#1e293b] mb-6">Personal Protective Equipment (PPE)</h3>

                {/* Vertical accent bar from your screenshot */}
                <div className="mb-8">
                    <div className="inline-block mb-4 bg-blue-50 pl-3 pr-4 py-2 rounded-r-lg border-l-4 border-[#4a89dc]">
                        <h4 className="text-sm font-semibold text-blue-900 uppercase tracking-wider">Essential Items</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {essentialItems.map((item, index) => (
                            <CheckboxCard key={`essential-${index}`} label={item.label} icon={item.icon} />
                        ))}
                    </div>
                </div>

                {/* Other text input styled to match */}
                <div className="mt-8">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-1.5 h-5 bg-slate-300 rounded-full"></div>
                        <label className="text-sm font-bold text-[#1e293b]">Other PPE Required</label>
                    </div>
                    <input
                        type="text"
                        placeholder="Specify any other protective equipment..."
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#4a89dc] focus:ring-4 focus:ring-[#4a89dc]/10 focus:outline-none transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* --- Section 2: Things To Consider --- */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md">
                <h3 className="text-xl font-bold text-[#1e293b] mb-6">Job Requirements & Considerations</h3>

                <div className="inline-block mb-4 bg-indigo-50 pl-3 pr-4 py-2 rounded-r-lg border-l-4 border-indigo-500">
                    <h4 className="text-sm font-semibold text-indigo-900 uppercase tracking-wider">Procedures</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {considerationItems.map((item, index) => (
                        <CheckboxCard key={`consider-${index}`} label={item.label} icon={item.icon} />
                    ))}
                </div>
            </div>

            {/* --- Section 3: Potential Hazards --- */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md">
                <h3 className="text-xl font-bold text-[#1e293b] mb-6">Site Risk Assessment</h3>

                <div className="inline-block mb-4 bg-rose-50 pl-3 pr-4 py-2 rounded-r-lg border-l-4 border-rose-500">
                    <h4 className="text-sm font-semibold text-rose-900 uppercase tracking-wider">Potential Hazards</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {potentialHazardsItems.map((item, index) => (
                        <CheckboxCard key={`hazard-${index}`} label={item.label} icon={item.icon} />
                    ))}
                </div>
            </div>

        </form>
    );
};

export default SafetyForm;