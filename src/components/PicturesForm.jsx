import React, { useState } from 'react';
import { Camera, Trash2, ImagePlus, Images } from 'lucide-react';

const PicturesForm = () => {
    // Pre-loaded with placeholder images
    const [photos, setPhotos] = useState([
        {
            id: 1,
            name: 'Captura de pantalla 2025-09-01_104522.png',
            url: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80&w=200&h=200'
        },
        {
            id: 2,
            name: 'Captura de pantalla 2025-09-01_112005.png',
            url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=200&h=200'
        }
    ]);

    const maxPhotos = 10;
    const canUploadMore = photos.length < maxPhotos;

    const handleFileSelection = (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        const availableSlots = maxPhotos - photos.length;
        const filesToAdd = files.slice(0, availableSlots);

        const newPhotos = filesToAdd.map((file, index) => ({
            id: Date.now() + index,
            name: file.name,
            url: URL.createObjectURL(file)
        }));

        setPhotos(prev => [...prev, ...newPhotos]);
        e.target.value = null;
    };

    const handleTakePhoto = () => {
        if (!canUploadMore) return;
        alert("This would trigger the device camera in a production environment.");
    };

    const removePhoto = (idToRemove) => {
        setPhotos(photos.filter(photo => photo.id !== idToRemove));
    };

    return (
        <div className="space-y-8 animate-fade-slide text-slate-700">

            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">

                {/* --- Header & Actions Row --- */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 border-b border-slate-100 pb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-50 text-[#3b82f6] rounded-lg">
                                <Images className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Data & Pictures</h3>
                        </div>
                        <p className="text-sm font-medium text-slate-500 ml-11">
                            Uploaded Photos ({photos.length}/{maxPhotos})
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Camera Button */}
                        <button
                            type="button"
                            onClick={handleTakePhoto}
                            disabled={!canUploadMore}
                            className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 shadow-sm active:scale-95
                                ${canUploadMore
                                    ? 'bg-[#3b82f6] text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20'
                                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                            title="Take Photo"
                        >
                            <Camera className="h-5 w-5" strokeWidth={2.5} />
                        </button>

                        {/* Select Files Button */}
                        <div className="relative group">
                            <div className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 shadow-sm
                                ${canUploadMore
                                    ? 'bg-[#3b82f6] text-white cursor-pointer group-hover:bg-blue-600 group-hover:shadow-lg group-hover:shadow-blue-500/20 group-active:scale-95'
                                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                            >
                                Select Files
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                disabled={!canUploadMore}
                                onChange={handleFileSelection}
                                className={`absolute inset-0 z-10 h-full w-full opacity-0 ${canUploadMore ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                                title={canUploadMore ? "Choose images" : "Maximum photos reached"}
                            />
                        </div>
                    </div>
                </div>

                {/* --- Image Grid --- */}
                {photos.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {photos.map((photo) => (
                            <div key={photo.id} className="relative group animate-fade-slide">

                                {/* Image Card Container */}
                                <div className="p-2 bg-white border border-slate-200 rounded-2xl shadow-sm group-hover:shadow-md group-hover:border-blue-200 transition-all duration-300">

                                    {/* Image Wrapper */}
                                    <div className="relative w-full aspect-square mb-3 rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                                        <img
                                            src={photo.url}
                                            alt={photo.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Filename (Truncated) */}
                                    <p
                                        className="text-xs font-medium text-slate-500 truncate px-1 pb-1"
                                        title={photo.name}
                                    >
                                        {photo.name}
                                    </p>
                                </div>

                                {/* Floating Delete Button */}
                                <button
                                    type="button"
                                    onClick={() => removePhoto(photo.id)}
                                    className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 bg-white border border-slate-200 rounded-full text-rose-500 shadow-md hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 hover:scale-110 transition-all z-10"
                                    aria-label="Delete photo"
                                >
                                    <Trash2 className="h-4 w-4" strokeWidth={2.5} />
                                </button>

                            </div>
                        ))}
                    </div>
                ) : (
                    /* --- Empty State --- */
                    <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 flex flex-col items-center justify-center">
                        <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                            <ImagePlus className="h-8 w-8 text-blue-400" />
                        </div>
                        <h4 className="text-base font-bold text-slate-900 mb-1">No photos uploaded</h4>
                        <p className="text-sm text-slate-500 max-w-sm mx-auto">
                            Click "Select Files" or use the camera button to add evidence for this report.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default PicturesForm;