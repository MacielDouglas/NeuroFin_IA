import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="font-sans bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900/20 text-gray-800 dark:text-gray-200 transition-all duration-300 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden flex flex-col items-center justify-center text-center py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-gray-500/10 via-stone-500/5 to-teal-500/10 dark:from-gray-900/30 dark:via-stone-900/20 dark:to-teal-900/30">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <div className="inline-flex items-center gap-2 bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-lg">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-pulse"></span>
            <span className="hidden sm:inline">
              Desenvolvido pela tecnologia de IA
            </span>
            <span className="sm:hidden">Tecnologia de IA</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100 leading-tight">
            Sobre{" "}
            <span className="bg-gradient-to-r from-gray-600 via-stone-500 to-teal-500 bg-clip-text text-transparent">
              NeuroFinAI
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            Seu companheiro inteligente para monitorar despesas e gerenciar suas
            finanças com insights de ponta baseados em IA.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-0">
            <Link
              href="/sign-up"
              className="group relative overflow-hidden bg-gradient-to-r from-gray-600 via-stone-500 to-teal-500 hover:from-gray-700 hover:via-stone-600 hover:to-teal-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span className="relative z-10">Comece sua jornada</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </Link>
            <Link
              href="/contact"
              className="group border-2 border-gray-500/20 dark:border-gray-400/20 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/20 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-200 backdrop-blur-sm"
            >
              Saber mais
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-500 via-stone-500 to-teal-500"></div>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full"></span>
            Nossa Missão
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-gray-900 dark:text-gray-100 px-2 sm:px-0">
            Transformando a gestão financeira com{" "}
            <span className="text-gray-600 dark:text-gray-400">AI</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            No NeuroFin IA, utilizamos inteligência artificial de ponta para
            revolucionar a forma como as pessoas alcançam o bem-estar
            financeiro. Nossa IA analisa seus padrões de gastos para fornecer
            recomendações personalizadas e insights práticos que levam a melhor
            orçamento e liberdade financeira.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-gray-50 to-stone-50 dark:from-gray-900/20 dark:to-stone-900/20 p-6 rounded-2xl border border-gray-100 dark:border-gray-800/50">
              <div className="text-3xl font-bold text-gray-600 dark:text-gray-400 mb-2">
                10K+
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Usuários ativos
              </div>
            </div>
            <div className="bg-gradient-to-br from-stone-50 to-teal-50 dark:from-stone-900/20 dark:to-teal-900/20 p-6 rounded-2xl border border-stone-100 dark:border-stone-800/50">
              <div className="text-3xl font-bold text-stone-600 dark:text-stone-400 mb-2">
                R$2M+
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Dinheiro rastreado
              </div>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-gray-50 dark:from-teal-900/20 dark:to-gray-900/20 p-6 rounded-2xl border border-teal-100 dark:border-teal-800/50">
              <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">
                99%
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Taxa de satisfação
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium mb-6">
              <span className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full"></span>
              Características
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Por que escolher{" "}
              <span className="text-gray-600 dark:text-gray-400">
                NeuroFin IA?
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Descubra os recursos poderosos que tornam nossa plataforma baseada
              em IA a escolha inteligente para a gestão financeira moderna.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-200 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-stone-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-500 via-stone-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg mb-6">
                  <span className="text-white text-xl">🤖</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  Insights com tecnologia de IA
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Obtenha análises inteligentes dos seus padrões de gastos com
                  recomendações personalizadas de IA e sugestões automatizadas
                  de categorias que aprendem com seu comportamento.
                </p>
              </div>
            </div>

            <div className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-200 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-stone-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-stone-500 via-teal-500 to-gray-500 rounded-xl flex items-center justify-center shadow-lg mb-6">
                  <span className="text-white text-xl">✨</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  Categorização Inteligente
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Deixe que nossa IA categorize automaticamente suas despesas
                  com 99% de precisão e forneça recomendações personalizadas
                  para aprimorar sua gestão orçamentária sem esforço.
                </p>
              </div>
            </div>

            <div className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-200 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-gray-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 via-gray-500 to-stone-500 rounded-xl flex items-center justify-center shadow-lg mb-6">
                  <span className="text-white text-xl">📊</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  Painel Inteligente
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Experimente uma interface moderna e aprimorada por IA com
                  insights em tempo real, análises financeiras interativas e
                  belas visualizações que dão sentido aos seus dados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gray-500/5 to-stone-500/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-teal-500/5 to-gray-500/5 rounded-full blur-2xl"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium mb-6">
              <span className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full"></span>
              Nossa história
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-gray-100">
              Construído para o{" "}
              <span className="text-gray-600 dark:text-gray-400">Futuro</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                O NeuroFin IA nasceu da visão de criar ferramentas de gestão
                financeira verdadeiramente inteligentes. Nossa equipe de
                especialistas financeiros, cientistas de dados e tecnólogos se
                uniu para resolver um problema crítico: tornar a gestão das
                finanças pessoais mais inteligente, intuitiva e eficaz.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Desde o nosso lançamento, ajudamos milhares de usuários a
                conseguir um melhor orçamento e melhorar sua saúde financeira
                geral por meio do poder da inteligência artificial. Cada recurso
                é projetado com a experiência do usuário e o bem-estar
                financeiro em mente.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-stone-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  <div className="w-10 h-10 bg-gradient-to-br from-stone-500 to-teal-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-gray-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <div className="font-semibold">
                    Mais de 10.000 usuários confiam nele
                  </div>
                  <div>Junte-se à nossa comunidade em crescimento</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-stone-50 dark:from-gray-900/20 dark:to-stone-900/20 p-8 rounded-2xl border border-gray-100 dark:border-gray-800/50">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-gray-500 dark:bg-gray-400 rounded-full"></div>
                  <div className="text-gray-900 dark:text-gray-100 font-medium">
                    Fundada em 2024
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-stone-500 dark:bg-stone-400 rounded-full"></div>
                  <div className="text-gray-900 dark:text-gray-100 font-medium">
                    Abordagem IA-First
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-teal-500 dark:bg-teal-400 rounded-full"></div>
                  <div className="text-gray-900 dark:text-gray-100 font-medium">
                    Impacto global
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-gray-500 dark:bg-gray-400 rounded-full"></div>
                  <div className="text-gray-900 dark:text-gray-100 font-medium">
                    Design centrado no usuário
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-500 via-stone-500 to-teal-500"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
            <span className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-pulse"></span>
            Pronto para transformar suas finanças?
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900 dark:text-gray-100">
            Assuma o controle do seu{" "}
            <span className="bg-gradient-to-r from-gray-600 via-stone-500 to-teal-500 bg-clip-text text-transparent">
              Futuro Financeiro
            </span>
          </h2>

          <p className="text-xl md:text-2xl mb-10 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Junte-se a milhares de usuários que já transformaram seus hábitos
            financeiros com o NeuroFin IA. Comece sua jornada rumo a um
            orçamento mais inteligente hoje mesmo.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/sign-up"
              className="group relative overflow-hidden bg-gradient-to-r from-gray-600 via-stone-500 to-teal-500 hover:from-gray-700 hover:via-stone-600 hover:to-teal-600 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center gap-2">
                Comece gratuitamente
                <span className="text-lg">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </Link>

            <Link
              href="/contact"
              className="group border-2 border-gray-500/20 dark:border-gray-400/20 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/20 px-8 py-4 rounded-2xl font-semibold transition-all duration-200 backdrop-blur-sm flex items-center gap-2"
            >
              Contate-nos
              <span className="text-lg group-hover:translate-x-0.5 transition-transform duration-200">
                💬
              </span>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-600 dark:text-gray-400 mb-2">
                Gratuito
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Não é necessário cartão de crédito
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-stone-600 dark:text-stone-400 mb-2">
                24/7
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Suporte com tecnologia de IA
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">
                Instantâneo
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Configuração em minutos
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
