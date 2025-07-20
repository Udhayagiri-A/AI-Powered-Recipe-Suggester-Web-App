import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './Auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Profile() {
  const datas = useContext(AuthContext)
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [pass, setPass] = useState('')

  useEffect(() => {
    if (!datas.user) {
      navigate('/login')
    }
  }, [datas.user, navigate])

  const handleDelete = (e) => {
    e.preventDefault()
    if (pass === datas.user.password) {
      axios.delete(`http://localhost:3000/users/${datas.user.id}`)
        .then(() => {
          alert("Account Deleted successfully")
          datas.logout()
          navigate('/login')
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      alert("Incorrect password")
    }
  }

  return (
    <div className="profile-container">
      {datas.user && (
        <>
          <h1 className="welcome-text">Welcome, {datas.user.name}</h1>
          <button className="delete-btn" onClick={() => setShowModal(true)}>Delete Account</button>

          {showModal && (
              <div >
                <h3>Confirm Account Deletion</h3>
                <form className='' onSubmit={handleDelete}>
                  <label>Enter your password:</label>
                  <input type="password" className="password-input" value={pass} onChange={(e) => setPass(e.target.value)} required/>
                  <div className="btn-group">
                    <button type="submit" className="confirm-btn">Delete</button>
                    <button type="button" className="cancel-btn" onClick={() => {setPass('');setShowModal(false)}}>Cancel</button>
                  </div>
                </form>
              </div>
          )}
        </>
      )}
    </div>
  )
}
