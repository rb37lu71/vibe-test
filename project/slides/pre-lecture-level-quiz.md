# 강의 전 수강생 수준 파악 퀴즈

## 짧은 버전

- 권장 시간: 2분
- 문항 수: 6문항
- 구성: 객관식 2문항 + 체크박스 3문항 + 단답형 1문항

---

## 폼 제목

`ChatGPT 실무 활용 강의 사전 체크`

## 폼 설명

강의 시작 전, 현재 활용 수준을 간단히 확인하겠습니다.  
응답 결과를 바탕으로 설명 속도와 예시 난이도를 조정하겠습니다.

---

## 문항

### 1. 현재 ChatGPT 사용 경험은 어느 정도인가요?

- 유형: 객관식
- 보기:
  - 거의 써본 적 없다
  - 몇 번 써봤지만 익숙하지 않다
  - 가끔 업무에 활용한다
  - 자주 활용한다

### 2. ChatGPT를 어떤 용도로 써보셨나요? 해당하는 것을 모두 골라주세요.

- 유형: 체크박스
- 보기:
  - 정보 검색 및 질문
  - 문서 초안 작성
  - 자료 요약 및 정리
  - 아이디어 발굴
  - 마케팅 문구 작성
  - 강의안 또는 교육자료 제작
  - 이미지 생성
  - 아직 사용한 적 없다

### 3. 아래 용어 중 들어본 것이 있으면 모두 골라주세요.

- 유형: 체크박스
- 보기:
  - GPTs
  - Deep Research
  - Agent
  - Codex
  - Skills
  - MCP
  - Claude Code
  - 바이브 코딩
  - 들어본 용어가 거의 없다

### 4. 아래 중 실제로 써보거나 만져본 것이 있으면 모두 골라주세요.

- 유형: 체크박스
- 보기:
  - ChatGPT 이미지 생성
  - GPTs
  - Deep Research
  - Codex 또는 코드 생성 도구
  - Claude Code
  - Cursor 같은 AI 코딩 도구
  - 자동화 워크플로우 연결
  - 써본 것은 거의 없다

### 5. 업무에 사용할 때 가장 걱정되는 부분은 무엇인가요?

- 유형: 객관식
- 보기:
  - 답변 정확도
  - 프롬프트 작성법
  - 개인정보·보안
  - 실무 적용 방법

### 6. 이번 강의에서 꼭 해결하고 싶은 업무 한 가지를 적어주세요.

- 유형: 단답형
- 예시:
  - 블로그 초안 작성
  - 광고 문구 정리
  - 강의 목차 만들기
  - 고객 FAQ 초안 만들기

---

## 해석 포인트

- 입문자 비중이 높으면:
  - 기능 소개와 기본 프롬프트 템플릿 비중 확대
- 용어 인지도는 높은데 사용 경험이 적으면:
  - 정의보다 실제 쓰는 장면 위주로 설명
- 코딩 도구 경험이 많으면:
  - Codex, Claude Code, 바이브 코딩 사례 짧게 추가
- 이미지 생성 응답이 많으면:
  - 이미지 생성 파트 사례 확대

---

## Google Forms 복붙용

### 방법 1. Gemini가 있는 경우

아래 프롬프트를 Google Forms의 `Help me create a form`에 그대로 붙여 넣으면 됩니다.

```text
Create a Korean pre-lecture survey in Google Forms.

Form title: ChatGPT 실무 활용 강의 사전 체크

Form description:
강의 시작 전, 현재 활용 수준을 간단히 확인하겠습니다.
응답 결과를 바탕으로 설명 속도와 예시 난이도를 조정하겠습니다.

Create these 6 questions in Korean:

1. 현재 ChatGPT 사용 경험은 어느 정도인가요?
Type: Multiple choice
Options:
- 거의 써본 적 없다
- 몇 번 써봤지만 익숙하지 않다
- 가끔 업무에 활용한다
- 자주 활용한다

2. ChatGPT를 어떤 용도로 써보셨나요? 해당하는 것을 모두 골라주세요.
Type: Checkboxes
Options:
- 정보 검색 및 질문
- 문서 초안 작성
- 자료 요약 및 정리
- 아이디어 발굴
- 마케팅 문구 작성
- 강의안 또는 교육자료 제작
- 이미지 생성
- 아직 사용한 적 없다

3. 아래 용어 중 들어본 것이 있으면 모두 골라주세요.
Type: Checkboxes
Options:
- GPTs
- Deep Research
- Agent
- Codex
- Skills
- MCP
- Claude Code
- 바이브 코딩
- 들어본 용어가 거의 없다

4. 아래 중 실제로 써보거나 만져본 것이 있으면 모두 골라주세요.
Type: Checkboxes
Options:
- ChatGPT 이미지 생성
- GPTs
- Deep Research
- Codex 또는 코드 생성 도구
- Claude Code
- Cursor 같은 AI 코딩 도구
- 자동화 워크플로우 연결
- 써본 것은 거의 없다

5. 업무에 사용할 때 가장 걱정되는 부분은 무엇인가요?
Type: Multiple choice
Options:
- 답변 정확도
- 프롬프트 작성법
- 개인정보·보안
- 실무 적용 방법

6. 이번 강의에서 꼭 해결하고 싶은 업무 한 가지를 적어주세요.
Type: Short answer

Make questions 1 to 5 required.
Question 6 optional.
```

### 방법 2. Gemini가 없는 경우

- Google Forms 기본 기능만으로는 위 텍스트를 한 번에 붙여 넣어 질문으로 자동 변환하는 공식 기능은 확인되지 않았습니다.
- 이 경우 위 문항을 보면서 수동으로 추가하는 것이 가장 확실합니다.

