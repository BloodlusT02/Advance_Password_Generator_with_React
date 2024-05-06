import React, { useCallback, useEffect, useRef, useState } from "react";
import '../App.css'

const Main = () => {

    const [length, setLenght] = useState(8)
    const [numberAllowed, setNumberAllowed] = useState(false)
    const [charAllowed, setCharAllowed] = useState(false)
    const [password, setPassword] = useState("")

    const passwordGenerator = useCallback(() => {

        let pass = "";
        let str = "ABCDEFGHIJKLMONPQRSTUVWXYZabcdefghijklmonpqrstuvwxyz";

        if(numberAllowed) str += "0123456789";
        if(charAllowed) str += "@#$&*!+=-";

        for(let i = 1; i <= length; i++){
            let char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char);
        }
        setPassword(pass);

    }, [length, numberAllowed, charAllowed, setPassword])

    const copyPassword = useCallback(() => {
        passwordRef.current?.select();
        passwordRef.current?.setSelectionRange(0, 100)
        window.navigator.clipboard.writeText(password);
    }, [password])

    const passwordRef = useRef();

    useEffect(() => {
        passwordGenerator();
    }, [length, numberAllowed, charAllowed, passwordGenerator])




  return (
    <>
        <div className="bg-[#352F44] h-screen flex items-center justify-center font-poppins">
            <div className="bg-[#DBD8E3] p-4 w-1/2 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center">Password Generator</h1>
                <div className="flex justify-center mt-6">
                    <input ref={passwordRef} value={password} readOnly type="text" className="py-1 pl-3 w-96 outline-none rounded-l-md" placeholder="password" />
                    <button onClick={copyPassword} className="bg-[#352F44] text-white px-4 py-1 rounded-r-md hover:bg-[#6548ad]">Copy</button>
                </div>

                <div className="mt-8 flex items-center justify-around px-20">
                    <div className="flex items-center gap-2">
                        <input value={length} onChange={(e) => {setLenght(e.target.value)}} type="range" className="cursor-pointer" min={8} max={100} />
                        <label>Length({length})</label>
                    </div>
                    <div className="flex items-center gap-1">
                        <input type="checkbox" onChange={() => {
                            setNumberAllowed((prevNumber) => !prevNumber);
                        }} defaultChecked={numberAllowed} className="" />
                        <label>Numbers</label>
                    </div>
                    <div className="flex items-center gap-1">
                        <input type="checkbox" onChange={() => {
                            setCharAllowed((prevChar) => !prevChar);
                        }} defaultChecked={charAllowed} />
                        <label>Characters</label>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default Main;
