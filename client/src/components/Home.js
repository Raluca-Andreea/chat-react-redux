import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div> 
    <div className="home">
        {/* <Link className="btn" to={'/join-privateChat'}>Join Private Chat</Link> */}
        <Link className="btn" to={'/join-globalChat'}>Join Global Chat</Link>     
    </div>
    </div>
  )
}
