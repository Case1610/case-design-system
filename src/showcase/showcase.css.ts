import { style } from '@vanilla-extract/css';
import { vars } from '../tokens/contract.css';

export const page = style({
  background: vars.color.bg,
  color: vars.color.text,
  minHeight: '100vh',
  fontFamily: 'system-ui, -apple-system, "Hiragino Sans", sans-serif',
  padding: '32px 24px 64px',
});

export const container = style({
  maxWidth: 880,
  margin: '0 auto',
});

export const h1 = style({
  color: vars.color.textStrong,
  fontSize: 26,
  margin: '0 0 4px',
});

export const lead = style({
  color: vars.color.textMuted,
  fontSize: 13,
  margin: '0 0 28px',
});

export const h2 = style({
  color: vars.color.textStrong,
  fontSize: 15,
  margin: '32px 0 12px',
});

export const controls = style({
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: 10,
  padding: 16,
  display: 'flex',
  gap: 20,
  alignItems: 'center',
  flexWrap: 'wrap',
});

export const controlLabel = style({
  color: vars.color.textMuted,
  fontSize: 12,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const slider = style({
  width: 200,
  accentColor: vars.color.brand,
});

export const swatchRow = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
  gap: 8,
});

export const swatch = style({
  borderRadius: 8,
  border: `1px solid ${vars.color.border}`,
  height: 68,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: 8,
  fontSize: 10,
});

export const card = style({
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: 10,
  padding: 20,
  marginBottom: 12,
});

export const cardTitle = style({
  color: vars.color.textStrong,
  fontSize: 17,
  margin: '0 0 6px',
});

export const cardBody = style({
  fontSize: 13,
  lineHeight: 1.75,
  margin: '0 0 10px',
});

export const meta = style({
  color: vars.color.textMuted,
  fontSize: 11,
  margin: 0,
});

export const row = style({
  display: 'flex',
  gap: 8,
  alignItems: 'center',
  flexWrap: 'wrap',
});

const buttonBase = style({
  border: '1px solid transparent',
  borderRadius: 7,
  padding: '9px 16px',
  fontSize: 13,
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
  padding: '4px 11px',
  fontSize: 11,
  fontWeight: 600,
});
