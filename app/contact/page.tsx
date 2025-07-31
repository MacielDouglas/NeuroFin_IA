"use client";

const ContactPage = () => {
  return (
    <div className="font-sans bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900/20 text-gray-800 dark:text-gray-200 transition-all duration-300 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden flex flex-col items-center justify-center text-center py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-gray-500/10 via-stone-500/5 to-teal-500/10 dark:from-gray-900/30 dark:via-stone-900/20 dark:to-teal-900/30">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <div className="inline-flex items-center gap-2 bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-lg">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-pulse"></span>
            Entre em contato
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100 leading-tight">
            Contact{" "}
            <span className="bg-gradient-to-r from-gray-600 via-stone-500 to-teal-500 bg-clip-text text-transparent">
              Rastreador de Despesas AI
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            Tem dúvidas sobre o controle de despesas com IA ou precisa de ajuda?
            Estamos aqui para ajudar você com uma gestão financeira inteligente.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-0">
            <a
              href="mailto:support@expensetracker-ai.com"
              className="group relative overflow-hidden bg-gradient-to-r from-gray-600 via-stone-500 to-teal-500 hover:from-gray-700 hover:via-stone-600 hover:to-teal-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Envie-nos um e-mail
                <span className="text-lg">✉️</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </a>
            <a
              href="tel:+11234567890"
              className="group border-2 border-gray-500/20 dark:border-gray-400/20 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/20 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-200 backdrop-blur-sm flex items-center justify-center gap-2"
            >
              Ligue para nós
              <span className="text-lg">📞</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-500 via-stone-500 to-teal-500"></div>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <span className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full"></span>
              Informações de contato
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100 px-2 sm:px-0">
              Várias maneiras de{" "}
              <span className="text-gray-600 dark:text-gray-400">Conectar</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2 sm:px-0">
              Escolha a forma mais conveniente de entrar em contato com nossa
              equipe de suporte de IA do Rastreador de Despesas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-200 hover:-translate-y-1 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-stone-500/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-500 via-stone-500 to-teal-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg mb-4 sm:mb-6 mx-auto">
                  <span className="text-white text-lg sm:text-xl">✉️</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-gray-100">
                  Suporte por e-mail
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 leading-relaxed">
                  Obtenha assistência detalhada com suas dúvidas. Normalmente,
                  respondemos em até 24 horas.
                </p>
                <a
                  href="mailto:support@expensetracker-ai.com"
                  className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium transition-colors duration-200 text-sm sm:text-base break-all sm:break-normal"
                >
                  <span className="hidden sm:inline">
                    support@rastreadoria.com
                  </span>
                  <span className="sm:hidden">Envie-nos um e-mail</span>
                  <span className="text-sm">→</span>
                </a>
              </div>
            </div>

            <div className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-200 hover:-translate-y-1 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-stone-500/5 to-teal-500/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-stone-500 via-teal-500 to-gray-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg mb-4 sm:mb-6 mx-auto">
                  <span className="text-white text-lg sm:text-xl">📞</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-gray-100">
                  Suporte por telefone
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 leading-relaxed">
                  Fale diretamente com nossa equipe de suporte para assistência
                  imediata em questões urgentes.
                </p>
                <a
                  href="tel:+11234567890"
                  className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium transition-colors duration-200 text-sm sm:text-base"
                >
                  +55 (11) 3001-7890
                  <span className="text-sm">→</span>
                </a>
              </div>
            </div>

            <div className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-200 hover:-translate-y-1 text-center sm:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-gray-500/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-500 via-gray-500 to-stone-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg mb-4 sm:mb-6 mx-auto">
                  <span className="text-white text-lg sm:text-xl">📍</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-gray-100">
                  Localização do escritório
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 leading-relaxed">
                  Visite nossa sede para consultas presenciais e discussões
                  sobre parcerias.
                </p>
                <div className="text-gray-600 dark:text-gray-400 font-medium text-sm sm:text-base">
                  Av. Paulista, 1234, Sala 567
                  <br />
                  São Paulo, SP, 01310-100
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Hours & FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <span className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full"></span>
              Informações de suporte
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100 px-2 sm:px-0">
              Estamos aqui para{" "}
              <span className="text-gray-600 dark:text-gray-400">Ajudar</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100/50 dark:border-gray-700/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-gray-500 via-stone-500 to-teal-500 rounded-md sm:rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs sm:text-sm">🕒</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                  Horário de atendimento
                </h3>
              </div>
              <div className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Segunda - Sexta:</span>
                  <span className="font-medium">9:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábados:</span>
                  <span className="font-medium">10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo:</span>
                  <span className="font-medium">Fechado</span>
                </div>
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <strong>Suporte por e-mail:</strong> Disponível 24 horas por
                    dia, 7 dias por semana, com respostas em até 24 horas
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100/50 dark:border-gray-700/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-stone-500 via-teal-500 to-gray-500 rounded-md sm:rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs sm:text-sm">❓</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                  Ajuda rápida
                </h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-xs sm:text-sm mb-1">
                    Problemas técnicos
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    O aplicativo não está funcionando corretamente? Consulte
                    nosso guia de solução de problemas primeiro.
                  </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-xs sm:text-sm mb-1">
                    Recursos de IA
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Dúvidas sobre insights de IA? Nossa documentação de IA tem
                    as respostas.
                  </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-xs sm:text-sm mb-1">
                    Conta e Faturamento
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Problemas com a conta ou dúvidas sobre faturamento? Entre em
                    contato conosco diretamente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
