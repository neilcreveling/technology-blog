console.log("Welcome!");

const createPost = async (event) => {
  event.preventDefault();

  console.log("Hello there!");
  const title = document.getElementById("post-title").value;
  console.log(title);
  const content = document.getElementById("post-content").value;
  console.log(content);

  const response = await fetch("/api/posts/", {
    method: "POST",
    body: JSON.stringify({ title, content }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to create post.");
  }
};

document.getElementById("submit-post").addEventListener("click", createPost);