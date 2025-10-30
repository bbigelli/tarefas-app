import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NovaTarefa from '@/components/NovaTarefa';

describe('NovaTarefa', () => {
  const mockOnAdicionarTarefa = jest.fn();

  beforeEach(() => {
    mockOnAdicionarTarefa.mockClear();
  });

  it('deve renderizar o formulário corretamente', () => {
    render(<NovaTarefa onAdicionarTarefa={mockOnAdicionarTarefa} />);

    expect(screen.getByTestId('tarefa-input')).toBeInTheDocument();
    expect(screen.getByTestId('adicionar-button')).toBeInTheDocument();
    expect(screen.getByTestId('tarefa-form')).toBeInTheDocument();
  });

  it('deve permitir digitar no input', async () => {
    const user = userEvent.setup();
    render(<NovaTarefa onAdicionarTarefa={mockOnAdicionarTarefa} />);

    const input = screen.getByTestId('tarefa-input');
    await user.type(input, 'Nova tarefa de teste');

    expect(input).toHaveValue('Nova tarefa de teste');
  });

  it('deve chamar onAdicionarTarefa ao enviar o formulário com dados válidos', async () => {
    const user = userEvent.setup();
    render(<NovaTarefa onAdicionarTarefa={mockOnAdicionarTarefa} />);

    const input = screen.getByTestId('tarefa-input');
    
    await user.type(input, 'Tarefa válida');
    await user.click(screen.getByTestId('adicionar-button'));

    expect(mockOnAdicionarTarefa).toHaveBeenCalledWith({
      titulo: 'Tarefa válida',
      concluida: false,
    });
    expect(input).toHaveValue('');
  });

  it('deve mostrar erro ao tentar adicionar tarefa vazia', () => {
    render(<NovaTarefa onAdicionarTarefa={mockOnAdicionarTarefa} />);

    // Usar fireEvent para simular o submit diretamente
    fireEvent.submit(screen.getByTestId('tarefa-form'));

    // O erro deve aparecer imediatamente
    expect(screen.getByTestId('erro-mensagem')).toHaveTextContent('O título da tarefa é obrigatório');
    expect(mockOnAdicionarTarefa).not.toHaveBeenCalled();
  });

  it('deve mostrar erro ao tentar adicionar tarefa com menos de 3 caracteres', async () => {
    const user = userEvent.setup();
    render(<NovaTarefa onAdicionarTarefa={mockOnAdicionarTarefa} />);

    const input = screen.getByTestId('tarefa-input');
    
    await user.type(input, 'ab');
    fireEvent.submit(screen.getByTestId('tarefa-form'));

    expect(screen.getByTestId('erro-mensagem')).toHaveTextContent('A tarefa deve ter pelo menos 3 caracteres');
    expect(mockOnAdicionarTarefa).not.toHaveBeenCalled();
  });

  it('deve desabilitar o botão quando o input estiver vazio', () => {
    render(<NovaTarefa onAdicionarTarefa={mockOnAdicionarTarefa} />);

    const button = screen.getByTestId('adicionar-button');
    expect(button).toBeDisabled();
  });

  it('deve habilitar o botão quando o input tiver conteúdo válido', async () => {
    const user = userEvent.setup();
    render(<NovaTarefa onAdicionarTarefa={mockOnAdicionarTarefa} />);

    const input = screen.getByTestId('tarefa-input');
    const button = screen.getByTestId('adicionar-button');

    await user.type(input, 'Tarefa válida');

    expect(button).not.toBeDisabled();
  });

  it('deve limpar o erro quando o usuário começar a digitar', async () => {
    const user = userEvent.setup();
    render(<NovaTarefa onAdicionarTarefa={mockOnAdicionarTarefa} />);

    // Primeiro causar um erro
    fireEvent.submit(screen.getByTestId('tarefa-form'));

    // Verificar que o erro está visível
    expect(screen.getByTestId('erro-mensagem')).toBeInTheDocument();

    // Digitar no input para limpar o erro
    const input = screen.getByTestId('tarefa-input');
    await user.type(input, 'Nova tarefa');

    // Verificar que o erro desapareceu
    expect(screen.queryByTestId('erro-mensagem')).not.toBeInTheDocument();
  });

  it('deve funcionar com userEvent.click no botão para tarefa válida', async () => {
    const user = userEvent.setup();
    render(<NovaTarefa onAdicionarTarefa={mockOnAdicionarTarefa} />);

    const input = screen.getByTestId('tarefa-input');
    const button = screen.getByTestId('adicionar-button');

    await user.type(input, 'Tarefa teste');
    await user.click(button);

    expect(mockOnAdicionarTarefa).toHaveBeenCalledWith({
      titulo: 'Tarefa teste',
      concluida: false,
    });
  });
});