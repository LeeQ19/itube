const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const commentText = document.createElement("span");
  commentText.className = "comment__text";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = text;
  commentText.appendChild(icon);
  commentText.appendChild(span);
  newComment.appendChild(commentText);
  const deleteComment = document.createElement("a");
  deleteComment.href = `/api/videos/${videoContainer.dataset.id}/comment/${id}/delete`;
  deleteComment.className = "delete__comment";
  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fas fa-trash delete__comment";
  deleteComment.appendChild(deleteIcon);
  newComment.appendChild(deleteComment);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const comment = form.elements["comment"];
  const text = comment.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    comment.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
