import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Zap,
  RefreshCw,
  Eye,
  Smile,
  Maximize2,
  ChevronRight,
  Droplets,
  X,
} from 'lucide-react';
import { FaceCharismaScore } from '../types';
import { FiveAxisRadarChart } from './FiveAxisRadarChart';

interface FacialScoreCardProps {
  scoreData: FaceCharismaScore | null;
  isScanning: boolean;
  onTriggerScan: () => void;
  isFacePresent: boolean;
  onOpenCandidGallery?: () => void;
  candidCount?: number;
}

export const FacialScoreCard: React.FC<FacialScoreCardProps> = ({
  scoreData,
  isScanning,
  onTriggerScan,
  isFacePresent,
  onOpenCandidGallery,
  candidCount = 0,
}) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Close modal on ESC key
  useEffect(() => {
    if (!isDetailModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDetailModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDetailModalOpen]);

  const getRankBadgeClass = (rank: string) => {
    switch (rank) {
      case 'SSS':
        return 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(6,182,212,0.5)] border-cyan-300 font-black';
      case 'SS':
      case 'S':
        return 'bg-cyan-950/80 text-cyan-300 border-cyan-500/60 shadow-[0_0_8px_rgba(6,182,212,0.3)] font-bold';
      case 'A+':
      case 'A':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 font-bold';
      case 'B':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/50';
      case 'C':
      case 'D':
        return 'bg-rose-950/80 text-rose-300 border-rose-500/60 animate-pulse';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <>
      {/* Compact Overview Card aligned neatly with Camera Feed */}
      <div className="p-3 sm:p-3.5 rounded-md bg-[#06080e] border border-slate-800 shadow-xl backdrop-blur-md text-xs font-mono relative overflow-hidden cctv-brackets flex flex-col gap-2">
        
        {/* Header Strip */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.6)] shrink-0" />
            <span className="text-[11px] font-bold text-slate-200 tracking-wider uppercase truncate">
              [BIO_CHARISMA]
            </span>
          </div>

          <button
            onClick={onTriggerScan}
            disabled={isScanning || !isFacePresent}
            className="px-2 py-0.5 rounded bg-[#030508] hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-[10px] font-bold transition flex items-center gap-1 cursor-pointer disabled:opacity-40 shrink-0"
            title="啟動 AI 顏值氣神采掃描"
          >
            <RefreshCw className={`w-3 h-3 ${isScanning ? 'animate-spin text-cyan-400' : ''}`} />
            <span>{isScanning ? '掃描中...' : scoreData ? '重測' : '立即測試'}</span>
          </button>
        </div>

        {/* Main Content Row: Left Score Card + Right Compact Album */}
        <div className="flex items-stretch gap-2 min-w-0">
          
          {scoreData ? (
            /* Left: Interactive Score Card (When scanned) */
            <div
              onClick={() => setIsDetailModalOpen(true)}
              className="flex-1 min-w-0 bg-[#030508] hover:bg-[#070c16] px-2.5 py-2 rounded-md border border-slate-800/90 hover:border-cyan-500/60 transition cursor-pointer group shadow-sm flex flex-col justify-between gap-1.5"
              title="點擊展開 5 軸生物雷達詳細報告"
            >
              {/* Top row: Rank badge + Score */}
              <div className="flex items-center justify-between gap-1.5 min-w-0">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div
                    className={`px-1.5 py-0.5 rounded border font-black text-[10px] flex items-center gap-1 shrink-0 ${getRankBadgeClass(
                      scoreData.rank
                    )}`}
                  >
                    <span className="text-[7px] opacity-80 leading-none">RANK</span>
                    <span className="leading-none">{scoreData.rank}</span>
                  </div>
                  {scoreData.highlightTag && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/40 font-bold truncate">
                      {scoreData.highlightTag}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-xl font-black text-white font-mono tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] group-hover:text-cyan-100">
                    {scoreData.score}
                  </span>
                  <span className="text-[8px] text-slate-500 font-bold">PTS</span>
                </div>
              </div>

              {/* Bottom row: Full-width Title */}
              <div className="text-[11px] text-cyan-300 font-bold flex items-center gap-1 min-w-0 group-hover:text-cyan-200">
                <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="truncate">{scoreData.title}</span>
              </div>
            </div>
          ) : (
            /* Left: Initial Onboarding Placeholder (No score yet) */
            <div
              onClick={isFacePresent ? onTriggerScan : undefined}
              className={`flex-1 min-w-0 bg-[#030508]/80 px-2.5 py-2 rounded-md border border-slate-800/60 flex flex-col justify-between gap-1.5 ${
                isFacePresent ? 'hover:bg-[#070c16] hover:border-cyan-500/50 cursor-pointer transition' : 'opacity-70'
              }`}
              title={isFacePresent ? "點擊立刻啟動 AI 面部神采掃描" : "請正對鏡頭以啟動評測"}
            >
              <div className="flex items-center justify-between">
                <span className="text-[8px] px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800 text-slate-500 font-bold uppercase shrink-0">
                  STATUS: UNCALIBRATED
                </span>
                <span className="text-sm font-black text-slate-600 font-mono tracking-wider">-- PTS</span>
              </div>
              <div className="text-[10px] text-slate-400 font-bold truncate flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${isFacePresent ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
                <span>{isFacePresent ? '⚡ 面部已鎖定：點擊啟動 AI 評測' : '❌ 未偵測到面部：請正對鏡頭'}</span>
              </div>
            </div>
          )}

          {/* Right: Compact Candid Snapshot Album */}
          {onOpenCandidGallery && (
            <button
              onClick={onOpenCandidGallery}
              className="w-20 shrink-0 bg-[#030508] hover:bg-cyan-950/20 px-1.5 py-1.5 rounded-md border border-slate-800 hover:border-cyan-500/60 transition cursor-pointer flex flex-col items-center justify-center text-center gap-0.5 group shadow-sm"
              title="檢視當日抓拍野生醜照存證"
            >
              <div className="relative">
                <span className="text-base group-hover:scale-110 transition-transform block">
                  📷
                </span>
                {candidCount > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-[14px] h-3.5 px-0.5 rounded-full bg-cyan-500 text-slate-950 text-[8px] font-black flex items-center justify-center shadow-[0_0_6px_rgba(6,182,212,0.6)]">
                    {candidCount}
                  </span>
                )}
              </div>

              <span className="text-[10px] font-bold text-slate-200 group-hover:text-cyan-300 transition-colors leading-tight">
                工位相簿
              </span>
              <span className="text-[8px] text-slate-500 font-mono leading-none">
                {candidCount > 0 ? `${candidCount}張` : '0張'}
              </span>
            </button>
          )}
        </div>

        {/* Detailed description panel if NO score yet (Explains initial calibration info) */}
        {!scoreData && (
          <div className="p-2 rounded bg-slate-950/90 border border-slate-850/80 text-[10px] text-slate-500 leading-normal">
            <span className="text-cyan-500/85 font-bold mr-1">&gt; 氣色神采評測說明:</span>
            <span>系統將擷取您的面色紅潤度、眼神清澈度、嘴角表情、眉心緊繃放鬆及疲勞度，即時換算今日工位顏值神采與 5 軸生物雷達圖。</span>
          </div>
        )}
      </div>

      {/* Full Detail Modal Popup */}
      {isDetailModalOpen && scoreData && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-hidden">
          <div className="bg-[#070a10] border border-slate-700 rounded-lg max-w-lg w-full p-4 sm:p-5 font-mono shadow-2xl relative text-xs text-slate-200 cctv-brackets animate-in fade-in zoom-in duration-200 my-auto max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3 shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                <h3 className="text-sm font-bold text-slate-100 tracking-wider uppercase">
                  [工位顏值與神采 // 5 軸生物雷達報告]
                </h3>
              </div>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1 sm:p-1.5 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition cursor-pointer flex items-center justify-center"
                title="關閉"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body with comfortable vertical padding */}
            <div className="flex-1 overflow-y-auto pr-1.5 space-y-3.5 scrollbar-thin">
              {/* Score & Rank Hero Section */}
              <div className="flex items-center justify-between p-3.5 rounded-md bg-[#030508] border border-slate-800">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-md flex flex-col items-center justify-center border font-black text-base shrink-0 ${getRankBadgeClass(
                      scoreData.rank
                    )}`}
                  >
                    <span className="text-[8px] opacity-80 leading-none">RANK</span>
                    <span className="leading-tight">{scoreData.rank}</span>
                  </div>
                  <div>
                    <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                      顏值氣色狀態判讀
                    </div>
                    <div className="text-base font-bold text-white mt-0.5">
                      {scoreData.title}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-black text-white font-mono tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                    {scoreData.score}
                  </div>
                  <div className="text-[10px] text-slate-500 font-bold">/ 100 PTS</div>
                </div>
              </div>

              {/* Tactical Commentary */}
              <div className="p-3 rounded bg-[#030508] border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <span className="text-cyan-400 font-bold mr-1.5">&gt; 顏值氣色督導評語:</span>
                <span>{scoreData.comment}</span>
              </div>

              {/* 5-Axis Radar Diagram Section */}
              <div className="bg-[#030508] border border-slate-800 rounded-lg p-3 sm:p-4 flex flex-col items-center">
                <div className="w-full flex items-center justify-between border-b border-slate-800/80 pb-1.5 mb-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    [5 軸顏值氣色與表情管理雷達]
                  </span>
                  <span className="text-[9px] text-slate-500 font-mono">BIOMETRIC_PENTAGON_SCAN</span>
                </div>

                {/* Dynamic SVG Radar Graph */}
                <FiveAxisRadarChart
                  size={260}
                  className="my-2"
                  data={[
                    { label: '面色氣色紅潤', value: scoreData.metrics.radiance, color: '#38bdf8' },
                    { label: '眼神聚焦清澈', value: scoreData.metrics.sparkle, color: '#22d3ee' },
                    { label: '嘴角自然舒展', value: scoreData.metrics.smilePower, color: '#34d399' },
                    { label: '眉心舒展放鬆', value: scoreData.metrics.symmetry, color: '#94a3b8' },
                    { label: '神態清爽無倦', value: scoreData.metrics.charisma, color: '#10b981' },
                  ]}
                />
              </div>

              {/* Health & Hydration Tip */}
              <div className="p-2.5 rounded bg-cyan-950/30 border border-cyan-500/30 text-cyan-200 flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyan-400 shrink-0" />
                <div className="text-[11px]">
                  <span className="font-bold text-cyan-300 mr-1">💧 顏值回春補水指南:</span>
                  <span>適時深呼吸舒展眉心，飲用 250~300ml 溫水並起身走動，能立即洗去班味、煥發顏值高光！</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
