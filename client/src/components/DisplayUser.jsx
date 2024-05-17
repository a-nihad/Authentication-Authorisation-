function DisplayUser({ users }) {
  return (
    <div className="bg-slate-200 p-8 space-y-1">
      <header className="grid grid-cols-[.3fr_1.3fr_1.3fr_.8fr] bg-blue-400 px-5 py-2 rounded-lg ">
        <h1> No </h1>
        <h1> Name </h1>
        <h1> Email </h1>
        <h1> Role </h1>
      </header>

      {users?.map((user, index) => (
        <div
          key={index}
          className="grid grid-cols-[.3fr_1.3fr_1.3fr_.8fr] px-5 py-2 rounded-lg bg-white"
        >
          <h1> {index + 1} </h1>
          <h1 className="capitalize"> {user.fullName} </h1>
          <h1> {user.email} </h1>
          <h1> {user.role} </h1>
        </div>
      ))}
    </div>
  );
}

export default DisplayUser;
