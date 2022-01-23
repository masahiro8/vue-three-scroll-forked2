export const loader = () => {
  const loadFile = (file, callbackProcess) => {
    return new Promise((resolve) => {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", file.url, true);
      xhr.responseType = "blob";
      xhr.onprogress = (e) => {
        const process = (e.loaded / e.total) * 100;
        callbackProcess(process);
      };
      xhr.onload = (e) => {
        const blob = e.srcElement.response;
        const src = (window.webkitURL || window.URL).createObjectURL(blob);
        callbackProcess(100);
        resolve({
          ...file,
          src,
        });
      };
      xhr.send();
    });
  };

  const getFiles = async (filesArray, callbackProcess) => {
    console.log("filesArray", filesArray);

    // watch progress
    const watchLists = {};
    filesArray.forEach((file) => {
      watchLists[file.url] = { progress: 0 };
    });

    return await Promise.all(
      filesArray.map(async (file) => {
        if (file.type === "png" || file.type === "jpg") {
          return await loadFile(file.url, (progress) => {
            watchLists[file.url] = { progress };
            callbackProcess(watchLists);
          });
        }
        if (file.type === "mp4" || file.type === "glb") {
          return await loadFile(file, (progress) => {
            watchLists[file.url] = { progress };
            callbackProcess(watchLists);
          });
        }
      })
    );
  };

  return {
    getFiles,
  };
};
