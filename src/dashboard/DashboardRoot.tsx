import { Link, Outlet } from 'react-router-dom'
import { userAvatar } from './api'
import { Ico } from './Icons'
import { useSession } from './session'
import './dashboard.css'

/** Wraps every /nook/dashboard page: a slim header with the logged-in user. */
export function DashboardRoot() {
  const { state, logout } = useSession()
  return (
    <div className="dz">
      <div className="container dz-bar">
        <Link to="/nook/dashboard" className="dz-brand">
          <span className="dz-brand__mark" aria-hidden="true" />
          <span>Nook <small>dashboard</small></span>
        </Link>
        {state.status === 'in' && (
          <div className="dz-user">
            {userAvatar(state.me.user.id, state.me.user.avatar) && <img src={userAvatar(state.me.user.id, state.me.user.avatar)!} alt="" width="28" height="28" />}
            <span>{state.me.user.globalName || state.me.user.username}</span>
            <button type="button" className="btn btn-ghost btn-sm dz-btn-ico" onClick={logout}><Ico name="logout" size={15} />Log out</button>
          </div>
        )}
      </div>
      <Outlet />
    </div>
  )
}
