import { useState } from 'react';
import {
  vars,
  HUE_VAR,
  STATUS_NAMES,
  STATUS_BASE_HUE,
  type StatusName,
} from '../tokens/contract.css';
import { themeClass, useColorScheme } from '../theme';
import type { ColorSchemePreference } from '../theme';
import { StatusIcon } from './StatusIcon';
import {
  MIN_HUE_DISTANCE,
  hueDistance,
  resolveStatusHues,
  statusHueStyle,
  type StatusHueStrategy,
} from './statusHue';
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

const STATUS_LABEL: Record<StatusName, string> = {
  danger: 'エラー',
  warning: '警告',
  success: '成功',
  info: '情報',
};

const STATUS_FG: Record<StatusName, string> = {
  danger: vars.color.danger,
  warning: vars.color.warning,
  success: vars.color.success,
  info: vars.color.info,
};

const STATUS_BG: Record<StatusName, string> = {
  danger: vars.color.dangerSubtle,
  warning: vars.color.warningSubtle,
  success: vars.color.successSubtle,
  info: vars.color.infoSubtle,
};

const strategyOptions: { value: StatusHueStrategy; label: string; desc: string }[] = [
  {
    value: 'shared',
    label: '対照 — ブランドと同じ色相から作る',
    desc: '採用候補ではない。生成元を分けるという既存の決定（原則2）が何を防いでいるかを見るための比較対象。状態色4つが常に1色になる。',
  },
  {
    value: 'fixed',
    label: 'A. 色相を固定する',
    desc: '状態色は慣習どおりの色相に固定し、--ds-hue の影響を受けない。状態色どうしは常に区別できるが、ブランド側が寄ってきたときは防げない。',
  },
  {
    value: 'avoid',
    label: `B. ぶつかったら状態色をずらす（${MIN_HUE_DISTANCE}度を確保）`,
    desc: '4つの相対関係を保ったまま、最小の回転量でブランド色相から離す。ブランドとは必ず見分けられるが、エラーが赤でなくなる。',
  },
];

/**
 * 衝突をひと押しで再現するためのプリセット。
 *
 * スライダーを手で動かして「だいたい赤」に合わせても、色相が数十度ずれていれば
 * 問題は半分しか見えない。一番きついところに直接行けるようにしておく。
 */
const huePresets = [
  { hue: 27, label: 'エラーと同じ (27)' },
  { hue: 70, label: '警告と同じ (70)' },
  { hue: 150, label: '成功と同じ (150)' },
  { hue: 245, label: '情報と同じ (245)' },
  { hue: 265, label: '既定 (265)' },
];

function Banner({
  name,
  cues,
  children,
}: {
  name: StatusName;
  cues: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={s.banner}
      style={{ background: STATUS_BG[name], borderColor: STATUS_FG[name], color: STATUS_FG[name] }}
    >
      {cues && <StatusIcon name={name} />}
      <span>
        {cues && <span className={s.bannerLabel}>{STATUS_LABEL[name]}</span>}
        {children}
      </span>
    </div>
  );
}

function Showcase() {
  const { preference, setPreference, resolved, system } = useColorScheme();
  const [hue, setHue] = useState(265);
  const [strategy, setStrategy] = useState<StatusHueStrategy>('fixed');
  const [cues, setCues] = useState(false);

  const statusHues = resolveStatusHues(strategy, hue);

  return (
    <div
      className={`${themeClass(resolved)} ${s.page}`}
      style={
        {
          [HUE_VAR]: String(hue),
          ...statusHueStyle(statusHues),
        } as React.CSSProperties
      }
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
          <div className={s.controlLabel}>
            <div className={s.segmented} role="group" aria-label="色相のプリセット（状態色と衝突する位置）">
              {huePresets.map((preset) => (
                <button
                  key={preset.hue}
                  type="button"
                  className={s.segment}
                  onClick={() => setHue(preset.hue)}
                  style={{ background: 'none', border: 'none', fontFamily: 'inherit' }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
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

        {/* ------------------------------------------------------------ */}

        <h2 className={s.h2}>状態色 — 4つ、そして色相解放との衝突</h2>
        <p className={s.note}>
          <strong>上のプリセットで「エラーと同じ (27)」を押してほしい。</strong>
          ブランド色とエラー色が、区別できないところまで一致する。
          「成功と同じ (150)」なら成功と、「警告と同じ (70)」なら警告とぶつかる。
          これはバグではなく、原則1（色相は閲覧者が決める）を実装した結果として必然的に出てくる問題で、
          原則2（意味を伝える資源を、意味以外で消費しない）と正面からぶつかっている。
          <br />
          下の切替で、解き方を見比べられる。<strong>まだどれも採用していない。</strong>
        </p>

        <div className={s.strategyBox}>
          <div className={s.strategyOptions} role="radiogroup" aria-label="状態色の色相の決め方">
            {strategyOptions.map((option) => (
              <label key={option.value} className={s.strategyOption}>
                <input
                  type="radio"
                  name="status-hue-strategy"
                  value={option.value}
                  checked={strategy === option.value}
                  onChange={() => setStrategy(option.value)}
                />
                <span className={s.strategyName}>{option.label}</span>
                <p className={s.strategyDesc}>{option.desc}</p>
              </label>
            ))}
          </div>

          <label className={s.checkLine}>
            <input type="checkbox" checked={cues} onChange={(e) => setCues(e.target.checked)} />
            C. 色だけに頼らない — アイコンと状態名を付ける（A・B と併用できる）
          </label>

          <table className={s.hueTable}>
            <caption className={s.strategyDesc} style={{ textAlign: 'left', marginBottom: 6 }}>
              いま各色が使っている色相と、ブランド色相（{hue}度）からの距離
            </caption>
            <thead>
              <tr>
                <th className={s.hueHead}>状態</th>
                <th className={s.hueHead}>既定</th>
                <th className={s.hueHead}>いまの色相</th>
                <th className={s.hueHead}>ブランドとの距離</th>
              </tr>
            </thead>
            <tbody>
              {STATUS_NAMES.map((name) => {
                const current = statusHues[name];
                const distance = hueDistance(hue, current);
                return (
                  <tr key={name}>
                    <th scope="row" className={s.hueCell}>
                      <span className={s.chip} style={{ background: STATUS_FG[name] }} />
                      {STATUS_LABEL[name]}（{name}）
                    </th>
                    <td className={s.hueCell}>{STATUS_BASE_HUE[name]}度</td>
                    <td className={s.hueCell}>
                      {current}度
                      {current !== STATUS_BASE_HUE[name] && (
                        <span className={s.okFlag}>
                          {' '}
                          ({current > STATUS_BASE_HUE[name] ? '+' : ''}
                          {current - STATUS_BASE_HUE[name]})
                        </span>
                      )}
                    </td>
                    <td className={s.hueCell}>
                      <span
                        className={distance < MIN_HUE_DISTANCE ? s.collisionFlag : s.okFlag}
                      >
                        {distance}度
                        {distance < MIN_HUE_DISTANCE ? ' ← 見分けにくい' : ''}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h3 className={s.cardTitle} style={{ fontSize: 14, margin: '22px 0 8px' }}>
          1. 通知を並べて、目で拾えるか
        </h3>
        <p className={s.note}>
          一番上はブランド色のお知らせで、状態を持たない。
          これとエラーが同じ色に見えたら、「赤が目に入ったら異常」という反射は成立していない。
        </p>
        <div className={s.card}>
          <div
            className={s.banner}
            style={{
              background: vars.color.brandSubtle,
              borderColor: vars.color.brand,
              color: vars.color.brand,
            }}
          >
            <span>
              <span className={s.bannerLabel}>お知らせ</span>
              新しいテンプレートを追加しました（これはブランド色。状態ではない）
            </span>
          </div>
          <Banner name="danger" cues={cues}>
            決済に失敗しました。カード情報を確認してください
          </Banner>
          <Banner name="warning" cues={cues}>
            保存されていない変更があります
          </Banner>
          <Banner name="success" cues={cues}>
            設定を保存しました
          </Banner>
          <Banner name="info" cues={cues}>
            次回のメンテナンスは 9月20日 2:00 からです
          </Banner>
        </div>

        <h3 className={s.cardTitle} style={{ fontSize: 14, margin: '22px 0 8px' }}>
          2. エラーのフォーム
        </h3>
        <p className={s.note}>
          入力欄の枠線は danger。フォーカスリングはブランド色なので、色相がぶつかると
          「エラーの枠」と「フォーカスされている枠」が同じ色になる。Tab キーで触ってみてほしい。
        </p>
        <div className={s.card}>
          <div className={s.field}>
            <label className={s.fieldLabel} htmlFor="demo-email">
              メールアドレス
            </label>
            <input
              id="demo-email"
              className={s.inputInvalid}
              type="email"
              defaultValue="kase@example"
              aria-invalid="true"
              aria-describedby="demo-email-error"
            />
            <span className={s.fieldError} id="demo-email-error">
              {cues && <StatusIcon name="danger" size={14} />}
              ドメインが正しくありません
            </span>
          </div>
          <div className={s.field} style={{ marginTop: 16 }}>
            <label className={s.fieldLabel} htmlFor="demo-name">
              表示名（正常な入力欄）
            </label>
            <input id="demo-name" className={s.input} type="text" defaultValue="加瀬" />
          </div>
        </div>

        <h3 className={s.cardTitle} style={{ fontSize: 14, margin: '22px 0 8px' }}>
          3. 取り消せない操作
        </h3>
        <p className={s.note}>
          「保存」はブランド色、「削除」は danger。この2つが同じ色に見える状態は、
          読みにくいという話ではなく、押し間違いの話になる。
        </p>
        <div className={s.card}>
          <div className={s.row}>
            <button className={s.buttonPrimary}>保存する</button>
            <button className={s.buttonDanger}>
              {cues && <StatusIcon name="danger" size={14} />}
              アカウントを削除
            </button>
          </div>
        </div>

        <h3 className={s.cardTitle} style={{ fontSize: 14, margin: '22px 0 8px' }}>
          4. トークン
        </h3>
        <div className={s.swatchRow}>
          {STATUS_NAMES.map((name) => (
            <div
              key={name}
              className={s.statusSwatch}
              style={{ background: STATUS_BG[name], color: STATUS_FG[name] }}
            >
              <div className={s.statusSwatchTop}>
                <StatusIcon name={name} size={14} />
              </div>
              <div>
                {name}
                <br />
                {name}Subtle
              </div>
            </div>
          ))}
        </div>
        <p className={s.note} style={{ marginTop: 10 }}>
          1状態につき2つ。濃い方（文字・アイコン・枠線・塗り）と淡い方（面）で、
          ブランド色が brand / brandSubtle の2段で足りているのと同じ構造にしてある。
          明度はライト 45% / 94%、ダーク 72% / 27% に予約済みで、
          色相を0〜360度のどこに置いてもコントラスト比は 4.5:1 を下回らない
          （全色相を走査して確認。最小はライト 5.94:1、ダーク 5.82:1）。
        </p>
      </div>
    </div>
  );
}

export default Showcase;
