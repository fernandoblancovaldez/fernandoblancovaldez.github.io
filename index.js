const url = "https://randomuser.me/apis/";

async function ajax(props) {
  const d = document;
  let { url, cbSuccess } = props;

  d.querySelectorAll(".loader").style.display = "block"; /* 
  d.getElementsByClassName("loader").style.display = "block"; */

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
  .then((res) => res.json())
  .then((json) => console.log(json);
  ); */
