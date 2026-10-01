import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  HeartPulse,
  Clock,
  Activity,
  Zap,
  Battery,
  Flame,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Camera,
} from 'lucide-react';
import { EmotionData } from '../types';

interface FloatingHUDProps {
  healthScore: number;
  baseAge: number;
  isOvertime: boolean;
  offWorkTime: string;
  overtimeMinutes: number;
  currentEmotion?: EmotionData | null;
  isClockedOut?: boolean;
  onClockInAgain?: () => void;
  onClockOut?: () => void;
  onOpenCandidGallery?: () => void;
  candidCount?: number;
}

export const FloatingHUD: React.FC<FloatingHUDProps> = ({
  healthScore,
  baseAge,
  isOvertime,
  offWorkTime,
  overtimeMinutes,
  currentEmotion,
  isClockedOut,
  onClockInAgain,
  onClockOut,
  onOpenCandidGallery,
  candidCount = 0,
}) => {
  // Real-time tick for exact off-work chronograph countdown (100ms precision)
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Compute live stopwatch chronograph breakdown
  const { hoursStr, minsStr, secsStr, msStr, isOverdue } = (() => {
    try {
      const [hStr, mStr] = (offWorkTime || '18:00').split(':');
      const target = new Date(now);
      target.setHours(parseInt(hStr, 10), parseInt(mStr, 10), 0, 0);

      const diffMs = target.getTime() - now.getTime();
      if (diffMs <= 0) {
        const absMs = Math.abs(diffMs);
        const hrs = Math.floor(absMs / (1000 * 60 * 60));
        const mins = Math.floor((absMs % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((absMs % (1000 * 60)) / 1000);
        const ms = Math.floor((absMs % 1000) / 100);
        return {
          hoursStr: String(hrs).padStart(2, '0'),
          minsStr: String(mins).padStart(2, '0'),
          secsStr: String(secs).padStart(2, '0'),
          msStr: String(ms),
          isOverdue: true,
        };
      }
      const hrs = Math.floor(diffMs / (1000 * 60 * 60));
      const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diffMs % (1000 * 60)) / 1000);
      const ms = Math.floor((diffMs % 1000) / 100);
      return {
        hoursStr: String(hrs).padStart(2, '0'),
        minsStr: String(mins).padStart(2, '0'),
        secsStr: String(secs).padStart(2, '0'),
        msStr: String(ms),
        isOverdue: false,
      };
    } catch {
      return { hoursStr: '00', minsStr: '00', secsStr: '00', msStr: '0', isOverdue: false };
    }
  })();

  // Formula: Base Age + (100 - Current Score) * 0.8
  const estimatedBodyAge = Number((baseAge + (100 - healthScore) * 0.8).toFixed(1));
  const ageDifference = Number((estimatedBodyAge - baseAge).toFixed(1));

  // Body Battery & Estimated Focus Endurance
  const batteryPct = Math.min(100, Math.max(0, healthScore));
  const estFocusHours = (Math.max(0.5, (healthScore / 100) * 6.5)).toFixed(1);
  
  // Dynamic Drain Rate Status
  let drainText = '平穩放電 (1.0x)';
  let drainBadgeColor = 'text-cyan-300 bg-cyan-950/80 border-cyan-500/40';

  if (isOvertime) {
    drainText = '超時燃燒 (2.5x)';
    drainBadgeColor = 'text-rose-300 bg-rose-950/80 border-rose-500/60 animate-pulse';
  } else if (healthScore < 50) {
    drainText = '重度耗損 (1.8x)';
    drainBadgeColor = 'text-amber-300 bg-amber-950/80 border-amber-500/50';
  } else if (currentEmotion?.primaryEmotion === 'smile' || currentEmotion?.primaryEmotion === 'calm') {
    drainText = '修復回血 (0.4x)';
    drainBadgeColor = 'text-emerald-300 bg-emerald-950/80 border-emerald-500/50';
  }

  // Determine status & styling with strictly controlled Overwatch palette
  let statusLevel = 'PRIME';
  let scoreColorClass = 'text-cyan-400';
  let borderAccentClass = 'border-slate-800';

  if (healthScore >= 80) {
    statusLevel = 'NOMINAL';
    scoreColorClass = 'text-cyan-400';
    borderAccentClass = 'border-slate-800';
  } else if (healthScore >= 60) {
    statusLevel = 'MODERATE';
    scoreColorClass = 'text-cyan-300';
    borderAccentClass = 'border-slate-800';
  } else if (healthScore >= 40) {
    statusLevel = 'ELEVATED';
    scoreColorClass = 'text-amber-400';
    borderAccentClass = 'border-amber-500/30';
  } else {
    statusLevel = 'CRITICAL';
    scoreColorClass = 'text-rose-400';
    borderAccentClass = 'border-rose-500/50';
  }

  return (
    <div
      id="main-health-hud"
      className={`rounded-md p-4 border transition-all duration-300 relative overflow-hidden backdrop-blur-md cctv-brackets flex flex-col gap-3.5 sm:gap-4 ${
        isOvertime
          ? 'bg-rose-950/30 border-rose-500/70 shadow-[0_0_20px_rgba(244,63,94,0.25)] animate-life-drain'
          : `bg-[#06080e] ${borderAccentClass} shadow-xl`
      }`}
    >
      {/* HEADER: Unified Style */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-[#00d8ff] animate-pulse shadow-[0_0_8px_#00d8ff] shrink-0" />
          <span className="text-xs font-mono font-bold text-[#00d8ff] tracking-wider uppercase truncate">
            [HEALTH_DOSSIER]
          </span>
        </div>
      </div>

      {/* SECTION 1: CORE ACTUARIAL METRICS */}
      <div className="space-y-2.5">
        {/* Dual Primary Metric Cards */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Card A: Physiological Age (EST_BODY_AGE) */}
          <div className="p-3 rounded bg-[#030508] border border-slate-800/90 flex flex-col justify-between relative group hover:border-cyan-500/40 transition">
            <div className="flex items-center justify-between gap-1 text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1 font-bold text-slate-300">
                <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                生理年齡
              </span>
              <span className="text-[8px] px-1 py-0.2 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">
                ACTUARY
              </span>
            </div>

            <div className="my-1.5">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">
                  {estimatedBodyAge}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">歲</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono border-t border-slate-850 pt-1.5 mt-0.5">
              <span className="text-slate-400">實際: {baseAge} 歲</span>
              <span
                className={`font-bold px-1.5 py-0.2 rounded ${
                  ageDifference > 0
                    ? 'bg-rose-950/80 border border-rose-500/50 text-rose-300'
                    : 'bg-cyan-950/80 border border-cyan-500/50 text-cyan-300'
                }`}
              >
                {ageDifference > 0 ? `+${ageDifference}` : `${ageDifference}`} 歲
              </span>
            </div>
          </div>

          {/* Card B: Health Reserve Score (RESERVE_SCORE) */}
          <div className="p-3 rounded bg-[#030508] border border-slate-800/90 flex flex-col justify-between relative group hover:border-cyan-500/40 transition">
            <div className="flex items-center justify-between gap-1 text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1 font-bold text-slate-300">
                <HeartPulse className="w-3 h-3 text-rose-400 shrink-0" />
                生命力存摺
              </span>
              <span className="text-[8px] px-1 py-0.2 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">
                BALANCE
              </span>
            </div>

            <div className="my-1.5">
              <div className="flex items-baseline gap-1.5 font-mono">
                <span className={`text-3xl sm:text-4xl font-black tracking-tight ${scoreColorClass} drop-shadow-[0_0_12px_rgba(6,182,212,0.3)]`}>
                  {healthScore}
                </span>
                <span className="text-xs text-slate-400 font-bold">/ 100</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono border-t border-slate-850 pt-1.5 mt-0.5">
              <span className="text-slate-400">狀態等級</span>
              <span
                className={`font-bold px-1.5 py-0.2 rounded ${
                  healthScore >= 80
                    ? 'bg-cyan-950/80 border border-cyan-500/40 text-cyan-300'
                    : healthScore >= 50
                    ? 'bg-amber-950/80 border border-amber-500/40 text-amber-300'
                    : 'bg-rose-950/80 border border-rose-500/40 text-rose-300 animate-pulse'
                }`}
              >
                [{statusLevel}]
              </span>
            </div>
          </div>
        </div>

        {/* Body Battery & Focus Endurance Matrix */}
        <div className="p-2.5 rounded bg-[#030508] border border-slate-800/90 font-mono flex flex-col justify-between gap-1.5 hover:border-slate-750 transition">
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-200 font-bold">
              <Zap className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>人體電池與續航</span>
            </span>
            <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${drainBadgeColor} flex items-center gap-1`}>
              <span>{drainText}</span>
            </span>
          </div>

          {/* 10-Segment Tactical Battery Array */}
          <div className="flex items-center gap-1 w-full my-0.5">
            {[...Array(10)].map((_, i) => {
              const active = (i + 1) * 10 <= batteryPct || (i * 10 < batteryPct && batteryPct % 10 > 3);
              let segColor = 'bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.6)]';
              if (batteryPct < 50) segColor = 'bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.6)]';
              else if (batteryPct < 75) segColor = 'bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]';

              return (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-xs transition-all duration-300 ${
                    active ? segColor : 'bg-slate-900 border border-slate-800'
                  }`}
                />
              );
            })}
          </div>

          {/* Battery Status & Estimated Endurance */}
          <div className="flex items-center justify-between text-[9px] text-slate-400 pt-0.5">
            <span className="text-slate-400">
              電量: <span className={`font-bold font-mono ${batteryPct < 50 ? 'text-rose-400' : 'text-cyan-300'}`}>{batteryPct}%</span>
            </span>
            <span className="text-slate-300 font-mono font-bold flex items-center gap-1">
              <Clock className="w-2.5 h-2.5 text-slate-400" />
              <span>預估專注續航:</span>
              <span className="text-cyan-300 text-[10px] font-black font-mono">~{estFocusHours}h</span>
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 2: FREEDOM CHRONO STOPWATCH */}
      <div className="font-mono border-none pt-0">
        {/* High-Tension Tactical Stopwatch Card */}
        <div
          className={`p-3 rounded-lg bg-[#020408] border-none relative overflow-hidden flex flex-col justify-between gap-2.5 transition-all ${
            isOverdue || isOvertime
              ? 'ring-1 ring-rose-500/30'
              : 'ring-1 ring-cyan-500/20'
          }`}
        >
          {/* Subtle Scanline Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] opacity-25 pointer-events-none" />

          {/* Top Status Strip */}
          <div className="flex items-center justify-between z-10 gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  isClockedOut
                    ? 'bg-emerald-400 animate-pulse shadow-[0_0_6px_#10b981]'
                    : isOverdue || isOvertime
                    ? 'bg-rose-500 animate-ping shadow-[0_0_6px_#f43f5e]'
                    : 'bg-cyan-400 animate-pulse shadow-[0_0_6px_#06b6d4]'
                }`}
              />
              <span className={`text-[11px] font-bold tracking-wider truncate ${isClockedOut ? 'text-emerald-300' : 'text-slate-200'}`}>
                {isClockedOut ? '已打卡下班' : isOverdue || isOvertime ? '超時無償加班中' : '下班倒數碼表'}
              </span>
            </div>

            {isClockedOut ? (
              onClockInAgain && (
                <button
                  onClick={onClockInAgain}
                  className="px-2 py-0.5 rounded bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/60 text-emerald-300 hover:text-white text-[9px] font-bold transition shrink-0 cursor-pointer flex items-center gap-1 shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                  title="重新啟動下班碼表"
                >
                  <RotateCcw className="w-3 h-3 text-emerald-300 shrink-0" />
                  <span>重新上班</span>
                </button>
              )
            ) : (isOverdue || isOvertime) && onClockOut ? (
              <button
                onClick={onClockOut}
                className="px-2.5 py-0.5 rounded bg-rose-600 hover:bg-rose-500 text-white text-[9px] font-bold transition shrink-0 cursor-pointer flex items-center gap-1 shadow-[0_0_12px_rgba(244,63,94,0.6)] animate-pulse border border-rose-400"
                title="立即打卡下班並領取結算收據"
              >
                <span>打卡下班</span>
              </button>
            ) : (
              /* 過勞風險 Tag: Replaces [COUNTDOWN] */
              <span
                className={`text-[8px] font-bold px-1.5 py-0.5 rounded border tracking-wider uppercase flex items-center gap-1 shrink-0 ${
                  healthScore >= 80
                    ? 'bg-cyan-950/90 text-cyan-300 border-cyan-500/50'
                    : healthScore >= 50
                    ? 'bg-amber-950/90 text-amber-300 border-amber-500/50'
                    : 'bg-rose-950/90 text-rose-300 border-rose-500/70 animate-pulse'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    healthScore >= 80
                      ? 'bg-cyan-400'
                      : healthScore >= 50
                      ? 'bg-amber-400'
                      : 'bg-rose-500 animate-ping'
                  }`}
                />
                <span>過勞風險: {healthScore >= 80 ? 'LOW' : healthScore >= 50 ? 'MED' : 'CRIT'}</span>
              </span>
            )}
          </div>

          {/* High-Tension Digital Stopwatch Digits Display */}
          <div className="bg-[#040710] border border-slate-800/90 rounded-md p-2 flex items-center justify-center gap-1 shadow-inner relative z-10">
            {/* Hours Block */}
            <div className="flex flex-col items-center">
              <div className="bg-black/90 px-2 py-0.5 rounded border border-slate-800 shadow-inner">
                <span
                  className={`text-2xl sm:text-3xl font-black font-mono tracking-wider tabular-nums ${
                    isOverdue || isOvertime
                      ? 'text-rose-400 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]'
                      : 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]'
                  }`}
                >
                  {hoursStr}
                </span>
              </div>
              <span className="text-[7px] text-slate-400 uppercase tracking-widest mt-0.5">HRS</span>
            </div>

            <span className="text-xl font-bold text-slate-500 mb-2 animate-pulse">:</span>

            {/* Minutes Block */}
            <div className="flex flex-col items-center">
              <div className="bg-black/90 px-2 py-0.5 rounded border border-slate-800 shadow-inner">
                <span
                  className={`text-2xl sm:text-3xl font-black font-mono tracking-wider tabular-nums ${
                    isOverdue || isOvertime
                      ? 'text-rose-400 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]'
                      : 'text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]'
                  }`}
                >
                  {minsStr}
                </span>
              </div>
              <span className="text-[7px] text-slate-400 uppercase tracking-widest mt-0.5">MIN</span>
            </div>

            <span className="text-xl font-bold text-slate-500 mb-2 animate-pulse">:</span>

            {/* Seconds Block */}
            <div className="flex flex-col items-center">
              <div className="bg-black/90 px-2 py-0.5 rounded border border-slate-800 shadow-inner">
                <span
                  className={`text-2xl sm:text-3xl font-black font-mono tracking-wider tabular-nums ${
                    isOverdue || isOvertime
                      ? 'text-rose-400 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]'
                      : 'text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]'
                  }`}
                >
                  {secsStr}
                </span>
              </div>
              <span className="text-[7px] text-slate-400 uppercase tracking-widest mt-0.5">SEC</span>
            </div>

            {/* Milliseconds Fraction */}
            <div className="flex flex-col items-center pl-0.5">
              <div className="bg-black/70 px-1 py-0.5 rounded border border-slate-800/80 shadow-inner">
                <span className="text-sm sm:text-base font-bold font-mono text-cyan-400 tabular-nums">
                  .{msStr}
                </span>
              </div>
              <span className="text-[7px] text-slate-400 uppercase tracking-widest mt-0.5">MS</span>
            </div>
          </div>

          {/* Bottom Action: Candid Gallery Album Button (Replaces 下班目標 and 過勞風險) */}
          {onOpenCandidGallery && (
            <button
              onClick={onOpenCandidGallery}
              className="w-full bg-[#030508] hover:bg-cyan-950/30 px-3 py-2 rounded-md border border-slate-800 hover:border-cyan-500/60 transition cursor-pointer flex items-center justify-between group shadow-sm font-mono text-left"
              title="檢視工位抓拍紀錄存證"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-cyan-500/50 transition shrink-0">
                  <Camera className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-bold text-slate-200 group-hover:text-cyan-300 transition-colors truncate">
                    工位相簿
                  </span>
                  <span className="text-[8px] text-slate-400 truncate">
                    檢視工位野生瞬間與警報紀錄存證
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 pl-2">
                <span className="text-[10px] font-bold font-mono text-cyan-400">
                  {candidCount > 0 ? `${candidCount} 張` : '0 張'}
                </span>
                <span className="text-slate-500 text-xs group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
