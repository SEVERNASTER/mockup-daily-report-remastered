import React from 'react';
import {
    FileBarChart,
    Folder,
    LogOut,
    Clock,
    BarChart2,
    FileText,
    Plus,
    SquarePen,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Search,
    Filter,
    Menu,
    Download
} from 'lucide-react';

// Hardcoded mock data to match the screenshot
const mockReports = [
    { id: 1, date: "26 Feb, 2026", type: "Maintenance/Inspection", status: "draft" },
    { id: 2, date: "25 Feb, 2026", type: "Maintenance/Inspection", status: "draft" },
    { id: 3, date: "20 Feb, 2026", type: "Maintenance/Inspection", status: "draft" },
    { id: 4, date: "18 Feb, 2026", type: "Maintenance/Inspection", status: "draft" },
];

const ProjectDetails = ({ project, onBack, onCreateReport }) => {
    const projectName = project?.name || "torre america";
    const creationDate = project?.date || "13-Feb-2026";

    return (
        <div className="h-screen flex flex-col md:flex-row font-sans bg-slate-50/50 overflow-hidden">

            {/* Mobile Header (Only shows on small screens to replace sidebar) */}
            <div className="md:hidden flex items-center justify-between bg-[#0f172a] text-white p-4 shrink-0">
                <div className="flex items-center gap-2">
                    <FileBarChart className="h-6 w-6 text-blue-400" />
                    <span className="font-bold text-lg">BEST Reports</span>
                </div>
                <button className="p-2 text-slate-300 hover:text-white">
                    <Menu className="h-6 w-6" />
                </button>
            </div>

            {/* Sidebar - Dark Blue (Hidden on Mobile, visible on Medium screens and up) */}
            <aside className="hidden md:flex w-64 bg-[#0f172a] text-slate-200 flex-col justify-between p-5 shrink-0 border-r border-slate-800">
                <div>
                    <div className="flex items-center gap-3 mb-10 mt-2 px-2">
                        <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                            <FileBarChart className="h-8 w-8 text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white leading-tight">BEST Reports</h1>
                            <p className="text-xs font-medium text-slate-400">Management System</p>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        <a href="#" className="flex items-center gap-3 bg-white/10 text-white px-3 py-2.5 rounded-lg font-medium text-sm border border-white/5 shadow-sm">
                            <Folder className="h-5 w-5 text-blue-400" />
                            All Projects
                        </a>
                        <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-white hover:bg-white/5 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors">
                            <BarChart2 className="h-5 w-5" />
                            Analytics
                        </a>
                    </nav>
                </div>

                <div className="pt-6 border-t border-slate-800/60 mt-auto px-2">
                    <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-rose-400 text-sm font-medium transition-colors group">
                        <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                        Logout
                    </a>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-hidden">

                {/* --- Unified Top Header --- */}
                <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 md:py-5 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm z-10">
                    <div className="flex items-center gap-3 md:gap-5">
                        <button
                            onClick={onBack}
                            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                            title="Back to Projects"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        <div className="h-8 w-px bg-slate-200 hidden md:block"></div>

                        <div>
                            <h2 className="text-lg md:text-xl font-extrabold text-slate-900 tracking-tight leading-tight">{projectName}</h2>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5 font-medium">
                                <Clock className="h-3.5 w-3.5" />
                                <span>Created: {creationDate}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-auto">
                        <button className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm font-bold text-slate-600 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm">
                            <BarChart2 className="h-4 w-4 hidden sm:block" />
                            History
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 hover:border-emerald-300 transition-all shadow-sm active:scale-95">
                            <Download className="h-4 w-4 hidden sm:block" />
                            Weekly Report
                        </button>
                    </div>
                </header>

                {/* --- Scrollable Content Body --- */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-slate-50/50">

                    {/* --- Action Bar (Filters & Create) --- */}
                    <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-end justify-between">

                        {/* Search & Filters */}
                        <div className="flex flex-col sm:flex-row w-full xl:w-auto gap-3 items-end">
                            <div className="w-full sm:w-40 md:w-48">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Year</label>
                                <select className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-4 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#4a89dc] focus:ring-2 focus:ring-[#4a89dc]/20 shadow-sm cursor-pointer appearance-none">
                                    <option>All Years</option>
                                    <option>2026</option>
                                    <option>2025</option>
                                </select>
                            </div>
                            <div className="w-full sm:w-40 md:w-48">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Month</label>
                                <select className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-4 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#4a89dc] focus:ring-2 focus:ring-[#4a89dc]/20 shadow-sm cursor-pointer appearance-none">
                                    <option>All Months</option>
                                    <option>February</option>
                                    <option>January</option>
                                </select>
                            </div>
                            <button className="hidden sm:flex items-center justify-center p-2.5 text-slate-400 hover:text-[#4a89dc] hover:bg-blue-50 rounded-xl border border-transparent transition-colors">
                                <Filter className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Create Report Action (Responsive native date input) */}
                        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-2 w-full xl:w-auto">
                            <div className="w-full sm:w-auto">
                                <input
                                    type="date" // NATIVE DATE INPUT
                                    defaultValue="2026-03-03" // Format must be YYYY-MM-DD for native dates
                                    className="w-full sm:w-48 bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#4a89dc] focus:ring-2 focus:ring-[#4a89dc]/20 focus:bg-white transition-colors cursor-pointer"
                                />
                            </div>
                            <button
                                onClick={onCreateReport}
                                className="flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-2.5 text-sm font-bold text-white bg-[#4a89dc] rounded-xl hover:bg-blue-600 transition-all shadow-md shadow-blue-500/30 active:scale-95 whitespace-nowrap"
                            >
                                <Plus className="h-4 w-4 stroke-[3]" />
                                New Daily Report
                            </button>
                        </div>
                    </div>

                    {/* --- Data Table Card --- */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">

                        {/* Table Header Controls */}
                        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 bg-indigo-50 text-indigo-500 rounded-lg">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">Project Reports</h3>
                            </div>
                            <div className="relative w-full sm:w-auto">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search reports..."
                                    className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#4a89dc] focus:ring-2 focus:ring-[#4a89dc]/20 w-full sm:w-64 bg-slate-50 hover:bg-white transition-colors"
                                />
                            </div>
                        </div>

                        {/* Table Container */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left whitespace-nowrap">
                                {/* UPGRADED CONTRAST HEADER */}
                                <thead className="bg-[#1e293b] text-slate-200 border-b border-slate-800">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Date</th>
                                        <th scope="col" className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Service Type</th>
                                        <th scope="col" className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-center">Status</th>
                                        <th scope="col" className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {mockReports.map((report) => (
                                        <tr key={report.id} className="text-slate-600 hover:bg-slate-50/80 transition-colors group">
                                            <td className="px-6 py-4 font-semibold text-slate-900">
                                                {report.date}
                                            </td>
                                            <td className="px-6 py-4 font-medium">
                                                {report.type}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/60 uppercase tracking-wide">
                                                    {report.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {/* On mobile, actions are always visible. On desktop, they show on hover */}
                                                <div className="flex items-center justify-end gap-2 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 text-slate-400 hover:text-[#4a89dc] hover:bg-blue-50 rounded-lg transition-colors" aria-label="Edit">
                                                        <SquarePen className="h-4 w-4" />
                                                    </button>
                                                    <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" aria-label="Delete">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Footer */}
                        <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 border-t border-slate-100 bg-slate-50/50 gap-4">
                            <div className="text-sm font-medium text-slate-500 text-center sm:text-left">
                                Showing <span className="text-slate-900 font-bold">4</span> total reports
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-slate-400 bg-white border border-slate-200 rounded-lg cursor-not-allowed opacity-50">
                                    <ChevronLeft className="h-4 w-4" />
                                    Prev
                                </button>
                                <div className="px-3 py-1.5 text-sm font-bold text-slate-900 bg-white border border-slate-200 rounded-lg shadow-sm">
                                    1
                                </div>
                                <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-slate-400 bg-white border border-slate-200 rounded-lg cursor-not-allowed opacity-50">
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProjectDetails;