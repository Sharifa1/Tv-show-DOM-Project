//You can edit ALL of the code here
let allEpisodes;
const allShows = getAllShows();
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
      selShowFunc();
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

const selectShow = document.createElement("select");
selectShow.className = "select_input";
topDiv.appendChild(selectShow);
const showOption = document.createElement("option");
showOption.text = "All shows";
selectShow.appendChild(showOption);
let countShow = 0;
const selShowFunc = () => {
  allShows.sort((a, b) => {
    const showName1 = a.name;
    const showName2 = b.name;
    if (showName1 < showName2) return -1;
    if (showName1 > showName2) return 1;
    return 0});
  allShows.forEach((show) => {
    console.log(show);
    const showEachOption = document.createElement("option");
    showEachOption.value = countShow;
    countShow++;
    // showEachOption.text = `${showCode(show)} ${show.name}`;
    showEachOption.text = `${show.name}`;
    selectShow.appendChild(showEachOption);
  });
};

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

function showCode(show) {
  let showNumber = show.id;
  return 0;
}

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
