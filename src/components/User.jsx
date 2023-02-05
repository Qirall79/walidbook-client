const User = ({ user, setUser }) => {
  return (
    <div>
      {user ? <h1>User exists</h1> : <h1>User does not exist, must login.</h1>}
    </div>
  );
};

export default User;
