import Link from "next/link";
import { Slide, Zoom } from "react-awesome-reveal";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
    return (
        <section className='w-full max-w-full flex-start flex-col'>
            <Slide duration={750} direction="left" triggerOnce cascade damping={0.250}>
                <h1 className='head_text text-left'>
                    <span className='blue_gradient capitalize'>{type} Post</span>
                </h1>
                <p className='desc text-left max-w-md'>
                    Create and share amazing tech prompts and updates with the world.
                    Whether it's the latest AI innovation or a new software release, <br />
                    your insights matter.
                </p>
            </Slide>
            <Zoom triggerOnce>
                <form
                    onSubmit={handleSubmit}
                    className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
                >
                    <label>
                        <span className='font-satoshi font-semibold text-base text-gray-700'>
                            Your Post
                        </span>

                        <div>
                            <textarea
                                value={post.post}
                                onChange={(e) => setPost({ ...post, post: e.target.value.slice(0, 110) })}
                                placeholder='Write your post here'
                                required
                                className='form_textarea'
                            />
                            <p className={`${post.post.length > 100 ? 'text-orange-500' : 'text-gray-700'}`}>
                                {post.post.length}/110 characters
                            </p>
                        </div>
                    </label>

                    <label>
                        <span className='font-satoshi font-semibold text-base text-gray-700'>
                            Field of Post{" "}
                            <span className='font-normal'>
                                (#product, #webdevelopment, #idea, etc.)
                            </span>
                        </span>
                        <input
                            value={post.tag}
                            onChange={(e) => setPost({ ...post, tag: e.target.value })}
                            type='text'
                            placeholder='#Tag'
                            required
                            className='form_input'
                        />
                    </label>

                    <div className='flex-end mx-3 mb-5 gap-4'>
                        <Link href='/' className='text-gray-500 text-sm'>
                            Cancel
                        </Link>

                        <button
                            type='submit'
                            disabled={submitting}
                            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
                        >
                            {submitting ? `Submiting...` : type}
                        </button>
                    </div>
                </form>
            </Zoom>

        </section>
    );
};

export default Form;
