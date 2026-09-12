import type { ReactNode } from 'react';
import type { StatusName } from '../tokens/contract.css';

/**
 * 状態を表すアイコン。
 *
 * 色で塗らず `currentColor` を使う。色が変わってもアイコンが伝える意味は変わらない、
 * というのがこのアイコンの存在理由なので、色を別に持たせると本末転倒になる。
 *
 * 形は4つとも輪郭を変えてある（丸・三角・丸・丸ではなく、
 * 中身の記号も ! / ✓ / ! / i で分けてある）。色覚特性のある閲覧者にとっては
 * 形の差だけが手がかりになる（原則4）。
 */
const PATHS: Record<StatusName, ReactNode> = {
  danger: (
    <>
      <circle cx="8" cy="8" r="6.6" />
      <path d="M5.6 5.6 L10.4 10.4 M10.4 5.6 L5.6 10.4" />
    </>
  ),
  warning: (
    <>
      <path d="M8 1.8 L15 14 L1 14 Z" strokeLinejoin="round" />
      <path d="M8 6.2 V9.4" />
      <path d="M8 11.6 V11.7" />
    </>
  ),
  success: (
    <>
      <circle cx="8" cy="8" r="6.6" />
      <path d="M5 8.2 L7.2 10.4 L11.2 5.8" strokeLinejoin="round" />
    </>
  ),
  info: (
    <>
      <circle cx="8" cy="8" r="6.6" />
      <path d="M8 7.2 V11.2" />
      <path d="M8 4.8 V4.9" />
    </>
  ),
};

export function StatusIcon({ name, size = 16 }: { name: StatusName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      // 意味はこの隣のテキストが持っている。読み上げを二重にしない
      aria-hidden="true"
      focusable="false"
      style={{ flexShrink: 0 }}
    >
      {PATHS[name]}
    </svg>
  );
}
