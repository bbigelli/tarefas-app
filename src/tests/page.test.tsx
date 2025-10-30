import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import '@testing-library/jest-dom';

// Mock da função carregarTarefas
jest.mock('@/app/page', () => {
  const originalModule = jest.requireActual('@/app/page');
  return {
    __esModule: true,
    default: originalModule.default,
    carregarTarefas: jest.fn().mockResolvedValue([
      { id: 1, titulo: 'Tarefa 1 Mock', concluida: true },
      { id: 2, titulo: 'Tarefa 2 Mock', concluida: false },
    ]),
  };
});

describe('Página Principal', () => {
  it('deve renderizar a página com título e componentes', async () => {
    // Renderizar o componente da página diretamente
    const Page = await Home();
    const { container } = render(Page);

    // Verificar elementos básicos
    expect(screen.getByText('Minhas Tarefas')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite uma nova tarefa...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /adicionar/i })).toBeInTheDocument();
  });

  it('deve exibir a lista de tarefas carregadas', async () => {
    const Page = await Home();
    render(Page);

    // Verificar se as tarefas mockadas são exibidas
    expect(screen.getByText('Estudar TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Praticar React Hooks')).toBeInTheDocument();
    expect(screen.getByText('Escrever testes unitários')).toBeInTheDocument();
  });
});