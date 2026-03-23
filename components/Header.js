import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function Header({ categories = [] }) {
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsCategoryOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const dynamicCategories = categories.map(cat => ({
        name: cat,
        href: `/category/${cat}`
    }));

    const navLinks = [
        { name: "전체보기", href: "/" },
        ...dynamicCategories,
        { name: "About", href: "/about" }
    ];

    return (
        <header className="flex justify-between items-center h-24 mb-8 max-w-[900px] mx-auto px-8 relative w-full">
            <Link href="/" className="text-2xl font-extrabold text-slate-900 tracking-tight no-underline">
                MyLog
            </Link>

            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600 hover:text-slate-900 focus:outline-none"
                    aria-label="Categories"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>

                {isCategoryOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 py-2 z-50 transform origin-top-right transition-all">
                        {navLinks.map((category) => (
                            <Link
                                key={category.name}
                                href={category.href}
                                onClick={() => setIsCategoryOpen(false)}
                                className="block px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
}
