![waving](https://capsule-render.vercel.app/api?type=waving&height=200&fontAlignY=40&text=moye&color=gradient)


## 🧚‍♂️ 개발 기간 및 인원

- 개발 기간 : 2024/10/07 ~ 2024/10/21
- 개발 인원 : 프론트엔드 3명(김지연, 배익현, 이민호) / 백엔드 1명(한바울)

## 🪴 서비스 소개
- 서비스명 : Moye( 모두의 예약 )
  - 가게의 입장에서, 손님들의 예약을 한눈에 파악하고 관리하는 것을 돕습니다.

## ✨ 구현 기능
### 📊 Today's reservation
1. **Timeline**
  - 타임라인 구현하기
    - grid 영역 잡기
      - `grid`와 `map`을 활용하여 타임라인 틀 구현
      - 렌더링은 30분 단위로 되지만, 가독성을 위해 30분 단위에는 시간을 따로 보여주지 않는다.
    - 시간: 영업시간 open/close data를 통해 각 시간을 요소로 하는 배열 생성하여 `map`
      - grid 칸은 시간은 라인에 위치하므로 1개의 요소를 제거해야 해서, `slice`로 요소 하나를 제거하고 구현
      - `{operating.slice(0, operatingNum).map((hr, idx) => { return <S.Cell key={idx}></S.Cell>; })}`
    - grid columns: open/close data를 활용한 배열의 길이 -1 값을 props로 전달하여 구현
      - `grid-template-columns: repeat(${(props) => props.operatingNum}, 1fr);`
      - 라인은 정해진 영역 항상 렌더링될 수 있도록 따로 구현 후 absolute로 해당 영역을 하나로 한번 더 잡아준다.
    - 그리드 구현 시 영역을 잡기 위해 눈에 보이지 않는 2개의 div가 추가로 필요
      - div1: 그리드 영역 column 라인 그리기
      - div2: 그리드 영역 정하기
      - div3: item이 각각의 행에 렌더링 되도록 전체 행을 잡아줌
      - div4: item !
    - input으로 사람 검색하기
      - [`"NFD"`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize#nfd): 자음과 모음의 조합으로 다양한 입력을 수용, 더 유연한 검색이 가능
      - 예) 사용자가 ‘김’을 검색할 경우 ‘ㄱ’ + ‘ㅣ’ + ‘ㅁ’ 로 검색이 가능하다.
        ```javascript
        const filteredItems: Items[] = items.filter((item) => {
          const nomalizedInput = inputValue.normalize('NFD').toLowerCase();
          const nomalizedName = item.name.normalize('NFD').toLowerCase();
          const nomalizedPhone = item.phone.normalize('NFD').toLowerCase();

          return (
            nomalizedName.includes(nomalizedInput) ||
            nomalizedPhone.includes(nomalizedInput)
          );
        });
        ```

2. **Kanvan board**
  - data로 받은 `status`, `startTime`을 현재 시간과 비교하여 '확정', '대기', '완료' 로 구분하여 배열을 생성
      ```javascript
      if (item.status === 'ACCEPT' && start() <= now()) {
          newFiltered.completed.push(item);
        } else if (item.status === 'ACCEPT') {
          newFiltered.accept.push(item);
        } else if (item.status === 'PENDING') {
          newFiltered.pending.push(item);
        }
      ```
  - data의 status와 위에서 계산된 filtered를 props로 내려주어 올바른 상태를 가지도록 한다.
  - status가 pending일 경우,
    - 수락과 거절을 위한 버튼을 조건부 렌더링하고 각 버튼은 `post`통신을 일으킨다.
    - 현재 시간과 예약의 시작 시간을 비교하여, 이미 시간이 지난 예약의 경우 자동으로 취소를 위한 통신을 진행한다.
  - 새로고침 버튼: `post` 통신 후 재렌더링을 위한 버튼이다.

---
### 📧 이메일 보내기
  - Kanvan board에서 '대기중'인 예약을 '수락'하거나 '거절'하는 통신을 했을 때, 등록된 고객의 이메일에 메일이 발송된다.
  - 미리 작성된 html 코드와 필요한 정보를 post를 위한 request 에 담아 보낸다.

---
### 🗓️ Monthly reservation
1. **달력**
  - [react-calendar](https://projects.wojtekmaj.pl/react-calendar/) 라이브러리 사용
  - data 구조가 { ACCEPT: n, PENDING: n, CANCEL: n } 으로 객체 형태
    ```javascript
    // count에 data로 받은 각 status의 value를 넘겨준다.
    const renderItem = (count: number, Icon: React.FC) =>
      count > 0 && (
        <S.Item>
          <Icon />
          <div>
            {count}
            <S.LilText>건</S.LilText>
          </div>
        </S.Item>
      );
    ```
  - dropdown의 상태에 따라 renderItem을 조건부 렌더링
    ```javascript
    <S.ItemBox>
      {renderItem(ACCEPT, S.AcceptIcon)}
      {renderItem(PENDING, S.PendingIcon)}
      {renderItem(CANCEL, S.CancelIcon)}
    </S.ItemBox>
    ```
  - 총 예약 확정 개수: 처음 렌더링 시 useEffect를 활용하여 ACCEPT의 개수를 계산해서 보여준다.
   
2. **검색 모달**
  - input 값을 직접 query로 전달하여 백엔드와의 통신을 통해 구현했다.
  ```javascript
  try {
      const res = await axios.get(
        `${APIS.store}/${storeId}/reservations?search=${inputValue}`,
      );
      if (inputValue) {
        setSearched(res.data.body);
      }
    } catch (err) {
      console.error('❌ searchByPhone: ', err);
    }
  };
  ```

---
### 🗳️ 공용 컴포넌트
1. Confirm button
  - 버튼은 공용 컴포넌트로 제작하여 모든 페이지에서 활용할 수 있도록 했고, 크기나 색상 등은 페이지에 맞게 활용할 수 있도록 `width`, `height`, `action`을 props로 받는다.
  - props로 받은 action이 'confirm' 인지, 'cancle'인지에 따라 색상이 바뀐다.
  - 크기는 기본값이 있고, 다른 크기를 원할 경우 props로 내려줄 수 있다.
     
2. User input
  - Confirm button과 동일하게 width, height를 기본값을 가지나 props 받을 경우 크기가 변경
  - border의 경우 props를 줄 경우 색상이 지정되고 없을 경우 border가 없다.
  - useInputValue hook
    - input 값을 저장하는 기능은 input 컴포넌트 onChange에 hook으로 달아주어서 모든 페이지에서 따로 처리없이 사용 가능하다.

---
### 🟩 모달
    - 모달의 상태를 redux를 통해 전역에서 관리한다.
    - modalType의 기본값을 ''로 선언하고, 필요시 modalType을 전달하여 사용한다.
      ```
      // src/components/modal/Modal.tsx
      reducers: {
        openModal(state, action: PayloadAction<string>) {
        state.modalType = action.payload;
        },
        closeModal(state) {
        state.modalType = '';
        },
      },
      ```
      ```
      // src/store/slices/modal/modalSlice.ts
      switch (modalType) {
      case 'confirm':
        return <ConfirmModal onClose={handleModalCloseButtonClick} />;
        // ...code
      ```

## 📚 기술 스택
|TypeScript|React|Styled-Components|
|:---:|:---:|:---:|
| <img src="https://techstack-generator.vercel.app/ts-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/react-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://www.styled-components.com/atom.png" width="65" height="65" /> |
