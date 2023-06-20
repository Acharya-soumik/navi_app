// Import Modules
import { useState } from "react";
// Import Components
import CommentWidget from "./components/CommentWidget";
//Import Hooks
import useCrud from "./hooks/useCrud";
// Import Styles
import "./App.css";

function App() {
  const initState = {
    id: 1,
    replies: [],
    parentId: null,
  };

  const [state, setState] = useState(initState);
  const { addNode, deleteNode, editNode } = useCrud();

  const handleAddComment = (id, item) => {
    const tempState = addNode(state, id, item);
    setState(tempState);
  };

  const handleDeleteComment = (id) => {
    const { ...tempState } = deleteNode(state, id);
    setState(tempState);
  };

  const handleEditComment = (id, message) => {
    const tempState = editNode(state, id, message);
    console.log(tempState, "is state");
    setState(tempState);
  };

  return (
    <div className="h-screen w-screen bg-gray-200 flex flex-col justify-center items-center">
      <h2 className="text-3xl text-center">Comment Widget</h2>
      <br />
      <CommentWidget
        addComment={handleAddComment}
        deleteComment={handleDeleteComment}
        editComment={handleEditComment}
        comment={state}
      />
    </div>
  );
}

export default App;
