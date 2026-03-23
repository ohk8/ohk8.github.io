import { getDatabase, getCategories } from "../../lib/notion";
import Link from "next/link";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export async function getStaticPaths() {
    const categories = await getCategories();

    const paths = categories.map((category) => ({
        params: { category: String(category) },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const posts = await getDatabase();
    const categories = await getCategories();
    const filteredPosts = posts.filter((post) => post.category === params.category);

    return {
        props: {
            posts: filteredPosts,
            currentCategory: params.category,
            categories
        },
    };
}

export default function CategoryPage({ posts, currentCategory, categories }) {
    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Header categories={categories} />

            <main className="max-w-[900px] w-full mx-auto px-8 flex-grow">
                <section className="py-16 text-center">
                    <h1 className="text-6xl font-extrabold mb-4 tracking-tighter text-slate-900 max-md:text-4xl">{currentCategory}</h1>
                    <p className="text-xl text-slate-500 mt-4 capitalize">{posts.length} {posts.length === 1 ? 'post' : 'posts'}</p>
                </section>

                {posts.length === 0 ? (
                    <div className="text-center py-20 text-slate-500">
                        이 카테고리에 아직 등록된 포스트가 없습니다.
                    </div>
                ) : (
                    <div className="flex flex-col gap-12 mb-24">
                        {posts.map((post) => (
                            <Link href={`/post/${post.slug}`} key={post.id} className="no-underline text-inherit flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.2,0,0.2,1)] hover:-translate-y-1">
                                <div className="flex flex-col h-full">
                                    <div className="text-xs font-bold uppercase text-blue-500 mb-3 tracking-widest">{post.category || "Article"}</div>
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
                )}
            </main>

            <Footer />
        </div>
    );
}
