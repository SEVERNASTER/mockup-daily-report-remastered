import React, { useState, useRef, useEffect } from 'react';
import { FileSignature, ChevronDown, Check, Search, UserCircle } from 'lucide-react';

const EngineerSignatures = () => {
    const [selectedEngineer, setSelectedEngineer] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const dropdownRef = useRef(null);

    // Mock data for the searchable dropdown
    const employeesList = [
        "Cesar Arias",
        "Orlando Lopez",
        "Sarah Jenkins",
        "Michael Chen",
        "David Rodriguez",
        "Elena Vance"
    ];

    // Filter employees based on search input
    const filteredEmployees = employeesList.filter(emp =>
        emp.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (engineer) => {
        setSelectedEngineer(engineer);
        setIsOpen(false);
        setSearchQuery(''); // Reset search after selection
    };

    return (
        <div className="space-y-6 text-sm sm:text-base text-slate-700 animate-fade-slide">

            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md">

                {/* --- Header Section --- */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-slate-100 pb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-[#4a89dc] rounded-lg">
                            <FileSignature className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">Engineer Signature</h3>
                            <p className="text-slate-500 text-sm mt-0.5">Final authorization and sign-off for this daily report.</p>
                        </div>
                    </div>
                </div>

                {/* --- Signature Zone --- */}
                <div className="max-w-2xl bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
                    <div className="space-y-3">

                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-1">
                            <span>Assigned Service Engineer</span>
                            <span className="text-rose-500">*</span>
                        </label>

                        {/* --- CUSTOM SEARCHABLE DROPDOWN --- */}
                        <div className="relative" ref={dropdownRef}>

                            {/* Dropdown Trigger Button */}
                            <button
                                type="button"
                                onClick={() => setIsOpen(!isOpen)}
                                className={`w-full flex items-center justify-between rounded-xl border bg-white px-4 py-3.5 text-left transition-all shadow-sm
                                    ${isOpen ? 'border-[#4a89dc] ring-4 ring-[#4a89dc]/10' : 'border-slate-300 hover:border-blue-400'}
                                `}
                            >
                                <div className="flex items-center gap-2">
                                    <UserCircle className={`h-5 w-5 ${selectedEngineer ? 'text-[#4a89dc]' : 'text-slate-400'}`} />
                                    <span className={selectedEngineer ? 'text-slate-900 font-medium' : 'text-slate-400'}>
                                        {selectedEngineer || 'Search and select an engineer...'}
                                    </span>
                                </div>
                                <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu (Absolute Positioned) */}
                            {isOpen && (
                                <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">

                                    {/* Search Input Area */}
                                    <div className="p-2 border-b border-slate-100 bg-slate-50/50">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <input
                                                type="text"
                                                autoFocus
                                                placeholder="Type to search..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#4a89dc] focus:ring-1 focus:ring-[#4a89dc] transition-shadow"
                                            />
                                        </div>
                                    </div>

                                    {/* Options List */}
                                    <ul className="max-h-60 overflow-y-auto py-1 custom-scrollbar">
                                        {filteredEmployees.length > 0 ? (
                                            filteredEmployees.map((emp, index) => (
                                                <li key={index}>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSelect(emp)}
                                                        className="w-full flex items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-blue-50 hover:text-[#4a89dc] transition-colors group"
                                                    >
                                                        <span className="font-medium text-slate-700 group-hover:text-[#4a89dc]">
                                                            {emp}
                                                        </span>
                                                        {selectedEngineer === emp && (
                                                            <Check className="h-4 w-4 text-[#4a89dc]" strokeWidth={3} />
                                                        )}
                                                    </button>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="px-4 py-4 text-center text-sm text-slate-500">
                                                No engineers found matching "{searchQuery}"
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Helper Text */}
                        <div className="flex mt-4 pt-2">
                            <div className="w-1 h-auto bg-slate-300 rounded-full mr-2.5"></div>
                            <p className="text-xs font-medium text-slate-500 italic leading-relaxed">
                                Please select the certified engineer who performed the work on-site to digitally sign and authorize this report.
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default EngineerSignatures;