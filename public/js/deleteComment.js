console.log("Welcome");

const deleteComment = async (element) => {
  element.preventDefault();

  console.log("Hello there");
  const comment_id = element.value;
  console.log(comment_id);

  const response = await fetch(`/api/comments/${comment_id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert("Failed to delete comment.");
  }
};
// const buttons = document.querySelectorAll(".delete-comment");
// for (const button of buttons) {
//   button.addEventListener("click", deleteComment);
// }