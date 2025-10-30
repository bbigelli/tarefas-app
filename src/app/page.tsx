import { Tarefa } from '@/types/tarefa';
import NovaTarefa from '@/components/NovaTarefa';
import ListaTarefas from '@/components/ListaTarefas';

// Simulação de API
async function carregarTarefas(): Promise<Tarefa[]> {
  // Simula delay de rede
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return Promise.resolve([
    { id: 1, titulo: 'Estudar TypeScript', concluida: true },
    { id: 2, titulo: 'Praticar React Hooks', concluida: false },
    { id: 3, titulo: 'Escrever testes unitários', concluida: false },
  ]);
}

export default async function Home() {
  const tarefasIniciais = await carregarTarefas();

  async function adicionarTarefa(novaTarefa: Omit<Tarefa, 'id'>) {
    'use server';
    
    // Em uma aplicação real, aqui faríamos uma chamada à API
    console.log('Nova tarefa:', novaTarefa);
    
    return {
      ...novaTarefa,
      id: Date.now() // ID temporário
    };
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Minhas Tarefas</h1> {/* Texto mais escuro */}
      
      <div className="bg-black rounded-lg shadow p-6">
        <NovaTarefa onAdicionarTarefa={adicionarTarefa} />
        <ListaTarefas tarefas={tarefasIniciais} />
      </div>
    </div>
  );
}