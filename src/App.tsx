import { useEffect, useState } from "react";
import "./blog.css";
import { fetchBlogPosts, type BlogPost } from "./lib/supabase";

function VideoMedia({
  url,
  variant,
}: {
  url: string;
  variant: "featured" | "card";
}) {
  return (
    <div
      className={`btl-video-wrap ${
        variant === "featured" ? "btl-featured-media" : "btl-card-media"
      }`}
    >
      <video
        className="btl-video"
        src={url}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="btl-overlay" />
      <div className="btl-plus">+</div>
      <span className="btl-corner tl" />
      <span className="btl-corner tr" />
      <span className="btl-corner bl" />
      <span className="btl-corner br" />
    </div>
  );
}

function CategoryBadge({ label, color }: { label: string; color: string }) {
  return (
    <span className="btl-cat" style={{ backgroundColor: color }}>
      {label}
    </span>
  );
}

function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <article className="btl-featured">
      <VideoMedia url={post.image_url} variant="featured" />
      <div className="btl-featured-content">
        {post.badge && <span className="btl-mustread">{post.badge}</span>}
        <h2 className="btl-featured-title">{post.title}</h2>
        <p className="btl-featured-desc">{post.description}</p>
        <div className="btl-featured-footer">
          <span className="btl-author">{post.author}</span>
          <CategoryBadge label={post.category} color={post.category_color} />
        </div>
      </div>
    </article>
  );
}

function StandardCard({ post }: { post: BlogPost }) {
  return (
    <article>
      <VideoMedia url={post.image_url} variant="card" />
      <div className="btl-card-title-row">
        <h3 className="btl-card-title">{post.title}</h3>
        <CategoryBadge label={post.category} color={post.category_color} />
      </div>
    </article>
  );
}

export default function App() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetchBlogPosts().then(setPosts);
  }, []);

  const featured = posts.find((p) => p.type === "featured");
  const standard = posts.filter((p) => p.type === "standard");

  return (
    <main className="btl-page">
      <header>
        <span className="btl-badge">Blog</span>
        <h1 className="btl-heading">Behind the lens</h1>
        <div className="btl-header-bottom">
          <p className="btl-subtitle">
            Thoughts, insights, and stories from my photography journey. Take a
            peek into my creative process and recent projects.
          </p>
          <button className="btl-viewall">View all posts</button>
        </div>
      </header>

      {featured && <FeaturedPost post={featured} />}

      <section className="btl-grid">
        {standard.map((post) => (
          <StandardCard key={post.id ?? post.title} post={post} />
        ))}
      </section>
    </main>
  );
}
