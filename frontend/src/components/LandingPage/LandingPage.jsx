import { useSelector } from "react-redux";
import LPE from './LPE/LPE'
import LPC from './LPC/LPC'
import LPNC from './LPNC/LPNC'
import "./LandingPage.css";

export default function LandingPage() {
  const user = useSelector(state => state.session.user);
  // console.log(user)
  return (
    <div className="lpmain">
      {user ? (
        user.role === 'employee' || user.role === 'admin' ? (
          <LPE user={user}/>
        ) : (
          <LPC user={user}/>
        )
      ) : (
        <LPNC />
      )}
    </div>
  );
}
