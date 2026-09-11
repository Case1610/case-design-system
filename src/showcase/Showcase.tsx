import { useState } from 'react';
import { vars, HUE_VAR } from '../tokens/contract.css';
import { themeClass, useColorScheme } from '../theme';
import type { ColorSchemePreference } from '../theme';
import * as s from './showcase.css';

const swatches = [
  { name: 'bg', value: vars.color.bg, on: vars.color.text },
  { name: 'surface', value: vars.color.surface, on: vars.color.text },
  { name: 'border', value: vars.color.border, on: vars.color.text },
  { name: 'textMuted', value: vars.color.textMuted, on: vars.color.bg },
  { name: 'text', value: vars.color.text, on: vars.color.bg },
  { name: 'textStrong', value: vars.color.textStrong, on: vars.color.bg },
];

const brandSwatches = [
  { name: 'brand', value: vars.color.brand, on: vars.color.onBrand },
  { name: 'brandHover', value: vars.color.brandHover, on: vars.color.onBrand },
  { name: 'brandSubtle', value: vars.color.brandSubtle, on: vars.color.brand },
];

const schemeOptions: { value: ColorSchemePreference; label: string }[] = [
  { value: 'system', label: 'システム' },
  { value: 'light', label: 'ライト' },
  { value: 'dark', label: 'ダーク' },
];

function Showcase() {
  const { preference, setPreference, resolved, system } = useColorScheme();
  const [hue, setHue] = useState(265);

  return (
    <div
      className={`${themeClass(resolved)} ${s.page}`}
      style={{ [HUE_VAR]: String(hue) } as React.CSSProperties}
    >
      <div className={s.container}>
        <h1 className={s.h1}>case-design-system</h1>
        <p className={s.lead}>
          明度は役割に予約され、色相だけが変数。スライダーを動かしても読みやすさは変わらない。
        </p>

        <div className={s.controls}>
          <div className={s.controlLabel}>
            配色
            <div className={s.segmented} role="radiogroup" aria-label="配色">
              {schemeOptions.map((option) => (
                <label key={option.value} className={s.segment}>
                  <input
                    className={s.srOnly}
                    type="radio"
                    name="color-scheme"
                    value={option.value}
                    checked={preference === option.value}
                    onChange={() => setPreference(option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
          <label className={s.controlLabel}>
            色相
            <input
              className={s.slider}
              type="range"
              min={0}
              max={360}
              value={hue}
              onChange={(e) => setHue(Number(e.target.value))}
            />
            <span style={{ width: 30, textAlign: 'right' }}>{hue}</span>
          </label>
        </div>
        <p className={s.systemHint}>
          既定は「システム」。OS の設定（いまは{system === 'dark' ? 'ダーク' : 'ライト'}）に追従し、
          設定を変えればこのページも切り替わる。手動で選ぶとその選択が保存され、以降は追従しない。
        </p>

        <h2 className={s.h2}>中立色 — 6段階</h2>
        <div className={s.swatchRow}>
          {swatches.map((sw) => (
            <div key={sw.name} className={s.swatch} style={{ background: sw.value, color: sw.on }}>
              {sw.name}
            </div>
          ))}
        </div>

        <h2 className={s.h2}>アクセント — 1色</h2>
        <div className={s.swatchRow}>
          {brandSwatches.map((sw) => (
            <div key={sw.name} className={s.swatch} style={{ background: sw.value, color: sw.on }}>
              {sw.name}
            </div>
          ))}
        </div>

        <h2 className={s.h2}>組み合わせ</h2>
        <div className={s.card}>
          <h3 className={s.cardTitle}>見出しは textStrong</h3>
          <p className={s.cardBody}>
            本文は text。長めの文章でも読み疲れない明度にしてある。
            色相を変えても、この読みやすさの関係は動かない。
          </p>
          <p className={s.meta}>2026-09-11 ・ 補助情報は textMuted</p>
        </div>

        <div className={s.card}>
          <div className={s.row}>
            <button className={s.buttonPrimary}>主アクション</button>
            <button className={s.buttonSecondary}>副アクション</button>
            <button className={s.buttonDisabled} disabled>
              無効
            </button>
            <span className={s.tag}>React</span>
            <span className={s.tag}>TypeScript</span>
          </div>
          <p className={s.meta} style={{ marginTop: 12 }}>
            階層は色数ではなく、塗りつぶし / 枠線のみ / 淡色背景で作る。
            無効状態は border と textMuted を使い回している。
          </p>
        </div>
      </div>
    </div>
  );
}

export default Showcase;
