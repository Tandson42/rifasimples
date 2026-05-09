import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Ticket, 
  Plus, 
  Trash2, 
  LogOut, 
  LogIn, 
  Gift,
  LayoutGrid,
  List as ListIcon,
  Rss
} from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { useRaffles } from './hooks/useRaffles';
import { Raffle } from './types';
import RaffleDetail from './components/RaffleDetail';

export default function App() {
  const { user, loading: authLoading, login, logout } = useAuth();
  const { raffles, loading: rafflesLoading, addRaffle, deleteRaffle } = useRaffles(user?.uid);
  const [newRaffleName, setNewRaffleName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedRaffle, setSelectedRaffle] = useState<Raffle | null>(null);

  const handleAddRaffle = async (e: FormEvent) => {
    e.preventDefault();
    if (!newRaffleName.trim()) return;
    await addRaffle(newRaffleName);
    setNewRaffleName('');
    setIsAdding(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F4] flex items-center justify-center font-sans">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Ticket className="w-8 h-8 text-[#0A0A0A]" />
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F0F2F5] flex flex-col font-sans">
        <nav className="p-6 flex justify-between items-center bg-white/50 backdrop-blur-sm border-b border-indigo-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-indigo-200">R</div>
            <span className="font-black tracking-tight text-2xl text-slate-900">RIFA SIMPLES</span>
          </div>
        </nav>
        
        <main className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-[#F0F2F5] to-indigo-50/30">
          <div className="max-w-md w-full text-center space-y-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-yellow-400 rounded-[2rem] flex items-center justify-center text-indigo-900 shadow-2xl rotate-3">
                   <Ticket className="w-12 h-12" />
                </div>
              </div>
              <h1 className="text-6xl font-black tracking-tighter leading-none text-slate-900">
                Suas rifas, <br/>
                <span className="text-indigo-600 underline decoration-yellow-400 underline-offset-8">vibrantes.</span>
              </h1>
              <p className="text-slate-500 font-medium text-lg">
                Gerencie seus sorteios de forma profissional com uma interface moderna e intuitiva.
              </p>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={login}
              className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all"
            >
              <LogIn className="w-6 h-6 text-yellow-400" />
              ENTRAR COM GOOGLE
            </motion.button>
          </div>
        </main>
        
        <footer className="p-8 text-center text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">
          &copy; 2024 RIFA SIMPLES &bull; PREMIUM EXPERIENCE
        </footer>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F0F2F5] font-sans text-slate-800 overflow-hidden">
      {/* Sidebar / Control Panel */}
      <aside className="w-80 bg-indigo-600 flex flex-col text-white shadow-2xl z-20 shrink-0">
        <div className="p-8 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center text-indigo-900 font-black text-2xl">R</div>
            <h1 className="text-2xl font-black tracking-tight">RIFA SIMPLES</h1>
          </div>

          <div className="flex flex-col gap-8 flex-1 overflow-y-auto">
            <div className="bg-indigo-500/50 p-6 rounded-3xl border border-indigo-400/30">
              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-2">Usuário Ativo</p>
              <div className="flex gap-4">
                <img 
                  src={user.photoURL || ''} 
                  alt={user.displayName || ''} 
                  className="w-12 h-12 rounded-2xl border-2 border-indigo-400/30"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-lg leading-tight truncate">{user.displayName}</p>
                  <p className="text-[10px] text-indigo-200 truncate">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-200 px-1">Ações Rapidas</h2>
              <button 
                onClick={() => setIsAdding(true)}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-indigo-900 font-black py-4 px-6 rounded-2xl shadow-xl shadow-indigo-900/20 transition-all flex items-center justify-center gap-2 group"
              >
                <Plus className="w-5 h-5 group-hover:scale-125 transition-transform" />
                ADICIONAR RIFA
              </button>
            </div>

            <div className="mt-4 space-y-4">
               <h2 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-200 px-1">Visualização</h2>
               <div className="grid grid-cols-2 gap-2 bg-indigo-700/40 p-1.5 rounded-2xl">
                 <button 
                    onClick={() => setViewMode('grid')}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl transition-all font-bold text-xs ${viewMode === 'grid' ? 'bg-indigo-600 shadow-md text-white' : 'text-indigo-200 hover:text-white'}`}
                 >
                    <LayoutGrid className="w-4 h-4" /> Grade
                 </button>
                 <button 
                    onClick={() => setViewMode('list')}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl transition-all font-bold text-xs ${viewMode === 'list' ? 'bg-indigo-600 shadow-md text-white' : 'text-indigo-200 hover:text-white'}`}
                 >
                    <ListIcon className="w-4 h-4" /> Lista
                 </button>
               </div>
            </div>
          </div>

          <div className="mt-auto pt-8 border-t border-indigo-500/30 flex flex-col gap-4">
            <div className="bg-indigo-700/40 p-5 rounded-2xl shadow-inner">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Total Ativas</p>
                  <p className="text-4xl font-black">{raffles.length.toString().padStart(2, '0')}</p>
                </div>
                <div className="relative w-12 h-12 flex items-center justify-center">
                   <div className="absolute inset-0 rounded-full border-4 border-indigo-500 opacity-30"></div>
                   <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-yellow-400 rotate-45"></div>
                   <Ticket className="w-5 h-5 text-yellow-400" />
                </div>
              </div>
            </div>
            <button 
              onClick={logout}
              className="flex items-center justify-center gap-2 py-4 text-indigo-200 hover:text-white font-bold transition-colors"
            >
              <LogOut className="w-5 h-5" /> Sair do Painel
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-10 overflow-hidden">
        {selectedRaffle ? (
          <RaffleDetail 
            raffle={selectedRaffle} 
            onBack={() => setSelectedRaffle(null)} 
          />
        ) : (
          <>
            <header className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Minhas Rifas</h2>
                <p className="text-slate-500 font-medium text-lg">Gerencie seus sorteios e acompanhe o sucesso de cada campanha.</p>
              </div>
            </header>

            <section className="flex-1 overflow-y-auto pr-4 scrollbar-hide">
              <AnimatePresence mode="popLayout">
                {rafflesLoading ? (
                  <div className="h-full flex flex-col items-center justify-center gap-6">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="p-4 bg-indigo-100 rounded-full"
                    >
                      <Ticket className="w-12 h-12 text-indigo-600" />
                    </motion.div>
                    <span className="text-lg font-black text-indigo-300 uppercase tracking-widest">Sincronizando Dados...</span>
                  </div>
                ) : raffles.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center p-12 bg-white/50 border-4 border-dashed border-slate-200 rounded-[3rem] text-center space-y-6">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl">
                       <Ticket className="w-10 h-10 text-slate-300" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">Tudo pronto por aqui?</h3>
                      <p className="text-slate-400 font-medium text-lg max-w-sm mx-auto">Você ainda não tem rifas ativas. Que tal começar um novo sorteio agora mesmo?</p>
                    </div>
                    <button 
                      onClick={() => setIsAdding(true)}
                      className="bg-yellow-400 text-indigo-900 font-black py-4 px-10 rounded-2xl shadow-xl hover:shadow-yellow-400/20 transition-all"
                    >
                      CRIAR MINHA PRIMEIRA RIFA
                    </button>
                  </div>
                ) : (
                  <div className={viewMode === 'grid' ? 'grid grid-cols-1 xl:grid-cols-2 gap-8 pb-10' : 'space-y-6 pb-10'}>
                    {raffles.map((raffle) => (
                      <motion.div
                        key={raffle.id}
                        layout
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={`bg-white group relative transition-all ${
                          viewMode === 'grid' 
                          ? 'p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white flex flex-col justify-between hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2' 
                          : 'p-6 px-10 rounded-3xl border border-white shadow-lg flex items-center justify-between hover:shadow-xl'
                        }`}
                      >
                        <div className={viewMode === 'grid' ? 'space-y-6' : 'flex items-center gap-8 flex-1'}>
                          <div className="flex justify-between items-start">
                            <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase px-4 py-1.5 rounded-full ring-1 ring-indigo-100">Campanha Ativa</span>
                            <span className="text-slate-300 font-mono text-xs uppercase tracking-tighter">#{raffle.id.slice(-6)}</span>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className={`${viewMode === 'grid' ? 'text-3xl' : 'text-xl'} font-black text-slate-900 leading-tight mb-2 group-hover:text-indigo-600 transition-colors truncate`}>
                              {raffle.name}
                            </h3>
                            <p className="text-slate-400 font-medium text-sm flex items-center gap-2">
                               Iniciada em {raffle.createdAt?.toDate().toLocaleDateString('pt-BR')} 
                            </p>
                          </div>
                          
                          <div className={viewMode === 'grid' ? 'pt-6 flex items-center justify-between border-t border-slate-50' : 'flex items-center gap-8'}>
                            <div className="flex items-center gap-4">
                              <div className="flex -space-x-2">
                                 <div className="w-10 h-10 rounded-full bg-indigo-50 border-4 border-white flex items-center justify-center text-[10px] font-black text-indigo-600">
                                    <Ticket className="w-3 h-3" />
                                 </div>
                              </div>
                              <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Painel</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => setSelectedRaffle(raffle)}
                                className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-xs hover:bg-indigo-600 transition-colors shadow-lg shadow-slate-200"
                              >
                                GERENCIAR
                              </button>
                              <button 
                                onClick={() => deleteRaffle(raffle.id)}
                                className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                title="Remover campanha"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </section>
          </>
        )}
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
                  <Gift className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-4xl font-black tracking-tighter text-slate-900">Nova Rifa</h3>
                  <p className="text-slate-500 font-medium text-lg">Crie uma nova oportunidade de sorte.</p>
                </div>
              </div>

              <form onSubmit={handleAddRaffle} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Nome do Sorteio</label>
                  <input
                    autoFocus
                    type="text"
                    placeholder="Ex: iPhone 15 Pro Max Titanium"
                    value={newRaffleName}
                    onChange={(e) => setNewRaffleName(e.target.value)}
                    className="w-full p-6 bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-600 outline-none transition-all text-xl font-bold placeholder:text-slate-300"
                  />
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
                    disabled={!newRaffleName.trim()}
                    className="flex-[2] py-5 bg-indigo-600 text-yellow-400 font-black text-lg rounded-2xl shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:shadow-none uppercase tracking-widest"
                  >
                    CRIAR AGORA
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
