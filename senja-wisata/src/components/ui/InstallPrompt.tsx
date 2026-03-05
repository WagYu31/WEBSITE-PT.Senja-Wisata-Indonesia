"use client";

import { useState, useEffect } from "react";
import { Download, X, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showBanner, setShowBanner] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [showIOSGuide, setShowIOSGuide] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        // Check if already installed
        if (window.matchMedia("(display-mode: standalone)").matches) {
            setIsInstalled(true);
            return;
        }

        // Check if dismissed recently (24h cooldown)
        const dismissed = localStorage.getItem("pwa-install-dismissed");
        if (dismissed && Date.now() - Number(dismissed) < 24 * 60 * 60 * 1000) {
            return;
        }

        // Detect platform
        const ua = navigator.userAgent;
        const isiOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
        setIsIOS(isiOS);

        // Always show banner on mobile (iOS or Android)
        if (isMobile) {
            setShowBanner(true);
        }

        // Listen for beforeinstallprompt (Chrome/Edge desktop & Android after criteria met)
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setShowBanner(true);
        };

        window.addEventListener("beforeinstallprompt", handler);
        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const handleInstall = async () => {
        if (deferredPrompt) {
            await deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === "accepted") {
                setShowBanner(false);
                setIsInstalled(true);
            }
            setDeferredPrompt(null);
        } else if (isIOS) {
            setShowIOSGuide(true);
        } else {
            // Android without native prompt — show guide
            setShowIOSGuide(true);
        }
    };

    const handleDismiss = () => {
        setShowBanner(false);
        setShowIOSGuide(false);
        localStorage.setItem("pwa-install-dismissed", String(Date.now()));
    };

    if (isInstalled || !showBanner) return null;

    return (
        <>
            {/* Install Banner */}
            <div className="w-full bg-gradient-to-r from-[#05073C] via-[#0a1564] to-[#1a2d8a] text-white px-4 py-3 rounded-2xl mb-4 shadow-lg relative overflow-hidden">
                {/* Decorative */}
                <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-white/5" />
                <div className="absolute -bottom-4 -left-4 w-14 h-14 rounded-full bg-white/5" />

                <div className="relative z-10 flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                        <Smartphone size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm">Install Senja Wisata</div>
                        <div className="text-white/60 text-xs">Akses lebih cepat dari Home Screen! 🚀</div>
                    </div>
                    <button
                        onClick={handleInstall}
                        className="flex items-center gap-1.5 bg-white text-[#05073C] px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-white/90 transition-all shrink-0"
                    >
                        <Download size={12} />
                        Install
                    </button>
                    <button
                        onClick={handleDismiss}
                        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 text-white/40 shrink-0"
                    >
                        <X size={14} />
                    </button>
                </div>
            </div>

            {/* iOS Install Guide Modal */}
            {showIOSGuide && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
                    <div className="bg-white rounded-2xl w-full max-w-sm p-6 text-center shadow-2xl">
                        <div className="w-14 h-14 bg-[#05073C] rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-lg">SW</span>
                        </div>
                        <h3 className="font-bold text-lg text-slate-800 mb-2">Install Senja Wisata</h3>
                        <p className="text-sm text-slate-500 mb-5">Tambahkan ke Home Screen untuk pengalaman terbaik:</p>
                        <div className="text-left space-y-3 bg-slate-50 rounded-xl p-4 mb-5">
                            {isIOS ? (
                                <>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-[#05073C] text-white flex items-center justify-center text-xs font-bold shrink-0">1</div>
                                        <p className="text-sm text-slate-600">Tap ikon <span className="font-bold">Share</span> (⬆️) di Safari</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-[#05073C] text-white flex items-center justify-center text-xs font-bold shrink-0">2</div>
                                        <p className="text-sm text-slate-600">Scroll ke bawah dan tap <span className="font-bold">&quot;Add to Home Screen&quot;</span></p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-[#05073C] text-white flex items-center justify-center text-xs font-bold shrink-0">3</div>
                                        <p className="text-sm text-slate-600">Tap <span className="font-bold">&quot;Add&quot;</span> untuk menginstall</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-[#05073C] text-white flex items-center justify-center text-xs font-bold shrink-0">1</div>
                                        <p className="text-sm text-slate-600">Tap ikon <span className="font-bold">⋮ (titik tiga)</span> di kanan atas Chrome</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-[#05073C] text-white flex items-center justify-center text-xs font-bold shrink-0">2</div>
                                        <p className="text-sm text-slate-600">Tap <span className="font-bold">&quot;Install app&quot;</span> atau <span className="font-bold">&quot;Add to Home screen&quot;</span></p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-[#05073C] text-white flex items-center justify-center text-xs font-bold shrink-0">3</div>
                                        <p className="text-sm text-slate-600">Tap <span className="font-bold">&quot;Install&quot;</span> untuk menginstall</p>
                                    </div>
                                </>
                            )}
                        </div>
                        <button
                            onClick={handleDismiss}
                            className="w-full py-2.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-all"
                        >
                            Mengerti
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
