// Get the modal
var row1 = document.getElementById("row1");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var row2 = document.getElementById("row2");

row1.onclick = function () {
  row1.style.display = "block";
  row1.src = this.src;
  captionText.innerHTML = this.alt;
};

row2.onclick = function () {
  row2.style.display = "block";
  row2.src = this.src;
  captionText.innerHTML = this.alt;
};

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};
