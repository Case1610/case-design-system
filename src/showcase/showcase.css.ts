import { style } from '@vanilla-extract/css';
import { vars } from '../tokens/contract.css';

export const page = style({
  background: vars.color.bg,
  color: vars.color.text,
  minHeight: '100vh',
  fontFamily: 'system-ui, -apple-system, "Hiragino Sans", sans-serif',
  padding: `${vars.space.xl} ${vars.space.lg} ${vars.space['2xl']}`,
});

export const container = style({
  maxWidth: 880,
  margin: `0 auto`,
});

export const h1 = style({
  color: vars.color.textStrong,
  fontSize: vars.text['2xl'],
  margin: `0 0 ${vars.space['2xs']}`,
});

export const lead = style({
  color: vars.color.textMuted,
  fontSize: vars.text.sm,
  margin: `0 0 ${vars.space.xl}`,
});

export const h2 = style({
  color: vars.color.textStrong,
  fontSize: vars.text.base,
  margin: `${vars.space.xl} 0 ${vars.space.sm}`,
});

export const controls = style({
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: 10,
  padding: vars.space.md,
  display: 'flex',
  gap: vars.space.lg,
  alignItems: 'center',
  flexWrap: 'wrap',
});

export const controlLabel = style({
  color: vars.color.textMuted,
  fontSize: vars.text.xs,
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.xs,
});

export const slider = style({
  width: 200,
  accentColor: vars.color.brand,
});

export const swatchRow = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
  gap: vars.space.xs,
});

export const swatch = style({
  borderRadius: 8,
  border: `1px solid ${vars.color.border}`,
  height: 68,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: vars.space.xs,
  fontSize: vars.text.xs,
});

export const card = style({
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: 10,
  padding: vars.space.lg,
  marginBottom: vars.space.sm,
});

export const cardTitle = style({
  color: vars.color.textStrong,
  fontSize: vars.text.lg,
  margin: `0 0 ${vars.space['2xs']}`,
});

export const cardBody = style({
  fontSize: vars.text.sm,
  lineHeight: 1.75,
  margin: `0 0 ${vars.space.xs}`,
});

export const meta = style({
  color: vars.color.textMuted,
  fontSize: vars.text.xs,
  margin: 0,
});

export const row = style({
  display: 'flex',
  gap: vars.space.xs,
  alignItems: 'center',
  flexWrap: 'wrap',
});

const buttonBase = style({
  border: '1px solid transparent',
  borderRadius: 7,
  padding: `${vars.space.xs} ${vars.space.md}`,
  fontSize: vars.text.sm,
  fontWeight: 600,
  fontFamily: 'inherit',
  cursor: 'pointer',
});

export const buttonPrimary = style([
  buttonBase,
  {
    background: vars.color.brand,
    color: vars.color.onBrand,
    selectors: {
      '&:hover': { background: vars.color.brandHover },
    },
  },
]);

export const buttonSecondary = style([
  buttonBase,
  {
    background: 'transparent',
    color: vars.color.brand,
    borderColor: vars.color.brand,
    selectors: {
      '&:hover': { color: vars.color.brandHover, borderColor: vars.color.brandHover },
    },
  },
]);

export const buttonDisabled = style([
  buttonBase,
  {
    background: vars.color.border,
    color: vars.color.textMuted,
    cursor: 'not-allowed',
  },
]);

export const tag = style({
  background: vars.color.brandSubtle,
  color: vars.color.brand,
  borderRadius: 999,
  padding: `${vars.space['2xs']} ${vars.space.sm}`,
  fontSize: vars.text.xs,
  fontWeight: 600,
});

/**
 * 配色の切替（システム / ライト / ダーク）。
 *
 * 見た目はセグメント型だが、中身は name を共有した素の radio。
 * 矢印キーでの移動・ラベルのクリック・スクリーンリーダーでの読み上げは
 * ブラウザ側の実装がそのまま働く（原則4）。自前で tabIndex や
 * キーイベントを書くと、その瞬間からブラウザの改善が届かなくなる。
 */
export const segmented = style({
  display: 'inline-flex',
  background: vars.color.bg,
  border: `1px solid ${vars.color.border}`,
  borderRadius: 8,
  padding: vars.space['3xs'],
  gap: vars.space['3xs'],
});

export const srOnly = style({
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
  border: 0,
});

export const segment = style({
  borderRadius: 6,
  padding: `${vars.space['2xs']} ${vars.space.sm}`,
  fontSize: vars.text.xs,
  fontWeight: 600,
  color: vars.color.textMuted,
  cursor: 'pointer',
  userSelect: 'none',
  selectors: {
    '&:has(input:checked)': {
      background: vars.color.surface,
      color: vars.color.textStrong,
    },
    // フォーカスリングは input ではなくラベルに出す。
    // 実際に見えている当たり判定はラベルの方なので、そこを囲わないと位置がずれる。
    '&:has(input:focus-visible)': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: 2,
    },
  },
});

export const systemHint = style({
  color: vars.color.textMuted,
  fontSize: vars.text.xs,
  margin: `${vars.space.xs} 0 0`,
});

/* ---------------------------------------------------------------- */
/* 状態色 — 衝突を目で見るためのサンプル                              */
/* ---------------------------------------------------------------- */

export const note = style({
  color: vars.color.textMuted,
  fontSize: vars.text.xs,
  lineHeight: 1.8,
  margin: '0 0 14px',
});

export const strategyBox = style({
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: 10,
  padding: vars.space.md,
  marginBottom: vars.space.sm,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sm,
});

export const strategyOptions = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.xs,
});

export const strategyOption = style({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gap: '2px 10px',
  alignItems: 'start',
  padding: `${vars.space.xs} ${vars.space.xs}`,
  borderRadius: 8,
  border: `1px solid ${vars.color.border}`,
  cursor: 'pointer',
  selectors: {
    '&:has(input:checked)': {
      borderColor: vars.color.brand,
      background: vars.color.brandSubtle,
    },
    '&:has(input:focus-visible)': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: 2,
    },
  },
});

export const strategyName = style({
  color: vars.color.textStrong,
  fontSize: vars.text.sm,
  fontWeight: 600,
});

export const strategyDesc = style({
  gridColumn: 2,
  color: vars.color.textMuted,
  fontSize: vars.text.xs,
  lineHeight: 1.7,
  margin: 0,
});

export const checkLine = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.xs,
  fontSize: vars.text.xs,
  color: vars.color.text,
  cursor: 'pointer',
  borderTop: `1px solid ${vars.color.border}`,
  paddingTop: vars.space.sm,
});

export const hueTable = style({
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: vars.text.xs,
  color: vars.color.text,
});

export const hueCell = style({
  padding: '5px 8px',
  borderBottom: `1px solid ${vars.color.border}`,
  textAlign: 'left',
  fontWeight: 400,
});

export const hueHead = style([
  hueCell,
  { color: vars.color.textMuted, fontWeight: 600 },
]);

export const collisionFlag = style({
  color: vars.color.danger,
  fontWeight: 700,
});

export const okFlag = style({
  color: vars.color.textMuted,
});

export const chip = style({
  display: 'inline-block',
  width: 14,
  height: 14,
  borderRadius: 4,
  verticalAlign: '-2px',
  marginRight: vars.space['2xs'],
});

/** バナー・トースト。淡い面＋同色の枠線＋同色の文字 */
export const banner = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: vars.space.xs,
  borderRadius: 9,
  border: '1px solid',
  padding: '11px 14px',
  fontSize: vars.text.sm,
  lineHeight: 1.6,
  marginBottom: vars.space.xs,
});

export const bannerLabel = style({
  fontWeight: 700,
  marginRight: vars.space['2xs'],
});

export const field = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['2xs'],
  maxWidth: 380,
});

export const fieldLabel = style({
  fontSize: vars.text.xs,
  fontWeight: 600,
  color: vars.color.textStrong,
});

const inputBase = style({
  borderRadius: 7,
  border: `1px solid ${vars.color.border}`,
  background: vars.color.surface,
  color: vars.color.text,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  fontSize: vars.text.sm,
  fontFamily: 'inherit',
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: 1,
    },
  },
});

export const input = inputBase;

export const inputInvalid = style([
  inputBase,
  {
    borderColor: vars.color.danger,
    borderWidth: 2,
    padding: `${vars.space.xs} ${vars.space.xs}`,
  },
]);

export const fieldError = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['2xs'],
  color: vars.color.danger,
  fontSize: vars.text.xs,
  fontWeight: 600,
});

export const buttonDanger = style([
  buttonBase,
  {
    background: vars.color.danger,
    color: vars.color.onStatus,
    display: 'inline-flex',
    alignItems: 'center',
    gap: vars.space['2xs'],
  },
]);

export const statusSwatch = style([
  swatch,
  {
    justifyContent: 'space-between',
    gap: vars.space['2xs'],
  },
]);

export const statusSwatchTop = style({
  display: 'flex',
  justifyContent: 'flex-end',
});
