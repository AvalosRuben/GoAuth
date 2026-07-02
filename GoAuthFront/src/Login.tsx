import { useState } from "react";
function Login() {
  const [username, setUsername] = useState("username");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isAuthenticated, setIsAuthenticaded] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setIsError(false);
    setIsAuthenticaded(false);

    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Error on fetch");
      }
      setIsAuthenticaded(true);
      console.log(data);
    } catch (err) {
      setIsError(true);
      if (err instanceof Error) {
        console.log("Error: ", err.message);
      } else {
        console.log("An unexpected error occurred:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGetMe = async () => {
    setLoading(true);
    setIsError(false);

    try {
      const response = await fetch("http://localhost:8080/users/me", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Error on Get Me");
      }

      console.log(data);
    } catch (err) {
      setIsError(true);
      if (err instanceof Error) {
        console.log("Error: ", err.message);
      } else {
        console.log("Error: ", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl flex flex-col w-1/3 bg-foreground border border-border">
      <div className="border-b border-border p-4 flex items-center justify-center">
        <h2 className="text-go-600 font-bold text-4xl">SIGN UP</h2>
      </div>
      <div className="flex flex-col my-4 gap-4 ">
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
        {isAuthenticated && (
          <div className="p-3 rounded-xl bg-background text-go-800 font-bold mx-4 flex items-center justify-center">
            User Authenticated!!
          </div>
        )}
        <button
          className="p-3 rounded-xl bg-go-600 hover:bg-go-700 mx-4 text-background font-bold text-xl"
          onClick={handleSubmit}
        >
          {loading ? "Loading..." : "LOG IN"}
        </button>
        <button
          className="p-3 rounded-xl bg-go-600 hover:bg-go-700 mx-4 text-background font-bold text-xl"
          onClick={handleGetMe}
        >
          {loading ? "Loading..." : "GET USER"}
        </button>
        {isError && (
          <div className="p-3 rounded-xl bg-background text-go-800 font-bold mx-4 flex items-center justify-center">
            Error on authorization
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
