const url = "https://drive.google.com/uc?export=download&id=1Z1hLPM8yU5TyBTatG5QHgrIfjOumG1ca";

fetch(url)
  .then(res => res.blob())
  .then(blob => {
    console.log("File downloaded:", blob);
  });
