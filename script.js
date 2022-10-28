//You can edit ALL of the code here
let allEpisodes;
const url = "https://api.tvmaze.com/shows/82/episodes";
function setup() {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then((episodes) => {
      console.log(episodes);
      allEpisodes = episodes;
      makePageForEpisodes(allEpisodes);
      selFunct();
    })
    .catch((error) => {
      console.log(error);
    });
}

const rootElem = document.getElementById("root");
const topDiv = document.createElement("div");
topDiv.className = "top_div";
document.body.prepend(topDiv);
// rootElem.appendChild(topDiv);

const select = document.createElement("select");
select.className = "select_input";
topDiv.appendChild(select);
// const allEpisodes = getAllEpisodes();
const firstOption = document.createElement("option");
firstOption.text = "All Episodes";
firstOption.value = -2;
select.appendChild(firstOption);
let count = 0;
const selFunct = () => {
  allEpisodes.forEach((episode) => {
    const option = document.createElement("option");
    option.value = count;
    count++;
    option.text = `${epCode(episode)} - ${episode.name}`;
    select.appendChild(option);
  });
};

select.addEventListener("change", (e) => {
  let epSelected = "";
  rootElem.innerHTML = "";
  // let allEpisodes = getAllEpisodes();
  if (select.value >= 0) {
    epSelected = [allEpisodes[select.value]];
  } else {
    epSelected = allEpisodes;
  }

  makePageForEpisodes(epSelected);
});

const searchInput = document.createElement("input");
searchInput.id = "search_input";
searchInput.setAttribute("placeholder", "search episodes");
topDiv.appendChild(searchInput);

const epLabel = document.createElement("label");
epLabel.style.marginLeft = "20px";
epLabel.innerHTML = "Displaying 73/73 episodes";
topDiv.appendChild(epLabel);

searchInput.addEventListener("keyup", (e) => {
  let epFound = "";
  // let allEpisodes = getAllEpisodes();
  let currentInput = e.target.value.toLowerCase();
  rootElem.innerHTML = "";
  epFound = allEpisodes.filter(
    (epi) =>
      epi.summary.toLowerCase().includes(currentInput) ||
      epi.name.toLowerCase().includes(currentInput)
  );
  makePageForEpisodes(epFound);
  const epNum = epFound.length;
  epLabel.innerHTML = `Displaying ${epNum}/73 episodes`;
});

function epCode(episode) {
  let epNumber = episode.number;
  let seasonNumber = episode.season;
  if (epNumber <= 9) {
    epNumber = `0${epNumber}`;
  }
  if (seasonNumber <= 9) {
    seasonNumber = `0${seasonNumber}`;
  }
  return `S${epNumber}E${seasonNumber}`;
}

function makePageForEpisodes(episodeList) {
  // const rootElem = document.getElementById("root");
  // rootElem.className = "root";
  const allEpi = document.getElementById("root");
  rootElem.className = "root";
  episodeList.forEach((episode) => {
    const epContainer = document.createElement("div");
    epContainer.className = "ep-container";

    rootElem.appendChild(epContainer);
    let episodeName = document.createElement("h3");
    episodeName.className = "ep-Name";
    const epiCode = epCode(episode);
    episodeName.innerText = `${episode.name} - ${epiCode}`;
    epContainer.appendChild(episodeName);
    const epImage = document.createElement("img");
    epImage.className = "ep-image";
    epImage.src = `${episode.image.medium}`;
    epContainer.appendChild(epImage);
    const epSummary = document.createElement("p");
    epSummary.className = "ep-summary";
    epSummary.innerHTML = episode.summary;
    epContainer.appendChild(epSummary);
  });
  const dataSource = document.createElement("div");
  dataSource.className = "source";
  rootElem.appendChild(dataSource);
  const dataText = document.createElement("p");
  dataText.className = "data-text";
  dataText.innerHTML =
    "The data has (originally) come from <a href = 'https://www.tvmaze.com/'>TVMaze.com</a>";
  dataText.style.color = "red";
  dataSource.appendChild(dataText);
}

window.onload = setup;
