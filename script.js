let moon = document.getElementById("moon");
let sun = document.getElementById("sun");
let heading1 = document.getElementById("heading1");
let dark = document.getElementById("dark");
let light = document.getElementById("light");
let input = document.getElementById("user");
let button = document.getElementById("button");
let form = document.getElementById("form");
let userinfo = document.getElementById("user_information");
let username = document.getElementById("username");
let nickname = document.getElementById("nickname");
let bio = document.getElementById("bio");
let joindate = document.getElementById("joindate");
let followerbox = document.getElementById("followerbox");
let f1 = document.getElementById("f1");
let f2 = document.getElementById("f2");
let f3 = document.getElementById("f3");
let n1 = document.getElementById("n1");
let n2 = document.getElementById("n2");
let n3 = document.getElementById("n3");
let link1 = document.getElementById("link1");
let link2 = document.getElementById("link2");
let link3 = document.getElementById("link3");
let link4 = document.getElementById("link4");
let noresultsmessage = document.getElementById("no-results");

let change = (icon) => {
  if (icon === "dark") {
    moon.style.display = "none";
    sun.style.display = "block";
    document.body.style.background = "#141D2F";
    heading1.style.color = "#FFFFFF";
    dark.style.display = "none";
    light.style.display = "block";
    form.style.backgroundColor = "#1E2A47";
    input.style.backgroundColor = "#1E2A47";
    userinfo.style.backgroundColor = "#1E2A47";
    username.style.color = "#FFFFFF";
    followerbox.style.backgroundColor = "#141D2F";
    f1.style.color = "#FFFFFF";
    f2.style.color = "#FFFFFF";
    f3.style.color = "#FFFFFF";
    n1.style.color = "#FFFFFF";
    n2.style.color = "#FFFFFF";
    n3.style.color = "#FFFFFF";
    link1.style.color = "#FFFFFF";
    link2.style.color = "#FFFFFF";
    link3.style.color = "#FFFFFF";
    link4.style.color = "#FFFFFF";
  }
};

moon.addEventListener("click", () => change("dark"));

let change2 = (icon2) => {
  if (icon2 === "light") {
    moon.style.display = "block";
    sun.style.display = "none";
    document.body.style.background = " #F6F8FF";
    heading1.style.color = "#222731";
    dark.style.display = "block";
    light.style.display = "none";
    form.style.backgroundColor = "white";
    input.style.backgroundColor = "white";
    userinfo.style.backgroundColor = "white";
    username.style.color = "#222731";
    followerbox.style.backgroundColor = "#F6F8FF";
    f1.style.color = "#222731";
    f2.style.color = "#222731";
    f3.style.color = "#222731";
    n1.style.color = "#222731";
    n2.style.color = "#222731";
    n3.style.color = "#222731";
    link1.style.color = "#4B6A9B";
    link2.style.color = "#4B6A9B";
    link3.style.color = "#4B6A9B";
    link4.style.color = "#4B6A9B";
  }
};

sun.addEventListener("click", () => change2("light"));

button.addEventListener("click", async (event) => {
  event.preventDefault();

  let userInput = input.value.trim();
  noresultsmessage.style.display = "none";

  if (userInput === "") {
    alert("შეიყვანეთ მომხმარებლის სახელი");
    return;
  }

  try {
    let response = await fetch(`https://api.github.com/users/${userInput}`);
    let data = await response.json();

    if (response.status === 404) {
      noresultsmessage.style.display = "inline";
    } else {
      noresultsmessage.style.display = "none";
      userinfo.style.display = "block";

      username.textContent = data.name || "User not found";
      nickname.textContent = data.login || "No nickname";
      bio.textContent = data.bio || "This profile has no bio";
      joindate.textContent = `Joined ${new Date(
        data.created_at
      ).toLocaleDateString()}`;

      n1.textContent = data.public_repos;
      n2.textContent = data.followers;
      n3.textContent = data.following;

      link1.textContent = data.location || "Not Available";
      link2.textContent = data.twitter_username || "Not Available";
      link3.textContent = data.blog || "Not Available";
      link4.textContent = data.company || "Not Available";

      document.querySelector(".user_image").src = data.avatar_url;

      link3.setAttribute("href", `https://github.com/${data.login}`);
      link3.textContent = `GitHub Profile: ${data.login}`;
    }
  } catch (error) {
    console.error("Error fetching user data: ", error);
    noresultsmessage.style.display = "inline";
  }
});
