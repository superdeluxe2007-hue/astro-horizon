# Enlee 公式サイト（enlee-fukuyama.com）

## ⚠️ 作業前に必ず読むこと

このサイトの**設計思想・ページ構成の意図・掲載料金の確定値・過去の不具合**は、
すべて LLM Wiki に集約されている。コードを触る前に必ず読むこと。

- `/Users/takanorifujii/Documents/LLM-wiki/wiki/businesses/enlee/website.md` ← **最重要**
- `/Users/takanorifujii/Documents/LLM-wiki/wiki/businesses/enlee/menu.md`（料金の一次情報。**旧チラシの価格は使わない**）
- `/Users/takanorifujii/Documents/LLM-wiki/wiki/businesses/enlee/index.md`（店舗概要・営業時間）

### 🎨 文言・デザインを触るなら、先にブランド正本を読む（必須）

サイトに出る文字と見た目は、**Wiki側の正本に従う**。ここのコードを出典にしない。

- `/Users/takanorifujii/Documents/LLM-wiki/wiki/brand/writing-style.md` ← **表記の正本**（時刻・金額・記号）
- `/Users/takanorifujii/Documents/LLM-wiki/wiki/brand/enlee.md` ← **Enleeのトンマナ**（語り口・色・書体・写真・NG表現）

**特に間違えやすい3点**

| | 正 |
|---|---|
| 営業時間 | **`11:00〜21:00（L.O.20:00）`**（`〜`はU+301C。`–` `-` は使わない。🔴`21:30`/`L.O.20:30`は旧表記で誤り） |
| 金額 | **`¥1,500（税込）`**（`税込¥1,500` `1,500円` は使わない） |
| L.O.の時刻 | **省略しない**（`（L.O）` だけでは何時までに入ればよいか伝わらない） |

> ⚠️ **現在このリポジトリの表記は正本とズレている**（`11:00–21:00（L.O 20:00）` 等）。
> 該当は `src/components/Contact/Contact.astro` / `src/components/Lunch/Lunch.astro` / `src/pages/lunch.astro` / `src/data/otherPages/privacy-policy.md`。触るついでに直す。

**色コードの正本は `src/styles/tailwind-theme.css`。** Wiki側には転記していないので、値はここを見る。

---

## サイトの目的（KOKONとの違い）

**Enlee＝情緒6割・実務4割の「ファンを増やすブランドサイト」。**
受注導線が主目的の KOKON サイトとは設計思想が異なる。実務情報を並べる方向に寄せない。

---

## 技術構成

| 項目 | 内容 |
|---|---|
| フレームワーク | Astro ＋ Tailwind |
| ベーステーマ | Cosmic-Themes「Horizon」（GPL） |
| パッケージマネージャ | **pnpm** |
| GitHub | `superdeluxe2007-hue/astro-horizon`（**Public**） |
| ホスティング | **Cloudflare Pages**（プロジェクト名 `astro-horizon`） |
| デプロイ | **main に push で自動ビルド・自動デプロイ** |
| ドメイン | **ムームードメイン（GMO）**取得 → ネームサーバーを Cloudflare に変更済み |

---

## ✅ 解消済みのバグ（2026-08-09）

テーマ由来のSEOバグ2件は**両方とも修正済み**。

1. ~~robots.txt がテンプレート配布元を指している~~ → 自サイトの sitemap に修正
2. ~~OGP画像が404~~ → 1200×630 を生成して `public/images/enlee-venue-night.jpg` に配置

あわせてテーマの残骸（`netlify.toml`／`cosmic-themes-logo.png`／`/elements` として公開されていた `elements.mdx`）も削除済み。

---

## 🔴 料金を触る前に必ず読むこと

**料金の正は `LLM-wiki/wiki/businesses/enlee/menu.md` だけ。**
リポジトリ内の素材ファイル（`宴会・貸切プラン素材_2026-07.md`）やHPの既存表記を出典にしない。

2026-08-09、素材ファイルを正として扱ったため**延長料金を「30分¥5,000」と誤掲載した**（正しくは、おひとり様30分¥500＝人数×¥500）。menu.md には2026-07-24付で訂正が入っていた。

改定時にどこを直すかは `LLM-wiki/wiki/businesses/enlee/channel-sync.md` のチェックリストを使う。ebica・公式LINE・Google・チラシ・メニュー表にも同じ情報がある。

> ⚠️ **HPの予約ボタンのリンク先は ebica のURL**（お問い合わせ欄／Anniversaryセクションの2箇所。公式LINEの応答メッセージにも同じURL）。
> ebicaは**当面このまま使う方向**（2026-08-09本人確認。レストランボードは検討中だがネガティブ寄り）。ただし将来切り替える場合は、**この3箇所の差し替えが必須**。

## その他の既知の罠

- **`netlify.toml` は未使用**。実体は Cloudflare Pages。
- **frontmatter のカンマ入り数値はクォート必須**。`6,000円` をクォートなしで書くとYAMLが配列と解釈し「大人6 & 000円」と崩れる（前例あり）。
- **本文divには `markdown-content` クラスが必要**。無いと表・箇条書きのスタイルが当たらない。
- **`astro.config.mjs` の `site`** はテーマのデモURLに戻さない（sitemapが他人のドメインで生成される）。

---

## ⚠️ 触ってはいけないこと

- **ロリポップ契約は解約しない**。MAIAのサイトが同契約上に存在する。
  Enleeとしては使わなくなっただけで、契約自体は生きている必要がある。

---

## 作業後にやること

変更内容と**判断の根拠**を LLM Wiki の `businesses/enlee/website.md` に反映する。
料金を変えた場合は `menu.md` との整合も確認する。
