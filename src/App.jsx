import { useState, useCallback, useEffect , useRef} from "react"


function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, ] = useState(false);
  const [password, setPassword] = useState("");
  
  const passwordGen = useCallback(() => {
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(numAllow) str += "0123456789"
      if(charAllow) str += "!@#$%*+-_"



      for(let i=1; i< length; i++){
        let char = Math.floor(Math.random() * str.length)
        pass += str.charAt(char)      
      }

      setPassword(pass)


  }, [length, numAllow, charAllow, setPassword])


  const copytoclipboard = useCallback( () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password); 
  }, [password])


  const passwordRef = useRef(null);

  useEffect(() => {
    passwordGen()
  }, [length, numAllow, charAllow, passwordGen])
  return (
   <div className="min-h-screen w-full bg-black flex items-center justify-center relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, index) => (
          <div
            key={index}
            className="absolute text-blue-400/40 text-2xl font-bold animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              textShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
            }}
          >
            {String.fromCharCode(
              Math.random() < 0.3
                ? 48 + Math.floor(Math.random() * 10) // Numbers
                : Math.random() < 0.6
                ? 65 + Math.floor(Math.random() * 26) // Uppercase letters
                : 97 + Math.floor(Math.random() * 26) // Lowercase letters
            )}
          </div>
        ))}
      </div>

      <div className="w-full max-w-md mx-auto shadow-2xl rounded-xl px-6 py-8 my-12 bg-gradient-to-br from-gray-800/90 to-gray-900/90 text-center relative z-10 backdrop-blur-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6 tracking-wide">Password Generator</h1>
        <div className="flex shadow-lg rounded-lg overflow-hidden mb-6 bg-white/10 backdrop-blur-sm">
          <input 
          type="text" 
          value={password}
          className="outline-none w-full py-3 px-4 bg-transparent text-white placeholder-gray-400"
          placeholder="Password"
          readOnly 
          ref={passwordRef}
          />

          <button 
          className="outline-none bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 shrink-0 transition-all duration-200 font-medium"
          onClick={copytoclipboard}
          >Copy</button>
        </div>
        <div className="flex flex-col gap-y-4 text-sm">
          <div className="flex items-center gap-x-2">
            <input 
            type="range" 
            min={8}
            max={100}
            value={length}
            className="cursor-pointer w-full accent-blue-500"
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label className="text-blue-400 font-medium min-w-[100px]">Length: {length}</label>
          </div>
          <div className="flex items-center justify-center gap-x-6">
            <div className="flex items-center gap-x-2">
              <input 
              type="checkbox"
              defaultChecked={numAllow}
              id="numberInput"
              className="w-4 h-4 accent-blue-500"
              onChange={() => {
                setNumAllow((prev) => !prev);
              }} 
              />
              <label htmlFor="numberInput" className="text-blue-400 font-medium">Numbers</label>
            </div>
            <div className="flex items-center gap-x-2">
              <input 
              type="checkbox"
              defaultChecked={charAllow}
              id="charInput"
              className="w-4 h-4 accent-blue-500"
              onChange={() => {
                setNumAllow((prev) => !prev);
              }} 
              />
              <label htmlFor="charInput" className="text-blue-400 font-medium">Characters</label>
            </div>
          </div>
        </div>
      </div>
   </div>
  )
}

export default App

// Add this at the end of your file, before the export
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 0.7;
    }
    90% {
      opacity: 0.7;
    }
    100% {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }
  .animate-float {
    animation: float linear infinite;
  }
`;
document.head.appendChild(style);
