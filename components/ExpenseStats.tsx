import React from "react";
import getUserRecord from "@/app/actions/getUserRecord";
import getBestWorstExpense from "@/app/actions/getBestWorstEspense";

const ExpenseStats = async () => {
  try {
    // Fetch both average and range data
    const [userRecordResult, rangeResult] = await Promise.all([
      getUserRecord(),
      getBestWorstExpense(),
    ]);

    const { record, daysWithRecords } = userRecordResult;
    const { bestExpense, worstExpense } = rangeResult;

    // Calculate average expense
    const validRecord = record || 0;
    const validDays =
      daysWithRecords && daysWithRecords > 0 ? daysWithRecords : 1;
    const averageExpense = validRecord / validDays;

    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 hover:shadow-2xl">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-slate-500 via-stone-500 to-neutral-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-sm sm:text-lg">📊</span>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
              Estatísticas de despesas
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Seus insights e intervalos de gastos
            </p>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {/* Average Daily Spending */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-3 sm:p-4 border border-gray-200/50 dark:border-gray-600/50">
            <div className="text-center">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-2 tracking-wide uppercase">
                Gastos médios diários
              </p>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                ${averageExpense.toFixed(2)}
              </div>
              <div className="inline-flex items-center gap-2 bg-slate-50 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-full text-xs font-medium">
                <span className="w-1.5 h-1.5 bg-slate-500 dark:bg-slate-400 rounded-full"></span>
                Baseado em {validDays} dias com despesas
              </div>
            </div>
          </div>

          {/* Expense Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {/* Highest Expense */}
            <div className="bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm p-3 sm:p-4 rounded-xl border-l-4 border-l-red-500 hover:bg-red-50 dark:hover:bg-red-900/30">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-red-100 dark:bg-red-800 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-sm leading-none text-red-600 dark:text-red-300 font-bold">
                    ↑
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 text-xs mb-0.5">
                    Mais alto
                  </h4>
                  <p className="text-lg font-bold text-red-600 dark:text-red-300">
                    {bestExpense !== undefined ? `$${bestExpense}` : "No data"}
                  </p>
                </div>
              </div>
            </div>

            {/* Lowest Expense */}
            <div className="bg-stone-50/80 dark:bg-stone-900/20 backdrop-blur-sm p-3 sm:p-4 rounded-xl border-l-4 border-l-stone-500 hover:bg-stone-50 dark:hover:bg-stone-900/30">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-stone-100 dark:bg-stone-800 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-sm leading-none text-stone-600 dark:text-stone-300 font-bold">
                    ↓
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 text-xs mb-0.5">
                    Mais baixo
                  </h4>
                  <p className="text-lg font-bold text-stone-600 dark:text-stone-300">
                    {worstExpense !== undefined
                      ? `$${worstExpense}`
                      : "No data"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching expense statistics:", error);
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 hover:shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-slate-500 via-stone-500 to-neutral-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-xl">📊</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              Estatísticas de despesas
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Seus insights e intervalos de gastos
            </p>
          </div>
        </div>
        <div className="bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm p-6 rounded-xl border-l-4 border-l-red-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center">
              <span className="text-lg">⚠️</span>
            </div>
            <p className="text-red-800 dark:text-red-300 font-semibold">
              Não é possível carregar estatísticas de despesas
            </p>
          </div>
          <p className="text-red-700 dark:text-red-400 text-sm ml-11">
            Por favor, tente novamente mais tarde
          </p>
        </div>
      </div>
    );
  }
};

export default ExpenseStats;
