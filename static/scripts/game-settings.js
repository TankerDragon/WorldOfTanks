const button = document.getElementById("status");
const msgBtn = document.getElementById("message");

button.onclick = () => {
  console.log(msgBtn.innerText);
  if (msgBtn.innerText == "started") {
    post("stop");
  } else if (msgBtn.innerText == "stopped") {
    post("start");
  }


}

function getCSRF() {
  arr = document.getElementById("csrf").innerHTML.split("value");
  arr = arr[1].split('"');
  return arr[1];
}

function get() {
  fetch("/gameAPI/")
    .then((res) => res.json())
    .then((data) => {
      console.log("json data: ", data.status);
      msgBtn.innerText = data.status;
    });
}
get();

function post(m) {
  fetch("/gameAPI/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCSRF(),
    },
    body: JSON.stringify({
      game: m
    }),
  })
    .catch((data) => {
      stopServerInterval();
      console.log("!!!ERROR!!!: ", data);
      // window.alert("ERROR occured!");
    })
    //.then((res) => res.json())
    .then((data) => {
      console.log("json data: ", data);
      if (data.status == 200) {
        get();
      }

    });

}
