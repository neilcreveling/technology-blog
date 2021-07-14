console.log("Welcome!");

const createComment = async (event) => {
  event.preventDefault();

  console.log("Hello there");
  const content = document.getElementById("comment-text").value;
  console.log(content);
  const url = window.location.href;
  console.log(url);
  const split_url = url.split("posts/");
  console.log(split_url);
  const post_id = split_url[1][0];
  console.log(post_id);
  const user_id = document
    .getElementById("user")
    .getAttribute("data-currentuser");
  console.log(user_id);
  console.log(user_id, post_id, content);

  const response = await fetch(`/api/comments/`, {
    method: "POST",
    body: JSON.stringify({ user_id, post_id, content }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.reload();
  } else {
    alert("Failed to create comment.");
  }
};

document
  .getElementById("submit-comment")
  .addEventListener("click", createComment);