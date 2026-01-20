import "react-notion-x/src/styles.css";
import "./globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Component {...pageProps} />
    </div>
  );
}