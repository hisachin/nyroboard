export const downloadImage = (data, filename = "my-canvas.png") => {
  var a = document.createElement("a");
  a.href = data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
};
