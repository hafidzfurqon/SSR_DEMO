import helmetAsync from "react-helmet-async";
const { Helmet } = helmetAsync;
import "./App.css";
import { useState } from "react";

function App() {
  const [post] = useState({
    title: "A React Server Side Rendering",
    keywords: "Vite-ssr",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU9n_1KmjU7ip2OmpK5OZIBUpava1-huF6mw&s",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et facere impedit nesciunt? Voluptas est, consequatur autem sapiente nihil distinctio ipsa!",
  });

  return (
    <>
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.keywords} />
        <meta name="author" content="Josh" />
        <link rel="author" href="https://twitter.com/joshcstory/" />

        {/* Open Graph Tags */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="My Awesome Site" />
        <meta property="og:url" content={``} />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={post.image} />
        <meta name="twitter:creator" content="@hafidz_ganteng" />
      </Helmet>

      <article>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
      </article>
    </>
  );
}

export default App;
