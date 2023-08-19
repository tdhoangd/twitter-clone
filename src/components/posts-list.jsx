import Post from "./post";

export default function PostsList() {
  return (
    // <div className={`flexbox `}>
    // <div className={`flexbox flex-row`}>
    // <div className={`flexbox w-full `}>
    <div className={`relative min-h-screen h-fit`}>
      {Array.from({ length: 10 }, (_, index) => (
        <Post key={index} />
      ))}
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}
    </div>
  );
}
