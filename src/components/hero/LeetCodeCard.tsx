import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SiLeetcode } from "react-icons/si";
import { ExternalLink } from "lucide-react";

interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
  acceptanceRate: number;
}

// Fallback data in case the API is down
const FALLBACK: LeetCodeStats = {
  totalSolved: 0,
  totalQuestions: 3000,
  easySolved: 0,
  totalEasy: 800,
  mediumSolved: 0,
  totalMedium: 1700,
  hardSolved: 0,
  totalHard: 700,
  ranking: 0,
  acceptanceRate: 0,
};

const DifficultyBar = ({
  label,
  solved,
  total,
  textColor,
  barColor,
}: {
  label: string;
  solved: number;
  total: number;
  textColor: string;
  barColor: string;
}) => {
  const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className={`w-14 font-mono text-xs ${textColor}`}>{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        />
      </div>
      <span className="font-mono text-xs text-muted-foreground w-8 text-right">
        {solved}
      </span>
    </div>
  );
};

interface LeetCodeCardProps {
  username: string;
}

const LeetCodeCard = ({ username }: LeetCodeCardProps) => {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://leetcode-stats-api.herokuapp.com/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        setStats({
          totalSolved: data.totalSolved ?? 0,
          totalQuestions: data.totalQuestions ?? FALLBACK.totalQuestions,
          easySolved: data.easySolved ?? 0,
          totalEasy: data.totalEasy ?? FALLBACK.totalEasy,
          mediumSolved: data.mediumSolved ?? 0,
          totalMedium: data.totalMedium ?? FALLBACK.totalMedium,
          hardSolved: data.hardSolved ?? 0,
          totalHard: data.totalHard ?? FALLBACK.totalHard,
          ranking: data.ranking ?? 0,
          acceptanceRate: data.acceptanceRate ?? 0,
        });
      })
      .catch(() => setStats(FALLBACK))
      .finally(() => setLoading(false));
  }, [username]);

  const profileUrl = `https://leetcode.com/u/${username}/`;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
      className="relative w-full max-w-xs"
    >
      {/* Glow behind card */}
      <div className="absolute inset-0 rounded-2xl blur-xl opacity-20 bg-primary pointer-events-none" />

      <div className="relative rounded-2xl border border-primary/30 bg-card p-5 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <SiLeetcode className="h-5 w-5 text-[#FFA116]" />
            <span className="font-mono text-sm font-semibold text-foreground">
              LeetCode
            </span>
          </div>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
          >
            @{username}
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {loading ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-8 bg-muted rounded-lg w-1/2" />
            <div className="h-3 bg-muted rounded w-3/4" />
            <div className="h-3 bg-muted rounded w-full" />
            <div className="h-3 bg-muted rounded w-full" />
            <div className="h-3 bg-muted rounded w-full" />
          </div>
        ) : stats ? (
          <>
            {/* Total solved */}
            <div className="mb-4">
              <div className="flex items-end gap-1.5">
                <span className="text-3xl font-bold text-primary font-mono">
                  {stats.totalSolved}
                </span>
                <span className="text-muted-foreground text-sm mb-1 font-mono">
                  / {stats.totalQuestions}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                problems solved
              </p>
            </div>

            {/* Difficulty breakdown */}
            <div className="space-y-2 mb-4">
              <DifficultyBar
                label="Easy"
                solved={stats.easySolved}
                total={stats.totalEasy}
                textColor="text-green-400"
                barColor="bg-green-400"
              />
              <DifficultyBar
                label="Medium"
                solved={stats.mediumSolved}
                total={stats.totalMedium}
                textColor="text-yellow-400"
                barColor="bg-yellow-400"
              />
              <DifficultyBar
                label="Hard"
                solved={stats.hardSolved}
                total={stats.totalHard}
                textColor="text-red-400"
                barColor="bg-red-400"
              />
            </div>

            {/* Footer stats */}
            <div className="flex items-center justify-between pt-3 border-t border-border text-xs font-mono text-muted-foreground">
              {stats.ranking > 0 && (
                <span>
                  Rank{" "}
                  <span className="text-primary">
                    #{stats.ranking.toLocaleString()}
                  </span>
                </span>
              )}
              {stats.acceptanceRate > 0 && (
                <span>
                  Acceptance{" "}
                  <span className="text-primary">
                    {stats.acceptanceRate.toFixed(1)}%
                  </span>
                </span>
              )}
            </div>
          </>
        ) : null}
      </div>
    </motion.div>
  );
};

export default LeetCodeCard;
