import { renderHook } from '@testing-library/react';
import { useContadorDeTarefas } from '@/hooks/useContadorDeTarefas';
import { Tarefa } from '@/types/tarefa';

describe('useContadorDeTarefas', () => {
  it('deve calcular corretamente o contador de tarefas', () => {
    const tarefasMock: Tarefa[] = [
      { id: 1, titulo: 'Tarefa 1', concluida: true },
      { id: 2, titulo: 'Tarefa 2', concluida: false },
      { id: 3, titulo: 'Tarefa 3', concluida: false },
    ];

    const { result } = renderHook(() => useContadorDeTarefas(tarefasMock));

    expect(result.current).toEqual({
      total: 3,
      pendentes: 2,
      concluidas: 1,
    });
  });

  it('deve retornar zeros quando não há tarefas', () => {
    const { result } = renderHook(() => useContadorDeTarefas([]));

    expect(result.current).toEqual({
      total: 0,
      pendentes: 0,
      concluidas: 0,
    });
  });
});