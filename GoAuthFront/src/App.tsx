function App() {
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
              placeholder="name"
            />
          </div>
          <div className="flex flex-col px-4 gap-2">
            <p className="text-go-500 font-bold pl-2">Username</p>
            <input
              className="w-full py-2 pl-2 rounded-xl border-border border text-go-500 outline-none"
              placeholder="username"
            />
          </div>
          <div className="flex flex-col px-4 gap-2">
            <p className="text-go-500 font-bold pl-2">Password</p>
            <input
              className="w-full py-2 pl-2 rounded-xl border-border border text-go-500 outline-none"
              placeholder="••••••••"
              type="password"
            />
          </div>
          <button className="p-3 rounded-xl bg-go-600 hover:bg-go-700 mx-4 text-background font-bold text-xl">
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
