import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, signOut } = useAuth();

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <p>{user.email}</p>
      <button onClick={signOut}>Logout</button>
    </div>
  );
}
