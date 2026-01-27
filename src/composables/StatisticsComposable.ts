import { useI18n } from "vue-i18n";
import type { Game } from "../types";

export const useGroupOthers = (games: Game[]) => {
  const { t } = useI18n();
  const counts: Record<string, number> = {}; // Objeto equivalente a un array asociativo
  games.forEach((item) => {
    counts[item.system] = (counts[item.system] || 0) + 1;
  });

  const total = games.length;
  const limit = Math.max(1, Math.floor(total * 0.05)); // porcent para others

  const commons: Record<string, number> = {};
  let others = 0;

  Object.entries(counts).forEach(([system, count]) => {
    if (count >= limit) {
      commons[system] = count;
    } else {
      others += count;
    }
  });

  if (others > 0) commons[t("home.others")] = others;

  return {
    labels: Object.keys(commons),
    datasets: [
      {
        data: Object.values(commons),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#9966FF",
          "#FFCE56",
          "#4BC0C0",
          "#AAAAAA",
        ],
      },
    ],
  };
};
