import { useState } from "react";

type Part = "chest" | "back" | "legs" | "shoulder" | "arm" | "core";
type Level = "beginner" | "intermediate";

const TRAINING_DATA: Record<
  Part,
  Record<Level, { name: string; sets: string; note?: string }[]>
> = {
  chest: {
    beginner: [
      { name: "腕立て伏せ", sets: "3 x 12" },
      { name: "インクラインプッシュアップ", sets: "3 x 10" },
      { name: "ダンベルフロアプレス", sets: "3 x 12" },
    ],
    intermediate: [
      { name: "ベンチプレス", sets: "4 x 8" },
      { name: "ディップス", sets: "4 x 10" },
      { name: "ダンベルフライ", sets: "3 x 12" },
    ],
  },
  back: {
    beginner: [
      { name: "チンニング（補助あり可）", sets: "3 x 6" },
      { name: "ワンハンドロー", sets: "3 x 12" },
      { name: "バックエクステンション", sets: "3 x 15" },
    ],
    intermediate: [
      { name: "ベントオーバーロウ", sets: "4 x 8" },
      { name: "ラットプルダウン", sets: "4 x 10" },
      { name: "デッドリフト（軽め）", sets: "3 x 8" },
    ],
  },
  legs: {
    beginner: [
      { name: "スクワット（自重）", sets: "3 x 15" },
      { name: "ランジ", sets: "3 x 12" },
      { name: "カーフレイズ", sets: "3 x 20" },
    ],
    intermediate: [
      { name: "バーベルスクワット", sets: "4 x 8" },
      { name: "ブルガリアンスクワット", sets: "3 x 10" },
      { name: "ルーマニアンデッドリフト", sets: "3 x 10" },
    ],
  },
  shoulder: {
    beginner: [
      { name: "ダンベルショルダープレス", sets: "3 x 12" },
      { name: "サイドレイズ", sets: "3 x 15" },
      { name: "フロントレイズ", sets: "3 x 12" },
    ],
    intermediate: [
      { name: "ミリタリープレス", sets: "4 x 8" },
      { name: "サイドレイズ", sets: "3 x 15" },
      { name: "リアレイズ", sets: "3 x 15" },
    ],
  },
  arm: {
    beginner: [
      { name: "ダンベルカール", sets: "3 x 12" },
      { name: "ハンマーカール", sets: "3 x 12" },
      { name: "トライセプスエクステンション", sets: "3 x 12" },
    ],
    intermediate: [
      { name: "バーベルカール", sets: "4 x 10" },
      { name: "ダンベルキックバック", sets: "3 x 12" },
      { name: "スカルクラッシャー", sets: "3 x 10" },
    ],
  },
  core: {
    beginner: [
      { name: "プランク", sets: "3 x 30秒" },
      { name: "クランチ", sets: "3 x 15" },
      { name: "レッグレイズ", sets: "3 x 12" },
    ],
    intermediate: [
      { name: "ドラゴンフラッグ（補助）", sets: "3 x 5" },
      { name: "アブローラー", sets: "3 x 10" },
      { name: "サイドプランク", sets: "3 x 30秒(左右)" },
    ],
  },
};

const pickRandom = <T,>(arr: T[], n: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

function App() {
  const [part, setPart] = useState<Part>("chest");
  const [level, setLevel] = useState<Level>("beginner");
  const [menu, setMenu] = useState<
    { name: string; sets: string; note?: string }[]
  >([]);

  const handleGenerate = () => {
    const candidates = TRAINING_DATA[part][level];
    const result = pickRandom(candidates, Math.min(3, candidates.length));
    setMenu(result);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 240px", // 本体＋広告
        gap: "24px",
      }}
    >
      {/* メインコンテンツ */}
      <div>
        <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem", color: "#fff" }}>
          FitSeed トレメニュー生成
        </h1>

        {/* 入力フォーム */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: 4, color: "#fff" }}>
            部位
          </label>
          <select
            value={part}
            onChange={(e) => setPart(e.target.value as Part)}
            style={{ width: "100%", padding: 8 }}
          >
            <option value="chest">胸</option>
            <option value="back">背中</option>
            <option value="legs">脚</option>
            <option value="shoulder">肩</option>
            <option value="arm">腕</option>
            <option value="core">体幹</option>
          </select>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: 4, color: "#fff" }}>
            レベル
          </label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as Level)}
            style={{ width: "100%", padding: 8 }}
          >
            <option value="beginner">初心者</option>
            <option value="intermediate">中級</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "10px 16px",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            width: "100%",
            marginBottom: "1.5rem",
          }}
        >
          メニューを生成する
        </button>

        {/* メニュー表示 */}
        <div>
          {menu.length === 0 ? (
            <p style={{ color: "#cbd5f5" }}>
              条件を選んで「生成する」を押してください。
            </p>
          ) : (
            <>
              <h2
                style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "#fff" }}
              >
                選択: {part === "chest"
                  ? "胸"
                  : part === "back"
                  ? "背中"
                  : part === "legs"
                  ? "脚"
                  : part === "shoulder"
                  ? "肩"
                  : part === "arm"
                  ? "腕"
                  : "体幹"}{" "}
                / {level === "beginner" ? "初心者" : "中級"}
              </h2>
              <ul
                style={{
                    listStyle: "none",
                    padding: 0,
                    display: "grid",
                    gap: "12px",
                }}
              >
                {menu.map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: 8,
                      padding: "10px 12px",
                      background: "#111827",
                    }}
                  >
                    <div style={{ fontWeight: 600, color: "#fff" }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: "0.9rem", color: "#9ca3af" }}>
                      {item.sets}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* メニューの下にも広告エリアを1個置いておく */}
        {/* <div style={{ marginTop: "1.5rem" }}>
          <AdBox title="AD（記事下）" />
        </div> */}
      </div>

      {/* 右サイド広告 */}
      {/* <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <AdBox title="AD（サイド上）" />
        <AdBox title="AD（サイド下）" />
      </div> */}
    </div>
  );
}

export default App;
