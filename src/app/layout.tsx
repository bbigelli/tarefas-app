import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gerenciador de Tarefas',
  description: 'Uma aplicação simples para gerenciar suas tarefas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 min-h-screen text-gray-800"> {/* Adicione text-gray-800 aqui */}
        {children}
      </body>
    </html>
  );
}