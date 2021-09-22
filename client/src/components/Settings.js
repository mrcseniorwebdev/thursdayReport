import React, { useState, useEffect } from "react";
import { NewAdSvg, Trash21Svg } from "./svg"

import { getUsers, postUsers, deleteUsers } from '../utils/requests'

const SingleUser = ({ user, userSync, incSync }) => {

    const removeUser = async e => {
        let confirm = window.confirm(`Are you sure you want to delete:\n\n${user.email}`)
        if (confirm) {
            const res = await deleteUsers(user.uid)
            if (res.status !== 204) {
                alert('some sort of delete error, email tech')
                return
            }
            incSync(userSync + 1)
        }
    }
    return (
        <div className="users--grid--user">
            <p>{user.email}</p>
            <button onClick={removeUser}><Trash21Svg /></button>
        </div>
    )
}

const Users = () => {
    const [newUser, setNewUser] = useState('')
    const [allUsers, setAllUsers] = useState([])
    const [userSync, incSync] = useState(0)
    const addNewUser = async (e) => {
        e.preventDefault()
        console.log('new user :)')
        const mrcEmail = newUser.search(/@mrc\.org$/)
        console.log(mrcEmail)
        if (mrcEmail === -1) {
            alert('Email must be an mrc.org email!')
            return
        }

        const resp = await postUsers({ email: newUser })
        if (resp.status !== 201) {
            alert(
                `Error saving ${newUser}.\nPlease refresh and try again, then email tech`
            )
            return
        }
        alert(
            `${newUser} saved!`
        )
        setNewUser('')
        incSync(userSync + 1)
    }

    useEffect(() => {
        const getData = async () => {
            const resp = await getUsers()
            if (!resp) {
                return
            }
            console.log(`useEffect get users`)
            const users = resp.data
            console.log(users)
            setAllUsers(users)
        }
        getData()
    }, [setAllUsers, userSync])

    return (
        <div className="users">
            <h1>Allowed Users</h1>
            <p>Enter the mrc.org emails for users who can access this app:</p>
            <div className="users--grid">
                {
                    allUsers.map(u => {
                        return (
                            <SingleUser key={u.uid} user={u} userSync={userSync} incSync={incSync} />
                        )
                    })
                }
            </div>
            <div className="users--newuser">
                <input value={newUser} onChange={e => setNewUser(e.currentTarget.value)} />
                <button onClick={addNewUser} className=""><NewAdSvg /><span>Grant Access</span></button>
            </div>
        </div>
    )
}

const Settings = () => {
    return (
        <div className="settings--wrapper">
            <div className="settings">
                <Users />
            </div>
        </div>
    )
}

export default Settings