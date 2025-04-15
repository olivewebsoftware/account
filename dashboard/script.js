window.onload = () => {
    const username = getCookie("username");
    const password = getCookie("password");
  
    // Redirect if cookies don't exist
    if (!username || !password) {
      window.location.href = "http://account.olivewebsoftware.com/";
      return;
    }
  
    // Update the username on the page
    document.querySelector("h1").textContent = username;
  
    // Send POST request to get account details
    fetch("http://68.108.66.195:5000/connect/account/get-details.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.text())
    .then(text => {
      if (text.trim() === "bad password" || text.trim() === "user doesnt exist") {
        window.location.href = "http://account.olivewebsoftware.com/error.html";
      } else {
        const [creationDate, ipAddress] = text.trim().split("\n");
        document.querySelector(".account-info").innerHTML = `
          <h1>${username}</h1>
          <p>Account creation date: ${ipAddress}</p>
          <p>Account IP address: ${creationDate}</p>
        `;
      }
    })
    .catch(err => {
      console.error("Fetch error:", err);
      window.location.href = "http://account.olivewebsoftware.com/error.html";
    });
  };
  
  function changePassword() {
    window.location.href = "http://68.108.66.195:5000/connect/account/dashboard/change-password.html";
  }
  
  function deleteAccount() {
    window.location.href = "http://68.108.66.195:5000/connect/account/dashboard/delete-account.html";
  }
  
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }
  