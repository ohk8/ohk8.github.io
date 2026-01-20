import { getDatabase } from "../lib/notion";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";

export async function getStaticProps() {
    const posts = await getDatabase();
    return {
        props: { posts },
    };
}
export default function Home({ posts }) {
    return (
        <div className="max-w-[1000px] mx-auto">
            <Header />

            <main>
                <section className="py-16 text-center">
                    <h1 className="text-6xl font-extrabold mb-4 tracking-tighter text-slate-900 max-md:text-4xl">Thoughts, stories and ideas.</h1>
                </section>

                <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-12 mb-24 max-md:grid-cols-1">
                    {posts.map((post) => (
                        <Link href={`/post/${post.slug}`} key={post.id} className="no-underline text-inherit flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.2,0,0.2,1)] hover:-translate-y-1">
                            <div className="flex flex-col h-full">
                                <div className="text-xs font-bold uppercase text-blue-500 mb-3 tracking-widest">Article</div>
                                <h3 className="text-2xl font-bold mb-4 text-slate-900 leading-tight">{post.title}</h3>
                                <p className="text-base text-slate-600 leading-relaxed mb-6 line-clamp-3">{post.excerpt || "Click to read more about this post..."}</p>
                                <div className="mt-auto flex justify-between items-center text-sm text-slate-400">
                                    <span>{post.date}</span>
                                    <span className="font-semibold text-slate-900">Read More →</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}