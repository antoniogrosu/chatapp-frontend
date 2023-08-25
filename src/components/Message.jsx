function Message(props) {
  const { name, message, id, userId } = props;
  return (
    <div
      className={
        name == userId ? "flex w-full justify-end" : "flex w-full justify-start"
      }
    >
      <div
        className={
          name == userId
            ? "bg-green-200 w-3/12 mb-4  rounded-b-2xl p-2 rounded-l-2xl  "
            : "bg-red-200 w-3/12 mb-4 rounded-b-2xl p-2 rounded-r-2xl "
        }
      >
        <h1>{name == userId ? "me" : name}</h1>
        <p>{message}</p>
      </div>
    </div>
  );
}
export default Message;
