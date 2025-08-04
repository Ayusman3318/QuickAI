import React from 'react'
import { useClerk, useUser } from '@clerk/clerk-react'
import { HouseIcon, SquarePen, Hash, Image, Eraser, Scissors, FileText, Users, LogOut } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
    { to: '/ai', label: 'Dashboard', Icon: HouseIcon },
    { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
    { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
    { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
    { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
    { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
    { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
    { to: '/ai/community', label: 'Community', Icon: Users},
]

const SideBar = ({ sidebar, setSidebar }) => {
    const { user } = useUser()
    const { signOut, openUserprofile } = useClerk()

    return (
        <div className={`w-60 bg-white border-r border-gray-100 flex flex-col max-sm:absolute top-14 bottom-0 ${
            sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'
        } transition-all duration-300 ease-in-out`}>

            {/* Top - Profile */}
            <div className="my-7 w-full text-center">
                <img src={user.imageUrl} alt="User avatar" className="w-13 rounded-full mx-auto" />
                <h1 className="mt-1">{user.fullName}</h1>
            </div>

            {/* Middle - Nav Items */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-0 w-full px-3">
                {
                    navItems.map(({to,label,Icon})=>(
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/ai'}
                            onClick={() => setSidebar(false)}
                            className={({isActive}) =>
                                `px-4 py-2 flex w-full items-center gap-2 rounded-lg transition-all duration-200
                                ${isActive ? 'bg-gradient-to-r from-[#5e90d2] to-blue-800 text-white shadow-lg' 
                                    : 'hover:bg-gray-100'}`
                            }
                        >
                            {({isActive}) => (
                                <>
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-700'}`} />
                                    <span className="font-medium">{label}</span>
                                </>
                            )}
                        </NavLink>
                    ))
                }
            </div>
            <div className='w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between'>
                <div onClick={openUserprofile} className='flex gap-2 items-center hover:scale-3d'>
                    <img src={user.imageUrl} className='w-8 rounded-full' alt="" />
                    <h1 className='font-medium text-sm'>{user.fullName}</h1>
                </div>
                <LogOut onClick={signOut} className='w-4.5 text-black hover:text-gray-700 
                transition hover:shadow-2xl hover:bg-gray-300'/>
            </div>
        </div>
    )
}

export default SideBar
