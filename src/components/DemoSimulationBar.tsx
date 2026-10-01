import React from 'react';

interface DemoSimulationBarProps {
  onTriggerSedentary: () => void;
  onTriggerProximity: () => void;
  onTriggerYawn: () => void;
  onTriggerBlink: () => void;
  onTriggerFrown: () => void;
  onTriggerSlack: () => void;
  onTriggerOvertime: () => void;
  onTriggerHourlyBeautyAlert?: () => void;
}

export const DemoSimulationBar: React.FC<DemoSimulationBarProps> = ({
  onTriggerSedentary,
  onTriggerProximity,
  onTriggerYawn,
  onTriggerBlink,
  onTriggerFrown,
  onTriggerSlack,
  onTriggerOvertime,
  onTriggerHourlyBeautyAlert,
}) => {
  return (
    <div className="p-2.5 sm:p-3 rounded-md bg-[#06080e] border border-slate-800 backdrop-blur-md flex flex-col gap-2.5 text-xs font-mono">
      <div className="flex items-center justify-between border-b border-solid border-slate-800/80 pb-2 mb-2.5">
        <div className="flex items-center gap-1.5 text-white font-bold shrink-0">
          <span className="material-symbols-outlined text-[15px] text-cyan-400 shrink-0">tune</span>
          <span className="text-[11px] text-white tracking-wider font-bold">[OVERRIDE_BENCH]</span>
        </div>
        <span className="text-[9px] text-slate-500 hidden sm:inline-block tracking-wider">
          SIMULATION CONTROLS
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 w-full">
        {/* 1. Sedentary 30s Calisthenics Routine */}
        <button
          onClick={onTriggerSedentary}
          className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#0b0e17] hover:bg-slate-800 text-cyan-300 border border-slate-700/80 hover:border-cyan-400 transition transform active:scale-95 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold shadow-[0_0_8px_rgba(6,182,212,0.15)] cursor-pointer"
          title="測試久坐時限超標，喚醒全螢幕 30 秒動態脊椎減壓體操"
        >
          <span className="material-symbols-outlined text-[13px] text-cyan-400 shrink-0">accessibility_new</span>
          <span>SPINE RESCUE</span>
        </button>

        {/* 2. Posture & Proximity Distance Radar */}
        <button
          onClick={onTriggerProximity}
          className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#0b0e17] hover:bg-slate-800 text-rose-300 border border-slate-700/80 hover:border-rose-400 transition transform active:scale-95 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold cursor-pointer"
          title="測試頭部貼近螢幕駝背（<30cm），啟動護眼視距雷達與 3 秒安全視距校準"
        >
          <span className="material-symbols-outlined text-[13px] text-rose-400 shrink-0">center_focus_strong</span>
          <span>POSTURE RADAR</span>
        </button>

        {/* 3. Hypoxia & Yawn Scared Detection */}
        <button
          onClick={onTriggerYawn}
          className="px-2 py-0.5 sm:px-2 sm:py-1 rounded bg-[#0b0e17] hover:bg-slate-800 text-amber-300 border border-slate-700/80 hover:border-amber-400 transition transform active:scale-95 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold cursor-pointer"
          title="測試大腦缺氧張大嘴打哈欠，彈出防瞌睡鬼怪/萌貓迷因 (-5BP)"
        >
          <span className="material-symbols-outlined text-[13px] text-amber-400 shrink-0">bedtime</span>
          <span>DROWSINESS ALERT</span>
        </button>

        {/* 4. Dry Eye & Blink Fatigue Idol SPA */}
        <button
          onClick={onTriggerBlink}
          className="px-2 py-0.5 sm:px-2 sm:py-1 rounded bg-[#0b0e17] hover:bg-slate-800 text-cyan-300 border border-slate-700/80 hover:border-cyan-400 transition transform active:scale-95 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold cursor-pointer"
          title="測試 5 秒 3 次頻繁眨眼乾眼過勞，彈出神顏偶像洗眼護眼 SPA (-3BP)"
        >
          <span className="material-symbols-outlined text-[13px] text-cyan-400 shrink-0">visibility</span>
          <span>DRY EYE SPA</span>
        </button>

        {/* 5. Stress & Frown Tension */}
        <button
          onClick={onTriggerFrown}
          className="px-2 py-0.5 sm:px-2 sm:py-1 rounded bg-[#0b0e17] hover:bg-slate-800 text-indigo-300 border border-slate-700/80 hover:border-indigo-400 transition transform active:scale-95 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold cursor-pointer"
          title="測試眉頭緊鎖與壓力緊繃，解鎖心靈解答之書 (-3BP)"
        >
          <span className="material-symbols-outlined text-[13px] text-indigo-400 shrink-0">psychology</span>
          <span>STRESS RELIEF</span>
        </button>

        {/* 6. Leave Desk & Circulation Recovery */}
        <button
          onClick={onTriggerSlack}
          className="px-2 py-0.5 sm:px-2 sm:py-1 rounded bg-[#0b0e17] hover:bg-slate-800 text-emerald-300 border border-slate-700/80 hover:border-emerald-400 transition transform active:scale-95 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold cursor-pointer"
          title="測試離座走動活動超過 3 分鐘，獎勵健康存摺循環回血 (+10BP)"
        >
          <span className="material-symbols-outlined text-[13px] text-emerald-400 shrink-0">directions_walk</span>
          <span>LEAVE DESK</span>
        </button>

        {/* 7. Overtime & Burnout Drain */}
        <button
          onClick={onTriggerOvertime}
          className="px-2 py-0.5 sm:px-2 sm:py-1 rounded bg-[#0b0e17] hover:bg-slate-800 text-rose-300 border border-slate-700/80 hover:border-rose-400 transition transform active:scale-95 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold cursor-pointer"
          title="測試下班後超時伏案血汗加班，生命力流失與下班提醒 (-15BP)"
        >
          <span className="material-symbols-outlined text-[13px] text-rose-400 shrink-0">alarm</span>
          <span>BURNOUT ALERT</span>
        </button>

        {/* 8. Hourly Hydrate & Beauty Score */}
        {onTriggerHourlyBeautyAlert && (
          <button
            onClick={onTriggerHourlyBeautyAlert}
            className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#0b0e17] hover:bg-slate-800 text-cyan-200 border border-slate-700/80 hover:border-cyan-400 transition transform active:scale-95 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold cursor-pointer"
            title="測試整點久坐細胞補水提醒與 AI 顏值活力評測 (+5BP)"
          >
            <span className="material-symbols-outlined text-[13px] text-cyan-300 shrink-0">water_drop</span>
            <span>HYDRATION SCAN</span>
          </button>
        )}
      </div>
    </div>
  );
};

