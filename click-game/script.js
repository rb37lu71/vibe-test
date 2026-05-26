// ─────────────────────────────────────────
// 1. HTML 요소 가져오기
//    document.getElementById()로 HTML의 id와 연결합니다.
// ─────────────────────────────────────────
const scoreEl   = document.getElementById('score');      // 점수 표시 영역
const timerEl   = document.getElementById('timer');      // 타이머 표시 영역
const clickBtn  = document.getElementById('clickBtn');   // 클릭 버튼
const resultBox = document.getElementById('resultBox');  // 결과 박스
const finalScore = document.getElementById('finalScore'); // 최종 점수 텍스트
const restartBtn = document.getElementById('restartBtn'); // 다시 시작 버튼

// ─────────────────────────────────────────
// 2. 게임 상태 변수
// ─────────────────────────────────────────
let score = 0;       // 현재 점수 (클릭할 때마다 1씩 늘어남)
let timeLeft = 10;   // 남은 시간 (초 단위, 10에서 시작)
let timer = null;    // setInterval의 반환값을 저장해 나중에 멈출 때 사용

// ─────────────────────────────────────────
// 3. 게임 시작 함수
//    변수를 초기값으로 되돌리고 타이머를 시작합니다.
// ─────────────────────────────────────────
function startGame() {
  // 변수 초기화
  score = 0;
  timeLeft = 10;

  // 화면에 초기값 반영
  scoreEl.textContent  = score;
  timerEl.textContent  = timeLeft;

  // 결과 박스 숨기고 클릭 버튼 다시 활성화
  resultBox.style.display = 'none';
  clickBtn.disabled = false;

  // setInterval: 1000ms(1초)마다 countdown 함수를 반복 호출
  timer = setInterval(countdown, 1000);
}

// ─────────────────────────────────────────
// 4. 카운트다운 함수
//    1초마다 호출되어 남은 시간을 1씩 줄입니다.
// ─────────────────────────────────────────
function countdown() {
  timeLeft--;                          // 남은 시간 1 감소
  timerEl.textContent = timeLeft;      // 화면에 업데이트

  // 남은 시간이 0이 되면 게임 종료
  if (timeLeft <= 0) {
    endGame();
  }
}

// ─────────────────────────────────────────
// 5. 게임 종료 함수
//    타이머를 멈추고 최종 결과를 보여줍니다.
// ─────────────────────────────────────────
function endGame() {
  clearInterval(timer);          // 반복 타이머 정지
  clickBtn.disabled = true;      // 버튼 비활성화 (더 이상 클릭 불가)

  finalScore.textContent = score;        // 최종 점수 표시
  resultBox.style.display = 'block';     // 결과 박스 보이기
}

// ─────────────────────────────────────────
// 6. 이벤트 리스너 등록
//    버튼을 클릭하면 실행할 함수를 연결합니다.
// ─────────────────────────────────────────

// 클릭 버튼: 누를 때마다 점수 +1
clickBtn.addEventListener('click', function () {
  score++;                          // 점수 1 증가
  scoreEl.textContent = score;      // 화면에 반영
});

// 다시 시작 버튼: 게임을 처음부터 다시 시작
restartBtn.addEventListener('click', function () {
  startGame();
});

// ─────────────────────────────────────────
// 7. 페이지가 열리면 자동으로 게임 시작
// ─────────────────────────────────────────
startGame();
