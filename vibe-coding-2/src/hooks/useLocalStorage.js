// useLocalStorage.js — localStorage 읽기·쓰기 래퍼 훅
//
// WHY 별도 훅으로 분리?
//   - Context가 3개(Task·Team·Minute)이고 초기화·저장 패턴이 동일하므로
//     중복을 줄이기 위해 공통 훅으로 추출한다.
//   - 읽기 실패(JSON 파싱 오류, 용량 초과 등) 시 빈 배열로 fallback한다.

import { useState, useEffect } from 'react'

/**
 * @template T
 * @param {string} key - localStorage 키 (e.g. 'tpp_tasks')
 * @param {T} initialValue - localStorage에 값이 없을 때 사용할 초기값
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]}
 */
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch (err) {
      console.warn(`[useLocalStorage] 읽기 실패 (key: ${key})`, err)
      return initialValue
    }
  })

  // value가 변경될 때마다 localStorage에 동기화
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.warn(`[useLocalStorage] 쓰기 실패 (key: ${key})`, err)
    }
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
