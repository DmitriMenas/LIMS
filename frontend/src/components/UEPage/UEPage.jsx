import './UEPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchUsers } from '../../store/users'
import { NavLink } from 'react-router-dom'

export default function UEPage() {
    const users = useSelector(state => state?.users?.users || [])
    const currentUser = useSelector(state => state?.session?.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    const clients = users.filter(user => user.role === 'client')
    const employees = users.filter(user => user.role === 'employee' || user.role === 'admin')

    return (
        <div>
            <div>
                <h1>Clients:</h1>
                {clients.map(user => (
                    <div key={user.id}>
                        <p>User ID: {user.id}</p>
                        <p>Username: {user.username}</p>
                        <p>Account Holder&apos;s Name: {user.firstName} {user.lastName}</p>
                    </div>
                ))}
            </div>

            <div>
                <h1>Employees:</h1>
                {employees.map(user => (
                    <div key={user.id}>
                        <p>User ID: {user.id}</p>
                        <p>Username: {user.username}</p>
                        <p>Account Holder&apos;s Name: {user.firstName} {user.lastName}</p>
                        <p>Employee&apos;s Role: {user.role}</p>
                    </div>
                ))}
            </div>
            <div>
                {currentUser?.role === 'admin' && (
                        <NavLink to="/signup">Create a new User</NavLink>
                    )}
            </div>
        </div>
    )
}
