import { useMemo, useState } from 'react'
import ClassPortrait from '../../components/ClassPortrait/ClassPortrait'
import shopItemSheet from '../../assets/shop-item-sheet.png'
import { useTeam } from '../../context/TeamContext'
import { SHOP_ITEMS } from '../../data/shopItems'

const ITEM_POSITION = {
  'half-day': '0% 0%',
  'full-day': '100% 0%',
  'focus-shield': '0% 100%',
  'snack-ticket': '100% 100%',
}

export default function Shop() {
  const { members, dispatch } = useTeam()
  const [selectedMemberId, setSelectedMemberId] = useState(members[0]?.id ?? '')
  const [notice, setNotice] = useState('')

  const buyer = useMemo(
    () => members.find(member => member.id === selectedMemberId) ?? members[0],
    [members, selectedMemberId]
  )

  function handlePurchase(item) {
    if (!buyer) return
    if ((buyer.gold ?? 0) < item.cost) {
      setNotice(`${buyer.name}의 Gold가 부족합니다.`)
      return
    }
    dispatch({ type: 'PURCHASE_SHOP_ITEM', memberId: buyer.id, itemId: item.id })
    setNotice(`${item.name} 구매 완료`)
  }

  if (!buyer) {
    return (
      <section className="page-stack" aria-labelledby="shop-heading">
        <header className="page-header">
          <div>
            <p className="page-eyebrow">Guild Shop</p>
            <h1 className="page-title" id="shop-heading">상점</h1>
          </div>
        </header>
        <div className="panel">팀원을 먼저 추가해주세요.</div>
      </section>
    )
  }

  return (
    <section className="page-stack" aria-labelledby="shop-heading">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Guild Shop</p>
          <h1 className="page-title" id="shop-heading">상점</h1>
          <p className="page-subtitle">
            퀘스트로 모은 Gold를 반차, 월차, 집중 시간 같은 기업용 보상으로 교환합니다.
          </p>
        </div>
      </header>

      <section className="shop-wallet panel" aria-label="구매자 지갑">
        <ClassPortrait className={buyer.className} name={buyer.name} size="lg" />
        <div>
          <label htmlFor="shop-member">구매자</label>
          <select
            id="shop-member"
            value={buyer.id}
            onChange={(event) => {
              setSelectedMemberId(event.target.value)
              setNotice('')
            }}
          >
            {members.map(member => (
              <option key={member.id} value={member.id}>{member.name}</option>
            ))}
          </select>
        </div>
        <div>
          <span>Gold</span>
          <strong>{buyer.gold ?? 0}G</strong>
        </div>
        <div>
          <span>보유 휴가</span>
          <strong>{buyer.leaveBalance ?? 0}일</strong>
        </div>
      </section>

      {notice && <p className="shop-notice">{notice}</p>}

      <div className="shop-grid">
        {SHOP_ITEMS.map(item => {
          const affordable = (buyer.gold ?? 0) >= item.cost
          return (
            <article className="shop-item panel" key={item.id}>
              <div
                className="shop-item-image"
                aria-hidden="true"
                style={{
                  backgroundImage: `url(${shopItemSheet})`,
                  backgroundPosition: ITEM_POSITION[item.id] ?? '0% 0%',
                }}
              />
              <div>
                <h2>{item.name}</h2>
                <p>{item.desc}</p>
                <span>{item.unit}</span>
              </div>
              <button
                className={affordable ? 'primary-button' : 'utility-button'}
                disabled={!affordable}
                onClick={() => handlePurchase(item)}
              >
                {affordable ? `${item.cost}G 구매` : `Gold 부족 ${item.cost - (buyer.gold ?? 0)}G`}
              </button>
            </article>
          )
        })}
      </div>
    </section>
  )
}
