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