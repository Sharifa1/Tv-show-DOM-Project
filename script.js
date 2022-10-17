//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  // console.log(allEpisodes)
  // allEpisodes.forEach(elem => console.log(elem.name))
}

const containerRoot = document.getElementById("root")

function epCode(episode) {
  let epNumber = episode.number;
  let seasonNumber = episode.season;
  if (epNumber <= 9) {
    epNumber = `0${epNumber}`
  } 
  if (seasonNumber <= 9) {
    seasonNumber = `0${seasonNumber}`
  }
  return `S${epNumber}E${seasonNumber}`;

}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.className = "root";
  episodeList.forEach(episode => {
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

    
  })
  // rootElem.innerHTML = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;
