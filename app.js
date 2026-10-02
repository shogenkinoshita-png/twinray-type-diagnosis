(() => {
  "use strict";

  const CONFIG = {
    // note側は見出しアンカーを固定できないため、記事トップへ戻します。
  noteUrl: "https://note.com/cool_shrew5648/n/n34efa02026df",
    noteAnchors: false,
    // UTAGE等へ送信する場合だけURLを設定。空欄なら外部送信は行いません。
    webhookUrl: "",
    readingDelayMs: 3000,
  };

  const questions = [
    {
      id: "q1",
      text: "彼との間に、普通の恋愛では説明できない「特別なつながり」を感じますか？",
      options: [
        ["A", "強く感じる", "「この人だけは他の人と違う」とずっと感じている"],
        ["B", "なんとなく感じる", "うまく説明できないけど、普通の恋愛とは違う気がする"],
        ["C", "離れてから、むしろ強く感じるようになった", "会えないのに、なぜか彼の存在が消えない"],
        ["D", "正直、まだよく分からない", "だからこそ、二人の関係を知りたい"],
      ],
    },
    {
      id: "q2",
      text: "彼と出会ってから、あなた自身に変化はありましたか？",
      options: [
        ["A", "人生観まで大きく変わった"],
        ["B", "恋愛に対する考え方がかなり変わった"],
        ["C", "自分自身と向き合うことが増えた"],
        ["D", "まだ大きな変化は感じていない"],
      ],
    },
    {
      id: "q3",
      text: "彼と離れていても、「この二人はまだ終わっていない」と感じることはありますか？",
      options: [
        ["A", "なぜか強くそう感じる"],
        ["B", "なんとなく感じる"],
        ["C", "そうであってほしい、という気持ちはある"],
        ["D", "正直まだ分からない"],
      ],
    },
    {
      id: "q4",
      text: "今の彼との関係に一番近いものは？",
      options: [
        ["A", "現在付き合っている・結婚している"],
        ["B", "過去に付き合っていたけど、今は別れている"],
        ["C", "付き合ってはいないけど、お互いに好意は感じる"],
        ["D", "友達・仕事仲間・曖昧な関係など、はっきり付き合ってはいない"],
        ["E", "今はほとんど関係が途絶えている"],
      ],
    },
    {
      id: "q5",
      text: "現在、彼とはどのくらい連絡が取れていますか？",
      options: [
        ["A", "完全に音信不通"],
        ["B", "ほとんど連絡が取れない"],
        ["C", "頻度は少ないけど、連絡は取れる"],
        ["D", "普通に連絡を取り合っている"],
        ["E", "毎日のように連絡している"],
      ],
    },
    {
      id: "q6",
      text: "二人の間に、簡単には変えられない「事情」はありますか？",
      options: [
        ["A", "彼、または私が既婚"],
        ["B", "遠距離"],
        ["C", "大きな年齢差がある"],
        ["D", "仕事・立場・家族などの事情がある"],
        ["E", "特に大きな事情はない"],
      ],
    },
    {
      id: "q7",
      text: "今の二人の状態に、一番近いものは？",
      options: [
        ["A", "私が近づくと彼が離れて、私が離れると彼が戻ってくる"],
        ["B", "仲はいいし好意も感じるのに、なぜか最後の一歩だけ進まない"],
        ["C", "以前は近かったのに、今は連絡もほとんどなく完全に距離ができている"],
        ["D", "一度は付き合っていたけど、今は別れていて、もう一度結ばれたい"],
        ["E", "付き合っているのに、以前より冷たくて愛されている実感がない"],
        ["F", "気持ちはあると思うけど、二人の事情が原因で関係を進められない"],
      ],
    },
    {
      id: "q8",
      text: "今、一番叶えたいことはどれですか？",
      options: [
        ["A", "とにかく彼から連絡がほしい"],
        ["B", "付き合いたい・関係をはっきりさせたい"],
        ["C", "追ったり逃げたりする関係を終わらせたい"],
        ["D", "二人の事情を越えて、堂々と一緒になりたい"],
        ["E", "彼と復縁したい"],
        ["F", "今の彼から、もっと愛情を感じたい"],
      ],
    },
    {
      id: "q9",
      text: "彼との未来で、本当に叶えたいのは？",
      options: [
        ["A", "また彼と普通に話せる毎日"],
        ["B", "彼の方から会いたい・一緒にいたいと言ってくれる関係"],
        ["C", "彼と付き合う・復縁する"],
        ["D", "結婚して、二人で幸せな家庭を築く"],
        ["E", "サイレントを卒業して、二人でツインレイ統合へ進む"],
      ],
    },
  ];

  const results = {
    TYPE01: {
      resultKey: "sleeping_beauty",
      name: "眠れる森の美女タイプ",
      image: "assets/type01.webp",
      lead: "二人の関係は、終わったのではありません。",
      body: "今はただ、<strong>“眠っているように止まっている”状態</strong>です。あなたの場合、この恋を動かすために見るべきポイントがあります。",
    },
    TYPE02: {
      resultKey: "cinderella",
      name: "シンデレラタイプ",
      image: "assets/type02.webp",
      lead: "もう出会っている。あと一歩で、二人の関係が変わる。",
      body: "叶わない恋ではなく、<strong>“最後のピースがまだはまっていない恋”</strong>。全部を作り直さなくても大丈夫です。",
    },
    TYPE03: {
      resultKey: "your_name",
      name: "君の名は。タイプ",
      image: "assets/type03.webp",
      lead: "惹かれ合っているのに、なぜかタイミングがすれ違う二人。",
      body: "あなたが近づくと彼が離れ、離れるとまた近づく。<strong>二人の時間を重ねるためのポイント</strong>を見ていきましょう。",
    },
    TYPE04: {
      resultKey: "romeo_and_juliet",
      name: "ロミオとジュリエットタイプ",
      image: "assets/type04.webp",
      lead: "好きなのに、二人の外側に“壁”がある恋。",
      body: "障害があるからといって、想いまで否定する必要はありません。<strong>壁を越えるための最初の一歩</strong>があります。",
    },
    TYPE05: {
      resultKey: "orihime_and_hikoboshi",
      name: "織姫と彦星タイプ",
      image: "assets/type05.webp",
      lead: "一度離れた二人が、もう一度出会い直す恋。",
      body: "離れていた時間にも、きっと意味がありました。<strong>復縁ではなく“再会”として始め直すルート</strong>があります。",
    },
    TYPE06: {
      resultKey: "beauty_and_the_beast",
      name: "美女と野獣タイプ",
      image: "assets/type06.webp",
      lead: "一緒にいるのに、彼の愛が見えにくくなっている二人。",
      body: "愛がなくなったと決める前に、二人の間にできた<strong>見えない壁をほどくポイント</strong>を知ってください。",
    },
  };

  const primaryMap = { A: "TYPE03", B: "TYPE02", C: "TYPE01", D: "TYPE05", E: "TYPE06", F: "TYPE04" };
  const desireMap = { A: "TYPE01", B: "TYPE02", C: "TYPE03", D: "TYPE04", E: "TYPE05", F: "TYPE06" };
  const state = { index: 0, answers: {}, history: [], interlude: null, result: null };

  const $ = (selector) => document.querySelector(selector);
  const stage = $("#stage");
  const progressLabel = $("#progressLabel");
  const progressBar = $("#progressBar");
  const backButton = $("[data-action='back']");

  function showScreen(name) {
    document.querySelectorAll(".screen").forEach((screen) => screen.classList.toggle("is-active", screen.dataset.screen === name));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateHeader() {
    const displayIndex = Math.min(state.index + 1, questions.length);
    progressLabel.textContent = `QUESTION ${String(displayIndex).padStart(2, "0")} / 09`;
    progressBar.style.width = `${(displayIndex / questions.length) * 100}%`;
    backButton.disabled = state.index === 0 && !state.interlude;
  }

  function renderQuestion() {
    state.interlude = null;
    updateHeader();
    const question = questions[state.index];
    stage.innerHTML = `
      <article class="card" aria-labelledby="questionTitle">
        <p class="question-number">QUESTION ${String(state.index + 1).padStart(2, "0")}</p>
        <h1 id="questionTitle" class="question-title">${question.text}</h1>
        <div class="options" role="group" aria-label="回答を選択してください">
          ${question.options.map(([key, label, detail]) => `
            <button class="option" type="button" data-answer="${key}">
              <span class="option-key">${key}</span>
              <span class="option-copy">${label}${detail ? `<small>${detail}</small>` : ""}</span>
            </button>`).join("")}
        </div>
        <p class="hint">直感で一番近いものを選んでください</p>
      </article>`;
    stage.querySelector(".option")?.focus({ preventScroll: true });
  }

  function renderInterlude(afterQuestion) {
    state.interlude = afterQuestion;
    backButton.disabled = false;
    const first = afterQuestion === 3;
    stage.innerHTML = `
      <article class="card interlude">
        <div class="orb" aria-hidden="true">${first ? "☾" : "✦"}</div>
        <h2>${first ? "二人のつながりが<br>少しずつ見えてきました。" : "あなたと彼の“物語”が<br>かなり絞れてきました。"}</h2>
        <p>${first ? "ここからは、<br><strong>今のあなたと彼が<br>“どこで止まっているのか”</strong><br>を見ていきます。" : "あと3問で、<br><strong>あなたのツインレイタイプが分かります。</strong>"}</p>
        <button class="primary-button" type="button" data-action="continue">次へ <span aria-hidden="true">›</span></button>
      </article>`;
    stage.querySelector("[data-action='continue']")?.focus({ preventScroll: true });
  }

  function selectAnswer(key) {
    const card = stage.querySelector(".card");
    stage.querySelectorAll("button").forEach((button) => { button.disabled = true; });
    state.answers[questions[state.index].id] = key;
    state.history.push(state.index);
    card?.classList.add("is-leaving");

    window.setTimeout(() => {
      const answered = state.index + 1;
      state.index += 1;
      if (answered === 3 || answered === 6) return renderInterlude(answered);
      if (state.index >= questions.length) return renderReading();
      renderQuestion();
    }, 260);
  }

  // Q7を主判定にし、矛盾時だけQ8→Q4〜Q6の順で補正する。
  function calculateResult(answers) {
    let result = primaryMap[answers.q7] || "TYPE02";
    const q8Result = desireMap[answers.q8];

    const isNoContact = answers.q5 === "A" || answers.q5 === "B" || answers.q4 === "E";
    const isFormerPartner = answers.q4 === "B";
    const isCurrentPartner = answers.q4 === "A";
    const hasExternalBarrier = ["A", "B", "C", "D"].includes(answers.q6);

    const contradiction =
      (result === "TYPE01" && !isNoContact) ||
      (result === "TYPE04" && !hasExternalBarrier) ||
      (result === "TYPE05" && !isFormerPartner) ||
      (result === "TYPE06" && !isCurrentPartner);

    if (contradiction && q8Result) result = q8Result;

    // 現在地による最終補正。Q8の明確な希望を優先しつつ、成立しないタイプだけを直す。
    if (result === "TYPE05" && !isFormerPartner) {
      result = isNoContact ? "TYPE01" : (hasExternalBarrier ? "TYPE04" : "TYPE02");
    }
    if (result === "TYPE06" && !isCurrentPartner) {
      result = isFormerPartner ? "TYPE05" : (isNoContact ? "TYPE01" : "TYPE02");
    }
    if (result === "TYPE04" && !hasExternalBarrier) {
      result = isFormerPartner ? "TYPE05" : (isNoContact ? "TYPE01" : "TYPE02");
    }

    return result;
  }

  function renderReading() {
    progressLabel.textContent = "READING YOUR STORY";
    progressBar.style.width = "100%";
    backButton.disabled = true;
    stage.innerHTML = `
      <article class="card reading-card" role="status">
        <div class="loading-orbit" aria-hidden="true"></div>
        <h2>鑑定中……</h2>
        <p class="reading-main">あなたと彼の<br><strong>“運命の物語”を読み解いています。</strong></p>
        <div class="reading-list">
          <span>二人の現在地</span>
          <span>恋が止まっている場所</span>
          <span>統合へ進むための最初の一歩</span>
        </div>
        <p><strong>あなたのタイプは……</strong></p>
      </article>`;

    state.result = calculateResult(state.answers);
    window.setTimeout(showResult, CONFIG.readingDelayMs);
  }

  function buildNoteUrl(type) {
    const supplied = new URLSearchParams(window.location.search).get("note");
    const base = supplied || CONFIG.noteUrl;
    if (!CONFIG.noteAnchors) return base;
    try {
      const url = new URL(base, window.location.href);
      url.hash = type.toLowerCase();
      return url.toString();
    } catch (_) {
      return base;
    }
  }

  function getPayload() {
    const result = results[state.result];
    return {
      event: "twinray_diagnosis_completed",
      type: state.result,
      result: result?.resultKey,
      typeName: result?.name,
      answers: { ...state.answers },
      completedAt: new Date().toISOString(),
      version: "1.1.0",
    };
  }

  function notifyIntegration() {
    const payload = getPayload();
    try {
      window.localStorage.setItem("twinray_type", payload.type);
      window.localStorage.setItem("twinray_result", payload.result);
      window.localStorage.setItem("twinray_diagnosis", JSON.stringify(payload));
    } catch (_) {}
    window.dispatchEvent(new CustomEvent("twinray:completed", { detail: payload }));
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);

    if (CONFIG.webhookUrl) {
      fetch(CONFIG.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    }
  }

  function showResult() {
    const result = results[state.result];
    $("#resultType").textContent = state.result.replace("TYPE", "TYPE ");
    $("#resultName").textContent = result.name;
    $("#resultImage").src = result.image;
    $("#resultImage").alt = `${state.result.replace("TYPE", "TYPE ")} ${result.name}`;
    $("#resultLead").textContent = result.lead;
    $("#resultBody").innerHTML = result.body;
    $("#noteCta").href = buildNoteUrl(state.result);
    showScreen("result");
    notifyIntegration();
  }

  function goBack() {
    if (state.interlude) {
      state.index = state.interlude - 1;
      state.interlude = null;
      state.history.pop();
      delete state.answers[questions[state.index].id];
      renderQuestion();
      return;
    }
    if (state.index <= 0) return;
    state.index -= 1;
    state.history.pop();
    delete state.answers[questions[state.index].id];
    renderQuestion();
  }

  function restart() {
    state.index = 0;
    state.answers = {};
    state.history = [];
    state.interlude = null;
    state.result = null;
    showScreen("cover");
  }

  document.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]")?.dataset.action;
    const answer = event.target.closest("[data-answer]")?.dataset.answer;
    if (answer) return selectAnswer(answer);
    if (action === "start") { showScreen("diagnosis"); renderQuestion(); }
    if (action === "continue") renderQuestion();
    if (action === "back") goBack();
    if (action === "restart") restart();
  });

  // LINE/UTAGE側から結果を取得・受信しやすい公開口。
  window.TwinrayDiagnosis = {
    getPayload,
    config: CONFIG,
    calculateResult,
  };
})();
