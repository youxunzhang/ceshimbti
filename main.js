// 16型人格数据
const mbtiTypes = [
  { name: 'ISTJ', desc: '务实可靠的检查者' },
  { name: 'ISFJ', desc: '忠诚细致的守护者' },
  { name: 'INFJ', desc: '富有洞察的顾问者' },
  { name: 'INTJ', desc: '独立理性的策划者' },
  { name: 'ISTP', desc: '冷静灵活的工匠' },
  { name: 'ISFP', desc: '温和敏感的艺术家' },
  { name: 'INFP', desc: '理想主义的调解者' },
  { name: 'INTP', desc: '逻辑严密的思考者' },
  { name: 'ESTP', desc: '果断冒险的挑战者' },
  { name: 'ESFP', desc: '热情友善的表演者' },
  { name: 'ENFP', desc: '充满创意的激励者' },
  { name: 'ENTP', desc: '机智灵活的辩论者' },
  { name: 'ESTJ', desc: '高效务实的管理者' },
  { name: 'ESFJ', desc: '热心体贴的协调者' },
  { name: 'ENFJ', desc: '富有魅力的领袖' },
  { name: 'ENTJ', desc: '果断自信的指挥官' },
];

const typesGrid = document.getElementById('typesGrid');
if (typesGrid) {
  mbtiTypes.forEach(type => {
    const card = document.createElement('div');
    card.className = 'type-card';
    card.innerHTML = `<div class=\"type-name\">${type.name}</div><div class=\"type-desc\">${type.desc}</div>`;
    card.addEventListener('click', () => {
      showTypeModal(type);
    });
    typesGrid.appendChild(card);
  });
}

// MBTI资讯内容
const mbtiInfos = [
  'MBTI理论由凯瑟琳·布里格斯和伊莎贝尔·迈尔斯母女提出，基于荣格的心理类型学说。',
  'MBTI将人格分为16种类型，每种类型由四个维度组合而成。',
  'MBTI常用于职业规划、团队建设和自我认知。',
  '每个人格类型都有其独特的优势和成长空间。',
];
const infoList = document.getElementById('infoList');
if (infoList) {
  mbtiInfos.forEach(info => {
    const li = document.createElement('li');
    li.textContent = info;
    infoList.appendChild(li);
  });
}

// 模态框相关
function showTypeModal(type) {
  let modal = document.getElementById('typeModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'typeModal';
    modal.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-content">
        <span class="modal-close" id="modalClose">&times;</span>
        <h3>${type.name}</h3>
        <p>${type.desc}</p>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('modalClose').onclick = closeTypeModal;
    modal.querySelector('.modal-backdrop').onclick = closeTypeModal;
  } else {
    modal.querySelector('h3').textContent = type.name;
    modal.querySelector('p').textContent = type.desc;
    modal.style.display = 'block';
  }
  modal.style.display = 'block';
}
function closeTypeModal() {
  const modal = document.getElementById('typeModal');
  if (modal) modal.style.display = 'none';
}

// 收藏功能
const favoriteBtn = document.getElementById('favoriteBtn');
if (favoriteBtn) {
  favoriteBtn.addEventListener('click', function() {
    this.classList.toggle('favorited');
    const isFavorited = this.classList.contains('favorited');
    
    if (isFavorited) {
      this.querySelector('.favorite-text').textContent = '已收藏';
      // 保存到localStorage
      localStorage.setItem('mbtiPageFavorited', 'true');
    } else {
      this.querySelector('.favorite-text').textContent = '收藏';
      localStorage.removeItem('mbtiPageFavorited');
    }
  });
  
  // 页面加载时检查收藏状态
  if (localStorage.getItem('mbtiPageFavorited') === 'true') {
    favoriteBtn.classList.add('favorited');
    favoriteBtn.querySelector('.favorite-text').textContent = '已收藏';
  }
}

// MBTI小游戏功能
function initGame() {
  const gameContainer = document.getElementById('gameContainer');
  if (!gameContainer) return;
  
  const gameHTML = `
    <div class="game-intro">
      <h3>MBTI人格类型匹配游戏</h3>
      <p>通过回答简单问题，测试你对MBTI人格类型的了解程度！</p>
      <button class="game-btn" onclick="startGame()">开始游戏</button>
    </div>
    <div class="game-question" style="display: none;">
      <h3 id="questionText"></h3>
      <div class="game-options" id="gameOptions"></div>
      <div class="game-score">得分: <span id="currentScore">0</span></div>
    </div>
    <div class="game-result" style="display: none;">
      <h3>游戏结束！</h3>
      <p>你的最终得分: <span id="finalScore">0</span></p>
      <button class="game-btn" onclick="restartGame()">再玩一次</button>
    </div>
  `;
  
  gameContainer.innerHTML = gameHTML;
}

// 游戏数据
const gameQuestions = [
  {
    question: "哪种MBTI类型最擅长逻辑分析？",
    options: ["INTP", "ESFJ", "ISFP", "ENFP"],
    correct: 0
  },
  {
    question: "哪种类型最外向和热情？",
    options: ["INTJ", "ESFP", "ISTJ", "INFP"],
    correct: 1
  },
  {
    question: "哪种类型最适合做心理咨询师？",
    options: ["ESTJ", "INFJ", "ISTP", "ENTP"],
    correct: 1
  },
  {
    question: "哪种类型最擅长组织和规划？",
    options: ["INFP", "ESTJ", "ISFP", "ENFP"],
    correct: 1
  },
  {
    question: "哪种类型最有创意和想象力？",
    options: ["ISTJ", "ENFP", "ESTJ", "ISFJ"],
    correct: 1
  }
];

let currentQuestionIndex = 0;
let currentScore = 0;

function startGame() {
  currentQuestionIndex = 0;
  currentScore = 0;
  document.querySelector('.game-intro').style.display = 'none';
  document.querySelector('.game-question').style.display = 'block';
  showQuestion();
}

function showQuestion() {
  if (currentQuestionIndex >= gameQuestions.length) {
    endGame();
    return;
  }
  
  const question = gameQuestions[currentQuestionIndex];
  document.getElementById('questionText').textContent = question.question;
  document.getElementById('currentScore').textContent = currentScore;
  
  const optionsHTML = question.options.map((option, index) => 
    `<button class="game-btn" onclick="selectAnswer(${index})">${option}</button>`
  ).join('');
  
  document.getElementById('gameOptions').innerHTML = optionsHTML;
}

function selectAnswer(selectedIndex) {
  const question = gameQuestions[currentQuestionIndex];
  if (selectedIndex === question.correct) {
    currentScore += 20;
  }
  
  currentQuestionIndex++;
  showQuestion();
}

function endGame() {
  document.querySelector('.game-question').style.display = 'none';
  document.querySelector('.game-result').style.display = 'block';
  document.getElementById('finalScore').textContent = currentScore;
}

function restartGame() {
  document.querySelector('.game-result').style.display = 'none';
  document.querySelector('.game-intro').style.display = 'block';
}

// 计时器功能
function initTimer() {
  const timerContainer = document.getElementById('timerContainer');
  if (!timerContainer) return;
  
  const timerHTML = `
    <div class="timer-display" id="timerDisplay">00:00:00</div>
    <div class="timer-controls">
      <button class="timer-btn start" onclick="startTimer()">开始</button>
      <button class="timer-btn stop" onclick="stopTimer()" disabled>停止</button>
      <button class="timer-btn reset" onclick="resetTimer()">重置</button>
    </div>
    <div class="timer-inputs">
      <label>设置倒计时:</label>
      <input type="number" id="hours" placeholder="小时" min="0" max="23" value="0">
      <input type="number" id="minutes" placeholder="分钟" min="0" max="59" value="25">
      <input type="number" id="seconds" placeholder="秒" min="0" max="59" value="0">
      <button class="timer-btn start" onclick="startCountdown()">开始倒计时</button>
    </div>
  `;
  
  timerContainer.innerHTML = timerHTML;
}

let timerInterval;
let timerRunning = false;
let startTime;
let elapsedTime = 0;

function startTimer() {
  if (timerRunning) return;
  
  timerRunning = true;
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTimer, 1000);
  
  document.querySelector('.timer-btn.start').disabled = true;
  document.querySelector('.timer-btn.stop').disabled = false;
}

function stopTimer() {
  if (!timerRunning) return;
  
  timerRunning = false;
  clearInterval(timerInterval);
  elapsedTime = Date.now() - startTime;
  
  document.querySelector('.timer-btn.start').disabled = false;
  document.querySelector('.timer-btn.stop').disabled = true;
}

function resetTimer() {
  stopTimer();
  elapsedTime = 0;
  updateTimerDisplay(0);
}

function updateTimer() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  updateTimerDisplay(elapsedTime);
}

function updateTimerDisplay(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  const display = `${String(hours).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  document.getElementById('timerDisplay').textContent = display;
}

function startCountdown() {
  const hours = parseInt(document.getElementById('hours').value) || 0;
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;
  
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  if (totalSeconds <= 0) return;
  
  let remainingTime = totalSeconds;
  
  if (timerInterval) clearInterval(timerInterval);
  
  timerInterval = setInterval(() => {
    remainingTime--;
    const h = Math.floor(remainingTime / 3600);
    const m = Math.floor((remainingTime % 3600) / 60);
    const s = remainingTime % 60;
    
    document.getElementById('timerDisplay').textContent = 
      `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      alert('倒计时结束！');
    }
  }, 1000);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  initGame();
  initTimer();
}); 