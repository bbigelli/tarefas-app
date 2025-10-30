'use client';

import { useMemo } from 'react';
import { Tarefa } from '@/types/tarefa';

export function useContadorDeTarefas(tarefas: Tarefa[]) {
  const contador = useMemo(() => {
    const total = tarefas.length;
    const concluidas = tarefas.filter(t => t.concluida).length;
    const pendentes = total - concluidas;

    return {
      total,
      pendentes,
      concluidas
    };
  }, [tarefas]);

  return contador;
}