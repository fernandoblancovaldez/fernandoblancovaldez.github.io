const url = "https://randomuser.me/api/";

async function ajax(props) {
  let { url, cbSuccess } = props;

  await fetch(url)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => cbSuccess(json))
    .catch((err) => {
      console.log(err);
      let message = err.statusText || `Ocurrió un error al acceder a la API`;
      document.getElementsByClassName("card").innerHTML = `
      <div >
        <p>Error ${err.status}: ${message}</p>
      </div>      
      `;
      console.log(err);
    });
}

await ajax({
  url,
  cbSuccess: (json) => {
    const person = json.results[0];
    console.log(person);
  },
});

/* fetch("https://randomuser.me/api/")
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
  }); */
