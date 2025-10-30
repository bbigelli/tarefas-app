'use client';

import { Tarefa } from '@/types/tarefa';
import { useContadorDeTarefas } from '@/hooks/useContadorDeTarefas';

interface ListaTarefasProps {
  tarefas: Tarefa[];
}

export default function ListaTarefas({ tarefas }: ListaTarefasProps) {
  const contador = useContadorDeTarefas(tarefas);

  return (
    <div>
      <div className="mb-4 p-4 bg-gray-50 rounded border border-gray-200"> {/* Fundo mais suave */}
        <h2 className="font-semibold mb-2 text-gray-900">Resumo:</h2> {/* Texto mais escuro */}
        <p className="text-gray-700">Total: {contador.total}</p> {/* Texto cinza escuro */}
        <p className="text-gray-700">Pendentes: {contador.pendentes}</p>
        <p className="text-gray-700">Concluídas: {contador.concluidas}</p>
      </div>

      <ul className="space-y-2">
        {tarefas.map((tarefa) => (
          <li
            key={tarefa.id}
            className={`p-3 border rounded ${
              tarefa.concluida 
                ? 'bg-green-50 border-green-300 text-green-800' 
                : 'bg-white border-gray-300 text-gray-800' /* Texto mais escuro */
            }`}
          >
            <span
              className={tarefa.concluida ? 'line-through text-green-700' : ''}
            >
              {tarefa.titulo}
            </span>
            {tarefa.concluida && (
              <span className="ml-2 text-green-600 text-sm font-medium">✓ Concluída</span>
            )}
          </li>
        ))}
      </ul>

      {tarefas.length === 0 && (
        <p className="text-gray-600 text-center py-4"> {/* Texto cinza médio */}
          Nenhuma tarefa encontrada. Adicione uma nova tarefa!
        </p>
      )}
    </div>
  );
}