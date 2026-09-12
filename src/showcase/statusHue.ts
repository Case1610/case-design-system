import {
  STATUS_BASE_HUE,
  STATUS_HUE_VARS,
  STATUS_NAMES,
  type StatusName,
} from '../tokens/contract.css';

/**
 * 状態色の色相をどう決めるかの案。**まだどれも採用していない。**
 *
 * トークン側（tokens/）ではなくショーケース側に置いてあるのは、
 * これが設計判断ではなく比較のための仮置きだからである。
 * 本人がどれかを選んだ時点で、選ばれたものだけが tokens/ へ移る。
 */
export type StatusHueStrategy = 'shared' | 'fixed' | 'avoid';

/**
 * ブランド色相と状態色相の、これ以上は近づけたくない角度。
 *
 * 35度という値に理論的な根拠はない。実際にスライダーを動かして
 * 「別の色に見えるか」を見るための出発点として置いている。
 */
export const MIN_HUE_DISTANCE = 35;

/** 色相環上の角度差（0〜180度） */
export function hueDistance(a: number, b: number): number {
  const d = Math.abs((((a - b) % 360) + 360) % 360);
  return Math.min(d, 360 - d);
}

const BASE_LIST = STATUS_NAMES.map((name) => STATUS_BASE_HUE[name]);

/**
 * 4つの状態色をまとめて回す、最小の回転量を探す。
 *
 * 個別にずらすと、逃げた先で別の状態色とぶつかる（赤を逃がすと黄に当たる）。
 * 4つの相対関係を保ったまま回せば、状態色どうしの区別は必ず保たれる。
 * 代償は、赤でないエラー・緑でない成功が出てくること。
 */
function minimalRotation(brandHue: number): number {
  const clear = (r: number) => BASE_LIST.every((h) => hueDistance(brandHue, h + r) >= MIN_HUE_DISTANCE);
  if (clear(0)) return 0;
  for (let r = 1; r <= 180; r += 1) {
    if (clear(r)) return r;
    if (clear(-r)) return -r;
  }
  return 0;
}

const wrap = (h: number) => ((h % 360) + 360) % 360;

export function resolveStatusHues(
  strategy: StatusHueStrategy,
  brandHue: number,
): Record<StatusName, number> {
  const rotation = strategy === 'avoid' ? minimalRotation(brandHue) : 0;

  return Object.fromEntries(
    STATUS_NAMES.map((name) => [
      name,
      strategy === 'shared' ? wrap(brandHue) : wrap(STATUS_BASE_HUE[name] + rotation),
    ]),
  ) as Record<StatusName, number>;
}

/** 解決した色相を、inline style に渡せる CSS 変数の形にする */
export function statusHueStyle(hues: Record<StatusName, number>): Record<string, string> {
  return Object.fromEntries(
    STATUS_NAMES.map((name) => [STATUS_HUE_VARS[name], String(hues[name])]),
  );
}
