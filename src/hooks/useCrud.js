const useCrud = () => {
  const addNode = function (state, commentId, message) {
    if (state.id === commentId) {
      state.replies.push({
        id: new Date().getTime(),
        name: message,
        replies: [],
        parentId: commentId,
      });
      return state;
    }
    let freshState = [];
    freshState = state?.replies?.map((each) => {
      return addNode(each, commentId, message);
    });
    return { ...state, replies: freshState };
  };

  const deleteNode = function (state, id) {
    state.replies.forEach((item, idx) => {
      if (item.id === id) {
        return state.replies.splice(idx, 1);
      } else {
        deleteNode(item, id);
      }
    });
    return state;
  };

  const editNode = function (state, id, message) {
    if (state.id === id) {
      state.name = message;
      return state;
    }
    state.replies.map((item) => editNode(item, id, message));
    return { ...state };
  };

  return { addNode, deleteNode, editNode };
};

export default useCrud;
