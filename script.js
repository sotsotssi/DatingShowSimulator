const MAX_DAYS = Infinity; 
const MAX_MEMBERS = 14;

const compatibilityData = {
    "INFP": { "ENFJ": 5, "ENTJ": 5, "INFP": 4, "ENFP": 4, "INFJ": 4, "INTJ": 4, "INTP": 4, "ENTP": 4, "ISFP": 1, "ESFP": 1, "ISTP": 1, "ESTP": 1, "ISFJ": 1, "ESFJ": 1, "ISTJ": 1, "ESTJ": 1 },
    "ENFP": { "INFJ": 5, "INTJ": 5, "INFP": 4, "ENFP": 4, "ENFJ": 4, "ENTJ": 4, "INTP": 4, "ENTP": 4, "ISFP": 1, "ESFP": 1, "ISTP": 1, "ESTP": 1, "ISFJ": 1, "ESFJ": 1, "ISTJ": 1, "ESTJ": 1 },
    "INFJ": { "ENFP": 5, "ENTP": 5, "INFP": 4, "INFJ": 4, "ENFJ": 4, "INTJ": 4, "INTP": 4, "ENTJ": 4, "ISFP": 1, "ESFP": 1, "ISTP": 1, "ESTP": 1, "ISFJ": 1, "ESFJ": 1, "ISTJ": 1, "ESTJ": 1 },
    "ENFJ": { "INFP": 5, "ISFP": 5, "ENFP": 4, "INFJ": 4, "ENFJ": 4, "INTJ": 4, "INTP": 4, "ENTP": 4, "ENTJ": 4, "ESFP": 1, "ISTP": 1, "ESTP": 1, "ISFJ": 1, "ESFJ": 1, "ISTJ": 1, "ESTJ": 1 },
    "INTJ": { "ENFP": 5, "ENTP": 5, "INFP": 4, "INFJ": 4, "ENFJ": 4, "INTJ": 4, "INTP": 4, "ENTJ": 4, "ISFP": 3, "ESFP": 3, "ISTP": 3, "ESTP": 3, "ISFJ": 2, "ESFJ": 2, "ISTJ": 3, "ESTJ": 3 },
    "ENTJ": { "INFP": 5, "INTP": 5, "ENFP": 4, "INFJ": 4, "ENFJ": 4, "INTJ": 4, "ENTP": 4, "ENTJ": 4, "ISFP": 3, "ESFP": 3, "ISTP": 3, "ESTP": 3, "ISFJ": 2, "ESFJ": 2, "ISTJ": 3, "ESTJ": 3 },
    "INTP": { "ENTJ": 5, "ESTJ": 5, "INFP": 4, "ENFP": 4, "INFJ": 4, "INTJ": 4, "INTP": 4, "ENTP": 4, "ISFP": 3, "ESFP": 3, "ISTP": 3, "ESTP": 3, "ISFJ": 2, "ESFJ": 2, "ISTJ": 2, "ENFJ": 2 },
    "ENTP": { "INFJ": 5, "INTJ": 5, "INFP": 4, "ENFP": 4, "ENFJ": 4, "INTP": 4, "ENTP": 4, "ENTJ": 4, "ISFP": 3, "ESFP": 3, "ISTP": 3, "ESTP": 3, "ISFJ": 2, "ESFJ": 2, "ISTJ": 2, "ESTJ": 2 },
    "ISFP": { "ESFJ": 5, "ESTJ": 5, "ENFJ": 5, "ISFP": 3, "ESFP": 3, "ISTP": 3, "ESTP": 3, "ISFJ": 3, "ISTJ": 3, "INFP": 1, "ENFP": 1, "INFJ": 1, "INTJ": 2, "ENTJ": 2, "INTP": 2, "ENTP": 2 },
    "ESFP": { "ISFJ": 5, "ISTJ": 5, "ISFP": 3, "ESFP": 3, "ISTP": 3, "ESTP": 3, "ESFJ": 3, "ESTJ": 3, "INFP": 1, "ENFP": 1, "INFJ": 1, "ENFJ": 1, "INTJ": 2, "ENTJ": 2, "INTP": 2, "ENTP": 2 },
    "ISTP": { "ESFJ": 5, "ESTJ": 5, "ISFP": 3, "ESFP": 3, "ISTP": 3, "ESTP": 3, "ISFJ": 3, "ISTJ": 3, "INFP": 1, "ENFP": 1, "INFJ": 1, "ENFJ": 1, "INTJ": 2, "ENTJ": 2, "INTP": 2, "ENTP": 2 },
    "ESTP": { "ISFJ": 5, "ISTJ": 5, "ISFP": 3, "ESFP": 3, "ISTP": 3, "ESTP": 3, "ESFJ": 3, "ESTJ": 3, "INFP": 1, "ENFP": 1, "INFJ": 1, "ENFJ": 1, "INTJ": 2, "ENTJ": 2, "INTP": 2, "ENTP": 2 },
    "ISFJ": { "ESFP": 5, "ESTP": 5, "ISFJ": 4, "ESFJ": 4, "ISTJ": 4, "ESTJ": 4, "ISFP": 3, "ISTP": 3, "INFP": 1, "ENFP": 1, "INFJ": 1, "ENFJ": 1, "INTJ": 2, "ENTJ": 2, "INTP": 2, "ENTP": 2 },
    "ESFJ": { "ISFP": 5, "ISTP": 5, "ISFJ": 4, "ESFJ": 4, "ISTJ": 4, "ESTJ": 4, "ESFP": 3, "ESTP": 3, "INFP": 1, "ENFP": 1, "INFJ": 1, "ENFJ": 1, "INTJ": 2, "ENTJ": 2, "INTP": 2, "ENTP": 2 },
    "ISTJ": { "ESFP": 5, "ESTP": 5, "ISFJ": 4, "ESFJ": 4, "ISTJ": 4, "ESTJ": 4, "ISFP": 3, "ISTP": 3, "INFP": 1, "ENFP": 1, "INFJ": 1, "ENFJ": 1, "INTJ": 2, "ENTJ": 2, "INTP": 2, "ENTP": 2 },
    "ESTJ": { "ISFP": 5, "ISTP": 5, "INTP": 5, "ISFJ": 4, "ESFJ": 4, "ISTJ": 4, "ESTJ": 4, "ESFP": 3, "ESTP": 3, "INFP": 1, "ENFP": 1, "INFJ": 1, "ENFJ": 1, "INTJ": 2, "ENTJ": 2, "ENTP": 2 }
};

const LOCATIONS = [
    "숙소","산책로", "정원", "주방", "테라스", "수영장",
    "공원", "산", "놀이공원", "레스토랑", "카페", "바다",
    "도서관", "영화관", "노래방", "헬스장", "체육관", "루프탑 바", "식물원", "미술관", "쇼핑몰", "캠핑장",
    "불꽃축제"
];

const DEFAULT_NAMES = ["미래", "정원", "성찬", "예찬", "시안", "시우", "하율", "유진", "준혁", "늘담", "서준", "노을", "세라", "정연"];
const MBTI_TYPES = Object.keys(compatibilityData);

const DISHES = ["알리오 올리오", "스테이크", "김치볶음밥", "된장찌개", "샌드위치", "라면", "카나페", "떡볶이", "파스타", "오므라이스", "돈가스", "제육덮밥"];
const SPORTS = ["테니스", "배드민턴", "조깅", "수영", "요가", "클라이밍", "캐치볼", "스트레칭", "근력 운동"];
const RESTAURANT_FOODS = ["코스 요리", "고급 와인", "티본 스테이크", "랍스터", "파인다이닝", "화덕 피자", "오마카세"];
const RIDES = ["롤러코스터", "회전목마", "바이킹", "관람차", "자이로드롭", "범퍼카", "유령 열차"];
const MOVIES = ["로맨틱 코미디", "공포 영화", "액션 블록버스터", "독립 영화", "슬픈 다큐멘터리","범죄 스릴러"];
const SONGS = ["댄스곡", "발라드", "힙합", "올드팝", "최신 아이돌 노래", "뮤지컬 넘버", "트로트"];
const ARTS = ["현대 미술", "조각상", "미디어 아트", "고전 명화"];
const GIFTS = ["향수", "목도리", "시계", "책", "꽃다발", "초콜릿", "직접 짠 스웨터", "커플링", "장난감", "영양제", "손편지", "커플 티셔츠", "종이학", "머그컵", "캔들", "베개"];

let state = {
    day: 0,
    characters: [], 
    relationships: {}, 
    logs: [],
    ended: false,
    config: {
        maxDays: Infinity,
        exitOnCouple: true,
        allowAffair: false
    }
};

let hoveredCharId = null;
let cachedNodePositions = []; 


document.addEventListener('DOMContentLoaded', () => {
    initMbtiSelect();
    updateTheme();
    initCanvasInteraction(); 
    
    document.getElementById('themeToggle').addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });

    ['Charm', 'Ability', 'Morality'].forEach(attr => {
        document.getElementById(`range${attr}`).addEventListener('input', (e) => {
            document.getElementById(`val${attr}`).innerText = e.target.value;
        });
    });

    renderRoster();
    renderLocationTable();
    
    window.addEventListener('resize', () => {
        if (document.getElementById('tab-status').classList.contains('active')) {
            drawRelationshipMap();
        }
    });
});

function initMbtiSelect() {
    const select = document.getElementById('inputMbti');
    MBTI_TYPES.forEach(mbti => {
        const option = document.createElement('option');
        option.value = mbti;
        option.innerText = mbti;
        select.appendChild(option);
    });
}

function updateTheme() {
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

function initCanvasInteraction() {
    const canvas = document.getElementById('relationCanvas');
    if (!canvas) return;

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = 800 / rect.width;
        const scaleY = 800 / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        let found = null;
        for (const p of cachedNodePositions) {
            const dx = x - p.x;
            const dy = y - p.y;
            if (dx*dx + dy*dy < 45*45) { 
                found = p.id;
                break;
            }
        }
        
        if (hoveredCharId !== found) {
            hoveredCharId = found;
            drawRelationshipMap();
            canvas.style.cursor = found ? 'pointer' : 'default';
        }
    });

    canvas.addEventListener('mouseleave', () => {
         if (hoveredCharId !== null) {
             hoveredCharId = null;
             drawRelationshipMap();
             canvas.style.cursor = 'default';
         }
    });
}


function josa(word, format) {
    if (!word) return '';
    const lastChar = word.charCodeAt(word.length - 1);
    const hasJongseong = (lastChar - 0xAC00) % 28 > 0;
    
    const pair = format.split('/');
    return word + (hasJongseong ? pair[0] : pair[1]);
}

function checkSuccess(statValue) {
    const probability = 10 + (statValue - 1) * (80 / 9);
    return Math.random() * 100 < probability;
}

function getActionType(location) {
    switch (location) {
        case "주방": case "캠핑장": return "cooking";
        case "레스토랑": case "루프탑 바": return "date";
        case "놀이공원": return "ride"; 
        case "수영장": case "노래방": return "leisure";
        case "헬스장": case "체육관": case "산": return "exercise";
        case "미술관": return "art";
        case "쇼핑몰": return "shopping";
        case "공원": case "바다": case "테라스": case "식물원": return "walk";
        case "영화관": return "movie";
        case "도서관": return "talk";
        default: return Math.random() < 0.5 ? "talk" : "leisure";
    }
}

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateActionScript(actionType, isSuccess, actor, target, loc) {
    const dish = getRandomItem(DISHES);
    const sport = getRandomItem(SPORTS);
    const food = getRandomItem(RESTAURANT_FOODS);
    const ride = getRandomItem(RIDES);
    const movie = getRandomItem(MOVIES);
    const song = getRandomItem(SONGS);
    const art = getRandomItem(ARTS);

    let script = "";
    
    // --- LOCATION SPECIFIC SCRIPTS (Expanded) ---
    let specificActs = null;

    if (loc === "캠핑장") {
        specificActs = {
            success: [
                `${josa(actor.name, '이/가')} ${josa(target.name, '과/와')} 함께 모닥불을 피우고 진솔한 이야기를 나눴습니다.`,
                `${josa(actor.name, '은/는')} 능숙하게 텐트를 설치하고 ${target.name}에게 맛있는 캠핑 요리를 대접했습니다.`,
                `${josa(actor.name, '과/와')} ${josa(target.name, '은/는')} 나란히 앉아 밤하늘의 쏟아지는 별을 바라보았습니다.`
            ],
            fail: [
                `${josa(actor.name, '이/가')} 텐트를 치다가 ${josa(target.name, '을/를')} 쳐 버렸습니다.`,
                `${josa(actor.name, '이/가')} 벌레를 보고 ${target.name} 뒤에 숨었습니다.`,
                `${josa(actor.name, '이/가')} 불을 피우려다 연기만 잔뜩 피워 ${josa(target.name, '이/가')} 연신 기침했습니다.`
            ]
        };
    } else if (loc === "바다") {
        specificActs = {
            success: [
                `${josa(actor.name, '이/가')} ${josa(target.name, '과/와')} 함께 맨발로 해변을 달렸습니다.`,
                `${josa(actor.name, '은/는')} 예쁜 조개껍데기를 주워 ${target.name}에게 선물했습니다.`,
                `${josa(actor.name, '과/와')} ${josa(target.name, '은/는')} 파도 소리를 들으며 서로에게 기대어 앉았습니다.`
            ],
            fail: [
                `${josa(actor.name, '이/가')} ${target.name}에게 물을 너무 심하게 뿌려서 눈에 바닷물이 들어갔습니다.`,
                `${josa(actor.name, '은/는')} 모래사장에서 발이 꼬여 ${target.name} 앞에서 우스꽝스럽게 넘어졌습니다.`,
                `${josa(actor.name, '이/가')} 갈매기에게 간식을 뺏기는 모습을 보여 ${josa(target.name, '이/가')} 안쓰럽게 쳐다봤습니다.`
            ]
        };
    } else if (loc === "산") {
         specificActs = {
            success: [
                `${josa(actor.name, '이/가')} 힘들어하는 ${target.name}의 손을 잡아주며 정상까지 이끌어줬습니다.`,
                `${josa(actor.name, '과/와')} ${josa(target.name, '은/는')} 정상에서 함께 풍경을 바라보았습니다.`,
                `${josa(actor.name, '은/는')} 준비해온 도시락을 ${josa(target.name, '과/와')} 나눠 먹었습니다.`
            ],
            fail: [
                `${josa(actor.name, '이/가')} ${target.name}보다 먼저 지쳐버렸습니다.`,
                `${josa(actor.name, '은/는')} 길을 잘못 들어 ${josa(target.name, '과/와')} 한참을 헤매야 했습니다.`,
                `${josa(actor.name, '이/가')} 벌레를 보고 ${target.name} 앞에서 넘어졌습니다.`
            ]
        };
    } else if (loc === "체육관") { 
         specificActs = {
            success: [
                `${josa(actor.name, '과/와')} ${josa(target.name, '은/는')} 함께 ${josa(sport, '을/를')} 즐기며 건강한 시간을 보냈습니다.`,
                `${josa(actor.name, '은/는')} ${josa(target.name, '과/와')} 함께 ${josa(sport, '으로/로')} 내기를 했습니다.`,
                `${josa(actor.name, '은/는')} ${sport} 후 ${target.name}에게 이온 음료를 건넸습니다.`
            ],
            fail: [
                `${josa(actor.name, '이/가')} 승부에 지나치게 집착하여 ${target.name}에게 무안함을 안겼습니다.`,
                `${josa(actor.name, '은/는')} ${sport} 도중 무리하다가 ${josa(target.name, '을/를')} 조금 다치게 만들었습니다.`,
                `${josa(actor.name, '이/가')} ${sport} 실력이 부족해 ${josa(target.name, '이/가')} 답답해했습니다.`
            ]
        };
    } else if (loc === "도서관") {
         specificActs = {
            success: [
                `${josa(actor.name, '이/가')} ${josa(target.name, '과/와')} 나란히 앉아 책을 읽다가 조용히 필담을 나눴습니다.`,
                `${josa(actor.name, '은/는')} ${josa(target.name, '이/가')} 읽고 싶어 하던 책을 높은 곳에서 꺼내주었습니다.`,
                `${josa(actor.name, '과/와')} ${josa(target.name, '은/는')} 이어폰을 나눠 끼고 조용히 음악과 책을 감상했습니다.`
            ],
            fail: [
                `${josa(actor.name, '이/가')} 책을 읽다 조는 모습을 ${target.name}에게 들켰습니다.`,
                `${josa(actor.name, '이/가')} 책 내용에 대해 이야기하다가 ${josa(target.name, '과/와')} 언쟁하였습니다.`,
                `${josa(actor.name, '이/가')} 실수로 책더미를 무너뜨려 ${josa(target.name, '이/가')} 함께 정리해야 했습니다.`
            ]
        };
    } else if (loc === "루프탑 바") {
        specificActs = {
            success: [
                `${josa(actor.name, '은/는')} 야경이 내려다보이는 자리에서 ${josa(target.name, '과/와')} 함께 칵테일을 마셨습니다.`,
                `${josa(actor.name, '과/와')} ${josa(target.name, '은/는')} 야경을 배경으로 사진을 남겼습니다.`,
                `${josa(actor.name, '은/는')} 쌀쌀한 날씨에 ${target.name}에게 겉옷을 벗어주었습니다.`
            ],
            fail: [
                `${josa(actor.name, '은/는')} 술에 취해 ${josa(target.name, '을/를')} 두고 먼저 잠들었습니다.`,
                `${josa(actor.name, '이/가')} 실수로 칵테일을 쏟아 ${target.name}의 옷을 적시고 말았습니다.`,
                `${josa(actor.name, '은/는')} 루프탑의 추위에 떠느라 ${josa(target.name, '과/와')}의 대화에 집중하지 못했습니다.`
            ]
        };
    }
    if (specificActs) {
        const pool = specificActs[isSuccess ? 'success' : 'fail'];
        script = pool[Math.floor(Math.random() * pool.length)];
    } else {

        const acts = {
            walk: {
                success: [
                    `${josa(actor.name, '은/는')} 상쾌한 공기를 마시며 ${josa(target.name, '과/와')} 발걸음을 맞췄습니다.`,
                    `함께 걷는 동안 ${josa(actor.name, '과/와')} ${target.name}의 손끝이 스쳤습니다.`,
                    `${josa(actor.name, '은/는')} ${josa(target.name, '과/와')} 아름다운 풍경을 배경으로 사진을 찍었습니다.`
                ],
                fail: [
                    `${josa(actor.name, '은/는')} 걷다가 ${target.name} 앞에서 돌부리에 걸려 넘어질 뻔했습니다.`,
                    `갑자기 비가 쏟아져 흠뻑 젖은 채로 걷다가 ${josa(actor.name, '과/와')} ${target.name} 사이의 분위기가 어색해졌습니다.`,
                    `${actor.name}의 걷는 속도가 너무 빨라 ${josa(target.name, '이/가')} 힘겹게 따라갔습니다.`
                ]
            },
            leisure: {
                success: [
                    `${loc}에서 ${josa(actor.name, '은/는')} ${target.name}에게 숨겨둔 특기를 보여주었습니다.`,
                    `${josa(actor.name, '은/는')} ${josa(target.name, '과/와')} 함께 게임을 즐기며 재밌는 시간을 보냈습니다.`,
                    `${josa(actor.name, '은/는')} 재치 있는 말로 ${josa(target.name, '을/를')} 웃게 만들었습니다.`
                ],
                fail: [
                    `${loc}에서 ${josa(actor.name, '이/가')} 실수를 연발하여 ${josa(target.name, '이/가')} 당황했습니다.`,
                    `${josa(actor.name, '은/는')} 너무 승부욕만 앞세우다 ${target.name}의 기분을 상하게 했습니다.`,
                    `${josa(actor.name, '은/는')} ${target.name} 앞에서 ${loc} 이용 수칙을 몰라 허둥지둥했습니다.`
                ]
            },
            singing: {
                success: [
                    `${josa(actor.name, '은/는')} ${target.name} 앞에서 ${josa(song, '을/를')} 감미롭게 불렀습니다.`,
                    `${josa(actor.name, '은/는')} ${josa(target.name, '과/와')} 듀엣곡을 불렀습니다.`,
                    `${actor.name}의 노래 실력에 ${josa(target.name, '이/가')} 감탄하는 눈으로 바라보았습니다.`
                ],
                fail: [
                    `${josa(actor.name, '은/는')} ${josa(song, '을/를')} 무리해서 부르다가 삑사리를 냈습니다.`,
                    `${josa(actor.name, '이/가')} 마이크를 독점하는 바람에 ${josa(target.name, '은/는')} 탬버린만 쳐야 했습니다.`,
                    `${josa(actor.name, '이/가')} 분위기에 맞지 않는 ${josa(song, '을/를')} 불러 ${josa(target.name, '은/는')} 미묘한 표정을 지었습니다.`
                ]
            },
            exercise: {
                success: [
                    `${josa(actor.name, '은/는')} ${loc}에서 ${josa(target.name, '과/와')} 함께 땀을 흘렸습니다.`,
                    `${loc}에서 ${josa(actor.name, '은/는')} ${target.name}에게 운동 방법을 가르쳐주었습니다.`,
                    `${loc}에서 ${josa(actor.name, '은/는')} 지치지 않는 체력으로 ${target.name}에게 든든한 모습을 보여주었습니다.`
                ],
                fail: [
                    `${josa(actor.name, '은/는')} 무리하게 운동하다 쥐가 나 ${target.name}의 부축을 받아야 했습니다.`,
                    `${josa(actor.name, '은/는')} 체력이 먼저 바닥나 ${target.name} 앞에서 뻗어 버렸습니다.`,
                    `${josa(actor.name, '과/와')}의 가까운 거리가 부담스러웠는지 ${josa(target.name, '이/가')} 살짝 멀어졌습니다.`
                ]
            },
            cooking: {
                success: [
                    `${josa(actor.name, '은/는')} 능숙한 솜씨로 ${target.name}에게 완벽한 ${josa(dish, '을/를')} 대접했습니다.`,
                    `${josa(actor.name, '이/가')} ${josa(target.name, '과/와')} 냉장고 재료만으로 훌륭한 ${josa(dish, '을/를')} 만들었습니다.`,
                    `${josa(actor.name, '은/는')} ${josa(target.name, '과/와')} 함께 ${josa(dish, '을/를')} 만들며 이야기를 나누었습니다.`
                ],
                fail: [
                    `${josa(actor.name, '은/는')} ${dish} 요리를 시작했으나 소금을 쏟아버려 음식을 망쳤습니다.`,
                    `${josa(actor.name, '이/가')} 요리 도중 손을 베일 뻔하여 ${josa(target.name, '이/가')} 당황합니다.`,
                    `${actor.name}의 의욕은 앞섰지만 완성된 ${josa(dish, '은/는')} 정체불명의 맛이 났습니다. ${josa(target.name, '은/는')} 물만 마십니다.`
                ]
            },
            date: {
                success: [
                    `${josa(actor.name, '은/는')} ${loc}에서 ${josa(food, '을/를')} 함께하며 진지한 대화를 나눴습니다.`,
                    `${josa(actor.name, '이/가')} ${josa(food, '과/와')} 어울리는 대화 주제를 꺼내자 ${josa(target.name, '이/가')} 호응합니다.`,
                    `${josa(actor.name, '이/가')} 결제하자 ${josa(target.name, '이/가')} 카페에서는 자신이 내겠다고 말합니다.`
                ],
                fail: [
                    `${josa(actor.name, '은/는')} 카드가 결제되지 않아 계산대에서 진땀을 뺐습니다. ${josa(target.name, '이/가')} 민망해합니다.`,
                    `${josa(actor.name, '이/가')} 주문한 ${josa(food, '이/가')} 품절되어 당황하는 모습을 보였습니다.`,
                    `${josa(actor.name, '은/는')} 실수로 옷에 소스를 흘렸습니다. ${josa(target.name, '이/가')} 냅킨을 건네줍니다.`
                ]
            },
            ride: { 
                success: [
                    `${josa(actor.name, '은/는')} ${josa(ride, '을/를')} 타며 ${target.name}의 손을 꼭 잡아주었습니다.`,
                    `${josa(actor.name, '은/는')} ${josa(target.name, '이/가')} 무서워하지 않도록 ${ride} 옆자리에서 지켜주었습니다.`,
                    `${ride} 위에서 ${josa(actor.name, '은/는')} ${josa(target.name, '과/와')} 함께 스릴을 즐겼습니다.`
                ],
                fail: [
                    `${josa(actor.name, '은/는')} ${josa(ride, '을/를')} 타고 내려와 멀미를 하는 바람에 ${josa(target.name, '이/가')} 등을 두드려주었습니다.`,
                    `${josa(actor.name, '이/가')} ${ride} 위에서 얼어붙어 ${josa(target.name, '을/를')} 걱정하게 만들었습니다.`,
                    `${actor.name}의 ${ride} 안전 장치 문제로 잠시 소동이 일어났습니다.`
                ]
            },
            movie: {
                success: [
                    `${josa(actor.name, '은/는')} ${josa(movie, '을/를')} 예매하여 ${josa(target.name, '과/와')} 즐거운 시간을 보냈습니다.`,
                    `영화의 감동적인 장면에서 ${josa(actor.name, '은/는')} ${josa(target.name, '과/와')} 눈을 마주치며 교감했습니다.`,
                    `${josa(actor.name, '은/는')} 팝콘을 먹여주자 ${josa(target.name, '이/가')} 자연스레 받아먹었습니다.`
                ],
                fail: [
                    `${josa(actor.name, '이/가')} 고른 ${josa(movie, '은/는')} 너무 지루해서 ${josa(target.name, '이/가')} 졸기 시작했습니다.`,
                    `${josa(actor.name, '과/와')} ${josa(target.name, '이/가')} 영화를 보는 내내 옆 커플이 이야기를 해서 집중할 수가 없었습니다.`,
                    `${josa(actor.name, '은/는')} 슬픈 장면에서 눈물을 뚝뚝 흘려 ${josa(target.name, '을/를')} 당황하게 만들었습니다.`
                ]
            },
            art: {
                success: [
                    `${josa(actor.name, '은/는')} ${josa(art, '을/를')} 감상하며 ${josa(target.name, '과/와')} 통하는 취향을 확인했습니다.`,
                    `${josa(actor.name, '은/는')} ${josa(target.name, '과/와')} 작품에 대해 깊이 있는 대화를 나누며 서로의 가치관을 확인했습니다.`,
                    `조용한 미술관에서 ${josa(actor.name, '은/는')} ${target.name}에게만 들리는 목소리로 작게 속삭이며 감상을 나눴습니다.`
                ],
                fail: [
                    `${actor.name}의 장황한 작품 설명에 ${josa(target.name, '이/가')} 곤란한 기색을 내비칩니다.`,
                    `${josa(actor.name, '은/는')} 예술에 대해 아는 척하다가 ${target.name}에게 틀린 정보를 들키고 말았습니다.`
                ]
            },
            shopping: {
                success: [
                    `${josa(actor.name, '은/는')} ${target.name}에게 어울리는 옷을 골라주었습니다.`,
                    `${josa(actor.name, '은/는')} ${josa(target.name, '과/와')} 서로 물건을 골라주며 커플 아이템을 맞췄습니다.`,
                    `${josa(actor.name, '은/는')} ${target.name}의 짐을 들어주었습니다.`
                ],
                fail: [
                    `${josa(actor.name, '은/는')} ${target.name}의 쇼핑을 기다리다 지쳐서 벤치에 널브러졌습니다.`,
                    `${josa(actor.name, '은/는')} ${target.name}에게 전혀 어울리지 않는 옷을 추천하여 안목을 의심받았습니다.`
                ]
            },
            talk: {
                success: [
                    `${josa(actor.name, '은/는')} ${target.name}의 관심사를 주제로 시간 가는 줄 모르고 대화했습니다.`,
                    `${josa(actor.name, '은/는')} 재치 있는 농담으로 ${josa(target.name, '을/를')} 웃게 만들었습니다.`,
                    `${josa(actor.name, '은/는')} 진지한 고민을 털어놓으며 ${josa(target.name, '과/와')} 서로의 깊은 내면을 확인했습니다.`
                ],
                fail: [
                    `${josa(actor.name, '이/가')} 썰렁한 농담을 던져 분위기가 순식간에 얼어붙었습니다.`,
                    `${josa(actor.name, '이/가')} 대화 도중 말실수를 하여 ${target.name}의 표정이 굳어졌습니다.`,
                    `${josa(actor.name, '이/가')} 자신의 얘기만 늘어놓다가 ${josa(target.name, '이/가')} 하품하는 것을 목격했습니다.`
                ]
            }
        };

        const typeKey = (actionType === 'ride') ? 'ride' :
                        (actionType === 'cooking') ? 'cooking' :
                        (actionType === 'date') ? 'date' :
                        (actionType === 'leisure' && loc === '노래방') ? 'singing' :
                        (actionType === 'leisure') ? 'leisure' :
                        (actionType === 'exercise') ? 'exercise' :
                        (actionType === 'art') ? 'art' :
                        (actionType === 'shopping') ? 'shopping' :
                        (actionType === 'movie') ? 'movie' :
                        (actionType === 'walk') ? 'walk' : 'talk';

    const pool = acts[typeKey] ? acts[typeKey][isSuccess ? 'success' : 'fail'] : acts['talk'][isSuccess ? 'success' : 'fail'];
    script = pool[Math.floor(Math.random() * pool.length)];
    }
    
    const icon = isSuccess ? 
        ["✨", "🍳", "🍷", "🎾", "💬", "🎡", "🎤", "💪", "🎨", "🛍️", "🎬"][["walk","cooking","date","leisure","talk","ride","singing","exercise","art","shopping","movie"].indexOf(actionType)] || "✨" 
        : "💦";
    
    return `${icon} ${script}`;
}


function handleCharSubmit() {
    const editId = document.getElementById('editId').value;
    if (editId) updateCharacter(editId);
    else addCharacter();
}

function addCharacter() {
    const nameInput = document.getElementById('inputName');
    const mbtiInput = document.getElementById('inputMbti');
    const charm = parseInt(document.getElementById('rangeCharm').value);
    const ability = parseInt(document.getElementById('rangeAbility').value);
    const morality = parseInt(document.getElementById('rangeMorality').value);

    const name = nameInput.value.trim();
    if (!name) return alert('이름을 입력해주세요.');
    if (state.characters.find(c => c.name === name)) return alert('이미 존재하는 이름입니다.');
    if (state.characters.length >= MAX_MEMBERS) return alert('최대 인원(14명)에 도달했습니다.');

    const newChar = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
        name,
        mbti: mbtiInput.value,
        charm,
        ability,
        morality,
        coupleId: null,
        status: 'active',
        currentLocation: '대기실',
        currentPair: null
    };

    state.characters.push(newChar);
    initRelationshipsFor(newChar);
    resetForm();
    renderRoster();
}

function startEditCharacter(id) {
    const char = state.characters.find(c => c.id === id);
    if (!char) return;
    document.getElementById('editId').value = char.id;
    document.getElementById('inputName').value = char.name;
    document.getElementById('inputMbti').value = char.mbti;
    document.getElementById('rangeCharm').value = char.charm;
    document.getElementById('valCharm').innerText = char.charm;
    document.getElementById('rangeAbility').value = char.ability;
    document.getElementById('valAbility').innerText = char.ability;
    document.getElementById('rangeMorality').value = char.morality;
    document.getElementById('valMorality').innerText = char.morality;
    document.getElementById('btnSubmitChar').innerText = "수정완료";
    document.getElementById('btnCancelEdit').classList.remove('hidden');
    document.getElementById('tab-roster').scrollIntoView({ behavior: 'smooth' });
}

function updateCharacter(id) {
    const charIndex = state.characters.findIndex(c => c.id === id);
    if (charIndex === -1) return;
    const name = document.getElementById('inputName').value.trim();
    if (!name) return alert('이름을 입력해주세요.');
    const duplicate = state.characters.find(c => c.name === name && c.id !== id);
    if (duplicate) return alert('이미 존재하는 이름입니다.');

    state.characters[charIndex].name = name;
    state.characters[charIndex].mbti = document.getElementById('inputMbti').value;
    state.characters[charIndex].charm = parseInt(document.getElementById('rangeCharm').value);
    state.characters[charIndex].ability = parseInt(document.getElementById('rangeAbility').value);
    state.characters[charIndex].morality = parseInt(document.getElementById('rangeMorality').value);

    resetForm();
    renderRoster();
    alert("수정되었습니다.");
}

function cancelEdit() {
    resetForm();
}

function resetForm() {
    document.getElementById('editId').value = '';
    document.getElementById('inputName').value = '';
    document.getElementById('rangeCharm').value = 5;
    document.getElementById('valCharm').innerText = 5;
    document.getElementById('rangeAbility').value = 5;
    document.getElementById('valAbility').innerText = 5;
    document.getElementById('rangeMorality').value = 5;
    document.getElementById('valMorality').innerText = 5;
    document.getElementById('btnSubmitChar').innerText = "등록하기";
    document.getElementById('btnCancelEdit').classList.add('hidden');
}

function generateRandomRoster() {
    const needed = MAX_MEMBERS - state.characters.length;
    if (needed <= 0) return alert('이미 인원이 가득 찼습니다.');
    
    let addedCount = 0;
    for (let i = 0; i < needed; i++) {
        const usedNames = state.characters.map(c => c.name);
        const availNames = DEFAULT_NAMES.filter(n => !usedNames.includes(n));
        if (availNames.length === 0) break;
        
        const name = availNames[Math.floor(Math.random() * availNames.length)];
        const mbti = MBTI_TYPES[Math.floor(Math.random() * MBTI_TYPES.length)];
        
        const newChar = {
            id: Date.now().toString() + i,
            name,
            mbti,
            charm: Math.floor(Math.random() * 10) + 1,
            ability: Math.floor(Math.random() * 10) + 1,
            morality: Math.floor(Math.random() * 10) + 1,
            coupleId: null,
            status: 'active',
            currentLocation: '대기실',
            currentPair: null
        };
        state.characters.push(newChar);
        initRelationshipsFor(newChar);
        addedCount++;
    }
    renderRoster();
    addLog(`[시스템] ${addedCount}명의 참가자가 랜덤으로 합류했습니다.`);
}

function removeCharacter(id) {
    if(confirm("정말 삭제하시겠습니까?")) {
        const charToRemove = state.characters.find(c => c.id === id);
        if (charToRemove && charToRemove.coupleId) {
             const partner = state.characters.find(p => p.id === charToRemove.coupleId);
             if (partner) {
                 partner.coupleId = null;
                 partner.couplingDay = null;
             }
        }
        state.characters = state.characters.filter(c => c.id !== id);
        
        if (state.relationships[id]) {
            delete state.relationships[id];
        }
        
        Object.keys(state.relationships).forEach(key => {
            if (state.relationships[key][id]) {
                delete state.relationships[key][id];
            }
        });

        renderRoster();
        if (document.getElementById('tab-status').classList.contains('active')) {
             renderHearts();
             drawRelationshipMap();
        }
    }
}


function initRelationshipsFor(newChar) {
    if (!state.relationships[newChar.id]) state.relationships[newChar.id] = {};
    state.characters.forEach(other => {
        if (other.id === newChar.id) return;
        if (!state.relationships[newChar.id][other.id]) {
            state.relationships[newChar.id][other.id] = { affection: 0, distrust: 0, type: 'acquaintance', cheatCount: 0 };
        }
        if (!state.relationships[other.id]) state.relationships[other.id] = {};
        if (!state.relationships[other.id][newChar.id]) {
            state.relationships[other.id][newChar.id] = { affection: 0, distrust: 0, type: 'acquaintance', cheatCount: 0 };
        }
    });
}


function processNextDay() {
    if (state.day === 0) {
        const inputDays = document.getElementById('inputMaxDays').value;
        state.config.maxDays = inputDays ? parseInt(inputDays) : Infinity;
        state.config.exitOnCouple = document.getElementById('chkCoupleExit').checked;
        state.config.allowAffair = document.getElementById('chkAllowAffair').checked;
    }

    const activeChars = state.characters.filter(c => c.status !== 'graduated');
    if (activeChars.length < 2) {
        if (state.ended) {
            return alert('시뮬레이션이 종료되었습니다. 다시 시작하려면 버튼을 누르세요.');
        }
        addLog(`🛑 남은 참가자가 ${activeChars.length}명으로, 더 이상 매칭을 진행할 수 없습니다.`);
        finishSimulation();
        return;
    }
    if (state.ended) return alert('시뮬레이션이 종료되었습니다. 다시 시작하려면 버튼을 누르세요.');

    state.day++;
    document.getElementById('currentDay').innerText = state.day;
    document.getElementById('progressText').innerText = `${state.day}일차`;

    state.characters.forEach(c => {
        if (c.status === 'active') {
            c.currentLocation = '개인 시간';
            c.currentPair = null;
        } else {
            c.currentLocation = '졸업'; 
        }
    });

    let dailyLogs = [];
    const shuffledChars = [...activeChars].sort(() => Math.random() - 0.5);
    const processedIds = new Set();

    for (let i = 0; i < shuffledChars.length; i++) {
        const actor = shuffledChars[i];
        if (processedIds.has(actor.id)) continue;

        const isIntrovert = actor.mbti.startsWith('I');
        const soloChance = isIntrovert ? 30 : 15;
        
        if (Math.random() * 100 < soloChance) {
            triggerSoloEvent(actor, dailyLogs);
            processedIds.add(actor.id);
            continue;
        }

        let target = null;
        const candidates = shuffledChars.filter(c => c.id !== actor.id && !processedIds.has(c.id));
        
        for (const candidate of candidates) {
            if (!state.config.allowAffair && actor.coupleId) {
                if (candidate.id !== actor.coupleId) continue; 
            }

            const rel = state.relationships[actor.id][candidate.id];
            
            if (rel.affection < 0) {
                if (Math.random() < 0.6) {
                    dailyLogs.push(`💔 ${josa(actor.name, '은/는')} ${josa(candidate.name, '과/와')} 마주칠 뻔했으나, 불편한 마음에 자리를 피했습니다.`);
                    continue; 
                }
            }
            target = candidate;
            break; 
        }

        if (!target) {
            triggerSoloEvent(actor, dailyLogs);
            processedIds.add(actor.id);
            continue; 
        }

        processedIds.add(actor.id);
        processedIds.add(target.id);

        const log = triggerEvent(actor, target);
        dailyLogs.push(log);
    }

    addLog(`\n--- [ Day ${state.day} ] ---`, 'system');
    dailyLogs.forEach(l => addLog(l));

    checkCouples(); 
    
    if (state.day >= state.config.maxDays) {
        finishSimulation();
    }

    renderHearts(); 
    renderLocationTable();
    renderRoster(); 
}

function triggerSoloEvent(actor, logs) {
    const locs = ['산책로', '도서관', '숙소', '정원', '테라스'];
    const loc = locs[Math.floor(Math.random() * locs.length)];
    actor.currentLocation = loc;
    
    const thoughts = [
        "혼자만의 시간을 가지며 생각을 정리했습니다.",
        "앞으로의 행동을 구상하며 조용히 시간을 보냈습니다.",
        "복잡한 마음을 추스르며 휴식을 취했습니다.",
        "내일의 데이트를 위해 컨디션을 조절했습니다."
    ];
    const msg = thoughts[Math.floor(Math.random() * thoughts.length)];
    logs.push(`🧘 ${josa(actor.name, '은/는')} ${loc}에서 ${msg}`);
}

function getAffectionChange(compScore) {
    const rand = Math.random() * 100;
    if (compScore === 5) {
        if (rand < 50) return 20;
        if (rand < 75) return 10;
        if (rand < 90) return 3;
        return -10;
    }
    if (compScore === 4) {
        if (rand < 25) return 20;
        if (rand < 55) return 10;
        if (rand < 80) return 3;
        if (rand < 90) return -10;
        return -15;
    }
    if (compScore === 3) {
        if (rand < 20) return 20;
        if (rand < 45) return 10;
        if (rand < 70) return 3;
        if (rand < 95) return -10;
        return -15;
    }
    if (compScore === 2) {
        if (rand < 10) return 20;
        if (rand < 20) return 10;
        if (rand < 45) return 3;
        if (rand < 75) return -10;
        return -15;
    }
    if (compScore === 1) {
        if (rand < 10) return 20;
        if (rand < 25) return 10;
        if (rand < 50) return 3;
        return -10;
    }
    return 0;
}

function triggerEvent(actor, target) {
    const normalLocs = LOCATIONS.filter(l => l !== "불꽃축제");
    let loc = normalLocs[Math.floor(Math.random() * normalLocs.length)];
    let isFireworks = false;

    if (state.day > 0 && state.day % 14 === 0) {
        if (Math.random() < 0.7) { 
            loc = "불꽃축제";
            isFireworks = true;
        }
    }
    let isGift = false;
    let giftResult = 0; 
    
    if (!isFireworks && state.day > 0 && state.day % 7 === 0) {
        if (Math.random() < 0.7) {
            loc = "선물 교환식";
            isGift = true;
        }
    }

    actor.currentLocation = loc;
    target.currentLocation = loc;
    actor.currentPair = target.id;
    target.currentPair = actor.id;

    const cheatProb = (10 - actor.morality) * 10; 
    
    if (actor.coupleId && actor.coupleId !== target.id) {
        const partner = state.characters.find(c => c.id === actor.coupleId);
        
        if (state.config.allowAffair && Math.random() * 100 < cheatProb) {
             changeAffection(actor.id, target.id, 15);
             changedistrust(partner.id, actor.id, 40);
             const relToPartner = state.relationships[actor.id][partner.id];
             if(!relToPartner.cheatCount) relToPartner.cheatCount = 0;
             relToPartner.cheatCount += 1;

             return `💔 ${josa(actor.name, '이/가')} 연인 ${partner.name} 몰래 ${josa(target.name, '과/와')} ${loc}에서 만남을 가졌습니다.`;
        } else {
             return `🛡️ ${josa(actor.name, '은/는')} ${josa(target.name, '과/와')}의 시간에서 연인 ${partner.name} 생각만 했습니다.`;
        }
    }

    let actionType = getActionType(loc);
    if (isFireworks) actionType = 'date'; 
    if (isGift) actionType = 'gift'; // Placeholder type


    let statValue = 0;
    switch (actionType) {
        case 'walk': statValue = (actor.charm + actor.ability + actor.morality) / 3; break;
        case 'leisure': case 'ride': case 'singing': case 'exercise': statValue = (actor.charm + actor.ability) / 2; break;
        case 'talk': 
            const stats = [actor.charm, actor.ability, actor.morality];
            statValue = stats[Math.floor(Math.random() * stats.length)];
            break;
        case 'cooking': statValue = actor.charm; break;
        case 'date': case 'movie': case 'art': case 'shopping': statValue = actor.ability; break;
        case 'gift': statValue = (actor.ability + actor.charm) / 2; break;

    }

    let isSuccess = checkSuccess(statValue);
    if (isGift) {
        const roll = Math.random() * 100;
        if (roll < 20) { giftResult = 0; isSuccess = false; }
        else if (roll < 40) { giftResult = 1; isSuccess = false; }
        else if (roll < 60) { giftResult = 2; isSuccess = true; }
        else if (roll < 80) { giftResult = 3; isSuccess = true; }
        else { giftResult = 4; isSuccess = true; }
    }

    
    const relAToB = state.relationships[actor.id][target.id];
    const relBToA = state.relationships[target.id][actor.id];
    const compScore = compatibilityData[actor.mbti][target.mbti] || 3;
    
    let changeValActor = getAffectionChange(compScore);
    let changeValTarget = getAffectionChange(compScore); 

    if (isFireworks) {
        changeValActor += 15;
        changeValTarget += 15;
    }
    
    if (isGift) {
        // -15, -5, +10, +15, +20
        const giftVals = [-15, -5, 10, 15, 20];
        changeValActor = giftVals[giftResult];
        changeValTarget = giftVals[giftResult];
    } else if (isSuccess) {
        changeValActor += 5 + Math.random() * 5; 
        changeValTarget += 5 + Math.random() * 5;
    } else {
        changeValActor = Math.min(0, changeValActor - 5);
        changeValTarget = Math.min(0, changeValTarget - 5);
    }

    changeValActor += Math.floor(Math.random() * 11) - 5;
    changeValTarget += Math.floor(Math.random() * 11) - 5;

    if (relAToB.affection > 80 && !actor.coupleId && !target.coupleId && actionType === 'date' && isSuccess) {
        const confessChance = relBToA.affection + (actor.charm * 2);
        if (Math.random() * 100 < confessChance) {
            actor.coupleId = target.id;
            target.coupleId = actor.id;
            actor.couplingDay = state.day;
            target.couplingDay = state.day;

            relAToB.type = 'lover';
            relBToA.type = 'lover';
            changeAffection(actor.id, target.id, 30);
            changeAffection(target.id, actor.id, 30);
            
            if (state.config.exitOnCouple) {
                return `💖 [졸업] ${loc}에서 ${josa(actor.name, '이/가')} ${target.name}에게 고백하여 커플이 되었습니다. 졸업 축하드립니다.`;
            }
            
            return `💖 [고백 성공] ${loc}에서 ${josa(actor.name, '이/가')} ${target.name}에게 마음을 전했고, 둘은 연인이 되었습니다.`;
        }
    }

    changeAffection(actor.id, target.id, Math.floor(changeValActor));
    changeAffection(target.id, actor.id, Math.floor(changeValTarget));

    if (isFireworks) {
        return `🎆 ${josa(actor.name, '과/와')} ${josa(target.name, '은/는')} 함께 불꽃놀이를 즐겼습니다.`;
    }
    if (isGift) {
        const gift = getRandomItem(GIFTS);
        let reaction = "";
        switch(giftResult) {
            case 0: reaction = "표정을 굳혔습니다."; break;
            case 1: reaction = "애매한 미소를 지으며 고맙다고 말했습니다."; break;
            case 2: reaction = "가볍게 고마움을 표시했습니다."; break;
            case 3: reaction = "마음에 든다며 좋아했습니다."; break;
            case 4: reaction = "놀란 기색으로 갖고 싶었던 것이라고 말했습니다."; break;
        }
        return `🎁 ${josa(actor.name, '은/는')} ${target.name}에게 ${josa(gift, '을/를')} 선물했습니다. ${josa(target.name, '은/는')} ${reaction}`;
    }

    return generateActionScript(actionType, isSuccess, actor, target, loc);
}

function changeAffection(srcId, tgtId, amount) {
    if (!state.relationships[srcId][tgtId]) return;
    state.relationships[srcId][tgtId].affection += amount;
    state.relationships[srcId][tgtId].affection = Math.min(100, Math.max(-100, state.relationships[srcId][tgtId].affection));
}

function changedistrust(srcId, tgtId, amount) {
    if (!state.relationships[srcId][tgtId]) return;
    state.relationships[srcId][tgtId].distrust += amount;
    state.relationships[srcId][tgtId].distrust = Math.min(100, Math.max(0, state.relationships[srcId][tgtId].distrust));
}

function checkCouples() {
    state.characters.forEach(c => {
        if (c.status === 'graduated') return;

        if (c.coupleId) {
            const partnerId = c.coupleId;
            const partner = state.characters.find(p => p.id === partnerId);
            
            if (state.config.exitOnCouple && c.status === 'active' && partner.status === 'active') {
                c.status = 'graduated';
                partner.status = 'graduated';
                addLog(`🎓 [시스템] ${c.name} ♡ ${partner.name} 커플이 명예롭게 졸업했습니다.`);
                return; 
            }

            const rel = state.relationships[c.id][partnerId];
            const partnerRel = state.relationships[partnerId][c.id];
            
            if (rel.affection < -30 && partnerRel.affection < -30) {
                breakUp(c, partnerId, '성격 차이');
                return;
            }

            const cheatCount = rel.cheatCount || 0; 
            const partnerdistrust = partnerRel.distrust; 

            if (partnerdistrust >= 80 || cheatCount >= 2) {
                 breakUp(c, partnerId, '신뢰 문제');
            }
        }
    });
}

function breakUp(char, partnerId, reason) {
    const partner = state.characters.find(p => p.id === partnerId);
    
    char.coupleId = null;
    partner.coupleId = null;
    char.couplingDay = null;
    partner.couplingDay = null;
    
    state.relationships[char.id][partner.id].type = 'ex';
    state.relationships[partner.id][char.id].type = 'ex';
    
    state.relationships[char.id][partner.id].affection = -80;
    state.relationships[partner.id][char.id].affection = -80;
    
    state.relationships[char.id][partner.id].distrust = 0;
    state.relationships[partner.id][char.id].distrust = 0;
    state.relationships[char.id][partner.id].cheatCount = 0;

    addLog(`💔 [이별] ${josa(char.name, '과/와')} ${partner.name}은(는) ${reason}로 인해 헤어지게 되었습니다.`);
}

function finishSimulation() {
    state.ended = true;
    document.getElementById('nextDayBtn').classList.add('hidden');
    document.getElementById('restartBtn').classList.remove('hidden');
    
    addLog("\n🏁 [시뮬레이션 종료] 🏁", "system");
    
    const couples = [];
    const checked = new Set();
    
    state.characters.forEach(c => {
        if (c.coupleId && !checked.has(c.id)) {
            const partner = state.characters.find(p => p.id === c.coupleId);
            couples.push(`${c.name} ❤️ ${partner.name} (${c.status === 'graduated' ? '졸업' : '생존'})`);
            checked.add(c.id);
            checked.add(partner.id);
        }
    });

    if (couples.length > 0) {
        addLog(`최종 커플 명단:`);
        couples.forEach(cp => addLog(`- ${cp}`));
    } else {
        addLog("최종 커플이 없습니다.");
    }
}

function restartSimulation() {
    if(!confirm("현재 데이터를 모두 초기화하고 다시 시작하시겠습니까?")) return;
    
    state.day = 0;
    state.ended = false;
    state.logs = [];
    state.relationships = {};

    state.characters.forEach(c => {
        c.coupleId = null;
        c.status = 'active';
        c.currentLocation = '대기실';
        c.currentPair = null;
        c.couplingDay = null;
    });

    state.characters.forEach(c => {
        initRelationshipsFor(c);
    });

    document.getElementById('currentDay').innerText = 0;
    document.getElementById('progressText').innerText = "준비 중";
    document.getElementById('logContainer').innerHTML = '<div class="text-center text-gray-400 mt-10"><span class="material-icons-round text-4xl mb-2">history_edu</span><p>시뮬레이션을 시작하려면 \'다음 날 진행\'을 누르세요.</p></div>';
    document.getElementById('graduatedListArea').classList.add('hidden');
    document.getElementById('nextDayBtn').classList.remove('hidden');
    document.getElementById('restartBtn').classList.add('hidden');
    document.getElementById('nextDayBtn').disabled = false;
    document.getElementById('nextDayBtn').innerText = "다음 날 진행";

    renderRoster();
    renderLocationTable();
    renderHearts();
    drawRelationshipMap();
}



function getHeartString(score) {
    if (score < 0) {
        const count = Math.min(5, Math.ceil(Math.abs(score) / 20));
        return "💔".repeat(count);
    } else if (score === 0) {
        return "🤍";
    } else {
        const count = Math.min(5, Math.ceil(score / 20));
        return "💖".repeat(count);
    }
}

function renderRoster() {
    const container = document.getElementById('rosterList');
    const gradContainer = document.getElementById('graduatedList');
    const gradArea = document.getElementById('graduatedListArea');
    
    document.getElementById('charCount').innerText = `${state.characters.length}/${MAX_MEMBERS}`;
    
    container.innerHTML = '';
    gradContainer.innerHTML = '';
    
    let gradCount = 0;
    const activeChars = state.characters.filter(c => c.status === 'active');
    const gradChars = state.characters.filter(c => c.status === 'graduated');
    const processedGradIds = new Set();

    gradChars.forEach(char => {
        if (processedGradIds.has(char.id)) return;

        const partner = gradChars.find(p => p.id === char.coupleId);
        
        const card = document.createElement('div');
        card.className = `bg-white dark:bg-darkcard border border-primary/50 bg-pink-50/50 p-4 rounded-xl shadow-sm`;

        if (partner) {
            processedGradIds.add(char.id);
            processedGradIds.add(partner.id);
            gradCount++;

            const dayText = char.couplingDay ? `Day ${char.couplingDay} 성사` : '졸업';

            card.innerHTML = `
                <div class="flex justify-between items-center mb-2">
                    <span class="text-xs font-bold text-white bg-primary px-2 py-1 rounded-full">${dayText}</span>
                </div>
                <div class="flex items-center justify-between gap-2">
                    <div class="text-center flex-1">
                        <div class="font-bold text-gray-800 dark:text-gray-100">${char.name}</div>
                        <div class="text-xs text-gray-500">${char.mbti}</div>
                    </div>
                    <span class="material-icons-round text-primary animate-pulse">favorite</span>
                    <div class="text-center flex-1">
                        <div class="font-bold text-gray-800 dark:text-gray-100">${partner.name}</div>
                        <div class="text-xs text-gray-500">${partner.mbti}</div>
                    </div>
                </div>
            `;
        } else {
            processedGradIds.add(char.id);
            gradCount++;
            card.innerHTML = `
                <div>
                    <div class="font-bold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2">
                        ${char.name} 
                        <span class="text-xs font-normal text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">${char.mbti}</span>
                        <span class="text-[10px] bg-gray-400 text-white px-2 py-0.5 rounded-full ml-2">졸업</span>
                    </div>
                </div>
            `;
        }
        gradContainer.appendChild(card);
    });

    activeChars.forEach(char => {
        const card = document.createElement('div');
        card.className = "bg-white dark:bg-darkcard border border-gray-100 dark:border-gray-700 p-4 rounded-xl shadow-sm flex items-center justify-between";
        
        let statusBadge = '';
        if(char.coupleId) statusBadge = '<span class="text-[10px] bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full ml-2">커플</span>';

        card.innerHTML = `
            <div>
                <div class="font-bold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    ${char.name} 
                    <span class="text-xs font-normal text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">${char.mbti}</span>
                    ${statusBadge}
                </div>
                <div class="text-xs text-gray-400 mt-1 flex gap-2">
                    <span>매력 ${char.charm}</span>
                    <span>능력 ${char.ability}</span>
                    <span>도덕 ${char.morality}</span>
                </div>
            </div>
            <div class="flex gap-1">
                <button onclick="startEditCharacter('${char.id}')" class="p-2 text-gray-400 hover:text-blue-500 transition rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <span class="material-icons-round text-base">edit</span>
                </button>
                <button onclick="removeCharacter('${char.id}')" class="p-2 text-gray-400 hover:text-red-500 transition rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <span class="material-icons-round text-base">remove_circle_outline</span>
                </button>
            </div>
        `;
        container.appendChild(card);
    });

    if (gradCount > 0) {
        gradArea.classList.remove('hidden');
    } else {
        gradArea.classList.add('hidden');
    }
}

function renderLocationTable() {
    const grid = document.getElementById('locationGrid');
    if(!grid) return;
    grid.innerHTML = '';

    const displayLocs = [...new Set([...LOCATIONS])];
    
    displayLocs.forEach(loc => {
        const peopleHere = state.characters.filter(c => c.currentLocation === loc);
        if (peopleHere.length === 0) return;
        
        const card = document.createElement('div');
        card.className = "bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 px-3 py-2 rounded-lg flex flex-col items-start gap-1 min-w-[100px]";
        
        const header = document.createElement('div');
        header.className = "text-[10px] font-bold text-gray-400 uppercase tracking-wider";
        header.innerText = loc;
        card.appendChild(header);

        const peopleContainer = document.createElement('div');
        peopleContainer.className = "flex gap-1 items-center h-5";

        if (peopleHere.length === 0) {
            peopleContainer.innerHTML = `<span class="text-xs text-gray-300 dark:text-gray-600">-</span>`;
        } else {
            const paired = peopleHere.filter(p => p.currentPair && peopleHere.find(m => m.id === p.currentPair));
            const solos = peopleHere.filter(p => !paired.includes(p));
            
            const renderedPairs = new Set();
            paired.forEach(p => {
                if(renderedPairs.has(p.id)) return;
                const partner = peopleHere.find(m => m.id === p.currentPair);
                if(partner) {
                    renderedPairs.add(p.id);
                    renderedPairs.add(partner.id);
                    
                    const pairBox = document.createElement('div');
                    const isCouple = p.coupleId === partner.id;
                    const borderClass = isCouple ? "border-pink-300 dark:border-pink-700 bg-pink-50 dark:bg-pink-900/20" : "border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20";
                    pairBox.className = `flex gap-1 px-1.5 py-0.5 rounded border ${borderClass} items-center`;
                    
                    pairBox.innerHTML = `
                        <span class="text-xs font-bold ${isCouple ? 'text-pink-600' : 'text-indigo-600'}">${p.name}</span>
                        <span class="material-icons-round text-[10px] text-gray-400">link</span>
                        <span class="text-xs font-bold ${isCouple ? 'text-pink-600' : 'text-indigo-600'}">${partner.name}</span>
                    `;
                    peopleContainer.appendChild(pairBox);
                }
            });

            solos.forEach(p => {
                const span = document.createElement('span');
                span.className = "text-xs text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-600";
                span.innerText = p.name;
                peopleContainer.appendChild(span);
            });
            card.classList.add("bg-white", "dark:bg-darkcard", "shadow-sm");
            card.classList.remove("bg-gray-50", "dark:bg-gray-800/50"); 
        }
        card.appendChild(peopleContainer);
        grid.appendChild(card);
    });
}

function renderHearts() {
    const container = document.getElementById('relationshipDetails');
    if (state.characters.length === 0) return;

    const openStates = {};
    container.querySelectorAll('details').forEach(detail => {
        if(detail.dataset.charId) {
            openStates[detail.dataset.charId] = detail.open;
        }
    });

    container.innerHTML = '';

    const isFirstRender = Object.keys(openStates).length === 0;

    const activeChars = state.characters.filter(c => c.status === 'active');

    activeChars.forEach(char => {
        let relHtml = '';
        state.characters.forEach(other => { 
            if (char.id === other.id) return;
            const rel = state.relationships[char.id][other.id];
            
            if (Math.abs(rel.affection) >= 20 || rel.distrust > 10 || rel.type === 'lover' || rel.type === 'ex') {
                const hearts = getHeartString(rel.affection);
                let statusBadge = '';
                if (rel.type === 'lover') statusBadge = '<span class="text-xs bg-pink-100 text-pink-600 px-1 rounded">연인</span>';
                if (rel.type === 'ex') statusBadge = '<span class="text-xs bg-gray-100 text-gray-500 px-1 rounded">전애인</span>';
                if (rel.distrust > 40) statusBadge += '<span class="text-xs bg-purple-100 text-purple-600 px-1 rounded ml-1">불신</span>';
                
                relHtml += `
                    <div class="flex justify-between items-center text-sm mb-1">
                        <span class="text-gray-600 dark:text-gray-400">to ${other.name}</span>
                        <div class="flex items-center gap-1">
                            <span>${hearts}</span>
                            ${statusBadge}
                            <span class="text-xs text-gray-400 w-8 text-right">(${rel.affection})</span>
                        </div>
                    </div>
                `;
            }
        });

        if (relHtml) {
            const details = document.createElement('details');
            details.className = "group relationship-item border-b border-gray-100 dark:border-gray-700 last:border-0";
            details.dataset.charId = char.id;
            
            if (openStates.hasOwnProperty(char.id)) {
                details.open = openStates[char.id];
            } else {
                details.open = true;
            }
            
            details.innerHTML = `
                <summary class="flex justify-between items-center cursor-pointer list-none py-2 outline-none group-open:text-primary transition">
                    <span class="font-bold text-gray-800 dark:text-gray-200 group-open:text-primary">${char.name}의 마음</span>
                    <span class="material-icons-round text-gray-400 transform group-open:rotate-180 transition">expand_more</span>
                </summary>
                <div class="pl-2 pb-2 space-y-1">${relHtml}</div>
            `;
            container.appendChild(details);
        }
    });
    
    drawRelationshipMap();
}

function toggleAllDetails() {
    const allDetails = document.querySelectorAll('.relationship-item');
    if (allDetails.length === 0) return;

    let openCount = 0;
    allDetails.forEach(el => { if(el.open) openCount++; });
    const shouldOpen = openCount < allDetails.length / 2;

    allDetails.forEach(el => {
        el.open = shouldOpen;
    });
}

function addLog(message, type = 'normal') {
    const container = document.getElementById('logContainer');
    const entry = document.createElement('div');
    entry.className = "text-sm p-3 rounded-lg animate-fade-in";
    
    if (type === 'system') {
        entry.className += " bg-gray-100 dark:bg-gray-800 font-bold text-center my-2 text-gray-700 dark:text-gray-300";
    } else if (message.includes('💔') || message.includes('💢')) {
        entry.className += " bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-100 dark:border-red-900/30";
    } else if (message.includes('💖') || message.includes('✨') || message.includes('🎆')) {
        entry.className += " bg-pink-50 dark:bg-pink-900/20 text-pink-800 dark:text-pink-200 border border-pink-100 dark:border-pink-900/30";
    } else if (message.includes('🎓')) {
        entry.className += " bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 border border-blue-100 dark:border-blue-900/30";
    } else {
        entry.className += " bg-gray-50 dark:bg-[#1f2233] text-gray-700 dark:text-gray-300";
    }
    
    entry.innerText = message;
    container.prepend(entry);
    state.logs.push({ day: state.day, msg: message });
}


function drawRelationshipMap() {
    const canvas = document.getElementById('relationCanvas');
    if (!canvas) return;
    
    const dpr = window.devicePixelRatio || 1;
    const logicalSize = 800;
    
    canvas.width = logicalSize * dpr;
    canvas.height = logicalSize * dpr;

    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    
    const width = logicalSize;
    const height = logicalSize;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 300; 
    const nodeRadius = 35;
    
    ctx.clearRect(0, 0, width, height);
    
    const chars = state.characters.filter(c => c.status === 'active');
    const count = chars.length;
    if (count === 0) return;

    cachedNodePositions = [];

    for (let i = 0; i < count; i++) {
        const angle = (i / count) * 2 * Math.PI - (Math.PI / 2); 
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        cachedNodePositions.push({
            x: x,
            y: y,
            id: chars[i].id,
            char: chars[i]
        });
    }

    for (let i = 0; i < cachedNodePositions.length; i++) {
        for (let j = 0; j < cachedNodePositions.length; j++) {
            if (i === j) continue;
            
            const p1 = cachedNodePositions[i];
            const p2 = cachedNodePositions[j];
            const rel = state.relationships[p1.char.id][p2.char.id];
            
            if (!rel || (Math.abs(rel.affection) <= 30 && rel.type !== 'lover')) continue;

            let alpha = 0.3; 
            if (hoveredCharId) {
                if (hoveredCharId === p1.char.id || hoveredCharId === p2.char.id) {
                    alpha = rel.type === 'lover' ? 1.0 : 0.8;
                } else {
                    alpha = 0.05; 
                }
            } else {
                if (rel.type === 'lover') alpha = 1.0;
                else if (Math.abs(rel.affection) > 60) alpha = 0.6;
            }

            let color = `rgba(200, 200, 200, ${alpha})`; 
            let lineWidth = 1;
            let isDashed = false;

            if (rel.type === 'lover') {
                color = `rgba(255, 71, 133, ${alpha})`;
                lineWidth = 4;
                isDashed = false;
            } else if (rel.affection > 0) {

                if (rel.affection > 60) {
                    color = `rgba(255, 105, 180, ${alpha})`;
                    lineWidth = 2;
                } else {
                    color = `rgba(255, 182, 193, ${alpha})`;
                    lineWidth = 1;
                }
                isDashed = false;
            } else if (rel.affection < 0) {
                if (rel.affection < -30) {
                     color = `rgba(65, 105, 225, ${alpha})`;
                     lineWidth = 1.5;
                } else {
                     color = `rgba(135, 206, 235, ${alpha})`;
                     lineWidth = 1;
                }
                isDashed = true;
            }

            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;
            
            const perpX = -dy / dist;
            const perpY = dx / dist;
            
            const curveAmount = 30; 
            const cpX = midX + perpX * curveAmount;
            const cpY = midY + perpY * curveAmount;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.quadraticCurveTo(cpX, cpY, p2.x, p2.y);
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
            if (isDashed) ctx.setLineDash([5, 5]); 
            else ctx.setLineDash([]);
            ctx.stroke();

            const arrowAngle = Math.atan2(p2.y - cpY, p2.x - cpX);
            const headLen = 10;
            const endX = p2.x - Math.cos(arrowAngle) * nodeRadius;
            const endY = p2.y - Math.sin(arrowAngle) * nodeRadius;

            ctx.beginPath();
            ctx.moveTo(endX, endY);
            ctx.lineTo(endX - headLen * Math.cos(arrowAngle - Math.PI / 6), endY - headLen * Math.sin(arrowAngle - Math.PI / 6));
            ctx.lineTo(endX - headLen * Math.cos(arrowAngle + Math.PI / 6), endY - headLen * Math.sin(arrowAngle + Math.PI / 6));
            ctx.lineTo(endX, endY);
            ctx.fillStyle = color;
            ctx.fill();
        }
    }

    cachedNodePositions.forEach(p => {
        let opacity = 1.0;
        if (hoveredCharId && hoveredCharId !== p.id) {
            const rel1 = state.relationships[hoveredCharId][p.id];
            const rel2 = state.relationships[p.id][hoveredCharId];
            const isRelated = (rel1 && Math.abs(rel1.affection) > 30) || (rel2 && Math.abs(rel2.affection) > 30);
            if (!isRelated) opacity = 0.2;
        }

        ctx.globalAlpha = opacity;
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeRadius, 0, 2 * Math.PI);
        ctx.fillStyle = p.char.coupleId ? '#FF4785' : '#6C63FF';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#ffffff' : '#333333';
        ctx.font = "bold 14px Pretendard";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.char.name, p.x, p.y + 45);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = "bold 12px Pretendard";
        ctx.fillText(p.char.mbti, p.x, p.y);

        ctx.globalAlpha = 1.0;
    });
}

function saveStatusImage() {
    const canvas = document.getElementById('relationCanvas');
    if (!canvas) return;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const ctx = tempCanvas.getContext('2d');

    const isDark = document.documentElement.classList.contains('dark');
    ctx.fillStyle = isDark ? '#1f2233' : '#ffffff';
    ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    ctx.drawImage(canvas, 0, 0);

    ctx.fillStyle = isDark ? '#ffffff' : '#333333';
    ctx.font = 'bold 30px Pretendard, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Day ${state.day}`, 40, 60);

    const link = document.createElement('a');
    link.download = `dating_show_day${state.day}.png`;
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
}

function toggleDetails() {
    const panel = document.getElementById('detailsPanel');
    const btn = document.getElementById('btnOpenDetails');
    
    if (panel.classList.contains('translate-x-full')) {
        panel.classList.remove('translate-x-full', 'opacity-0');
        btn.classList.add('hidden');
    } else {
        panel.classList.add('translate-x-full', 'opacity-0');
        btn.classList.remove('hidden');
    }
}

function switchTab(targetId) {
    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.remove('active');
    });
    document.getElementById(`tab-${targetId}`).classList.add('active');

    document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.dataset.target === targetId) {
            btn.classList.add('active');
            btn.querySelector('span').classList.add('text-primary');
        } else {
            btn.classList.remove('active');
            btn.querySelector('span').classList.remove('text-primary');
        }
    });

    if (targetId === 'status') {
        renderHearts();
        setTimeout(drawRelationshipMap, 50);
    }
}


function downloadData(type) {
    if (state.characters.length === 0) return alert("저장할 데이터가 없습니다.");
    
    let saveData;
    let fileName;

    if (type === 'roster') {
        saveData = state.characters.map(c => ({
            id: c.id,
            name: c.name,
            mbti: c.mbti,
            charm: c.charm,
            ability: c.ability,
            morality: c.morality,
        }));
        fileName = `dating_show_roster.json`;
    } else {
        saveData = state;
        fileName = `dating_show_save_day${state.day}.json`;
    }

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(saveData));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", fileName);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function uploadData(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const loadedData = JSON.parse(e.target.result);
            if (Array.isArray(loadedData)) {
                if (confirm("명단 파일이 감지되었습니다. 현재 진행 상황을 초기화하고 명단을 불러오시겠습니까?")) {
                    state = {
                        day: 0,
                        characters: [],
                        relationships: {},
                        logs: [],
                        ended: false
                    };
                    loadedData.forEach(c => {
                        const newChar = { ...c, coupleId: null, currentLocation: '대기실', currentPair: null };
                        state.characters.push(newChar);
                        initRelationshipsFor(newChar);
                    });
                    document.getElementById('currentDay').innerText = 0;
                    renderRoster();
                    alert("명단을 성공적으로 불러왔습니다. 새로운 시뮬레이션을 시작하세요.");
                }
            } else {
                if (!loadedData.characters || !loadedData.relationships) throw new Error("Invalid Format");
                state = loadedData;
                document.getElementById('currentDay').innerText = state.day;
                renderRoster();
                alert("진행 데이터를 성공적으로 불러왔습니다.");
            }
        } catch (err) {
            console.error(err);
            alert("파일 형식이 올바르지 않습니다.");
        }
    };
    reader.readAsText(file);
}

function closeModal() {
    document.getElementById('modalOverlay').classList.add('hidden');
}
