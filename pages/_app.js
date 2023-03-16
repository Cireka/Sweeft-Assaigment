import DataProvider from "@/Components/Cotnext/DataProvider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <DataProvider>
      <Component {...pageProps} />
    </DataProvider>
  );
}
