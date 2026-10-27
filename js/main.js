/**
 * 《代号：雾绯》 (CODENAME: MIST & CRIMSON)
 * Interactive Web Pitch Deck Engine
 * Features:
 * 1. Global Astral Mist & Flowing Fire Particle Canvas
 * 2. Flowing Fire (流火) 5-Emotion AI Dynamic UI Synthesizer Canvas
 * 3. Multiverse Realm Switcher (19th Century / Ancient / Interstellar / Gothic Fantasy)
 * 4. Character Dossier + Relationship Progression + Outfit Switcher + Live Image Replacement
 * 5. 《昨日尚未发生》 6-Slice Time Puzzle & 9:16 Vertical Otome Simulator (Story & HUD Modes)
 * 6. Pitch Deck Keyboard Navigation (ArrowLeft / ArrowRight / Space)
 */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientMistCanvas();
  initSloganSwitcher();
  initRealmSwitcher();
  initLiuhuoLab();
  initCharacterMatrix();
  initDungeonSimulator();
  initGameplayLightbox();
  initDeckNavigation();
});

/* ==========================================================================
   1. Global Ambient Mist & Flowing Fire Embers Canvas
   ========================================================================== */
function initAmbientMistCanvas() {
  const canvas = document.getElementById('mist-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 58 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 2.2 + 0.6,
    vx: (Math.random() - 0.5) * 0.25,
    vy: -Math.random() * 0.45 - 0.12,
    alpha: Math.random() * 0.55 + 0.15,
    isCrimson: Math.random() > 0.48
  }));

  function render() {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.isCrimson
        ? `rgba(244, 63, 94, ${p.alpha})`
        : `rgba(192, 132, 252, ${p.alpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.isCrimson ? '#F43F5E' : '#C084FC';
      ctx.fill();
    }
    requestAnimationFrame(render);
  }
  render();
}

/* ==========================================================================
   2. Hero Slogan Proposal Switcher
   ========================================================================== */
function initSloganSwitcher() {
  const slogans = [
    '“雾绯之间，唯爱永存”'
  ];
  const textEl = document.getElementById('hero-slogan-text');
  const tabs = document.querySelectorAll('.slogan-tab');

  tabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabs.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const idx = Number(btn.dataset.slogan || 0);
      if (textEl && slogans[idx]) {
        textEl.style.opacity = '0';
        setTimeout(() => {
          textEl.textContent = slogans[idx];
          textEl.style.opacity = '1';
        }, 140);
      }
    });
  });
}

/* ==========================================================================
   3. Worldview Multiverse Realm Static Display (无联动静态纵列展示)
   ========================================================================== */
function initRealmSwitcher() {
  // REALM 01 ~ 04 已调整为左侧纵向静态展示卡片，无需点击切换联动
}

/* ==========================================================================
   4. Flowing Fire (流火) 5-Emotion Static Display (无联动静态图腾展示)
   ========================================================================== */
function initLiuhuoLab() {
  // 02页五种情绪已调整为无底色透明静态图腾展示，无需点击切换与Canvas渲染
}

/* ==========================================================================
   5. Character Matrix (4 Male Leads Horizontal Cards Overview)
   ========================================================================== */
function initCharacterMatrix() {
  // 03 page displays the 4 horizontal male lead cards directly without detail modal/drawer.
}

/* ==========================================================================
   6. 《昨日尚未发生》 6-Slice Time Puzzle & 9:16 Vertical Otome Simulator
   ========================================================================== */
function initDungeonSimulator() {
  const SLICES = [
    {
      clock: '时间碎片 01/06 · 18:00 PM (错位开局)',
      bg: 'assets/images/cam-07-alley.jpg',
      badge: '当前副本身份：早已死在这一天的少女',
      speaker: '【旁白 · 18:00 雾都钟楼墓园】',
      dialogue:
        '你睁开眼时，黄昏的钟声正好敲响六下。礼拜堂中央摆着一口缀满白玫瑰的棺木——遗像上的少女，赫然是你自己。门外传来巡逻者的脚步声……',
      deduction:
        '【规则警告】切勿向镇民透露你看到了18:00的棺木！因为镇民记忆已被打乱，一旦暴露“死者苏醒”身份，臆想之地将立刻触发抹杀。',
      choices: [
        { text: 'A. 躲进吸血鬼公爵的黑色披风下（触发权势偏爱）', tag: '♥ 公爵+25', res: '公爵揽住你的腰肢隐入血雾：“嘘，哪怕你今天死了一百次，只要我没盖棺，死神就带不走你。”' },
        { text: 'B. 用金币向黑市情报贩买“死因真相”（译制腔互动）', tag: '🕵️ 情报+1', res: '情报贩弹起一枚金币眨眼一笑：“噢，美丽的死者小姐，杀死你的凶手现在还没动手呢——因为行凶发生在下午两点。”' },
        { text: 'C. 推开告解室向年轻圣子祈求庇护（神圣与亵渎）', tag: '✦ 锚点共鸣', res: '圣子将你护在圣坛之后，白袍拂过你的指尖：“神明不会驱逐无辜的亡魂，握紧我的十字架。”' }
      ]
    },
    {
      clock: '时间碎片 02/06 · 08:00 AM (倒回晨雾)',
      bg: 'assets/images/scene-bar-hd.png',
      badge: '距离“你”死亡还有 6 小时',
      speaker: '【轻浮役 · 黑市情报贩子】',
      dialogue:
        '时间被诡异地切回同一天清晨八点。街角酒馆里，情报贩子正晃着苦艾酒杯朝你吹口哨：“早安啊，还没死透的小贵族，想买今晚谁给你送终的名单吗？”',
      deduction:
        '【时间拼接线索】第一段是18:00葬礼，第二段却跳回08:00清晨！说明这并非第二天，而是同一天被剪成了六段乱序播放！',
      choices: [
        { text: 'A. “少贫嘴，我要这座城市所有钟表的校准图！”', tag: '🗺️ 破局线索', res: '他大笑着递给你一张羊皮卷：“痛快！记住，下午两点去铁道口，那里有你死亡的第一块拼图。”' },
        { text: 'B. 用绿色嫉妒锚点与他交换秘密', tag: '💚 锚点交易', res: '他眼神微暗，凑近你耳畔低语：“原来你也藏着这么危险的流火……成交，我亲自陪你走一趟。”' }
      ]
    },
    {
      clock: '时间碎片 03/06 · 21:30 PM (跳转夜宴)',
      bg: 'assets/images/visual-red.jpg',
      badge: '公爵古堡 · 臆想主现身夜宴',
      speaker: '【权势型 · 吸血鬼公爵 Boss】',
      dialogue:
        '时间再次乱序跳到夜晚九点半。血色舞池中央，吸血鬼公爵捏住你的下巴，替你戴上一枚绯红流火胸针：“他们都在找死掉的少女，只有我知道你在我怀里。”',
      deduction:
        '【机制偏爱触发】公爵释放「绯烬荆棘怀表」冻结全场NPC视线，你在21:30夜宴中安全窃取到臆想主的日记残页。',
      choices: [
        { text: 'A. 顺势挽住公爵共舞，套取议会“大清洗”密令', tag: '👑 权势共犯', res: '公爵低笑一声，任由你偷走口袋里的怀表钥匙：“拿去吧，小骗子，反正连我都是你的战利品。”' },
        { text: 'B. 询问他书房里那只波斯猫的来历（触发反差萌）', tag: '🐱 反差萌解锁', res: '高傲的公爵耳尖微红，轻咳一声：“……它只是迷路闯进古堡的。你若喜欢，明日连猫带古堡一起迁去你名下。”' }
      ]
    },
    {
      clock: '时间碎片 04/06 · 14:00 PM (真正行凶时刻)',
      bg: 'assets/images/visual-crowd.jpg',
      badge: '⚠️ 高危时刻：原身份死亡节点',
      speaker: '【直球型 · 下城区赏金猎人】',
      dialogue:
        '下午两点！这正是原身份少女被杀害的时刻！失控的蒸汽列车朝你呼啸撞来，黑皮赏金猎人猛地从机车跃下将你扑进怀里，炽阳燧发枪瞬间轰碎铁轨锁链！',
      deduction:
        '【生死逆转】由于你在08:00提前买了情报，并在14:00获得赏金猎人的「炽阳齿轮燧发枪」守护，原定的“死亡”被成功改写！',
      choices: [
        { text: 'A. 替他包扎手臂擦伤：“为什么要替贵族挡刀？”', tag: '🔥 忠犬沦陷', res: '他偏过头不敢看你的眼睛，声音又凶又纯情：“谁、谁管你是不是贵族！老子接了保护你的单子，阎王爷来了也不好使！”' },
        { text: 'B. 与他并肩反击潜伏在蒸汽里的臆想怪物', tag: '⚔️ 生死搭档', res: '金焰子弹出膛，你们默契配合击碎核心，掉落关键锚点碎片！' }
      ]
    },
    {
      clock: '时间碎片 05/06 · 16:45 PM (圣殿告解)',
      bg: 'assets/images/cam-01-apartment.jpg',
      badge: '收集最后一块时间拼图',
      speaker: '【禁欲型 · 教廷圣子审判官】',
      dialogue:
        '黄昏前的圣殿内，年轻审判官单膝跪在你面前，纯白琉璃十字散发出柔和的哀伤白光：“我已经查明，剪碎这座城市时间的人，正是死于煤矿屠杀案的钟表匠遗孤。”',
      deduction:
        '【真相浮现】副本《昨日尚未发生》的臆想主，是因为无法接受女儿在14:00死去，才用流火把这一天剪成六段无限循环的父亲！',
      choices: [
        { text: 'A. 握住圣子微凉的手，请他用白色流火回溯时间顺序', tag: '🕊️ 下神坛', res: '圣子闭目吻上你的指节：“为了你，哪怕篡改时间的秩序会令我受尽教会鞭刑，我也甘之如饴。”' },
        { text: 'B. 宽恕钟表匠臆想主，解开他的丧女执念', tag: '✨ 完美破局', res: '白色流火化作漫天银蝶，错乱的六个时刻开始重新归位！' }
      ]
    },
    {
      clock: '时间碎片 06/06 · 23:59 PM (迎来真正的明天)',
      bg: 'assets/images/hero-poster-master.png',
      badge: '🎉 副本通关 · 解锁 SSR 思念卡面 & 支线结局',
      speaker: '【系统结算 · 昨日终结，黎明降临】',
      dialogue:
        '08:00 ➔ 14:00 ➔ 16:45 ➔ 18:00 ➔ 21:30 ➔ 23:59！六段被剪碎的昨日终于按正确顺序重新拼接！午夜钟声敲响，永远没有明天的城市迎来第一缕晨曦！',
      deduction:
        '【玩法闭环达成】体验剧情 ➔ 获取流火晶石资源 ➔ 抽出男主SSR卡面 ➔ 解锁《昨日尚未发生·共犯黎明》达成图鉴！',
      choices: [
        { text: '✨ 点击抽取本章节限定 SSR 思念卡面（演示抽卡养成）', tag: '💎 SSR必出', res: '【金光绽放】恭喜获得 SSR 思念卡面《公爵·雾绯共犯》《圣子·神坛私语》！已解锁专属入梦语音与高定礼服！' }
      ]
    }
  ];

  const sliceBtns = document.querySelectorAll('#time-slices .time-slice-btn');
  const bgImg = document.getElementById('sim-bg-img');
  if (!bgImg || !sliceBtns.length) return;
  const clockTag = document.getElementById('sim-clock-tag');
  const centerBadge = document.getElementById('sim-center-badge');
  const speakerEl = document.getElementById('sim-speaker');
  const dialogueEl = document.getElementById('sim-dialogue');
  const choicesEl = document.getElementById('sim-choices');
  const deductionEl = document.getElementById('slice-deduction-text');

  let insightVal = 120;
  let bondVal = 520;
  const insightEl = document.getElementById('sim-insight-tag');
  const bondEl = document.getElementById('sim-bond-tag');

  function renderSlice(idx) {
    const s = SLICES[idx];
    if (!s) return;
    bgImg.src = s.bg;
    clockTag.textContent = s.clock;
    centerBadge.textContent = s.badge;
    speakerEl.textContent = s.speaker;
    dialogueEl.textContent = s.dialogue;
    deductionEl.textContent = s.deduction;

    choicesEl.innerHTML = s.choices
      .map(
        (c, i) => `
      <button class="sim-choice-btn" data-cidx="${i}">
        <span>${c.text}</span>
        <span style="color:var(--crimson-soft); white-space:nowrap; margin-left:8px;">${c.tag}</span>
      </button>
    `
      )
      .join('');

    choicesEl.querySelectorAll('.sim-choice-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const c = s.choices[Number(btn.dataset.cidx)];
        if (c) {
          speakerEl.textContent = '【分支即时反馈 · 洞察值与心契度提升】';
          dialogueEl.textContent = c.res;
          centerBadge.textContent = `✦ 已触发：${c.tag}（洞察值+15 / 心契度+25）`;
          insightVal += 15;
          bondVal += 25;
          if (insightEl) insightEl.textContent = `🔍 洞察值：${insightVal}`;
          if (bondEl) bondEl.textContent = `♥ 心契度：${bondVal}`;
        }
      });
    });
  }

  sliceBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      sliceBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderSlice(Number(btn.dataset.slice || 0));
    });
  });

  // Mode Switch: Story Playable Mode vs Official Astrolabe HUD Widget Mode
  const btnStory = document.getElementById('btn-mode-story');
  const btnHud = document.getElementById('btn-mode-hud');

  if (btnStory && btnHud) {
    btnStory.addEventListener('click', () => {
      btnStory.classList.add('active');
      btnHud.classList.remove('active');
      renderSlice(0);
    });

    btnHud.addEventListener('click', () => {
      btnHud.classList.add('active');
      btnStory.classList.remove('active');
      bgImg.src = 'assets/images/wufei-ui-widgets.png';
      clockTag.textContent = '星盘主界面 HUD · Lv.55 这是另外的价格';
      centerBadge.textContent = '点击下方控件体验《代号：雾绯》轻量化日常与商业化入口';
      speakerEl.textContent = '【星盘主界面 · 线条科技感与神秘感 UI】';
      dialogueEl.textContent =
        '主界面集成「万年历」「入梦」「送花」「回忆」「商城」等核心模块，轻松上手、不卡关、低配置畅玩：';

      const hudWidgets = [
        {
          text: '🕰️ 【万年历 Perpetual Calendar】签到领流火晶石与副本运势',
          tag: '日常留存',
          res: '【万年历已展开】今日伦敦雾浓度88%，宜与吸血鬼公爵探索副本。连续签到已领取 520 流火晶石！'
        },
        {
          text: '🌙 【入梦 Fallen Into Dream】男主 9:16 竖屏哄睡与私密耳语',
          tag: '情感陪伴',
          res: '【入梦空间已开启】教廷圣子轻抚你的发梢，3D建模近距离呼吸与ASMR译制腔/低音炮伴眠已激活。'
        },
        {
          text: '🌹 【送花 & 魅力排行榜】向心仪男主赠礼冲击全服羁绊榜',
          tag: '氪金排行',
          res: '【全服魅力榜】您向男主赠送99朵雾绯银玫瑰！当前位列全服「公爵专属偏爱榜」TOP 1，解锁限定动态称号！'
        }
      ];

      choicesEl.innerHTML = hudWidgets
        .map(
          (w, i) => `
        <button class="sim-choice-btn" data-widx="${i}">
          <span>${w.text}</span>
          <span style="color:var(--gold-brass); white-space:nowrap; margin-left:8px;">${w.tag}</span>
        </button>
      `
        )
        .join('');

      choicesEl.querySelectorAll('.sim-choice-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const w = hudWidgets[Number(btn.dataset.widx)];
          if (w) {
            speakerEl.textContent = `【UI 控件交互反馈 · ${w.tag}】`;
            dialogueEl.textContent = w.res;
          }
        });
      });
    });
  }

  // Initialize slice 0
  renderSlice(0);
}

/* ==========================================================================
   7. Pitch Deck Keyboard Navigation & Scroll Spy
   ========================================================================== */
function initDeckNavigation() {
  const sections = Array.from(document.querySelectorAll('.pitch-section'));
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  let currentIdx = 0;

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + window.innerHeight * 0.32;
    sections.forEach((sec, idx) => {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        currentIdx = idx;
        navLinks.forEach((a) => a.classList.remove('active'));
        if (navLinks[idx]) navLinks[idx].classList.add('active');
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
    if (e.code === 'ArrowRight' || e.code === 'PageDown') {
      e.preventDefault();
      currentIdx = Math.min(sections.length - 1, currentIdx + 1);
      sections[currentIdx].scrollIntoView({ behavior: 'smooth' });
    } else if (e.code === 'ArrowLeft' || e.code === 'PageUp') {
      e.preventDefault();
      currentIdx = Math.max(0, currentIdx - 1);
      sections[currentIdx].scrollIntoView({ behavior: 'smooth' });
    } else if (e.code === 'Space' && e.ctrlKey) {
      e.preventDefault();
      sections[0].scrollIntoView({ behavior: 'smooth' });
    }
  });

  const deckBtn = document.getElementById('btn-deck-mode');
  if (deckBtn) {
    deckBtn.addEventListener('click', () => {
      currentIdx = (currentIdx + 1) % sections.length;
      sections[currentIdx].scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   8. Gameplay Reference GIF Lightbox Modal (06 界面/玩法参考 动态GIF放大检视)
   ========================================================================== */
function initGameplayLightbox() {
  const modal = document.getElementById('gp-lightbox');
  const backdrop = document.getElementById('gp-lightbox-backdrop');
  const closeBtn = document.getElementById('gp-lightbox-close');
  const imgEl = document.getElementById('gp-lightbox-img');
  const titleEl = document.getElementById('gp-lightbox-title');
  const triggers = document.querySelectorAll('.gp-ref-card[data-lightbox-src]');

  if (!modal || !imgEl) return;

  function openModal(src, title) {
    imgEl.src = src;
    if (titleEl) titleEl.textContent = title || '';
    modal.hidden = false;
  }

  function closeModal() {
    modal.hidden = true;
  }

  triggers.forEach((el) => {
    el.addEventListener('click', () => {
      openModal(
        el.dataset.lightboxSrc,
        el.dataset.lightboxTitle
      );
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });
}
