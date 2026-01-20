import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-16 border-t border-slate-100 text-center text-slate-400 text-sm">
            <div className="max-w-[1000px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p>© 2026 MyLog. Built with Notion & Next.js</p>
                <div className="flex gap-6">
                    <Link href="/" className="text-slate-900 no-underline font-semibold hover:underline">Home</Link>
                    <Link href="/about" className="text-slate-900 no-underline font-semibold hover:underline">About</Link>
                </div>
            </div>
        </footer>
    );
}
