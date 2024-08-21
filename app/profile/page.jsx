'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Profile from '@components/Profile'
import { useRouter } from 'next/navigation'

const MyProfile = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const [posts, setPosts] = useState([])

    const getPosts = async () => {
        const res = await fetch(`/api/profile/${session?.user?.id}`)
        const data = await res.json()
        setPosts(data)
    }

    useEffect(() => {
        if (session?.user?.id)
            getPosts()
    }, [])

    const handleEdit = (post) => {
        router.push(`/update-post?postid=${post?._id}`);
    };

    const handleDelete = async (post) => {
        const hasConfirmed = confirm(
            "Are you sure you want to delete this post?"
        );

        if (hasConfirmed) {
            try {
                await fetch(`/api/post/${post?._id.toString()}`, {
                    method: "DELETE",
                });

                const filteredPosts = posts.filter((item) => item._id !== post._id);

                setPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <Profile
            name='My'
            desc='Welcome to your personalized profile page. Share your exceptional pops and inspire others with the power of your knowledge'
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile