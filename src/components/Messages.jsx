import axios from "axios";
import { useEffect, useState } from "react";
import Message from "./Message";

function Messages(props) {
  const { user, token } = props;

  const apiUrl = "http://localhost:5000/api/v1/messages";

  const [data, setData] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        // Assuming your API returns an array of messages
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, [token]);

  return (
    <div className="h-10/12 mt-2">
      {data
        ? data.messages.map((item) => (
            <Message
              userId={user.name}
              name={item.name}
              message={item.message}
              key={item._id}
              id={item._id}
            />
          ))
        : "Loading..."}
    </div>
  );
}

export default Messages;
