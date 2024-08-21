import Feed from "@components/Feed"

const Home = () => {
    return (
        <div>
            <section className="w-full flex-center flex-col">
                <h1 className="head_text text-center">
                    Stay Updated. Stay Ahead.
                    <br />
                    <span className="orange_gradient text-center">
                        Share and discover bite-sized updates.
                    </span>
                </h1>
                <p className="desc text-center">Tech evolves fast, and so should your knowledge. Share your thoughts, discoveries, and updates in short and engaging notes.
                    Explore what others are talking about and keep your skills sharp and informed.</p>
                <Feed />
            </section>
        </div>
    )
}

export default Home
