import React from 'react'

export const Navbar = () => {
    return (
        <div>
            <nav className="navbar">
                <h1>The Dojo Blog</h1>
                <div className="links">
                    <a href="/">Home</a>
                    <a href="/create">New Blog</a>
                </div>
            </nav>
        </div>
    )
}
