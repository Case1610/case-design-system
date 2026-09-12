import { style } from '@vanilla-extract/css';
import { vars } from '../tokens/contract.css';

export const root = style({
  display: 'flex',
  gap: 9,
  alignItems: 'flex-start',
  borderRadius: 8,
  padding: '11px 13px',
  fontSize: 13,
  lineHeight: 1.6,
  fontFamily: 'inherit',
});

export const label = style({
  fontWeight: 700,
  // 状態名とアイコンは必ず同じ行に並ぶ。折り返して離れると対応が読めなくなる
  whiteSpace: 'nowrap',
});

export const body = style({
  margin: 0,
  color: vars.color.text,
});

export const head = style({
  display: 'flex',
  gap: 6,
  alignItems: 'center',
});
