import type { ReactNode } from 'react';
import { vars, type StatusName } from '../tokens/contract.css';
import { StatusIcon } from './StatusIcon';
import * as s from './statusMessage.css';

/**
 * 状態を伝える面（エラー・警告・成功・お知らせ）。
 *
 * **色・アイコン・状態名を一括で出す。3つを別々に使えないようにしてある。**
 *
 * 状態色の色相は閲覧者が選ぶブランド色相（--ds-hue）と衝突しうる。
 * 赤を選んだ人には、ブランド色とエラー色が同系色に見える（原則1と原則2の衝突、
 * docs/decisions.md 2026-09-12）。その解として、意味を色だけに載せないことにした。
 *
 * ただし「載せないようにしましょう」という方針は守られない。守らなくても動くからである。
 * だから方針ではなく**部品**にした。状態色のトークンを使う正規の入口をこれ一つにすれば、
 * 色だけを使うことが構造的にできなくなる（原則3「逸脱は、禁止するのではなく可視にする」）。
 *
 * トークンを直接使えば当然この強制は外れる。それは想定内で、
 * そのときは「なぜ StatusMessage を使わなかったか」が説明の対象になる。
 * 型で禁止するのではなく、外れたことが見えるようにするのがこの原則の形である。
 */

const STATUS_LABEL: Record<StatusName, string> = {
  danger: 'エラー',
  warning: '警告',
  success: '成功',
  info: 'お知らせ',
};

const TONE: Record<StatusName, { fg: string; bg: string }> = {
  danger: { fg: vars.color.danger, bg: vars.color.dangerSubtle },
  warning: { fg: vars.color.warning, bg: vars.color.warningSubtle },
  success: { fg: vars.color.success, bg: vars.color.successSubtle },
  info: { fg: vars.color.info, bg: vars.color.infoSubtle },
};

export interface StatusMessageProps {
  status: StatusName;
  children: ReactNode;
  /**
   * 状態名の差し替え。「エラー」より具体的に言える場面のため
   * （例: 「保存できませんでした」）。**消すことはできない。**
   */
  label?: string;
}

export function StatusMessage({ status, children, label }: StatusMessageProps) {
  const tone = TONE[status];

  return (
    <div
      className={s.root}
      style={{ background: tone.bg, color: tone.fg }}
      // 支援技術にも、これが何の知らせかを伝える。
      // danger と warning は割り込み、それ以外は読み上げの区切りを待つ
      role={status === 'danger' || status === 'warning' ? 'alert' : 'status'}
    >
      <div>
        <div className={s.head}>
          <StatusIcon name={status} />
          <span className={s.label}>{label ?? STATUS_LABEL[status]}</span>
        </div>
        <p className={s.body}>{children}</p>
      </div>
    </div>
  );
}
