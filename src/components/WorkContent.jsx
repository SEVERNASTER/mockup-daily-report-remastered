import React, { useState } from 'react';
import {
    Plus, X, Camera, ImagePlus, Trash2,
    ClipboardList, AlertCircle, CalendarClock, Settings2
} from 'lucide-react';

const WorkContent = () => {
    // --- State ---
    const [workEntries, setWorkEntries] = useState([
        { id: 1, time: '08:00', details: '', location: '', isInvalid: false }
    ]);
    const [failureDescription, setFailureDescription] = useState('');
    const [nextDayPlans, setNextDayPlans] = useState([
        { id: 1, description: '', isInvalid: false }
    ]);
    const [replacedParts, setReplacedParts] = useState([]);
    const [activePartIndex, setActivePartIndex] = useState(0);

    // --- Handlers ---
    const addWorkEntry = () => setWorkEntries([...workEntries, { id: Date.now(), time: '', details: '', location: '', isInvalid: false }]);
    const removeWorkEntry = (indexToRemove) => setWorkEntries(workEntries.filter((_, index) => index !== indexToRemove));
    const updateWorkEntry = (index, field, value) => {
        const updated = [...workEntries];
        updated[index][field] = value;
        setWorkEntries(updated);
    };

    const addPlanItem = () => setNextDayPlans([...nextDayPlans, { id: Date.now(), description: '', isInvalid: false }]);
    const removePlanItem = (indexToRemove) => setNextDayPlans(nextDayPlans.filter((_, index) => index !== indexToRemove));
    const updatePlanItem = (index, value) => {
        const updated = [...nextDayPlans];
        updated[index].description = value;
        setNextDayPlans(updated);
    };

    const addPart = () => {
        setReplacedParts([...replacedParts, { id: Date.now(), defectiveSN: '', equipmentSN: '', description: '', replacementSN: '', photos: [] }]);
        setActivePartIndex(replacedParts.length);
    };
    const removePart = (e, indexToRemove) => {
        e.stopPropagation();
        const updatedParts = replacedParts.filter((_, index) => index !== indexToRemove);
        setReplacedParts(updatedParts);
        if (activePartIndex >= updatedParts.length) setActivePartIndex(Math.max(0, updatedParts.length - 1));
    };
    const updateActivePart = (field, value) => {
        const updated = [...replacedParts];
        updated[activePartIndex][field] = value;
        setReplacedParts(updated);
    };

    const activePart = replacedParts[activePartIndex];

    // Reusable premium input class
    const inputClass = "w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#4a89dc] focus:ring-4 focus:ring-[#4a89dc]/10 focus:outline-none transition-all shadow-md";

    return (
        <div className="space-y-8 animate-fade-slide">

            {/* --- Section 1: Work Comments --- */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-[#4a89dc] rounded-lg">
                            <ClipboardList className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">Work Comments</h3>
                            <p className="text-slate-500 text-sm mt-0.5">Document the tasks performed on-site.</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={addWorkEntry}
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-[#4a89dc] bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors active:scale-95"
                    >
                        <Plus className="h-4 w-4" strokeWidth={3} />
                        Add Entry
                    </button>
                </div>

                {/* SCROLLABLE CONTAINER FOR WORK ENTRIES */}
                <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 pb-2 custom-scrollbar">
                    {workEntries.map((entry, index) => (
                        <div key={entry.id} className={`group relative grid grid-cols-1 gap-4 rounded-2xl bg-slate-50 border p-5 md:grid-cols-12 transition-all duration-300 hover:shadow-md hover:bg-white hover:border-blue-200 ${entry.isInvalid ? 'border-rose-300 bg-rose-50/50' : 'border-slate-200'}`}>

                            {/* Absolute Entry Number Badge */}
                            <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-400 shadow-sm group-hover:text-[#4a89dc] group-hover:border-blue-200 transition-colors">
                                {index + 1}
                            </div>

                            <div className="space-y-1.5 md:col-span-2 mt-2 md:mt-0">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Time</label>
                                <input
                                    type="time"
                                    value={entry.time}
                                    onChange={(e) => updateWorkEntry(index, 'time', e.target.value)}
                                    className={inputClass}
                                />
                            </div>

                            <div className="space-y-1.5 md:col-span-5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Work Details <span className="text-rose-500">*</span></label>
                                <input
                                    type="text"
                                    value={entry.details}
                                    onChange={(e) => updateWorkEntry(index, 'details', e.target.value)}
                                    placeholder="e.g., Replaced main breaker..."
                                    className={`${inputClass} ${entry.isInvalid ? '!border-rose-400 focus:!border-rose-500 focus:!ring-rose-500/10' : ''}`}
                                />
                            </div>

                            <div className="space-y-1.5 md:col-span-4">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Location</label>
                                <input
                                    type="text"
                                    value={entry.location}
                                    onChange={(e) => updateWorkEntry(index, 'location', e.target.value)}
                                    placeholder="e.g., Server Room B"
                                    className={inputClass}
                                />
                            </div>

                            {workEntries.length > 1 && (
                                <div className="flex items-end justify-end md:col-span-1 pb-1 md:pb-2">
                                    <button
                                        type="button"
                                        onClick={() => removeWorkEntry(index)}
                                        className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                        title="Delete Entry"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Section 2 & 3: Failure Desc & Next Day Plan --- */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">

                {/* Failure Description */}
                <div className="mb-10">
                    {/* UPGRADED SUBTITLE: Left border, semi-bold text, smooth pill shape */}
                    <div className="inline-block mb-4 bg-amber-50 pl-3 pr-4 py-2 rounded-r-lg border-l-4 border-amber-500">
                        <h4 className="text-sm font-semibold text-amber-900 uppercase tracking-wider">Failure Description</h4>
                    </div>
                    <textarea
                        value={failureDescription}
                        onChange={(e) => setFailureDescription(e.target.value)}
                        rows="2"
                        placeholder="Detail any system failures or ongoing issues (Optional)"
                        className={inputClass}
                    />
                </div>

                <div className="border-t border-slate-100 pt-8"></div>

                {/* Next Day Plan */}
                <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        {/* UPGRADED SUBTITLE: Left border, semi-bold text, smooth pill shape */}
                        <div className="inline-block bg-indigo-50 pl-3 pr-4 py-2 rounded-r-lg border-l-4 border-indigo-500">
                            <h4 className="text-sm font-semibold text-indigo-900 uppercase tracking-wider">Next Day Plan</h4>
                        </div>
                        <button
                            type="button"
                            onClick={addPlanItem}
                            className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg hover:bg-indigo-100 transition-colors"
                        >
                            <Plus className="h-4 w-4" strokeWidth={3} /> Add Task
                        </button>
                    </div>

                    {/* SCROLLABLE CONTAINER FOR NEXT DAY PLANS */}
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 pb-2 custom-scrollbar">
                        {nextDayPlans.map((plan, index) => (
                            <div key={plan.id} className="flex flex-col sm:flex-row sm:items-center gap-3 relative group">
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center font-bold text-slate-500 shadow-sm group-hover:border-indigo-300 group-hover:text-indigo-600 transition-colors">
                                    {index + 1}
                                </div>
                                <input
                                    type="text"
                                    value={plan.description}
                                    onChange={(e) => updatePlanItem(index, e.target.value)}
                                    placeholder="Enter planned task..."
                                    className={`${inputClass} !py-2.5 flex-1`}
                                />
                                {nextDayPlans.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removePlanItem(index)}
                                        className="flex-shrink-0 p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                                    >
                                        <X className="h-5 w-5" strokeWidth={2.5} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- Section 4: Replaced Parts --- */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 text-emerald-500 rounded-lg">
                            <Settings2 className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">Replaced Parts</h3>
                            <p className="text-slate-500 text-sm mt-0.5">Log defective and replacement hardware.</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={addPart}
                        className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-all shadow-sm active:scale-95"
                    >
                        <Plus className="h-4 w-4" strokeWidth={3} />
                        Add Part
                    </button>
                </div>

                {replacedParts.length > 0 ? (
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6">

                        {/* Premium Tab Navigation */}
                        <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar mb-2">
                            {replacedParts.map((part, index) => {
                                const isActive = index === activePartIndex;
                                return (
                                    <button
                                        key={part.id}
                                        onClick={() => setActivePartIndex(index)}
                                        className={`group relative flex items-center justify-between gap-3 px-5 py-3 rounded-xl font-bold transition-all min-w-[140px] border-2
                                            ${isActive
                                                ? 'bg-white border-[#4a89dc] text-[#4a89dc] shadow-md shadow-blue-500/10'
                                                : 'bg-white border-transparent text-slate-500 hover:border-slate-300 shadow-sm'}`}
                                    >
                                        <span>Part {index + 1}</span>
                                        <div
                                            onClick={(e) => removePart(e, index)}
                                            className={`p-1 rounded-md transition-colors ${isActive ? 'text-blue-300 hover:bg-rose-50 hover:text-rose-500' : 'text-slate-300 hover:bg-rose-50 hover:text-rose-500'}`}
                                        >
                                            <X className="h-4 w-4" strokeWidth={3} />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Active Part Form Area */}
                        {activePart && (
                            <div className="grid grid-cols-1 gap-5 bg-white rounded-xl border border-slate-200 p-6 animate-fade-slide shadow-sm">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Defective Part S/N</label>
                                    <input
                                        type="text"
                                        value={activePart.defectiveSN}
                                        onChange={(e) => updateActivePart('defectiveSN', e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Equipment S/N</label>
                                    <input
                                        type="text"
                                        value={activePart.equipmentSN}
                                        onChange={(e) => updateActivePart('equipmentSN', e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Description</label>
                                    <input
                                        type="text"
                                        value={activePart.description}
                                        onChange={(e) => updateActivePart('description', e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Replacement Part S/N</label>
                                    <input
                                        type="text"
                                        value={activePart.replacementSN}
                                        onChange={(e) => updateActivePart('replacementSN', e.target.value)}
                                        className={inputClass}
                                    />
                                </div>

                                {/* Photos Section (Refined) */}
                                <div className="md:col-span-2 mt-4">

                                    {/* UPGRADED SUBTITLE: Left border, semi-bold text, smooth pill shape */}
                                    <div className="inline-block mb-4 bg-slate-100 pl-3 pr-4 py-2 rounded-r-lg border-l-4 border-slate-400">
                                        <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Part Photos ({activePart.photos.length}/3)</h4>
                                    </div>

                                    <div className="flex flex-wrap gap-4 mt-2">
                                        {activePart.photos.map((photoUrl, photoIndex) => (
                                            <div key={photoIndex} className="relative h-28 w-28 group">
                                                <div className="absolute inset-0 rounded-xl border-2 border-slate-200 bg-slate-100 overflow-hidden shadow-sm">
                                                    <img src={photoUrl} alt="Part" className="h-full w-full object-cover" />
                                                </div>
                                                <button
                                                    type="button"
                                                    className="absolute -top-2 -right-2 p-1.5 bg-white border border-slate-200 text-rose-500 rounded-full hover:bg-rose-500 hover:text-white transition-all shadow-md opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
                                                >
                                                    <X className="h-4 w-4" strokeWidth={3} />
                                                </button>
                                            </div>
                                        ))}

                                        {activePart.photos.length < 3 && (
                                            <label className="h-28 w-28 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 cursor-pointer hover:bg-blue-50 hover:border-[#4a89dc] hover:text-[#4a89dc] text-slate-400 transition-all group">
                                                <div className="p-2 bg-white rounded-full shadow-sm mb-1 group-hover:shadow-md transition-shadow text-inherit">
                                                    <Camera className="h-5 w-5" />
                                                </div>
                                                <span className="text-xs font-bold">Add Photo</span>
                                                <input type="file" multiple accept="image/*" className="hidden" />
                                            </label>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 flex flex-col items-center justify-center">
                        <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                            <Settings2 className="h-8 w-8 text-slate-300" />
                        </div>
                        <p className="text-slate-900 font-bold mb-1">No parts replaced</p>
                        <p className="text-sm text-slate-500 max-w-sm mx-auto">Click "Add Part" above to log hardware replacements for this job.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkContent;