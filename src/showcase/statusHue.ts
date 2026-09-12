import { STATUS_BASE_HUE, STATUS_NAMES } from '../tokens/contract.css';

/**
 * 色相どうしの距離を測るための道具。
 *
 * 2026-09-12 に C（色だけに頼らない）を採用した時点で、色相をずらす案（B）と
 * ブランド色相に追従させる案（対照）は落ちた。それらの実装はここから削除してある。
 *
 * 残しているのは距離の計算だけで、これは判断のためではなく
 * **ショーケースで「いまどれくらいぶつかっているか」を表示するため**に使う。
 * 衝突は解消されたのではなく、意味を色以外にも載せることで許容できるようになった。
 * だから衝突そのものは見え続けている必要がある。
 */

/**
 * これ以上近づくと別の色に見えなくなる、という目安の角度。
 *
 * 理論的な根拠はない。実際にスライダーを動かして確かめるための出発点。
 * 採用後は「危険水域の表示」にのみ使っており、挙動を変える用途では使っていない。
 */
export const MIN_HUE_DISTANCE = 35;

/** 色相環上の角度差（0〜180度） */
export function hueDistance(a: number, b: number): number {
  const d = Math.abs((((a - b) % 360) + 360) % 360);
  return Math.min(d, 360 - d);
}

/** ブランド色相と衝突している状態色の名前 */
export function collidingStatuses(brandHue: number): string[] {
  return STATUS_NAMES.filter(
    (name) => hueDistance(brandHue, STATUS_BASE_HUE[name]) < MIN_HUE_DISTANCE,
  );
}
