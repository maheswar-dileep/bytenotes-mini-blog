'use client'
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Form from "@components/Form"

const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        post: '',
        tag: '',
    })
    const createPrompt = async (e) => {
        e.preventDefault()
        setSubmitting(!submitting)
        try {
            const res = await fetch('/api/post/create',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        post: post.post.trim() ,
                        tag: post.tag.trim() ,
                        userId: session.user.id
                    })
                }
            )
            
            if (res.ok)
                router.push('/')

        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(!submitting)
        }
    }
    return (
        <Form
            type="create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt