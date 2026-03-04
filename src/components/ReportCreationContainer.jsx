import React, { useState } from 'react';
import { X, Check, AlertCircle, AlertTriangle } from 'lucide-react';
import GeneralInformation from './GeneralInformation';
import SafetyForm from './SafetyForm';
import WorkContent from './WorkContent';
import PicturesForm from './PicturesForm';
import EngineerSignatures from './EngineerSignatures';

const stepsData = [
    { id: 1, label: 'General Information', status: 'alert' },
    { id: 2, label: 'Safety', status: 'completed' },
    { id: 3, label: 'Work Content', status: 'completed' },
    { id: 4, label: 'Pictures', status: 'alert' },
    { id: 5, label: 'Engineer Signatures', status: 'pending' },
];

const ReportCreationContainer = ({ project, onCancel }) => {
    const projectName = project?.name || "Unknown Project";

    const [currentStep, setCurrentStep] = useState(1);
    const [showCancelModal, setShowCancelModal] = useState(false);

    // FIX: Progress bar now fills to 100% when on the final step!
    const progressPercentage = currentStep === stepsData.length
        ? 100
        : ((currentStep - 0.5) / stepsData.length) * 100;

    const handleNext = () => {
        if (currentStep < stepsData.length) setCurrentStep(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const renderCurrentForm = () => {
        switch (currentStep) {
            case 1: return <GeneralInformation />;
            case 2: return <SafetyForm />;
            case 3: return <WorkContent />;
            case 4: return <PicturesForm />;
            case 5: return <EngineerSignatures />;
            default: return <GeneralInformation />;
        }
    };

    return (
        // FIX: Changed from min-h-screen to h-screen with overflow-hidden
        <div className="h-screen w-full bg-slate-50 flex flex-col font-sans overflow-hidden">

            <style>{`
                @keyframes fade-slide-up {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-slide {
                    animation: fade-slide-up 0.4s ease-out forwards;
                }
            `}</style>

            {/* Cancel Confirmation Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-slide">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-slate-100">
                        <div className="flex items-center gap-3 mb-4 text-rose-600">
                            <div className="p-2 bg-rose-100 rounded-full">
                                <AlertTriangle className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Discard Changes?</h3>
                        </div>
                        <p className="text-slate-600 mb-8 text-sm leading-relaxed">
                            You have unsaved changes in this report. If you leave now, all your progress will be lost. Are you sure you want to cancel?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
                            >
                                Keep Editing
                            </button>
                            <button
                                onClick={onCancel}
                                className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 rounded-md hover:bg-rose-700 transition-colors shadow-sm"
                            >
                                Discard Report
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Dark Header (Removed sticky, it stays at top natively) */}
            <header className="bg-[#0f172a] px-6 py-4 flex items-center justify-between shrink-0 z-30">
                <div>
                    <h1 className="text-xl font-normal text-white">
                        Daily Report - <span className="font-semibold">{projectName}</span>
                    </h1>
                    <p className="text-sm text-slate-300 mt-1">
                        Step {currentStep} of {stepsData.length}: <span className="md:hidden font-medium text-white">{stepsData[currentStep - 1].label}</span>
                    </p>
                </div>
                <button
                    onClick={() => setShowCancelModal(true)}
                    aria-label="Cancel"
                    className="flex items-center justify-center gap-2 w-10 h-10 sm:w-auto sm:h-auto sm:px-4 sm:py-2 bg-rose-500/20 sm:bg-transparent text-rose-400 sm:text-slate-200 text-sm font-semibold rounded-lg border border-rose-500/30 sm:border-slate-600 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                >
                    <X className="h-5 w-5 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Cancel</span>
                </button>
            </header>

            {/* Stepper Navigation (Removed sticky, stays pinned naturally) */}
            <div className="bg-white pt-6 pb-6 border-b border-slate-200 shrink-0 shadow-sm z-20 relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-8">

                    <div className="flex items-center justify-between w-full">
                        {stepsData.map((step, index) => {
                            const isActive = step.id === currentStep;
                            const isCompleted = step.id < currentStep;
                            const isUpcoming = step.id > currentStep;

                            let circleClasses = "";
                            let labelClasses = "";
                            let IconComponent = <span className="text-sm font-semibold">{step.id}</span>;

                            if (isActive) {
                                circleClasses = "bg-[#4a89dc] text-white shadow-md ring-4 ring-offset-1 ring-[#4a89dc]/30 group-hover:scale-105";
                                labelClasses = "font-bold text-[#0f172a]";
                            } else if (isUpcoming) {
                                circleClasses = "bg-white border-2 border-slate-300 text-slate-500 group-hover:border-[#4a89dc] group-hover:text-[#4a89dc] group-hover:scale-110 shadow-sm";
                                labelClasses = "font-medium text-slate-500 group-hover:text-[#4a89dc]";
                            } else if (isCompleted) {
                                if (step.status === 'alert') {
                                    circleClasses = "bg-amber-100 text-amber-600 border-2 border-amber-500 group-hover:scale-110";
                                    labelClasses = "font-medium text-amber-700 group-hover:text-amber-800";
                                    IconComponent = <AlertCircle className="h-5 w-5" strokeWidth={2.5} />;
                                } else {
                                    circleClasses = "bg-[#48bb78] text-white border-2 border-[#48bb78] group-hover:scale-110";
                                    labelClasses = "font-medium text-[#0f172a] group-hover:text-[#48bb78]";
                                    IconComponent = <Check className="h-5 w-5" strokeWidth={3} />;
                                }
                            }

                            return (
                                <React.Fragment key={step.id}>
                                    <div
                                        className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
                                        onClick={() => setCurrentStep(step.id)}
                                    >
                                        <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${circleClasses}`}>
                                            {IconComponent}
                                        </div>
                                        <span className={`hidden md:block text-sm whitespace-nowrap transition-colors duration-300 ${labelClasses}`}>
                                            {step.label}
                                        </span>
                                    </div>

                                    {index < stepsData.length - 1 && (
                                        <div className="flex-1 h-[2px] bg-slate-200 mx-2 sm:mx-4 transition-colors group-hover:bg-slate-300"></div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>

                    <div className="mt-6 md:mt-8 h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner hidden sm:block">
                        <div
                            className="h-full bg-[#11183D] rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>

                </div>
            </div>

            {/* FIX: THIS IS THE ONLY PART THAT SCROLLS NOW */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-8">
                <div className="max-w-5xl mx-auto pb-8"> {/* Added safe space at the bottom */}
                    <div key={currentStep} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8 animate-fade-slide">
                        <h2 className="text-xl font-bold text-[#1e293b] mb-8 border-b border-slate-100 pb-4">
                            {stepsData[currentStep - 1].label}
                        </h2>
                        {renderCurrentForm()}
                    </div>
                </div>
            </main>

            {/* Footer (Removed sticky, it stays pinned naturally at bottom) */}
            <footer className="bg-white border-t border-slate-200 p-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 z-30 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
                <div className="text-sm text-slate-500 hidden lg:block">
                    Draft automatically saved 2 mins ago
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <button
                        onClick={handlePrev}
                        disabled={currentStep === 1}
                        className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>

                    <div className="flex gap-3">
                        <button
                            className="px-5 py-2.5 text-sm font-semibold text-[#4a89dc] bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors hidden sm:block active:scale-95"
                        >
                            Save Draft
                        </button>

                        <button
                            onClick={handleNext}
                            className={`flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white border border-transparent rounded-lg transition-all duration-300 shadow-md active:scale-95 ${currentStep === stepsData.length
                                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/30' // The "Finish Line" color
                                : 'bg-[#0f172a] hover:bg-slate-800' // The "Navigation" color
                                }`}
                        >
                            {currentStep === stepsData.length ? (
                                <>
                                    <Check className="h-4 w-4 stroke-[3]" />
                                    Submit Report
                                </>
                            ) : (
                                'Next Step'
                            )}
                        </button>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default ReportCreationContainer;