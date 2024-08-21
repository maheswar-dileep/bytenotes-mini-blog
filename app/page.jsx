'use client'
import Feed from "@components/Feed"
import { Zoom } from "react-awesome-reveal"

const Home = () => {
    return (
        <div>
            <section className="w-full flex-center flex-col">
                <Zoom triggerOnce cascade damping={0.250}>
                    <h1 className="head_text text-center">
                        Stay Updated. Stay Ahead.
                        <br />
                        <span className="orange_gradient text-center">
                            Share and discover bite-sized updates.
                        </span>
                    </h1>
                    <p className="desc text-center">Tech evolves fast, and so should your knowledge. Share your thoughts, discoveries, and updates in short and engaging notes.
                        Explore what others are talking about and keep your skills sharp and informed.</p>
                </Zoom>
                <Feed />
            </section>
        </div>
    )
}

export default Home
