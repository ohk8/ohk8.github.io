import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-16 border-t border-slate-100 text-center text-slate-400 text-sm w-full mt-auto">
            <div className="max-w-[900px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p>© {new Date().getFullYear()} MyLog. Built with Notion & Next.js</p>
            </div>
        </footer>
    );
}
