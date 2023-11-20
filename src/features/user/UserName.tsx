import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
export default function UserName() {
  const username = useSelector((state: RootState) => state.user.username);

  if (!username) return null;
  return <p className="hidden text-sm font-semibold md:block">{username}</p>;
}
