console.log('Welcome!')


const deletePost = async (event) => {
  event.preventDefault();

  console.log("Hello there");
  const post_id = document.getElementById("delete-post").value;
  console.log(post_id);

  const response = await fetch(`/api/posts/${post_id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to delete post.");
  }
};

document.getElementById("delete-post").addEventListener("click", deletePost);