import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          body { font-family: 'Inter', sans-serif; }
          h1, h2, h3 { font-family: 'Playfair Display', serif; }
          
          @keyframes pulse-glow {
            0% { box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(13, 148, 136, 0); }
            100% { box-shadow: 0 0 0 0 rgba(13, 148, 136, 0); }
          }
          .btn-attention {
            animation: pulse-glow 2s infinite;
          }
        `}</style>
      </Head>
      <body className="bg-slate-50 text-slate-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
