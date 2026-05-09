import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  User, 
  Hash, 
  Plus, 
  Trash2, 
  Ticket, 
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { useTickets } from '../hooks/useTickets';
import { Raffle } from '../types';

interface RaffleDetailProps {
  raffle: Raffle;
  onBack: () => void;
}

export default function RaffleDetail({ raffle, onBack }: RaffleDetailProps) {
  const { tickets, loading, addTicket, deleteTicket } = useTickets(raffle.id);
  const [buyerName, setBuyerName] = useState('');
  const [numbers, setNumbers] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTicket = async (e: FormEvent) => {
    e.preventDefault();
    if (!buyerName.trim() || !numbers.trim()) return;
    await addTicket(buyerName, numbers);
    setBuyerName('');
    setNumbers('');
    setIsAdding(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F0F2F5] overflow-hidden">
      <header className="px-10 py-8 flex items-center justify-between bg-white border-b border-slate-100 shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="p-3 hover:bg-slate-50 rounded-2xl transition-colors text-slate-400 hover:text-indigo-600 border border-slate-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter">{raffle.name}</h2>
            <p className="text-slate-400 font-medium text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" /> 
              Gerenciando bilhetes da campanha
            </p>
          </div>
        </div>

        <button 
          onClick={() => setIsAdding(true)}
          className="bg-indigo-600 text-white font-black py-4 px-8 rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-3"
        >
          <Plus className="w-5 h-5 text-yellow-400" />
          ADICIONAR COMPRADOR
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-hide pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white p-6 rounded-3xl border border-white shadow-lg">
             <p className="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em] mb-1">Total de Bilhetes</p>
             <p className="text-4xl font-black text-slate-900">{tickets.length}</p>
           </div>
           <div className="bg-white p-6 rounded-3xl border border-white shadow-lg">
             <p className="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em] mb-1">Status Geral</p>
             <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-xl font-black text-slate-900 leading-none">Vendas Ativas</span>
             </div>
           </div>
           <div className="bg-indigo-600 p-6 rounded-3xl shadow-xl">
             <p className="text-[10px] font-black uppercase text-indigo-200 tracking-[0.2em] mb-1">ID Campanha</p>
             <p className="text-xl font-mono font-bold text-white uppercase tracking-tighter truncate">#{raffle.id}</p>
           </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2 uppercase text-[12px] tracking-[0.3em] text-slate-400">
            Lista de Compradores
          </h3>

          {loading ? (
            <div className="flex flex-col items-center justify-center p-20 gap-4">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
               >
                 <Hash className="w-10 h-10 text-indigo-300" />
               </motion.div>
               <span className="text-indigo-200 font-black uppercase tracking-widest text-sm">Carregando Bilhetes...</span>
            </div>
          ) : tickets.length === 0 ? (
            <div className="bg-white/50 border-4 border-dashed border-slate-200 rounded-[3rem] p-20 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-slate-200" />
              </div>
              <div className="space-y-1">
                <p className="text-xl font-black text-slate-900 tracking-tight">Nenhum comprador ainda</p>
                <p className="text-slate-400 font-medium max-w-xs mx-auto">Adicione o primeiro comprador clicando no botão acima para iniciar sua rifa.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <AnimatePresence mode="popLayout">
                {tickets.map((ticket) => (
                  <motion.div
                    key={ticket.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white p-6 px-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-2xl transition-all"
                  >
                    <div className="flex items-center gap-6 flex-1">
                      <div className="w-14 h-14 bg-indigo-50 rounded-[1.25rem] flex items-center justify-center text-indigo-600 shadow-inner">
                         <User className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xl font-black text-slate-900 truncate uppercase tracking-tighter">
                          {ticket.buyerName}
                        </h4>
                        <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.2em] mt-1">Comprador registrado</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 md:flex-1 justify-center md:border-x border-slate-50 px-8">
                       <div className="flex flex-col items-center">
                          <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-1">Bilhetes</p>
                          <div className="bg-indigo-600 px-4 py-2 rounded-xl text-white font-black text-lg shadow-lg shadow-indigo-100 flex items-center gap-2">
                             <Ticket className="w-4 h-4 text-yellow-400" />
                             {ticket.numbers}
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center gap-6 justify-end md:flex-1">
                        <div className="text-right hidden sm:block">
                           <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Registrado em</p>
                           <p className="text-sm font-bold text-slate-900">{ticket.createdAt?.toDate().toLocaleDateString('pt-BR')}</p>
                        </div>
                        <button 
                          onClick={() => deleteTicket(ticket.id)}
                          className="p-4 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all border border-transparent hover:border-red-100"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>

      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdding(false)}
              className="absolute inset-0"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="relative bg-white w-full max-w-xl rounded-[3rem] p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)]"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-yellow-400 rounded-[1.5rem] flex items-center justify-center text-indigo-900 shadow-xl shadow-yellow-100 rotate-6">
                  <User className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-4xl font-black tracking-tighter text-slate-900 leading-none">Registrar Venda</h3>
                  <p className="text-slate-500 font-medium text-lg mt-1 whitespace-nowrap">Vincule números a um comprador.</p>
                </div>
              </div>

              <form onSubmit={handleAddTicket} className="space-y-8">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Nome do Comprador</label>
                    <input
                      autoFocus
                      type="text"
                      placeholder="Ex: João da Silva"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full p-6 bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-600 outline-none transition-all text-xl font-bold placeholder:text-slate-300"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Números Escolhidos</label>
                    <input
                      type="text"
                      placeholder="Ex: 01, 24, 88"
                      value={numbers}
                      onChange={(e) => setNumbers(e.target.value)}
                      className="w-full p-6 bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-600 outline-none transition-all text-xl font-bold placeholder:text-slate-300"
                    />
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="flex-1 py-5 text-slate-400 font-black text-lg hover:bg-slate-50 rounded-2xl transition-colors uppercase tracking-widest"
                  >
                    VOLTAR
                  </button>
                  <button
                    type="submit"
                    disabled={!buyerName.trim() || !numbers.trim()}
                    className="flex-[2] py-5 bg-indigo-600 text-yellow-400 font-black text-lg rounded-2xl shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:shadow-none uppercase tracking-widest"
                  >
                    REGISTRAR AGORA
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
