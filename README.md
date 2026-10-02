# ツインレイタイプ診断

`index.html`、`styles.css`、`app.js` と `assets/` を同じ階層のまま、既存ドメインの `twinray-type/` へアップロードすると動作します。ビルドや外部ライブラリは不要です。

## 公開前に変更する箇所

結果CTAはキョウカnoteの記事トップへ戻します。note側では見出しアンカーを固定できないため、`CONFIG.noteAnchors` は `false` にしています。記事URLが変わった場合だけ `CONFIG.noteUrl` を更新してください。

## LINE / UTAGE連携

診断完了時に以下を用意しています。

- `window` で `twinray:completed` イベントを発火
- `window.dataLayer` へ診断結果を追加
- `window.TwinrayDiagnosis.getPayload()` で結果を取得
- `localStorage` の `twinray_type` / `twinray_result` / `twinray_diagnosis` に結果を保持
- `CONFIG.webhookUrl` を設定した場合のみJSONをPOST

送信データには `type`（`TYPE01`〜`TYPE06`）、`result`（英字キー）、`typeName`、全回答、完了時刻、バージョンが含まれます。外部送信は初期状態では無効です。

流入元ごとにnoteの戻り先を変えたい場合は、診断URLへ `?note=https%3A%2F%2Fnote.com%2F...` を付けられます。

## 判定ルール

- Q7を主判定
- Q7と現在地が矛盾する場合のみQ8で補正
- さらにQ4〜Q6で「音信不通・元交際・交際中・外的事情」の成立条件を確認
- Q1〜Q3とQ9は没入感と理想未来の言語化に使用

対応は次の通りです。

| Q7 | 結果 |
| --- | --- |
| A | TYPE03 君の名は。タイプ |
| B | TYPE02 シンデレラタイプ |
| C | TYPE01 眠れる森の美女タイプ |
| D | TYPE05 織姫と彦星タイプ |
| E | TYPE06 美女と野獣タイプ |
| F | TYPE04 ロミオとジュリエットタイプ |
