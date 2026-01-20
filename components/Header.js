import Link from "next/link";

export default function Header() {
    return (
        <header className="flex justify-between items-center h-24 mb-8 max-w-[1000px] mx-auto px-8">
            <Link href="/" className="text-2xl font-extrabold text-slate-900 tracking-tight no-underline">
                MyLog
            </Link>
            <nav className="flex gap-8">
                <Link href="/" className="no-underline text-slate-500 font-medium transition-colors hover:text-slate-900">Home</Link>
                <Link href="/about" className="no-underline text-slate-500 font-medium transition-colors hover:text-slate-900">About</Link>
            </nav>
        </header>
    );
}
