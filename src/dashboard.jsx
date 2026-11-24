import React, { useMemo, useState } from "react";
import { LayoutDashboard, WalletCards, ArrowDownCircle, ArrowUpCircle, Settings, Bell, Search, Plus, Trash2, CalendarDays, Tag, CircleDollarSign, TrendingUp, TrendingDown, Menu, X } from "lucide-react";
import "./dashboard.css";

const categories = ["Alimentação", "Moradia", "Transporte", "Lazer", "Saúde", "Contas", "Educação", "Outros"];
const money = (value) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(value) || 0);
const formatDateKey = (date) => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;

function Calendar({ expenses }) {

  const [selectedDate, setSelectedDate] =
    useState(new Date());

  const [currentDate, setCurrentDate] =
    useState(new Date());


  /* =======================================================
     NOMES DOS MESES
  ======================================================== */

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ];


  /* =======================================================
     DIAS DA SEMANA
  ======================================================== */

  const weekDays = [
    "SEG",
    "TER",
    "QUA",
    "QUI",
    "SEX",
    "SÁB",
    "DOM"
  ];


  /* =======================================================
     DATA DO CALENDÁRIO
  ======================================================== */

  const year =
    currentDate.getFullYear();

  const month =
    currentDate.getMonth();


  /* =======================================================
     PRIMEIRO DIA DO MÊS
  ======================================================== */

  const firstDay =
    new Date(
      year,
      month,
      1
    );


  /*
   * Segunda-feira = 0
   * Domingo = 6
   */

  const startDay =
    (firstDay.getDay() + 6) % 7;


  /* =======================================================
     QUANTIDADE DE DIAS DO MÊS
  ======================================================== */

  const daysInMonth =
    new Date(
      year,
      month + 1,
      0
    ).getDate();


  /* =======================================================
     QUANTIDADE DE DIAS DO MÊS ANTERIOR
  ======================================================== */

  const daysInPreviousMonth =
    new Date(
      year,
      month,
      0
    ).getDate();


  /* =======================================================
     CRIAR DIAS DO CALENDÁRIO
  ======================================================== */

  const calendarDays = [];


  /* =======================================================
     DIAS DO MÊS ANTERIOR
  ======================================================== */

  for (
    let i = startDay - 1;
    i >= 0;
    i--
  ) {

    calendarDays.push({

      day:
        daysInPreviousMonth - i,

      currentMonth: false,

      date:
        new Date(
          year,
          month - 1,
          daysInPreviousMonth - i
        )

    });

  }


  /* =======================================================
     DIAS DO MÊS ATUAL
  ======================================================== */

  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {

    calendarDays.push({

      day,

      currentMonth: true,

      date:
        new Date(
          year,
          month,
          day
        )

    });

  }


  /* =======================================================
     DIAS DO PRÓXIMO MÊS
  ======================================================== */

  let nextDay = 1;

  while (
    calendarDays.length % 7 !== 0
  ) {

    calendarDays.push({

      day: nextDay,

      currentMonth: false,

      date:
        new Date(
          year,
          month + 1,
          nextDay
        )

    });

    nextDay++;

  }


  /* =======================================================
     VERIFICAR SE É O MESMO DIA
  ======================================================== */

  const isSameDay = (
    date1,
    date2
  ) => {

    return (

      date1.getFullYear() ===
        date2.getFullYear()

      &&

      date1.getMonth() ===
        date2.getMonth()

      &&

      date1.getDate() ===
        date2.getDate()

    );

  };


  /* =======================================================
     PEGAR DESPESAS DE UM DIA
  ======================================================== */

  const getDayExpenses = (date) => {

    const key =
      formatDateKey(date);

    return expenses.filter(
      (expense) =>
        expense.date === key
    );

  };


  /* =======================================================
     TOTAL DE UM DIA
  ======================================================== */

  const getDayTotal = (date) => {

    return getDayExpenses(date)
      .reduce(

        (sum, expense) =>
          sum +
          Number(expense.value),

        0

      );

  };


  /* =======================================================
     TOTAL DO MÊS VISUALIZADO
  ======================================================== */

  const monthTotal = useMemo(() => {

    return expenses

      .filter((expense) => {

        const date =
          new Date(
            `${expense.date}T12:00:00`
          );

        return (

          date.getFullYear() ===
            year

          &&

          date.getMonth() ===
            month

        );

      })

      .reduce(

        (sum, expense) =>
          sum +
          Number(expense.value),

        0

      );

  }, [
    expenses,
    year,
    month
  ]);


  /* =======================================================
     TOTAL DA SEMANA DA DATA SELECIONADA
  ======================================================== */

  const weekTotal = useMemo(() => {

    const selected =
      new Date(selectedDate);


    /*
     * Segunda-feira = primeiro dia
     */

    const dayOfWeek =
      (selected.getDay() + 6) % 7;


    /*
     * Encontrar segunda-feira
     */

    const monday =
      new Date(selected);

    monday.setDate(
      selected.getDate() -
        dayOfWeek
    );

    monday.setHours(
      0,
      0,
      0,
      0
    );


    /*
     * Encontrar domingo
     */

    const sunday =
      new Date(monday);

    sunday.setDate(
      monday.getDate() + 6
    );

    sunday.setHours(
      23,
      59,
      59,
      999
    );


    return expenses

      .filter((expense) => {

        const date =
          new Date(
            `${expense.date}T12:00:00`
          );

        return (
          date >= monday &&
          date <= sunday
        );

      })

      .reduce(

        (sum, expense) =>
          sum +
          Number(expense.value),

        0

      );

  }, [
    expenses,
    selectedDate
  ]);


  /* =======================================================
     TOTAL DO DIA SELECIONADO
  ======================================================== */

  const selectedDayTotal =
    getDayTotal(
      selectedDate
    );


  /* =======================================================
     DESPESAS DO DIA SELECIONADO
  ======================================================== */

  const selectedDayExpenses =
    getDayExpenses(
      selectedDate
    );


  /* =======================================================
     SELECIONAR DIA
  ======================================================== */

  const handleSelectDate = (
    date
  ) => {

    setSelectedDate(date);


    /*
     * Se clicar em outro mês,
     * muda o calendário.
     */

    if (

      date.getMonth() !==
        month

      ||

      date.getFullYear() !==
        year

    ) {

      setCurrentDate(
        new Date(
          date.getFullYear(),
          date.getMonth(),
          1
        )
      );

    }

  };


  /* =======================================================
     MÊS ANTERIOR
  ======================================================== */

  const previousMonth = () => {

    setCurrentDate(
      new Date(
        year,
        month - 1,
        1
      )
    );

  };


  /* =======================================================
     PRÓXIMO MÊS
  ======================================================== */

  const nextMonth = () => {

    setCurrentDate(
      new Date(
        year,
        month + 1,
        1
      )
    );

  };


  /* =======================================================
     IR PARA HOJE
  ======================================================== */

  const goToToday = () => {

    const today =
      new Date();

    setSelectedDate(
      today
    );

    setCurrentDate(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      )
    );

  };


  /* =======================================================
     RENDER
  ======================================================== */

  return (

    <section className="calendar-panel">


      {/* =================================================
          CABEÇALHO
      ================================================== */}

      <div className="calendar-header">

        <div>

          <span className="eyebrow">
            CONTROLE FINANCEIRO
          </span>

          <h2>
            Gastos por período
          </h2>

          <p className="calendar-subtitle">
            Consulte quanto você gastou em cada
            dia, semana ou mês.
          </p>

        </div>


        <div className="calendar-navigation">

          <button
            type="button"
            className="calendar-nav-button"
            onClick={previousMonth}
            aria-label="Mês anterior"
          >
            ‹
          </button>


          <strong>
            {monthNames[month]} {year}
          </strong>


          <button
            type="button"
            className="calendar-nav-button"
            onClick={nextMonth}
            aria-label="Próximo mês"
          >
            ›
          </button>

        </div>

      </div>


      {/* =================================================
          RESUMO FINANCEIRO
      ================================================== */}

      <div className="calendar-summary">


        {/* DIA */}

        <div className="calendar-summary-card">

          <span>
            Gasto no dia
          </span>

          <strong>
            {money(
              selectedDayTotal
            )}
          </strong>

          <small>
            {selectedDate.toLocaleDateString(
              "pt-BR"
            )}
          </small>

        </div>


        {/* SEMANA */}

        <div className="calendar-summary-card">

          <span>
            Gasto na semana
          </span>

          <strong>
            {money(
              weekTotal
            )}
          </strong>

          <small>
            Semana da data selecionada
          </small>

        </div>


        {/* MÊS */}

        <div className="calendar-summary-card">

          <span>
            Gasto no mês
          </span>

          <strong>
            {money(
              monthTotal
            )}
          </strong>

          <small>
            {monthNames[month]} {year}
          </small>

        </div>

      </div>


      {/* =================================================
          BOTÃO HOJE
      ================================================== */}

      <div className="calendar-today-row">

        <button
          type="button"
          className="calendar-today-button"
          onClick={goToToday}
        >
          Ir para hoje
        </button>

      </div>


      {/* =================================================
          CABEÇALHO DOS DIAS
      ================================================== */}

      <div className="calendar-grid">

        {weekDays.map(
          (day) => (

            <div
              key={day}
              className={`calendar-weekday ${
                day === "SÁB" ||
                day === "DOM"
                  ? "weekend"
                  : ""
              }`}
            >
              {day}
            </div>

          )
        )}


        {/* =================================================
            DIAS
        ================================================== */}

        {calendarDays.map(
          (item, index) => {

            const weekend =
              index % 7 === 5 ||
              index % 7 === 6;


            const selected =
              isSameDay(
                item.date,
                selectedDate
              );


            const dayTotal =
              getDayTotal(
                item.date
              );


            const hasExpenses =
              dayTotal > 0;


            return (

              <button
                key={`${formatDateKey(
                  item.date
                )}-${index}`}
                type="button"
                onClick={() =>
                  handleSelectDate(
                    item.date
                  )
                }
                className={`
                  calendar-day
                  ${!item.currentMonth
                    ? "other-month"
                    : ""}
                  ${weekend
                    ? "weekend"
                    : ""}
                  ${selected
                    ? "selected"
                    : ""}
                  ${hasExpenses
                    ? "has-expenses"
                    : ""}
                `}
              >

                <span className="calendar-day-number">
                  {item.day}
                </span>


                {hasExpenses && (

                  <span className="calendar-day-total">

                    {money(
                      dayTotal
                    )}

                  </span>

                )}

              </button>

            );

          }
        )}

      </div>


      {/* =================================================
          DETALHES DO DIA SELECIONADO
      ================================================== */}

      <div className="calendar-selected-day">

        <div className="calendar-selected-header">

          <div>

            <span className="eyebrow">
              DATA SELECIONADA
            </span>

            <h3>
              {selectedDate.toLocaleDateString(
                "pt-BR",
                {
                  day: "2-digit",
                  month: "long",
                  year: "numeric"
                }
              )}
            </h3>

          </div>


          <strong>
            {money(
              selectedDayTotal
            )}
          </strong>

        </div>


        {selectedDayExpenses.length === 0 ? (

          <div className="calendar-empty">

            Nenhuma despesa registrada
            neste dia.

          </div>

        ) : (

          <div className="calendar-expenses">

            {selectedDayExpenses.map(
              (expense) => (

                <div
                  className="calendar-expense-item"
                  key={expense.id}
                >

                  <div>

                    <strong>
                      {expense.description}
                    </strong>

                    <span>
                      {expense.category}
                    </span>

                  </div>


                  <strong className="calendar-expense-value">

                    {money(
                      expense.value
                    )}

                  </strong>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </section>

  );

}



function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const [monthlyLimit, setMonthlyLimit] = useState(() => {
    const saved = localStorage.getItem("monthlyLimit");
    const parsed = saved !== null ? Number(saved) : NaN;

    // Corrige o valor antigo usado nas versões anteriores.
    if (!Number.isNaN(parsed) && (parsed === 4500 || parsed === 4309.72 || parsed === 3981.4)) {
      return 4045.07;
    }

    return !Number.isNaN(parsed) ? parsed : 4045.07;
  });

  const [form, setForm] = useState({
    description: "",
    value: "",
    category: "Alimentação",
    date: new Date().toISOString().slice(0, 10)
  });

  const [filter, setFilter] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const monthlyIncome = 4500;

  React.useEffect(() => localStorage.setItem("monthlyLimit", monthlyLimit), [monthlyLimit]);
  React.useEffect(() => {
    fetch("http://localhost:8080/api/expenses")
      .then((response) => {
        if (!response.ok) throw new Error("API offline");
        return response.json();
      })
      .then((data) => {
        setExpenses(Array.isArray(data) ? data : []);
        setApiError("");
      })
      .catch(() => setApiError("Backend offline. Inicie o Spring Boot em http://localhost:8080."))
      .finally(() => setLoading(false));
  }, []);

  const total = useMemo(() => expenses.reduce((sum, item) => sum + Number(item.value || 0), 0), [expenses]);
  // O limite disponível exibido no topo é o próprio limite mensal definido.
  const availableBalance = monthlyLimit;
  const progressPercentage = monthlyLimit > 0 ? Math.min((total / monthlyLimit) * 100, 100) : 0;

  const currentMonthExpenses = useMemo(() => {
    const now = new Date();
    return expenses.filter((expense) => {
      const d = new Date(`${expense.date}T12:00:00`);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
  }, [expenses]);

  const currentMonthTotal = useMemo(
    () => currentMonthExpenses.reduce((sum, item) => sum + Number(item.value || 0), 0),
    [currentMonthExpenses]
  );

  const byCategory = useMemo(() => {
    return categories
      .map((category) => ({
        category,
        value: expenses
          .filter((expense) => expense.category === category)
          .reduce((sum, expense) => sum + Number(expense.value || 0), 0)
      }))
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [expenses]);

  const maxCategory = Math.max(...byCategory.map((item) => item.value), 1);
  const filtered = expenses.filter((item) =>
    `${item.description} ${item.category}`.toLowerCase().includes(filter.toLowerCase())
  );

  const recentExpenses = [...expenses].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  const categoryColors = ["#347ff1", "#61a0f7", "#8495df", "#c486bb", "#ffb15f", "#7f91ad", "#48b982", "#8ca6d2"];
  const donutTotal = byCategory.reduce((sum, item) => sum + item.value, 0);
  let accumulated = 0;
  const donutSegments = byCategory.map((item, index) => {
    const start = accumulated;
    accumulated += donutTotal ? (item.value / donutTotal) * 100 : 0;
    return `${categoryColors[index % categoryColors.length]} ${start}% ${accumulated}%`;
  });

  const save = (next) => setExpenses(next);

  const addExpense = async (e) => {
    e.preventDefault();
    const value = Number(String(form.value).replace(",", "."));
    if (!form.description.trim() || !value || value <= 0 || !form.date) return;

    try {
      const response = await fetch("http://localhost:8080/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: form.description.trim(),
          value,
          category: form.category,
          date: form.date
        })
      });
      if (!response.ok) throw new Error();
      const created = await response.json();
      save([...expenses, created]);
      setApiError("");
      setForm({ description: "", value: "", category: "Alimentação", date: new Date().toISOString().slice(0, 10) });
    } catch {
      setApiError("Não foi possível salvar. Verifique se o backend está rodando.");
    }
  };

  const removeExpense = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/expenses/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error();
      save(expenses.filter((item) => item.id !== id));
      setApiError("");
    } catch {
      setApiError("Não foi possível excluir a despesa.");
    }
  };

  return (
    <div className="app">
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="brand">
          <button className="brand-home" type="button" onClick={() => { window.location.href = "/"; }}>
            <div className="brand-mark"><WalletCards size={21} /></div>
            <div><strong>MeuFinance</strong><span>Seu dinheiro, no controle</span></div>
          </button>
          <button className="close-mobile" onClick={() => setMobileOpen(false)}><X size={20} /></button>
        </div>

        <nav>
          <div className="nav-label">MENU</div>
          <a className="active" href="#dashboard" onClick={() => setMobileOpen(false)}><LayoutDashboard size={18} />Dashboard</a>
          <a href="#despesas" onClick={() => setMobileOpen(false)}><ArrowDownCircle size={18} />Despesas</a>
          <a href="#receitas" onClick={() => setMobileOpen(false)}><ArrowUpCircle size={18} />Receitas</a>
          <a href="#categorias" onClick={() => setMobileOpen(false)}><Tag size={18} />Categorias</a>
          <a href="#metas"><TrendingUp size={18} />Metas</a>
          <a href="#relatorios"><CircleDollarSign size={18} />Relatórios</a>
          <div className="nav-label second">OUTROS</div>
          <a href="#notificacoes"><Bell size={18} />Notificações <span className="badge">3</span></a>
          <a href="#configuracoes"><Settings size={18} />Configurações</a>
        </nav>

        <div className="sidebar-footer">
          <div className="mini-avatar">AL</div>
          <div><strong>Abdeel Lucena</strong><span>Plano gratuito</span></div>
        </div>
      </aside>

      <main className="main" id="dashboard">
        <header className="topbar">
          <button className="menu-mobile" onClick={() => setMobileOpen(true)}><Menu size={22} /></button>
          <div className="page-title">
            <span>Olá, Abdeel!</span>
            <h1>Dashboard Financeiro</h1>
            <p>Acompanhe seus gastos, receitas e mantenha o controle da sua vida financeira.</p>
          </div>
          <div className="top-actions">
            <label className="search"><Search size={17} /><input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Buscar em todas as categorias..." /></label>
            <button className="icon-button" aria-label="Notificações"><Bell size={20} /><span /></button>
          </div>
        </header>

        {apiError && <div className="api-error">{apiError}</div>}

        <section className="hero">
          <div className="hero-balance">
            <span>Limite disponível <span className="eye">◉</span></span>
            <strong>{money(availableBalance)}</strong>
            <small>↗ +12,5% vs. mês anterior</small>
          </div>

          <div className="hero-finance">
            <div className="hero-line">
              <span>Limite mensal</span>
              <div className="monthly-limit-edit">
                <span className="currency-prefix">R$</span>
                <input
                  type="number"
                  value={monthlyLimit}
                  onChange={(e) => setMonthlyLimit(Number(e.target.value) || 0)}
                  aria-label="Limite mensal"
                />
              </div>
              <div className="progress"><i style={{ width: `${progressPercentage}%` }} /></div>
            </div>
            <div className="hero-spent">
              <div><span>Gasto no mês</span><strong>{money(total)}</strong></div>
              <span className="hero-percentage">{progressPercentage.toFixed(1).replace(".", ",")}% do limite</span>
            </div>
          </div>

          <div className="hero-wallet"><img src="/img/carteira.png" alt="Ilustração financeira" /></div>
        </section>

        <section className="cards" id="receitas">
          <article className="stat-card"><div className="stat-icon red"><TrendingDown size={21} /></div><div><span>Despesas do mês</span><strong>{money(total)}</strong><small>↘ 8,2% vs. mês anterior</small></div></article>
          <article className="stat-card"><div className="stat-icon green"><TrendingUp size={21} /></div><div><span>Receitas do mês</span><strong>{money(monthlyIncome)}</strong><small>↗ 14,6% vs. mês anterior</small></div></article>
          <article className="stat-card"><div className="stat-icon purple"><TrendingUp size={21} /></div><div><span>Metas em andamento</span><strong>2 de 4</strong><small>50% concluídas</small></div></article>
          <article className="stat-card"><div className="stat-icon blue"><CalendarDays size={21} /></div><div><span>Total de lançamentos</span><strong>{expenses.length}</strong><small>despesas e receitas</small></div></article>
        </section>

        <section className="insights-grid">
          <article className="panel recent-panel" id="despesas">
            <div className="panel-heading"><div className="heading-with-icon"><div className="section-icon"><CalendarDays size={18} /></div><h2>Movimentações recentes</h2></div><a className="view-all" href="#despesas">Ver todas <span>→</span></a></div>
            <div className="recent-list">
              {recentExpenses.length === 0 ? <div className="empty">Nenhuma movimentação registrada.</div> : recentExpenses.map((expense, index) => (
                <div className="recent-item" key={expense.id ?? `${expense.date}-${index}`}>
                  <div className="recent-icon"><WalletCards size={18} /></div>
                  <div className="recent-info"><strong>{expense.description}</strong><span>{expense.category}</span></div>
                  <span className="recent-date">{new Date(`${expense.date}T12:00:00`).toLocaleDateString("pt-BR")}</span>
                  <strong className="recent-value">- {money(expense.value)}</strong>
                </div>
              ))}
            </div>
          </article>

          <article className="panel category-summary" id="categorias">
            <div className="panel-heading"><div className="heading-with-icon"><div className="section-icon"><TrendingUp size={18} /></div><h2>Resumo por categoria</h2></div><a className="view-all" href="#categorias">Ver todas <span>→</span></a></div>
            <div className="donut-layout">
              <div className="donut" style={{ background: `conic-gradient(${donutSegments.length ? donutSegments.join(", ") : "#e8eef7 0 100%"})` }}>
                <div className="donut-center"><span>Total de gastos</span><strong>{money(total)}</strong></div>
              </div>
              <div className="category-legend">
                {byCategory.length === 0 ? <div className="empty">Nenhuma despesa registrada.</div> : byCategory.slice(0, 6).map((item, index) => {
                  const pct = donutTotal ? (item.value / donutTotal) * 100 : 0;
                  return <div className="legend-row" key={item.category}><span className="legend-name"><i style={{ background: categoryColors[index % categoryColors.length] }} />{item.category}</span><span>{pct.toFixed(1).replace(".", ",")}%</span><strong>{money(item.value)}</strong></div>;
                })}
              </div>
            </div>
          </article>
        </section>

        <section className="panel goals-panel" id="metas">
          <div className="panel-heading"><div className="heading-with-icon"><div className="section-icon"><TrendingUp size={18} /></div><h2>Metas financeiras</h2></div><a className="view-all" href="#metas">Ver todas <span>→</span></a></div>
          <div className="goal-row">
            <div className="goal-icon"><TrendingUp size={20} /></div>
            <div className="goal-content"><strong>Viagem dos sonhos</strong><div className="goal-track"><i style={{ width: "40%" }} /></div><div className="goal-meta"><span>R$ 1.200,00 / R$ 3.000,00</span><strong>40%</strong></div></div>
            <button className="add-goal"><Plus size={22} /><span>Adicionar meta</span></button>
          </div>
        </section>

        <Calendar expenses={expenses} />

        <section className="grid original-tools">
          <article className="panel form-panel">
            <div className="panel-heading"><div><span className="eyebrow">NOVO LANÇAMENTO</span><h2>Adicionar despesa</h2></div><button className="plus"><Plus size={18} /></button></div>
            <form onSubmit={addExpense}>
              <label>Descrição<input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Ex.: Mercado" /></label>
              <div className="two-col"><label>Valor<input type="number" step="0.01" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} placeholder="R$ 0,00" /></label><label>Data<input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></label></div>
              <label>Categoria<select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
              <button className="primary" type="submit"><Plus size={18} />Registrar despesa</button>
            </form>
          </article>

          <article className="panel category-panel">
            <div className="panel-heading"><div><span className="eyebrow">ANÁLISE</span><h2>Gastos por categoria</h2></div><span className="month-pill">Setembro</span></div>
            <div className="bars">
              {byCategory.length === 0 ? <div className="empty">Nenhuma despesa registrada.</div> : byCategory.map((item) => <div className="bar-row" key={item.category}><div className="bar-label"><span>{item.category}</span><strong>{money(item.value)}</strong></div><div className="bar-track"><i style={{ width: `${(item.value / maxCategory) * 100}%` }} /></div></div>)}
            </div>
          </article>
        </section>

        <section className="panel expense-panel">
          <div className="panel-heading"><div><span className="eyebrow">MOVIMENTAÇÕES</span><h2>Despesas recentes</h2></div><span className="result-count">{filtered.length} registros</span></div>
          <div className="table-wrap">
            {loading && <div className="loading">Carregando despesas...</div>}
            <table><thead><tr><th>Descrição</th><th>Categoria</th><th>Data</th><th>Valor</th><th /></tr></thead><tbody>
              {filtered.length === 0 ? <tr><td colSpan="5" className="empty">Nenhuma despesa encontrada.</td></tr> : filtered.slice().sort((a,b) => b.date.localeCompare(a.date)).map((expense) => <tr key={expense.id}><td><strong>{expense.description}</strong></td><td><span className="category">{expense.category}</span></td><td><span className="date"><CalendarDays size={15} />{new Date(`${expense.date}T12:00:00`).toLocaleDateString("pt-BR")}</span></td><td className="value">{money(expense.value)}</td><td><button className="delete" onClick={() => removeExpense(expense.id)} aria-label={`Excluir ${expense.description}`}><Trash2 size={17} /></button></td></tr>)}
            </tbody></table>
          </div>
        </section>

        <footer>MeuFinance • Controle financeiro pessoal</footer>
      </main>
    </div>
  );
}

export default App;
