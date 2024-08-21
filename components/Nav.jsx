"use client";

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'


const Nav = () => {
    const { data: session } = useSession()

    const [providers, setProvider] = useState(null)
    const [toggleDropdown, setToggleDropdown] = useState(false)

    useEffect(() => {
        const getAllProviders = async () => {
            const response = await getProviders()
            setProvider(response)
        }
        getAllProviders()
    }, [])

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href='/' className='flex gap-2 flex-center'>
                <p className='logo_text'>ByteNotes</p>
            </Link>

            {/* Navigation */}
            <div className='sm:flex hidden gap-3'>
                {
                    session?.user ? (
                        <>
                            <div className='flex gap-3 md:gap-5'>
                                <Link href='/create-post' className='black_btn'>
                                    Create Post
                                </Link>
                            </div>

                            <button type='button' onClick={signOut} className='outline_btn'>
                                Sign Out
                            </button>

                            <Link href='/profile'>
                                <Image src={session?.user?.image} width={37} height={37} className='rounded-full' alt='profile'></Image>
                            </Link>
                        </>
                    ) : (
                        <>
                            {providers &&
                                Object.values(providers).map((provider) => (
                                    <button
                                        type='button'
                                        key={provider.name}
                                        onClick={() => { signIn(provider.id) }}
                                        className='black_btn'
                                    >
                                        Sign In
                                    </button>
                                )
                                )
                            }
                        </>
                    )
                }
            </div>

            {/* Navigation SM */}
            <div className='sm:hidden flex relative'>
                {
                    session?.user ? (
                        <>
                            <div className='flex'>
                                <Image
                                    src={session?.user?.image}
                                    width={37}
                                    height={37}
                                    className='rounded-full'
                                    alt='profile'
                                    onClick={() => setToggleDropdown(!toggleDropdown)}
                                />
                                {toggleDropdown && (
                                    <div className='dropdown'>
                                        <Link
                                            href='/profile'
                                            className='dropdown_link'
                                            onClick={() => setToggleDropdown(false)}
                                        >
                                            My Profile
                                        </Link>
                                        <Link
                                            href='/create-post'
                                            className='dropdown_link'
                                            onClick={() => setToggleDropdown(false)}
                                        >
                                            Create Post
                                        </Link>
                                        <button
                                            type='button'
                                            onClick={() => {
                                                setToggleDropdown(false);
                                                signOut();
                                            }}
                                            className='mt-5 w-full black_btn'
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            {providers &&
                                Object.values(providers).map((provider) => (
                                    <button
                                        type='button'
                                        key={provider.name}
                                        onClick={() => { signIn(provider.id) }}
                                        className='black_btn'
                                    >
                                        Sign In
                                    </button>
                                )
                                )
                            }
                        </>
                    )
                }
            </div>

        </nav>
    )
}

export default Nav
