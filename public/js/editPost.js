console.log("Welcome!");

const editPost = async (event) => {
  event.preventDefault();

  console.log("Hello there");
  const title = document.getElementById("edit-post-title").value;
  console.log(title);
  const content = document.getElementById("edit-post-content").value;
  console.log(content);
  const url = window.location.href;
  console.log(url);
  const split_url = url.split("edit/");
  console.log(split_url);
  const id = split_url[1][0];
  console.log(id);

  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, content }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to edit post.");
  }
};

document.getElementById("submit-edit-post").addEventListener("click", editPost);