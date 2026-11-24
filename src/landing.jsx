import React, { useState } from "react";

import {
  ArrowRight,
  Play,
  WalletCards,
  Tags,
  Target,
  BarChart3,
  ShieldCheck,
  Smartphone,
  Check,
  Users,
  Star,
  Instagram,
  Linkedin,
  Youtube,
  Menu,
  X,
} from "lucide-react";

import ThreeCards from "./ThreeCards";

function LandingPage() {
  const [open, setOpen] = useState(false);

  // ==========================================
  // NAVEGAÇÃO
  // ==========================================

  const goDashboard = () => {
    setOpen(false);
    window.location.href = "/dashboard";
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const scrollToTop = () => {
    setOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // FUNCIONALIDADES
  // ==========================================

  const features = [
    {
      icon: WalletCards,
      title: "Gastos e receitas",
      text: "Registre tudo o que entra e sai do seu financeiro.",
    },
    {
      icon: Tags,
      title: "Categorias",
      text: "Organize seus gastos de forma inteligente.",
    },
    {
      icon: Target,
      title: "Metas",
      text: "Planeje seus objetivos e acompanhe seu progresso.",
    },
    {
      icon: BarChart3,
      title: "Relatórios",
      text: "Tenha uma visão completa da sua vida financeira.",
    },
    {
      icon: ShieldCheck,
      title: "Segurança",
      text: "Seus dados protegidos com tecnologia de ponta.",
    },
    {
      icon: Smartphone,
      title: "Acessível",
      text: "Use em qualquer dispositivo, quando quiser.",
    },
  ];

  // ==========================================
  // BENEFÍCIOS
  // ==========================================

  const benefits = [
    {
      icon: WalletCards,
      title: "Tenha clareza dos seus gastos",
      text: "Entenda para onde o seu dinheiro está indo e evite surpresas no fim do mês.",
    },
    {
      icon: Target,
      title: "Planeje seus objetivos",
      text: "Crie metas e acompanhe seu progresso com facilidade.",
    },
    {
      icon: BarChart3,
      title: "Economize mais",
      text: "Identifique oportunidades de economia e faça seu dinheiro render mais.",
    },
    {
      icon: Check,
      title: "Tudo em um só lugar",
      text: "Receitas, despesas, metas e relatórios em uma única plataforma.",
    },
  ];

  return (
    <main className="landing-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="landing-header">
        <div className="landing-container header-inner">

          {/* LOGO */}

          <button
            type="button"
            className="brand"
            onClick={scrollToTop}
            aria-label="Voltar ao início"
          >
            <span className="brand-icon">
              <WalletCards size={21} />
            </span>

            <span className="brand-name">
              MeuFinance
            </span>
          </button>

          {/* MENU */}

          <nav
            id="main-navigation"
            className={`main-nav ${open ? "nav-open" : ""}`}
            aria-label="Navegação principal"
          >
            <a
              href="#inicio"
              className="active"
              onClick={closeMenu}
            >
              Início
            </a>

            <a
              href="#sobre"
              onClick={closeMenu}
            >
              Sobre
            </a>

            <a
              href="#contato"
              onClick={closeMenu}
            >
              Contato
            </a>
          </nav>

          {/* BOTÃO DASHBOARD */}

          <button
            type="button"
            className="header-dashboard"
            onClick={goDashboard}
          >
            Dashboard
          </button>

          {/* MENU MOBILE */}

          <button
            type="button"
            className="mobile-menu"
            onClick={() => setOpen((previous) => !previous)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="main-navigation"
          >
            {open ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>

        </div>
      </header>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        id="inicio"
        className="hero-section"
      >
        <div className="landing-container hero-container">

          {/* TEXTO DO HERO */}

          <div className="hero-content">

            <span className="hero-eyebrow">
              Seu dinheiro, no controle.
            </span>

            <h1>
              Organize hoje,
              <span> conquiste amanhã.</span>
            </h1>

            <p className="hero-description">
              O MeuFinance é a plataforma completa para você
              acompanhar seus gastos, controlar suas receitas e
              alcançar seus objetivos financeiros de forma simples,
              rápida e segura.
            </p>

            {/* BOTÕES */}

            <div className="hero-buttons">

              <button
                type="button"
                className="primary-button"
                onClick={goDashboard}
              >
                <span>
                  Comece agora
                </span>

                <ArrowRight size={20} />
              </button>

              <a
                href="#como-funciona"
                className="secondary-button"
                onClick={closeMenu}
              >
                <span className="play-icon">
                  <Play
                    size={12}
                    fill="currentColor"
                  />
                </span>

                <span>
                  Como funciona
                </span>
              </a>

            </div>

            {/* PROVA SOCIAL */}

            <div className="hero-social-proof">

              <div className="avatar-group">

                <span>AL</span>
                <span>JS</span>
                <span>MC</span>
                <span>PA</span>

              </div>

              <span className="users-text">
                +10 mil pessoas já usam
              </span>

              <span className="proof-divider" />

              <div className="stars">

                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={13}
                    fill="currentColor"
                  />
                ))}

              </div>

              <span className="rating">
                4,8/5
              </span>

            </div>

          </div>


          {/* =================================================
              VISUAL DOS CARTÕES
          ================================================= */}

          <div className="hero-visual">

            {/* PALAVRA FINANCE */}

            <div
              className="hero-finance-word"
              aria-hidden="true"
            >
              FINANCE
            </div>

            {/* CARTÕES ANIMADOS */}

            <ThreeCards />

            {/* CARD DE CRESCIMENTO */}

            <div className="hero-growth-card">

              <span className="growth-icon">
                ↗
              </span>

              <div>

                <small>
                  Seu dinheiro está crescendo
                </small>

                <strong>
                  +12,5%
                </strong>

              </div>

            </div>

            {/* TEXTO DO VISUAL */}

            <p className="hero-visual-text">
              Acompanhe seus ganhos, controle seus gastos
              e alcance seus objetivos!
            </p>

          </div>

        </div>
      </section>


      {/* =====================================================
          SOBRE
      ===================================================== */}

      <section
        id="sobre"
        className="about-section"
      >
        <div className="landing-container about-grid">

          {/* INTRODUÇÃO */}

          <div className="about-intro">

            <span className="section-label">
              SOBRE O MEUFINANCE
            </span>

            <h2>
              Mais que um controle,
              <br />
              é um parceiro financeiro.
            </h2>

            <p>
              O MeuFinance foi criado para te ajudar a ter uma
              vida financeira mais saudável. Com uma interface
              simples e intuitiva, você tem tudo o que precisa
              para gerenciar seu dinheiro, planejar o futuro e
              conquistar seus sonhos.
            </p>

            <button
              type="button"
              className="primary-button"
              onClick={goDashboard}
            >
              <span>
                Saiba mais sobre nós
              </span>

              <ArrowRight size={18} />
            </button>

          </div>


          {/* FUNCIONALIDADES */}

          <div className="features-grid">

            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  className="feature-item"
                  key={feature.title}
                >

                  <div className="feature-icon">
                    <Icon size={21} />
                  </div>

                  <h3>
                    {feature.title}
                  </h3>

                  <p>
                    {feature.text}
                  </p>

                </div>
              );
            })}

          </div>

        </div>
      </section>


      {/* =====================================================
          COMO FUNCIONA
      ===================================================== */}

      <section
        id="como-funciona"
        className="steps-section"
      >
        <div className="landing-container steps-container">

          {/* INTRO */}

          <div className="steps-intro">

            <span className="section-label">
              EM 3 PASSOS
            </span>

            <h2>
              Como funciona?
            </h2>

            <p>
              Começar é simples. Em poucos minutos você já
              tem sua vida financeira sob controle.
            </p>

          </div>


          {/* PASSOS */}

          <div className="steps-list">

            {/* PASSO 1 */}

            <div className="step-item">

              <div className="step-number">
                1
              </div>

              <div>

                <h3>
                  Registre
                </h3>

                <p>
                  Adicione seus gastos,
                  receitas e metas.
                </p>

              </div>

            </div>


            <div className="step-line" />


            {/* PASSO 2 */}

            <div className="step-item">

              <div className="step-number">
                2
              </div>

              <div>

                <h3>
                  Acompanhe
                </h3>

                <p>
                  Veja seus resultados em
                  tempo real, com gráficos
                  e relatórios.
                </p>

              </div>

            </div>


            <div className="step-line" />


            {/* PASSO 3 */}

            <div className="step-item">

              <div className="step-number">
                3
              </div>

              <div>

                <h3>
                  Conquiste
                </h3>

                <p>
                  Alcance seus objetivos e
                  construa o futuro que você deseja.
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          PREVIEW DO DASHBOARD
      ===================================================== */}

      <section className="preview-section">

        <div className="landing-container preview-grid">

          {/* TEXTO */}

          <div className="preview-content">

            <span className="section-label">
              PREVIEW DO DASHBOARD
            </span>

            <h2>
              Dê uma olhada no seu futuro financeiro
            </h2>

            <p>
              Tenha uma visão completa da sua vida financeira
              em um só lugar. Nosso dashboard é intuitivo,
              moderno e feito para você.
            </p>

            <button
              type="button"
              className="primary-button"
              onClick={goDashboard}
            >
              <span>
                Ver o dashboard
              </span>

              <ArrowRight size={18} />
            </button>

          </div>


          {/* MINI DASHBOARD */}

          <div
            className="dashboard-preview"
            aria-label="Prévia do dashboard financeiro"
          >

            {/* SIDEBAR */}

            <div className="preview-sidebar">

              <div className="preview-logo">
                <WalletCards size={12} />
              </div>

              <span />
              <span />
              <span />
              <span />
              <span />
              <span />

            </div>


            {/* CONTEÚDO */}

            <div className="preview-main">

              <div className="preview-top">
                Dashboard Financeiro
              </div>


              {/* CARD AZUL */}

              <div className="preview-blue-card">

                <small>
                  Saldo disponível
                </small>

                <strong>
                  R$ 4.045,07
                </strong>

              </div>


              {/* ESTATÍSTICAS */}

              <div className="preview-stats">

                <span />
                <span />
                <span />

              </div>


              {/* GRÁFICOS */}

              <div className="preview-bottom">

                <div />
                <div />

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BENEFÍCIOS
      ===================================================== */}

      <section className="benefits-section">

        <div className="landing-container">

          <span className="section-label">
            BENEFÍCIOS
          </span>

          <h2>
            Por que escolher o MeuFinance?
          </h2>

          <p className="section-description">
            Mais controle, mais liberdade e mais conquistas
            para você.
          </p>


          <div className="benefits-layout">

            {/* BENEFÍCIOS */}

            <div className="benefits-grid">

              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div
                    className="benefit-card"
                    key={benefit.title}
                  >

                    <div className="benefit-icon">
                      <Icon size={20} />
                    </div>

                    <div>

                      <h3>
                        {benefit.title}
                      </h3>

                      <p>
                        {benefit.text}
                      </p>

                    </div>

                  </div>
                );
              })}

            </div>


            {/* DECORAÇÃO */}

            <div className="benefit-decoration">

              <div
                className="decoration-card card-back"
                aria-hidden="true"
              />

              <div
                className="decoration-card card-middle"
                aria-hidden="true"
              />

              <div className="decoration-card card-front">

                <Target size={25} />

                <span>
                  Meta de economia
                </span>

                <strong>
                  R$ 1.200,00
                </strong>

                <div className="progress-bar">
                  <span />
                </div>

                <small>
                  75%
                </small>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          DEPOIMENTOS
      ===================================================== */}

      <section className="testimonials-section">

        <div className="landing-container testimonials-grid">

          {/* INTRO */}

          <div>

            <span className="section-label">
              DEPOIMENTOS
            </span>

            <h2>
              Quem já usa, recomenda!
            </h2>

            <p>
              Milhares de pessoas já transformaram sua relação
              com o dinheiro com o MeuFinance.
            </p>

          </div>


          {/* DEPOIMENTO */}

          <div className="testimonial-card">

            <div className="testimonial-user">

              <span className="testimonial-avatar">
                AL
              </span>

              <div>

                <strong>
                  Ana Luiza Costa
                </strong>

                <small>
                  Cliente desde 2024
                </small>

              </div>

            </div>


            <p>
              "O MeuFinance me ajudou a organizar meus gastos
              e finalmente sair do vermelho. Hoje consigo
              planejar minhas viagens e meus sonhos."
            </p>


            <div className="testimonial-stars">
              ★★★★★
            </div>

          </div>


          {/* NÚMEROS */}

          <div className="testimonial-numbers">

            <div>

              <Users size={21} />

              <strong>
                +10 mil
              </strong>

              <span>
                usuários ativos
              </span>

            </div>


            <div>

              <Star size={21} />

              <strong>
                4,8/5
              </strong>

              <span>
                satisfação dos clientes
              </span>

            </div>


            <div>

              <Check size={21} />

              <strong>
                98%
              </strong>

              <span>
                recomendam o MeuFinance
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="cta-section">

        <div className="landing-container cta-inner">

          <div>

            <span className="section-label">
              PRONTO PARA COMEÇAR?
            </span>

            <h2>
              Cuide melhor do seu dinheiro.
            </h2>

            <p>
              Junte-se a milhares de pessoas que já estão
              construindo um futuro financeiro mais seguro.
            </p>

          </div>


          <button
            type="button"
            className="primary-button"
            onClick={goDashboard}
          >
            <span>
              Comece agora
            </span>

            <ArrowRight size={19} />
          </button>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer
        id="contato"
        className="landing-footer"
      >

        <div className="landing-container footer-inner">

          {/* MARCA */}

          <div className="footer-brand">

            <span className="brand-icon">
              <WalletCards size={19} />
            </span>

            <strong>
              MeuFinance
            </strong>

          </div>


          {/* LINKS */}

          <div className="footer-links">

            <a href="#inicio">
              Início
            </a>

            <a href="#sobre">
              Sobre
            </a>

            <a href="#contato">
              Contato
            </a>

          </div>


          {/* REDES SOCIAIS */}

          <div className="footer-social">

            <a
              href="#contato"
              aria-label="Instagram"
            >
              <Instagram size={17} />
            </a>

            <a
              href="#contato"
              aria-label="LinkedIn"
            >
              <Linkedin size={17} />
            </a>

            <a
              href="#contato"
              aria-label="YouTube"
            >
              <Youtube size={17} />
            </a>

          </div>


          {/* COPYRIGHT */}

          <span className="copyright">
            © 2025 MeuFinance. Todos os direitos reservados.
          </span>

        </div>

      </footer>

    </main>
  );
}

export default LandingPage;