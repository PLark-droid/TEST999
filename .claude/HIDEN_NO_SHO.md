# 秘伝の書 - Miyabi × Claude Max 神の開発力

> 「雅とは、複雑さを隠し、シンプルに見せる洗練された美である」
> — ハヤシシュンスケ

---

## 序章: ハヤシシュンスケの思想

### 「雅」の本質

Miyabi（雅）は単なるツールではない。**思想**である。

```
複雑なものを複雑なまま見せるのは凡人
複雑なものをシンプルに見せるのが雅
```

ハヤシシュンスケさんが目指したのは:
- **Zero-learning-cost**: 学習コストゼロ。触れば動く
- **AI-First**: 人間が頑張るのではなく、AIに頑張らせる
- **GitHub-as-OS**: GitHubを開発の全てとして扱う
- **識学理論**: 組織設計の原則をAIエージェントに適用

### 識学理論 5原則

```
1. 責任の明確化 → 各Agentが特定Issueの責任を負う
2. 権限の委譲   → Agentは自律的に判断・実行
3. 階層の設計   → Human → Coordinator → Specialist
4. 結果の評価   → 品質スコア・カバレッジで客観評価
5. 曖昧性の排除 → DAG・ラベルで状態を可視化
```

**核心**: 感情的判断を排除し、アルゴリズムで動かす。

---

## 第一章: Claude Max × Miyabi の神髄

### Claude Maxの特性を理解する

Claude Maxは:
- **無制限のコンテキスト**: 長大な会話でも文脈を失わない
- **高速なレスポンス**: 待ち時間最小化
- **並列ツール実行**: 複数操作を同時実行

これを活かすMiyabiの使い方:

```
❌ 悪い例: 1つずつIssueを処理する
✅ 良い例: 複数Issueを並列でAgentに投げる

❌ 悪い例: 細かく指示を出す
✅ 良い例: Issueを書いて「処理して」と言うだけ
```

### 神の開発フロー

```
┌─────────────────────────────────────────────────────────┐
│  Human: Issueを自然言語で書く                            │
│         ↓                                               │
│  Claude Max: 「処理して」の一言で全自動                   │
│         ↓                                               │
│  Miyabi: Issue → 分析 → コード生成 → レビュー → PR       │
│         ↓                                               │
│  Human: PRをマージするだけ                               │
└─────────────────────────────────────────────────────────┘
```

---

## 第二章: Issue駆動開発の極意

### Issueは「契約書」である

Issueは単なるタスクメモではない。**AIへの契約書**である。

#### 最強のIssue構造

```markdown
## 概要
何を達成したいか（1-2文）

## 背景
なぜこれが必要か

## 受け入れ条件
- [ ] 条件1: 具体的な完了基準
- [ ] 条件2: テストが通ること
- [ ] 条件3: レビュースコア80点以上

## 技術的な制約（あれば）
- TypeScript strict mode
- 既存のXXXパターンに従う
```

#### Issue作成の黄金律

```
1. 曖昧な言葉を使わない
   ❌ 「いい感じに」「適切に」「必要に応じて」
   ✅ 「エラー時は400を返す」「3秒以内に応答」

2. 受け入れ条件をチェックボックスで書く
   → CoordinatorAgentがDAGに変換できる

3. 1 Issue = 1 責任
   → 大きすぎるIssueは分割する

4. 依存関係を明記
   → 「#123 完了後に着手」
```

### Issue → 神速PR のコマンド

```bash
# Claude Codeで実行
gh issue create --title "機能: ユーザー認証API" --body "$(cat <<'EOF'
## 概要
JWT認証エンドポイントを実装

## 受け入れ条件
- [ ] POST /auth/login が動作
- [ ] POST /auth/logout が動作
- [ ] トークン検証ミドルウェア実装
- [ ] テストカバレッジ80%以上
EOF
)"

# そして一言
「Issue #1 を処理して」
```

---

## 第三章: 6つのAgentを使い倒す

### Agent召喚の術

```
┌──────────────────┬────────────────────────────────────┐
│ 状況             │ 召喚するAgent                       │
├──────────────────┼────────────────────────────────────┤
│ 複数タスクがある │ CoordinatorAgent（自動でDAG構築）   │
│ コードを書きたい │ CodeGenAgent（Claude Sonnet 4）     │
│ 品質を確認したい │ ReviewAgent（80点判定）             │
│ Issueを分析したい│ IssueAgent（65ラベル自動付与）      │
│ PRを作りたい     │ PRAgent（Conventional Commits）     │
│ デプロイしたい   │ DeploymentAgent（Firebase + Rollback）│
└──────────────────┴────────────────────────────────────┘
```

### 並列Agent実行の秘技

```bash
# 単発実行（遅い）
miyabi agent run issue --issue=123

# 並列実行（神速）
miyabi agent run issue --issues=123,124,125 --concurrency=3

# 全自動モード（究極）
miyabi auto --max-issues=10 --interval=30
```

**Water Spider（みずすまし）モード**: `miyabi auto` は監視を続け、新しいIssueが来たら自動処理。寝ている間にコードが書かれている。

### Agent連携の流れ

```
Issue #123 作成
    ↓ [5秒]
IssueAgent: 分析 → 65ラベル付与 → 見積もり
    ↓ [自動]
CoordinatorAgent: DAG構築 → 並列実行計画
    ↓ [並列]
CodeGenAgent × N: コード生成（最大5並列）
    ↓ [自動]
ReviewAgent: 品質スコア判定
    ├─ 80点以上 → 次へ
    └─ 80点未満 → フィードバック → 再生成
    ↓ [自動]
PRAgent: Draft PR作成
    ↓ [人間]
マージ → DeploymentAgent → 本番デプロイ
```

---

## 第四章: 自然言語AI駆動開発

### Claude Codeへの話し方

#### レベル1: 基本（これだけで十分）

```
「Issue #123 を処理して」
「プロジェクトのステータスを確認して」
「テストを実行して」
```

#### レベル2: 応用

```
「認証機能のIssueを作成して、そのまま処理まで実行して」
「未処理のIssueを全部並列で処理して」
「PRのレビュー状況を確認して、マージ可能なものを教えて」
```

#### レベル3: 神

```
「このプロジェクトに必要な機能を5つ提案して、
 それぞれIssueを作成し、優先度順に並列処理して、
 完了したらSlackに通知して」
```

### やってはいけないこと

```
❌ 細かすぎる指示
   「src/auth/login.tsの35行目のif文を...」
   → Issueに書いてAgentに任せろ

❌ 途中で口を出す
   → Agentが処理中は待て。エスカレーションが来たら対応

❌ 1つずつ処理する
   → 並列実行を活用しろ
```

---

## 第五章: 品質80点の壁を超える

### ReviewAgentの採点基準

```
基準点: 100点

減点項目:
  - ESLintエラー:      -20点/件
  - TypeScriptエラー:  -30点/件
  - Critical脆弱性:    -40点/件
  - High脆弱性:        -20点/件
  - Medium脆弱性:      -10点/件

合格ライン: 80点以上
```

### 80点を確実に取る方法

```typescript
// 1. TypeScript strict mode を守る
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}

// 2. any を使わない
❌ const data: any = fetchData();
✅ const data: UserResponse = await fetchData();

// 3. エラーハンドリングを書く
❌ const result = await api.call();
✅ try {
     const result = await api.call();
   } catch (error) {
     if (error instanceof ApiError) {
       // 適切な処理
     }
     throw error;
   }

// 4. テストを書く（80%カバレッジ目標）
describe('login', () => {
  it('正常系', async () => { /* ... */ });
  it('異常系: パスワード不正', async () => { /* ... */ });
  it('異常系: ユーザー存在しない', async () => { /* ... */ });
});
```

### レビュー不合格時の対処

```
ReviewAgent: 「品質スコア: 65点。以下の問題があります...」
    ↓
自動でCodeGenAgentが再生成
    ↓
再度ReviewAgent判定
    ↓
80点超えるまで繰り返し（最大3回）
    ↓
3回失敗 → TechLeadにエスカレーション
```

---

## 第六章: DAGオーケストレーションの真髄

### DAG（Directed Acyclic Graph）とは

```
タスクの依存関係を有向グラフで表現し、
循環がないことを保証した上で、
最大並列度で実行する仕組み
```

### Issue内でDAGを構築させる書き方

```markdown
## タスク

- [ ] 1. データベーススキーマ設計
- [ ] 2. APIエンドポイント実装 (depends: 1)
- [ ] 3. フロントエンド実装 (depends: 2)
- [ ] 4. 単体テスト作成 (depends: 2)
- [ ] 5. E2Eテスト作成 (depends: 3, 4)
- [ ] 6. ドキュメント更新 (depends: 2)
```

CoordinatorAgentはこれを自動解析:

```
Level 0: [1]           ← 最初に実行
Level 1: [2]           ← 1完了後
Level 2: [3, 4, 6]     ← 2完了後（並列実行！）
Level 3: [5]           ← 3,4完了後

並列度: max(1, 1, 3, 1) = 3
```

### 循環依存を避ける

```
❌ ダメな例
  - [ ] A (depends: C)
  - [ ] B (depends: A)
  - [ ] C (depends: B)  ← 循環！

✅ 良い例
  - [ ] A
  - [ ] B (depends: A)
  - [ ] C (depends: B)
```

循環依存を検出したら、CoordinatorAgentは自動でTechLeadにエスカレーション。

---

## 第七章: エスカレーションの活用

### エスカレーション = 弱さではない

```
Agentが判断できない時に人間に委ねるのは、
「弱さ」ではなく「設計通りの動作」である。

識学理論: 権限を超えた判断は上位者に委ねる
```

### エスカレーション先マトリクス

```
┌────────────────────┬──────────────┬─────────────────┐
│ 問題               │ 担当         │ 対応時間        │
├────────────────────┼──────────────┼─────────────────┤
│ アーキテクチャ設計 │ TechLead     │ 24時間以内      │
│ セキュリティ脆弱性 │ CISO         │ 即座            │
│ ビジネス優先度     │ PO           │ 1週間以内       │
│ 本番デプロイ承認   │ CTO          │ 即座            │
│ 循環依存検出       │ TechLead     │ 24時間以内      │
│ 要件不明確         │ PO           │ 1週間以内       │
└────────────────────┴──────────────┴─────────────────┘
```

### エスカレーションを受けたら

```
1. Issueのコメントを確認
2. 判断を下す（承認 or 却下 or 修正指示）
3. ラベルを更新（state:blocked → state:implementing）
4. Agentが自動で再開
```

---

## 第八章: 神の開発力ワークフロー

### 朝のルーティン

```bash
# 1. ステータス確認（30秒）
miyabi status

# 2. 未処理Issueを全自動処理（放置）
miyabi auto --max-issues=20

# 3. コーヒーを飲みながらPRレビュー
gh pr list --state open
```

### 新機能開発フロー

```
1. 要件を自然言語で書く（5分）
   ↓
2. Issue作成（1分）
   gh issue create --title "機能: XXX" --body "..."
   ↓
3. 「処理して」（1秒）
   ↓
4. PRが来るまで別の仕事（5-15分）
   ↓
5. PRレビュー＆マージ（2分）
   ↓
6. 自動デプロイ（放置）
```

**従来**: 機能実装に2-4時間
**Miyabi**: 実質的な作業時間10分以下

### 週間サイクル

```
月曜: 週のIssueを全て作成 → miyabi auto
火-木: エスカレーション対応 & PRレビュー
金曜: KPIレポート確認 → 来週の計画
```

---

## 第九章: 実践コマンド集

### 基本操作

```bash
# プロジェクト初期化
miyabi init my-project --private

# ステータス確認
miyabi status
miyabi status --watch  # リアルタイム監視

# 設定確認
miyabi config list
```

### Issue操作

```bash
# Issue作成
gh issue create --title "タイトル" --body "本文"

# ラベル付きIssue作成
gh issue create --title "バグ: XXX" --body "..." --label "bug,priority:P1-High"

# Issue一覧
gh issue list --state open
```

### Agent実行

```bash
# 単一Issue処理
miyabi agent run issue --issue=123 --json

# 複数Issue並列処理
miyabi agent run issue --issues=123,124,125 --concurrency=3

# 全自動モード
miyabi auto --max-issues=10 --interval=30

# TODO自動検出 → Issue化
miyabi todos
```

### Claude Codeスラッシュコマンド

```
/test           - テスト実行
/deploy         - デプロイ
/verify         - システム検証
/security-scan  - セキュリティスキャン
/create-issue   - 対話的Issue作成
/agent-run      - Agent実行
/miyabi-status  - ステータス確認
/miyabi-auto    - 全自動モード
```

---

## 第十章: トラブルシューティング

### よくある問題と解決策

```
Q: Agentが動かない
A: GITHUB_TOKEN と ANTHROPIC_API_KEY を確認
   export GITHUB_TOKEN=ghp_xxxxx
   export ANTHROPIC_API_KEY=sk-ant-xxxxx

Q: 品質スコアが上がらない
A: TypeScript strict mode有効化
   ESLint設定確認
   テストカバレッジ80%目標

Q: 循環依存エラー
A: Issueのdependsを確認
   A→B→C→A のループがないか

Q: デプロイが失敗する
A: Firebase設定確認
   ヘルスチェックURL確認
   自動Rollbackが動作したか確認
```

### デバッグモード

```bash
# 詳細ログ出力
MIYABI_VERBOSE=1 miyabi agent run issue --issue=123

# Dry run（実行せずに計画だけ表示）
miyabi agent run issue --issue=123 --dry-run

# JSON出力（パース用）
miyabi status --json
```

---

## 終章: 雅の境地へ

### 究極の姿

```
朝、Issueを数個書く
「処理して」と言う
夕方、PRをマージする
夜、本番で動いている

これが雅の開発である。
```

### 心得

```
1. AIを信じろ
   → 細かく口を出すな。Agentは優秀だ。

2. Issueに魂を込めろ
   → 曖昧なIssueからは曖昧なコードしか生まれない。

3. エスカレーションを恐れるな
   → それは設計通りの動作である。

4. 結果で評価しろ
   → 感情的判断を排除。品質スコアが全て。

5. 並列化を極めろ
   → 1つずつやるのは凡人。神は並列で動かす。
```

### ハヤシシュンスケの言葉

> 「開発者は考えることに集中すべきだ。
>   手を動かすのはAIの仕事。
>   これが雅の本質である。」

---

## 付録: クイックリファレンス

### 最重要コマンド5選

```bash
miyabi init <name>           # プロジェクト作成
miyabi status --watch        # リアルタイム監視
miyabi auto                  # 全自動モード（神）
miyabi agent run --issue=N   # Issue処理
gh issue create              # Issue作成
```

### 最重要フラグ

```bash
--json          # JSON出力（AI解析用）
--yes           # 確認スキップ
--concurrency=N # 並列数指定
--dry-run       # 実行せずに計画表示
--watch         # リアルタイム監視
```

### 環境変数

```bash
GITHUB_TOKEN=ghp_xxxxx       # 必須
ANTHROPIC_API_KEY=sk-ant-xxx # 必須
MIYABI_VERBOSE=1             # デバッグ時
MIYABI_JSON=1                # JSON出力強制
MIYABI_AUTO_YES=1            # 確認スキップ
```

---

🌸 **Miyabi** - 雅なる自律開発の境地へ

*この秘伝の書は、ハヤシシュンスケの思想を継承し、Claude Maxと共に神の開発力を手にする者のために記された。*

---

**作成日**: 2025-01-17
**対象**: Claude Max × Miyabi 使い手
**バージョン**: 1.0.0
