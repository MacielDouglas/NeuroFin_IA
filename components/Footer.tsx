import {
  Bot,
  ChartNoAxesCombined,
  CircleDollarSign,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-stone-50 via-white to-gray-50 dark:from-stone-900 dark:via-stone-800 dark:to-gray-900/20 border-t border-stone-100/50 dark:border-stone-700/50">
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-500 via-stone-500 to-teal-500"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Tagline */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-500 via-stone-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">
                  <CircleDollarSign />
                </span>
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-gray-600 via-stone-500 to-teal-500 bg-clip-text text-transparent">
                NeuroFin IA
              </h2>
            </div>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed max-w-sm">
              Gestão financeira inteligente com tecnologia de IA. Acompanhe suas
              despesas, gerencie seu orçamento e obtenha insights sobre seus
              padrões de gastos.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
              Links Rápidos
            </h3>
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 text-stone-700 dark:text-stone-300 hover:text-gray-600 dark:hover:text-gray-400 text-sm font-medium transition-colors duration-200"
              >
                <span className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                Home
              </Link>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-stone-700 dark:text-stone-300 hover:text-gray-600 dark:hover:text-gray-400 text-sm font-medium transition-colors duration-200"
              >
                <span className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                About
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-stone-700 dark:text-stone-300 hover:text-gray-600 dark:hover:text-gray-400 text-sm font-medium transition-colors duration-200"
              >
                <span className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                Contact
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
              Características
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-stone-600 dark:text-stone-400 text-sm">
                <div className="w-5 h-5  rounded-md flex items-center justify-center shadow-sm">
                  <span className="text-white text-xs">
                    {" "}
                    <Bot />
                  </span>
                </div>
                Insights com tecnologia de IA
              </div>
              <div className="flex items-center gap-3 text-stone-600 dark:text-stone-400 text-sm">
                <div className="w-5 h-5  rounded-md flex items-center justify-center shadow-sm">
                  <span className="text-white text-xs">
                    <Sparkles />
                  </span>
                </div>
                Categorização Inteligente
              </div>
              <div className="flex items-center gap-3 text-stone-600 dark:text-stone-400 text-sm">
                <div className="w-5 h-5  rounded-md flex items-center justify-center shadow-sm">
                  <span className="text-white text-xs">
                    <ChartNoAxesCombined />
                  </span>
                </div>
                Painel de análise
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-stone-200 dark:via-stone-700 to-transparent mb-8"></div>

        {/* Copyright and Social */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-stone-500 dark:text-stone-400 text-sm">
              © {new Date().getFullYear()} NeuroFin IA Todos os direitos
              reservados.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
              <span className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full animate-pulse"></span>
              Desenvolvido por Maciel D.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
