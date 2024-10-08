'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'

const PostCard = ({
    post,
    handleTagClick,
    handleEdit,
    handleDelete
}) => {
    const { data: session } = useSession()
    const router = useRouter()
    const pathName = usePathname()

    function formatEmail(email) {
        const [user, domain] = email.split('@');
        return `${user.slice(0, user.length / 2)}...@${domain}`;
    }

    return (
        <div className='prompt_card'>
            <div className='flex justify-between items-start gap-5'>
                <div
                    className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
                // onClick={handleProfileClick}
                >
                    <Image
                        src={post.creator.image}
                        alt='user_image'
                        width={40}
                        height={40}
                        className='rounded-full object-contain'
                    />

                    <div className='flex flex-col'>
                        <h3 className='font-satoshi font-semibold text-gray-900'>
                            {post.creator.username}
                        </h3>
                        <p className='font-inter text-sm text-gray-500'>
                            {formatEmail(post.creator.email)}
                        </p>
                    </div>
                </div>
            </div>

            <p className='my-4 font-satoshi text-sm text-gray-700 w-fit' style={{ textWrap: 'wrap' }}>{post.post}</p>
            <p
                className='font-inter text-sm blue_gradient cursor-pointer'
                onClick={() => handleTagClick && handleTagClick(post.tag)}
            >
                #{post.tag}
            </p>

            {session?.user.id === post.creator._id && pathName === "/profile" && (
                <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
                    <p
                        className='font-inter text-sm green_gradient cursor-pointer'
                        onClick={handleEdit}
                    >
                        Edit
                    </p>
                    <p
                        className='font-inter text-sm orange_gradient cursor-pointer'
                        onClick={handleDelete}
                    >
                        Delete
                    </p>
                </div>
            )}
        </div>
    )
}

export default PostCard