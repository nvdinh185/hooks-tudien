import { useState } from "react";

const initialData = [
  {
    id: 1,
    eng: 'hello',
    vie: 'xin chao'
  },
  {
    id: 2,
    eng: 'hi',
    vie: 'chao'
  },
  {
    id: 3,
    eng: 'table',
    vie: 'cai ban'
  }
]

export default function App() {
  const [listWords, setListWords] = useState(initialData);
  const [eng, setEng] = useState('');
  const [vie, setVie] = useState('');

  const [errorEng, setErrorEng] = useState('');
  const [errorVie, setErrorVie] = useState('');
  const [error, setError] = useState('');

  const handleBlur = (e) => {
    if (e.target.name === 'eng') {
      if (!e.target.value) {
        setErrorEng('Vui lòng nhập tu tieng Anh');
      }
    } else if (e.target.name === 'vie') {
      if (!e.target.value) {
        setErrorVie('Vui lòng nhập nghia tieng Viet');
      }
    }
  }

  const handleInput = (e) => {
    if (e.target.name === 'eng') {
      setErrorEng('');
    } else if (e.target.name === 'vie') {
      setErrorVie('');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let check = true;
    if (!eng) {
      setErrorEng('Vui lòng nhập tu tieng Anh');
      check = false;
    }

    let idx = listWords.findIndex(word => word.eng === eng);

    if (idx >= 0) {
      setError('Tu nay da ton tai trong tu dien');
      check = false;
    }

    if (!vie) {
      setErrorVie('Vui lòng nhập nghia tieng Viet');
      check = false;
    }

    function generateUuid() {
      return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 || 0x8);
        return v.toString(16);
      });
    }

    if (check) {
      let inputValue = {
        id: generateUuid(),
        eng,
        vie
      }
      let newList = [
        ...listWords,
        inputValue
      ]
      setListWords(newList);
      setEng('');
      setVie('');
    }
  }

  const translate = () => {
    let word = listWords.find(word => word.eng === eng);
    if (word) {
      setVie(word.vie);
    } else {
      setError('Khong tim thay trong tu dien');
    }
  }

  return (
    <>
      <p style={{
        color: 'red',
        fontStyle: 'italic'
      }}>{error}</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>English</label>
          <input type="text" name="eng" value={eng}
            onBlur={(e) => handleBlur(e)}
            onInput={(e) => handleInput(e)}
            className={errorEng && 'invalid'}
            onChange={(e) => { setEng(e.target.value) }}
          />
          <span style={{
            color: 'red',
            fontStyle: 'italic'
          }}>{errorEng}</span>
        </div>
        <br />
        <div>
          <label>Vietnamese</label>
          <input type="text" name="vie" value={vie}
            onBlur={(e) => handleBlur(e)}
            onInput={(e) => handleInput(e)}
            className={errorVie && 'invalid'}
            onChange={(e) => { setVie(e.target.value) }}
          />
          <span style={{
            color: 'red',
            fontStyle: 'italic'
          }}>{errorVie}</span>
        </div>
        <div>
          <button>Them</button>
        </div>
      </form>

      <button onClick={() => translate()}>Dich tu</button>
      <h1>TU DIEN ANH - VIET</h1>
      <ul>
        {listWords.map(word =>
          <li key={word.id}>
            <h2>English: {word.eng}</h2>
            <p>Viet: {word.vie}</p>
          </li>
        )}
      </ul>
    </>
  )
}
