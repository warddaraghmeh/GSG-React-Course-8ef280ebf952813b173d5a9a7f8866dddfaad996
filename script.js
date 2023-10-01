function getUsers() {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          reject("error fetching");
        }
      })
      .then((users) => {
        let div = document.getElementById("left-column");
        for (let user of users) {
          let content = `<div class="user" onclick="userClicked(${user.id})"> 
  <h3>${user.name}</h3>
  <h3>${user.email}</h3></div>`;
          div.innerHTML += content;
        }
        resolve();
      });
  });
}

function getPosts(userId) {
  return new Promise((resolve, reject) => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          reject("Error fetching posts");
        }
      })
      .then((posts) => {
        let div = document.getElementById("right-column");
        div.innerHTML = "";
        for (let post of posts) {
          let content = `
            <div class="post"> 
              <h3>${post.title}</h3>
              <p>${post.body}</p>
            </div>`;
          div.innerHTML += content;
        }
        resolve(posts);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function userClicked(userId) {
  getPosts(userId)
    .then(() => {
      console.log(`Posts for User ID ${userId} fetched and displayed.`);
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
}

getUsers()
  .then(() => {
    console.log("User data fetched and displayed.");
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
