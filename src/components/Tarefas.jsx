import { useState, useEffect } from "react"
import "../css/estilo.css"


const Tarefas = () => {

  //Hook - useState - Manipula o estado da variavel
  const [tarefas, setTarefas] = useState(() => {
    const salvarTarefas = localStorage.getItem("item-tarefa");
    return salvarTarefas ? JSON.parse(salvarTarefas) : [];
  });


  const [campo, setCampo] = useState("");
  //HOOK - useEffect - realiza o efeito colateral, nessse exemplo vai mostrar a tarefa adicionada em tempo real
  useEffect(() => {
    localStorage.setItem("item-tarefa", JSON.stringify(tarefas))
  }, [tarefas])

  // função adicionar tarefa
  const AdicionarTarefa = (e) => {
    // previne que a pagina recarregue automaticamente
    e.preventDefault();
    // valida se o campo estiver vazio
    if (!campo.trim()) return;

    // novo objeto
    const novaTarefa = {
      id: Date.now(),
      texto: campo,
    }
    setTarefas([...tarefas, novaTarefa]);
    setCampo('');
  }

  //função remover tarefa
  const removertarefa = (id) => {
    // verifica se o id da tarefa atual é diferente do id que deseja apagar
    // se o id for iguaç(tarefa que deseja apagar) a condiçõa retorna falso e o item é excluido
    const apagarTarefa = tarefas.filter((tarefa) => tarefa.id !== id);
    setTarefas(apagarTarefa);

  }


  return (
    <div className="max-w-md mx-auto mt-10 bg-indigo-500 rounded-2xl shadow-lg shadow-green-600 border border-green-500">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">Minha Lista de Tarefas</h1>
      <form onSubmit={AdicionarTarefa}className="flex gap-2 mb-6">
        <input
          type="text"
          value={campo}
          onChange={(e) => setCampo(e.target.value)}
          placeholder="Digite sua Tarefa"
          className="flex-1 px-4 py-2 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder:text-gray-700"

        />
        <button type="submit"
        className="bg-indigo-950 hover:bg-indigo-400 text-indigo-700 font-medium px-5 py-2 rounded-2xl transition-colors cursor-pointer">
          
          
          Adicionar</button>
      </form>

      <ul className="space-y-3">
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} className="flex items-center justify-between p-3 bg-indigo-900 border border-green-300 rounded-2xl shadow-sm hover:bg-indigo-500 transition-colors">
            <span>{tarefa.texto}</span>
            <button onClick={() => removertarefa(tarefa.id)}
              className="bg-indigo-950 hover:bg-indigo-400 text-blue-400 font-medium px-5 py-2 rounded-2xl transition-colors cursor-pointer"
              >Excluir</button>

          </li>
        ))}
      </ul>
      {/* compara, se não tiver tarefas deixa a mensagem "nenhuma tarefa salva" */}
      {tarefas.length === 0 && <p className=" text-center italic mt-4">Nenhuma Tarefa Salva</p>}

    </div>
  )
}

export default Tarefas
