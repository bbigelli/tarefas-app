'use client';

import { useState, FormEvent } from 'react';
import { Tarefa } from '@/types/tarefa';

interface NovaTarefaProps {
  onAdicionarTarefa: (tarefa: Omit<Tarefa, 'id'>) => void;
}

export default function NovaTarefa({ onAdicionarTarefa }: NovaTarefaProps) {
  const [titulo, setTitulo] = useState('');
  const [erro, setErro] = useState('');

  const validarTarefa = (titulo: string): string => {
    const tituloLimpo = titulo.trim();
    
    if (!tituloLimpo) {
      return 'O título da tarefa é obrigatório';
    }

    if (tituloLimpo.length < 3) {
      return 'A tarefa deve ter pelo menos 3 caracteres';
    }

    return '';
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const erroValidacao = validarTarefa(titulo);
    
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    setErro('');
    onAdicionarTarefa({
      titulo: titulo.trim(),
      concluida: false
    });
    setTitulo('');
  };

  const handleInputChange = (value: string) => {
    setTitulo(value);
    // Limpar erro quando o usuário começar a digitar
    if (erro) {
      setErro('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="mb-6"
      data-testid="tarefa-form"
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={titulo}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Digite uma nova tarefa..."
          className={`flex-1 p-2 border rounded text-gray-900 placeholder-gray-500 ${
            erro 
              ? 'border-red-500 bg-red-50' 
              : 'border-gray-300 bg-white focus:border-blue-500'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`} /* Cores do input */
          aria-label="Nova tarefa"
          aria-invalid={!!erro}
          aria-describedby={erro ? "erro-mensagem" : undefined}
          data-testid="tarefa-input"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium" /* Azul mais escuro */
          disabled={!titulo.trim()}
          data-testid="adicionar-button"
        >
          Adicionar
        </button>
      </div>
      {erro && (
        <p 
          id="erro-mensagem"
          className="text-red-600 text-sm mt-1 font-medium" /* Vermelho mais escuro */
          role="alert"
          aria-live="polite"
          data-testid="erro-mensagem"
        >
          {erro}
        </p>
      )}
    </form>
  );
}