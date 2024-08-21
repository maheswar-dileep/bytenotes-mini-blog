import { Slide, Zoom } from "react-awesome-reveal";
import PostCard from "./PostCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <Slide direction="left" triggerOnce cascade damping={0.250}>
        <h1 className='head_text text-left'>
          <span className='blue_gradient'>{name} Profile</span>
        </h1>
        <p className='desc text-left'>{desc}</p>
      </Slide>

      <div className='mt-10 prompt_layout'>
        <Zoom triggerOnce cascade damping={0.500}>
          {data.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </Zoom>
      </div>
    </section>
  );
};

export default Profile;
