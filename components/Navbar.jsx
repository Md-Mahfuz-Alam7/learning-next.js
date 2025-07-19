import React from 'react'
import Link from 'next/link'

function Navbar() {
    return (
        <div className='grid grid-cols-2'>

            <div>
                Logo
            </div>

            <div>
                <ul className='flex gap-4'>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/about/team">Team</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </div>

        </div>
    )
}

export default Navbar
