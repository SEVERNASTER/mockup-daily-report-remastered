import React from 'react';
import {
    LayoutGrid,
    FileBarChart,
    Folder,
    LogOut,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Filter,
    Menu,
    Search
} from 'lucide-react';

// Mock data exactly from the screenshot
const mockTableData = [
    { wo: "FSB00000050", name: "torre america", customer: "COCHA", type: "Maintenance/Inspection", engineer: "Cesar Arias", date: "13-Feb-2026" },
    { wo: "FSB00000051", name: "ssss", customer: "COCHA", type: "Rework", engineer: "Orlando Lopez", date: "09-Feb-2026" },
    { wo: "FSB00000048", name: "ssss", customer: "COCHA", type: "Batch Repairs", engineer: "Orlando Lopez", date: "09-Feb-2026" },
    { wo: "FSB00000049", name: "ssss", customer: "COCHA", type: "Rework", engineer: "Cesar Arias", date: "09-Feb-2026", highlighted: true },
    { wo: "FSB00000052", name: "ssss", customer: "COCHA", type: "Rework", engineer: "Orlando Lopez", date: "09-Feb-2026" },
    { wo: "FSB00000047", name: "ssss", customer: "COCHA", type: "Commissioning", engineer: "Orlando Lopez", date: "05-Feb-2026" },
    { wo: "FSB00000045", name: "or", customer: "COCHA", type: "Batch Repairs", engineer: "Orlando Lopez", date: "16-Jan-2026" },
    { wo: "FSB00000046", name: "or", customer: "COCHA", type: "Batch Repairs", engineer: "Orlando Lopez", date: "16-Jan-2026" },
    { wo: "FSB00000043", name: "or", customer: "COCHA", type: "Commissioning", engineer: "Orlando Lopez", date: "13-Jan-2026" },
    { wo: "FSB00000044", name: "or", customer: "COCHA", type: "Commissioning", engineer: "Orlando Lopez", date: "13-Jan-2026" },
];

// Reusable Filter Components
const FilterDropdown = ({ placeholder }) => (
    <div className="relative">
        <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-4 pr-10 text-sm font-medium text-slate-700 appearance-none focus:outline-none focus:bg-white focus:border-[#4a89dc] focus:ring-2 focus:ring-[#4a89dc]/20 transition-all cursor-pointer">
            <option value="">{placeholder}</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
    </div>
);

const DateInput = ({ label }) => (
    <div className="flex-1 min-w-0">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1 block">{label}</label>
        <input
            type="date"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm font-medium text-slate-700 focus:outline-none focus:bg-white focus:border-[#4a89dc] focus:ring-2 focus:ring-[#4a89dc]/20 transition-all cursor-pointer"
        />
    </div>
);

const AllProjectsDashboard = ({ onProjectSelect }) => {
    return (
        <div className="h-screen flex flex-col md:flex-row font-sans bg-slate-50/50 overflow-hidden">

            {/* --- Mobile Header --- */}
            <div className="md:hidden flex items-center justify-between bg-[#0f172a] text-white p-4 shrink-0">
                <div className="flex items-center gap-2">
                    <FileBarChart className="h-6 w-6 text-blue-400" />
                    <span className="font-bold text-lg">BEST Reports</span>
                </div>
                <button className="p-2 text-slate-300 hover:text-white">
                    <Menu className="h-6 w-6" />
                </button>
            </div>

            {/* --- Sidebar (Analytics removed, simplified for single-purpose) --- */}
            <aside className="hidden md:flex w-64 bg-[#0f172a] text-slate-200 flex-col justify-between p-5 shrink-0 border-r border-slate-800 z-20">
                <div>
                    {/* Logo Area */}
                    <div className="flex items-center gap-3 mb-10 mt-2 px-2">
                        <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                            <FileBarChart className="h-8 w-8 text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white leading-tight">BEST Reports</h1>
                            <p className="text-xs font-medium text-slate-400">Management System</p>
                        </div>
                    </div>

                    {/* Navigation - Now focused solely on the main action */}
                    <nav className="space-y-1">
                        <a href="#" className="flex items-center gap-3 bg-white/10 text-white px-3 py-2.5 rounded-lg font-medium text-sm border border-white/5 shadow-sm">
                            <Folder className="h-5 w-5 text-blue-400" />
                            All Projects
                        </a>
                    </nav>
                </div>

                {/* Logout */}
                <div className="pt-6 border-t border-slate-800/60 mt-auto px-2">
                    <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-rose-400 text-sm font-medium transition-colors group">
                        <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                        Logout
                    </a>
                </div>
            </aside>

            {/* --- Main Content Area --- */}
            <main className="flex-1 flex flex-col overflow-hidden">

                {/* Header */}
                {/* <header className="bg-white border-b border-slate-200 px-6 md:px-8 py-5 shrink-0 flex items-center justify-between shadow-sm z-10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-[#4a89dc] rounded-lg md:hidden">
                            <Folder className="h-5 w-5" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">Project Database</h2>
                    </div>

                    <div className="relative hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Global search..."
                            className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#4a89dc] focus:ring-2 focus:ring-[#4a89dc]/20 w-64 bg-slate-50 hover:bg-white transition-colors"
                        />
                    </div>
                </header> */}

                {/* Scrollable Content Body */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-slate-50/50">

                    {/* --- Filter Control Panel --- */}
                    <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Filter className="h-4 w-4 text-slate-400" />
                            <h3 className="text-sm font-bold text-slate-700">Filter Projects</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            <FilterDropdown placeholder="All Customers" />
                            <FilterDropdown placeholder="All Projects" />
                            <FilterDropdown placeholder="All Service Engineers" />
                        </div>

                        <div className="flex flex-col sm:flex-row items-end justify-between gap-4 pt-4 border-t border-slate-100">
                            <div className="flex w-full sm:w-auto gap-4">
                                <DateInput label="From Date" />
                                <DateInput label="To Date" />
                            </div>
                            <button className="w-full sm:w-auto px-5 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm">
                                Clear Filters
                            </button>
                        </div>
                    </section>

                    {/* --- Data Table Card --- */}
                    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left whitespace-nowrap">
                                {/* High Contrast Header */}
                                <thead className="bg-[#1e293b] text-slate-200 border-b border-slate-800">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">WO</th>
                                        <th scope="col" className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Project Name</th>
                                        <th scope="col" className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Customer</th>
                                        <th scope="col" className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Service Type</th>
                                        <th scope="col" className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Service Engineer</th>
                                        <th scope="col" className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-right">Creation Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {mockTableData.map((row, index) => (
                                        <tr
                                            key={index}
                                            onClick={() => onProjectSelect(row)}
                                            className={`group cursor-pointer transition-all duration-200 border-l-4 
                                                bg-white border-l-transparent hover:bg-blue-50 hover:border-l-[#4a89dc]`}
                                        >
                                            <td className="px-6 py-4 font-mono font-medium text-slate-900">
                                                {row.wo}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-[#4a89dc] group-hover:text-blue-700 transition-colors">
                                                {row.name}
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">{row.customer}</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 group-hover:bg-white transition-colors">
                                                    {row.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">{row.engineer}</td>
                                            <td className="px-6 py-4 text-slate-500 text-right flex justify-end items-center gap-3">
                                                <span>{row.date}</span>
                                                {/* Navigation Arrow on Hover */}
                                                <ChevronRight className="h-4 w-4 text-[#4a89dc] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Footer */}
                        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
                            <div className="text-sm font-medium text-slate-500">
                                Showing page <span className="text-slate-900 font-bold">1</span> of <span className="text-slate-900 font-bold">6</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-slate-400 bg-white border border-slate-200 rounded-lg cursor-not-allowed opacity-50">
                                    <ChevronLeft className="h-4 w-4" />
                                    Prev
                                </button>
                                <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-[#4a89dc] transition-colors shadow-sm">
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                    </section>

                </div>
            </main>
        </div>
    );
};

export default AllProjectsDashboard;