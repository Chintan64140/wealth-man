import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import "./App.css";
import { posts } from "./component/data";

/* ---------- COMPONENTS ---------- */
function Header() {
  return (
    <header>
      <nav>
        <h1>
          <Link to="/">CryptoBlog</Link>
        </h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <p>© {new Date().getFullYear()} CryptoBlog — All Rights Reserved</p>
    </footer>
  );
}

function AdSensePlaceholder() {
  return (
    <div className="ad-placeholder">
      <strong>Ad Placeholder</strong>
      <p>Add your AdSense code here after approval.</p>
    </div>
  );
}

/* ---------- PAGES ---------- */
function Home() {
  return (
    <div className="main-layout">
      {/* Main content */}
      <div>
        {posts.map((post) => (
          <div key={post.id} className="post-preview">
            <h2>
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </h2>
            <div className="post-meta">
              {new Date(post.date).toLocaleDateString()} 
            </div>
            <p>{post.excerpt}</p>
            <Link to={`/post/${post.id}`} className="read-more">
              Read more
            </Link>
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <button>Search</button>
        </div>

        <div className="recent-posts">
          <h3>Recent Posts</h3>
          <ul>
            {posts.slice(0, 5).map((post) => (
              <li key={post.id}>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

function Post() {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);

  if (!post) return <p className="container">Post not found</p>;

  return (
    <div className="container">
      <h1>{post.title}</h1>
      <div className="post-meta">
        {new Date(post.date).toLocaleDateString()}
      </div>
      <p>{post.content}</p>
      <AdSensePlaceholder />
    </div>
  );
}

function About() {
  return (
    <div className="container">
      <h1>About CryptoBlog</h1>
      <p>
        We provide crypto news, guides, and educational content to help you
        understand the world of digital assets.
      </p>
    </div>
  );
}

function Privacy() {
  return (
    <div className="container">
      <h1>Privacy Policy</h1>
      <p>
        We value your privacy and do not collect personal data without consent.
        Any ads displayed may use cookies for personalization.
      </p>
    </div>
  );
}

function Contact() {
  return (
    <div className="container">
      <h1>Contact Us</h1>
      <p>Email: contact@cryptoblog.com</p>
    </div>
  );
}

/* ---------- MAIN APP ---------- */
export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}
