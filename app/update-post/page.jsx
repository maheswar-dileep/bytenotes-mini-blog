'use client'
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Form from "@components/Form"

const CreatePrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const postId = searchParams.get('postid')
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        post: '',
        tag: '',
    })

    const getPosts = async () => {
        const res = await fetch(`/api/post/${postId}`)
        const data = await res.json()
        setPost(data)
    }
    useEffect(() => {
        getPosts()
    }, [postId])

    const createPrompt = async (e) => {
        e.preventDefault()
        setSubmitting(!submitting)
        try {
            const res = await fetch(`/api/post/${postId}`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        post: post.post.trim(),
                        tag: post.tag.trim()
                    })
                }
            )

            if (res.ok)
                router.push('/')

        } catch (error) {
            console.log(error);
            setSubmitting(!submitting)
        }
    }
    return (
        <Form
            type="Update"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt