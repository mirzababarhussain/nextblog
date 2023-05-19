import Feed from "@components/Feed"
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">My Next Blog
        <br className="max-md:hidden"/>
        <span className="orange_gradient text-center">By:Babar Hussain</span>
        </h1>
        <p className="desc text-center">
            A Power AI Tool by CapraEye Solutions
        </p>
        <Feed/>
    </section>
  )
}

export default Home