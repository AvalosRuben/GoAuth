import { useState } from "react";

function App() {
  const [name, setName] = useState("name");
  const [username, setUsername] = useState("username");
  const [password, setPassword] = useState("••••••••");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: name,
          UserName: username,
          HashedPassowrd: password,
        }),
      });
      if (!response.ok) {
        throw new Error("Error on fetch");
      }
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-foreground">
      <div className="rounded-xl flex flex-col w-1/3 bg-foreground border border-border">
        <div className="border-b border-border p-4 flex items-center justify-center">
          <h2 className="text-go-600 font-bold text-4xl">SIGN UP</h2>
        </div>
        <div className="flex flex-col my-4 gap-4 ">
          <div className="flex flex-col px-4 gap-2 ">
            <p className="text-go-500 font-bold pl-2">Name</p>
            <input
              className="w-full py-2 pl-2 rounded-xl border-border border text-go-500 outline-none"
              placeholder={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </div>
          <div className="flex flex-col px-4 gap-2">
            <p className="text-go-500 font-bold pl-2">Username</p>
            <input
              className="w-full py-2 pl-2 rounded-xl border-border border text-go-500 outline-none"
              placeholder={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
          </div>
          <div className="flex flex-col px-4 gap-2">
            <p className="text-go-500 font-bold pl-2">Password</p>{" "}
            <input
              className="w-full py-2 pl-2 rounded-xl border-border border text-go-500 outline-none"
              placeholder={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              type="password"
            />
          </div>
          <button
            className="p-3 rounded-xl bg-go-600 hover:bg-go-700 mx-4 text-background font-bold text-xl"
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "SIGN UP"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
