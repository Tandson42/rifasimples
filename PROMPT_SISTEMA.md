# Prompt Detalhado do Sistema: RifaFácil (RIFA SIMPLES)

Este documento descreve o sistema de gerenciamento de rifas criado, detalhando suas funcionalidades, tecnologias e design para futuras referências ou reconstruções.

---

## 1. Visão Geral
O **RifaFácil** é uma aplicação web moderna e intuitiva para criadores de rifas que precisam gerenciar seus sorteios de forma profissional. O sistema permite a criação de múltiplas campanhas, registro de compradores e controle de números vendidos, tudo protegido por autenticação segura.

## 2. Funcionalidades Principais

### A. Gestão de Rifas (Campanhas)
- **Criação:** Adição rápida de novas rifas fornecendo apenas um nome.
- **Listagem:** Visualização de todas as rifas do usuário em formatos de **Grade (Grid)** ou **Lista**.
- **Exclusão:** Remoção de campanhas antigas ou finalizadas.
- **Painel de Controle:** Sidebar com estatísticas rápidas (total de rifas ativas) e acesso fácil às ações.

### B. Gestão de Compradores e Bilhetes
- **Nível de Detalhe:** Cada rifa possui sua própria área de gerenciamento.
- **Registro de Venda:** Cadastro de compradores vinculando-os a números específicos (ex: "01, 24, 88").
- **Histórico:** Visualização clara de quem comprou o quê e em qual data.
- **Exclusão de Bilhete:** Possibilidade de cancelar ou remover um registro de venda individual.

### C. Autenticação e Segurança
- **Google Login:** Sistema de entrada simplificado via Firebase Auth (Popup).
- **Isolamento de Dados:** Cada usuário vê e gerencia exclusivamente suas próprias rifas e clientes.
- **Regras de Banco:** Segurança em nível de servidor (Firestore Rules) garantindo integridade dos dados.

---

## 3. Stack Tecnológica
- **Frontend:** React 19 com Vite.
- **Estilização:** Tailwind CSS (configuração v4 'Vibrant Palette').
- **Animações:** Motion (antigo Framer Motion) para transições fluidas e modais.
- **Backend/DB:** Firebase Firestore (Banco de dados NoSQL em tempo real).
- **Autenticação:** Firebase Auth (Google Provider).
- **Ícones:** Lucide React.

---

## 4. Design e Identidade Visual (Vibrant Palette)
O sistema segue uma estética de "Alto Contraste" e "Profissionalismo Moderno":
- **Cores Principais:** Indigo Intenso (`#4f46e5`), Amarelo Vibrante (`#facc15`) e Slate (`#0f172a`).
- **Typography:** Uso da fonte **Inter** com pesos variando de *Medium* a *Black* para hierarquia clara.
- **Elementos UI:**
  - Cantos arredondados generosos (`rounded-3xl`, `rounded-[2.5rem]`).
  - Sombras suaves e profundas para destacar cards.
  - Backdrop blur (vidro jateado) em modais e navegação.
  - Feedback visual em hover (elevação de cards e mudança de cor).

---

## 5. Estrutura de Dados (Firebase)

### Coleção: `raffles`
- `name`: string
- `ownerId`: string (UID do usuário)
- `createdAt`: serverTimestamp

### Subcoleção: `raffles/{raffleId}/tickets`
- `buyerName`: string
- `numbers`: string (armazenado como texto para flexibilidade de formatos como "01-10" ou "avulsos")
- `createdAt`: serverTimestamp

---

## 6. Prompt para Reconstrução (Resumo)
"Construa uma aplicação de gerenciamento de rifas usando React e Firebase. O sistema deve permitir login via Google. O usuário logado deve poder criar 'Rifas' (apenas nome). Ao clicar em uma rifa, deve abrir um painel de detalhes onde é possível registrar 'Compradores' associando seus nomes a 'Números' escolhidos. Utilize uma interface moderna com tema Indigo e Amarelo, cards arredondados e animações de entrada para todos os elementos da lista."
