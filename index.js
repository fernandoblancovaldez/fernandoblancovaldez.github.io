const url = "https://randomuser.me/api/";
const d = document,
  $profile = d.querySelector(".profile");

async function ajax(props) {
  let { url, cbSuccess } = props;

  /* d.getElementsByClassName("loader").style.display = "block"; */
  /* d.querySelectorAll(".loader").style.display = "block"; */

  await fetch(url)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => cbSuccess(json))
    .catch((err) => {
      let message = err.statusText || `Ocurrió un error al acceder a la API`;
      $profile.innerHTML = `
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

    d.querySelector(".profile").insertAdjacentHTML(
      "afterbegin",
      `<div><h1>${person.name.first} ${person.name.last}</h1><h3>Front end Web Developer</h3></div>`
    );
    d.querySelector(".profile-pic img").src = person.picture.large;
    d.querySelector(".profile-pic img").style =
      "border-radius : 50%; border: 0.5rem solid #ffffff";

    d.querySelector(".info").insertAdjacentHTML(
      "afterbegin",
      ` <p>
            <b>Profesional independiente, proactivo y autodidacta</b> que se desenvuelve en el área de desarrollo web.<br />
            <br />
            <em>
            Busco continuamente incorporar nuevas tecnologías que nos permitan al equipo y a mi optimizar el trabajo del día a día.
            </em>
            <br />
            <br />
            <b><em>A continuación ofrezco en mas detalle mis experiencias y habilidades adquiridas hasta el momento</em></b>
        </p>`
    );

    d.querySelector(".loader").style = "display: none";

    d.addEventListener("click", (e) => {
      if (e.target.matches("#envelope") || e.target.matches("#envelope *")) {
        d.querySelector(".info").innerHTML = `
            <p>mi email es</p>
            <h2>${person.email}</h2>
            `;
      }
      if (
        e.target.matches(".profile-pic") ||
        e.target.matches(".profile-pic *")
      ) {
        d.querySelector(".info").innerHTML = ` <p>
            <b>Profesional independiente, proactivo y autodidacta</b> que se desenvuelve en el área de desarrollo web.<br />
            <br />
            <em>
            Busco continuamente incorporar nuevas tecnologías que nos permitan al equipo y a mi optimizar el trabajo del día a día.
            </em>
            <br />
            <br />
            <b><em>A continuación ofrezco en mas detalle mis experiencias y habilidades adquiridas hasta el momento</em></b>
        </p>`;
      }
      if (e.target.matches("#calendar") || e.target.matches("#calendar *")) {
        d.querySelector(".info").innerHTML = `
            <p>tengo</p>
            <h2>${person.dob.age} años</h2>
            `;
      }
      if (e.target.matches("#location") || e.target.matches("#location *")) {
        d.querySelector(".info").innerHTML = `
            <p>vivo en</p>
            <h2>${person.location.street.name} ${person.location.street.number} - ${person.location.city}, ${person.location.country}</h2>
            `;
      }
      if (e.target.matches("#phone") || e.target.matches("#phone *")) {
        d.querySelector(".info").innerHTML = `
            <p>mi teléfono es</p>
            <h2>${person.phone}</h2>
            `;
      }
    });
  },
});
/* fetch("https://randomuser.me/api/")
  .then((res) => res.json())
  .then((json) => console.log(json);
  ); */
