export const loader = () => {
  const loadImage = (file) => {
    return new Promise((resolve) => {
      let img = new Image();
      img.onload = () => {
        console.log("image loaded", file.url);
        resolve({
          ...file,
        });
      };
      img.src = file.url;
    });
  };

  const loadMovie = (file) => {
    return new Promise((resolve) => {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", file.url, true);
      xhr.responseType = "blob";
      xhr.onload = (e) => {
        var blob = e.srcElement.response;
        var src = (window.webkitURL || window.URL).createObjectURL(blob);
        resolve({
          ...file,
          src,
        });
      };
      xhr.send();
    });
  };

  const getFiles = async (filesArray) => {
    console.log("filesArray", filesArray);
    return await Promise.all(
      filesArray.map(async (file) => {
        if (file.type === "png" || file.type === "jpg") {
          return await loadImage(file.url);
        }
        if (file.type === "mp4" || file.type === "glb") {
          return await loadMovie(file);
        }
      })
    );
  };

  return {
    getFiles,
  };
};
