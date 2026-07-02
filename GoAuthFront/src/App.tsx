import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  const [signUp, setSignUp] = useState(true);
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-foreground gap-4">
      <div className="flex w-1/3 gap-4">
        <button
          className="w-full p-3 rounded-xl bg-go-600 hover:bg-go-700 text-background font-bold text-xl"
          onClick={() => setSignUp(true)}
        >
          SIGN UP
        </button>
        <button
          className="w-full p-3 rounded-xl bg-go-600 hover:bg-go-700 text-background font-bold text-xl"
          onClick={() => setSignUp(false)}
        >
          LOGIN
        </button>
      </div>
      {signUp ? <Signup /> : <Login />}
    </div>
  );
}

export default App;
