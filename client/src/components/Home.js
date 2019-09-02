import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home">
        {/* <Link className="btn" to={'/countries'}>See list of countries</Link> */}
        <Link className="btn" to={'/join-globalChat'}>Join Chat</Link>     
    </div>
  )
}
