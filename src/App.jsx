import { useCallback, useEffect, useRef, useState } from "react";
import "./app.css";
function App() {
  const [range, setRange] = useState(8);
  const [isNumber, setIsNumber] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const [password, setPassword] = useState("");

  const inputRef = useRef(null);

  const handleRange = (e) => {
    let currVal = e.target.value;
    setRange(currVal);
  };

  const passGenerator = useCallback(() => {
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let pass = "";

    if (isNumber) str += "0123456789";
    if (isChar) str += "!@#$%^&*";

    for (let i = 1; i <= range; i++) {
      let val = Math.floor(Math.random() * (str.length + 1));
      pass += str.charAt(val);
    }

    setPassword(pass);
  }, [isChar, isNumber, range]);

  const copyToClipboard = () => {
    inputRef.current.select();
    window.navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    passGenerator();
  }, [isChar, isNumber, range, passGenerator]);
  return (
    <div className="main-container">
      <div className="content1">
        <div className="input-container">
          <input type="text" defaultValue={password} ref={inputRef} readOnly />
          <button className="copy-btn" onClick={copyToClipboard}>
            Copy
          </button>
        </div>
        <div className="content2">
          <div className="slider-container">
            <input
              type="range"
              min="8"
              max="14"
              onChange={(e) => handleRange(e)}
            />
            <p>Length({range})</p>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              value={isNumber}
              onChange={() => {
                setIsNumber(!isNumber);
              }}
            />
            <p>Numbers</p>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              value={isChar}
              onChange={() => {
                setIsChar(!isChar);
              }}
            />
            <p>Characters</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
