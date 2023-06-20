/* eslint-disable react/prop-types */
// Import Modules
import { useRef, useState } from "react";
// Import Components
import Button from "./Button";

const CommentWidget = ({ comment, addComment, deleteComment, editComment }) => {
  // user state
  const [input, setInput] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const editRef = useRef(comment.text);

  //   handlers
  const toggleReply = () => setShowReply((prev) => !prev);

  const handleAddComment = () => {
    if (!input) return;
    setShowReply(false);
    addComment(comment.id, input);
    setInput("");
  };

  const handleDeleteComment = () => {
    deleteComment(comment.id);
  };

  const handleInputChange = (e) => setInput(e.target.value);
  const toggleEdit = () => setIsEditMode((prev) => !prev);
  const saveEdit = () => {
    setIsEditMode(false);
    editComment(comment.id, editRef.current.value);
  };

  return (
    <div className="">
      {comment.parentId ? (
        <div>
          {isEditMode ? (
            <>
              <input
                placeholder="edit"
                ref={editRef}
                defaultValue={comment.name}
              />
              <Button type="primary" text="save" onClick={saveEdit} />
            </>
          ) : (
            <h2 className="my-4 font-bold">{comment.name}</h2>
          )}
          <div className="flex">
            <Button type="danger" text="delete" onClick={handleDeleteComment} />
            <Button type="primary" text="reply" onClick={toggleReply} />
            <Button type="secondary" text="edit" onClick={toggleEdit} />
          </div>
          {showReply && (
            <div>
              <input
                onChange={handleInputChange}
                value={input}
                placeholder="add reply"
                className="rounded px-4 py-2"
              />
              <span
                className="h-10 w-10 rounded-full border border-red-400 hover:bg-gray-400 p-3 mx-2"
                onClick={handleAddComment}
              >
                +
              </span>
            </div>
          )}
        </div>
      ) : (
        <div>
          <input
            onChange={handleInputChange}
            value={input}
            placeholder="add a comment..."
            className="p-4 rounded-xl mb-6 mx-2"
          />
          <Button
            type="secondary"
            text="add comment"
            onClick={handleAddComment}
          />
        </div>
      )}

      {comment &&
        comment.replies.map((item) => (
          <div
            className={`pl-[6vw] duration-150 ease-in transition-all`}
            key={item.id}
          >
            <CommentWidget
              addComment={addComment}
              deleteComment={deleteComment}
              key={item.id}
              comment={item}
              editComment={editComment}
            />
          </div>
        ))}
    </div>
  );
};

export default CommentWidget;
