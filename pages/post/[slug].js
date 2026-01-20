import { NotionRenderer } from "react-notion-x";
import { NotionAPI } from "notion-client";
import { getDatabase } from "../../lib/notion";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const notion = new NotionAPI();

export async function getStaticPaths() {
    const posts = await getDatabase();
    const paths = posts.map((post) => ({
        params: { slug: String(post.slug) },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const posts = await getDatabase();
    const post = posts.find((p) => p.slug === params.slug);

    if (!post) return { notFound: true };

    try {
        const recordMap = await notion.getPage(post.id);

        return {
            props: { recordMap },
        };
    } catch (error) {
        return { notFound: true };
    }
}

const Code = dynamic(() =>
    import("react-notion-x/build/third-party/code").then((m) => m.Code),
    { ssr: false }
);
const Collection = dynamic(() =>
    import("react-notion-x/build/third-party/collection").then((m) => m.Collection),
    { ssr: false }
);

export default function Post({ recordMap }) {
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="loading-placeholder" />;
    if (!recordMap) return null;

    return (
        <div className="bg-white min-h-screen">
            <Header />
            <nav className="sticky top-0 z-[100] px-8 py-6 bg-white/80 backdrop-blur-md max-w-[1000px] mx-auto w-full">
                <button onClick={() => router.back()} className="flex items-center gap-2 bg-transparent border-none p-2 rounded-lg cursor-pointer font-semibold text-slate-900 transition-all hover:bg-slate-100 hover:-translate-x-1 -ml-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    <span>Back</span>
                </button>
            </nav>

            <main className="max-w-[1000px] mx-auto pb-16">
                <div className="prose prose-slate prose-lg max-w-none px-8
                    prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-slate-900
                    prose-p:text-slate-600 prose-p:leading-relaxed
                    prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                    prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl
                    prose-img:rounded-2xl prose-img:shadow-xl">
                    <NotionRenderer
                        recordMap={recordMap}
                        fullPage={true}
                        darkMode={false}
                        disableHeader={true}
                        components={{
                            nextImage: Image,
                            nextLink: Link,
                            Code,
                            Collection
                        }}
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
}