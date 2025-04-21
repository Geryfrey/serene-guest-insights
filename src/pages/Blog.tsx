
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const posts = [
  {
    title: "How AI is Revolutionizing Hotel Feedback",
    date: "April 2025",
    excerpt: "AI-powered sentiment analysis is transforming how luxury hotels respond to guest needs. Discover the key trends...",
    image: "/placeholder.svg",
  },
  {
    title: "Customer Story: Kigali Serena Hotel",
    date: "March 2025",
    excerpt: "Read how Kigali Serena used Serene Insights to boost guest satisfaction and staff engagement.",
    image: "/placeholder.svg",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-primary text-primary-foreground py-12">
        <div className="max-w-xl mx-auto text-center">
          <BookOpen className="mx-auto mb-3" size={36} />
          <h1 className="text-3xl font-serif font-bold">Serene Insights Blog</h1>
          <p className="mt-2 text-lg">Stories, tips and news for forward-thinking hotels in Africa.</p>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 px-4">
          {posts.map((post, idx) => (
            <article key={idx} className="glass border-0 shadow-md flex flex-col hover:shadow-xl transition cursor-pointer">
              <img src={post.image} alt={post.title} className="w-full h-40 object-cover rounded-t-xl" />
              <div className="flex-1 p-6">
                <h2 className="font-serif text-xl font-bold mb-2">{post.title}</h2>
                <div className="text-xs text-muted-foreground mb-2">{post.date}</div>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <Link to="#" className="inline-block text-primary font-medium underline">Read More</Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
