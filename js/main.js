
// swiper
const swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        }
      }
    });

    
///////////////////////////////

var websiteNameInput = document.getElementById("websiteName");
var websiteUrlInput = document.getElementById("websiteUrl");
var addBtn = document.getElementById("addBtn")
var updateBtn = document.getElementById("updateBtn")
var searchInput = document.getElementById("searchInput")
var nameError = document.getElementById("nameError")
var urlError = document.getElementById("urlError")
var editingIndex = -1;
var websiteList = []

if(localStorage.getItem("allSitesArray")!= null){
    websiteList = JSON.parse(localStorage.getItem("allSitesArray"))
    display();
}

// add new website
  function onSave() {    
    if (!validateInputs()) return;
  
    var website = {
        websiteName: websiteNameInput.value,
        websiteUrl: websiteUrlInput.value
    }
    websiteList.push(website);
    localStorage.setItem("allSitesArray", JSON.stringify(websiteList))
    display();
    clear()
}

//regex url
function isValidUrl(url) {
var pattern = /^(https?:\/\/)[a-z0-9\-\.]+\.(com|net)(\/.*)?$/i;
  return url.match(pattern) !== null;
}

//validate input
function validateInputs() {
  var nameValid = websiteNameInput.value !== "";
  var urlValid = isValidUrl(websiteUrlInput.value);

  websiteNameInput.classList.remove("is-valid", "is-invalid");
  websiteUrlInput.classList.remove("is-valid", "is-invalid");

  nameError.classList.add("d-none")
  urlError.classList.add("d-none")


  if (nameValid) {
    websiteNameInput.classList.add("is-valid");
  } else {
    websiteNameInput.classList.add("is-invalid");
    nameError.classList.remove("d-none")
  }

  if (urlValid) {
    websiteUrlInput.classList.add("is-valid");
  } else {
    websiteUrlInput.classList.add("is-invalid");
    urlError.classList.remove("d-none")
  }

  return nameValid && urlValid;
}



// display cards of websites
function display(){
    var temp = '';
    var colorClasses = ['orange-card', 'blue-card', 'purple-card']

    for(var i = 0 ; i < websiteList.length ; i++ ){
        var cardColor = colorClasses[i % colorClasses.length]

        temp+= `
            <div class="swiper-slide">
                <div class="trust-card ${cardColor}">
                    <i class="fa-solid fa-bookmark bookmark-icon"></i>
                    <h5 class="web-count">${i+1}</h5>
                    <h5>${websiteList[i].websiteName}</h5>
                    <p><a href="${websiteList[i].websiteUrl}"target="_blank">${websiteList[i].websiteUrl}</a></p>
                    <div class="card-actions">
                    <button onclick="visitWebsite(${i})" class="btn btn-success btn-sm">Visit</button>
                    <button onclick="editWebsite(${i})" class="btn btn-primary btn-sm">Edit</button>
                    <button onclick="deleteWebsite(${i})" class="btn btn-danger btn-sm">Delete</button>
                    </div>
                </div>
            </div>
        `;
    }
    document.getElementById("websiteCards").innerHTML = temp;
    swiper.update();
    swiper.slideTo(swiper.slides.length - 1);
}

// visit link
function visitWebsite(index){
    window.open(websiteList[index].websiteUrl)
}

// edit website
function editWebsite(index){
    websiteNameInput.value = websiteList[index].websiteName
    websiteUrlInput.value = websiteList[index].websiteUrl
    updateBtn.style.display = "block"
    addBtn.style.display = "none"
    editingIndex = index
}

// save the edited website
function onUpdate(index){
  if (!validateInputs() || editingIndex === -1) return;

        websiteList[editingIndex].websiteName = websiteNameInput.value
        websiteList[editingIndex].websiteUrl = websiteUrlInput.value
         localStorage.setItem("allSitesArray", JSON.stringify(websiteList));
           display();
           clear();
           addBtn.style.display = "block";
           updateBtn.style.display = "none";
           editingIndex = -1
    
}

// search
function search() {
    var searchData = searchInput.value.toLowerCase();
    var temp = '';
    var colorClasses = ['orange-card', 'blue-card', 'purple-card'];
    var displayIndex = 1;

    for (var i = 0; i < websiteList.length; i++) {
        if (websiteList[i].websiteName.toLowerCase().includes(searchData)) {
            var cardColor = colorClasses[i % colorClasses.length];
            temp += `
                <div class="swiper-slide">
                    <div class="trust-card ${cardColor}">
                        <i class="fa-solid fa-bookmark bookmark-icon"></i>
                        <h5 class="web-count">${displayIndex}</h5>
                        <h5>${websiteList[i].websiteName}</h5>
                        <p><a href="${websiteList[i].websiteUrl}" target="_blank">${websiteList[i].websiteUrl}</a></p>
                        <div class="card-actions">
                            <button onclick="visitWebsite(${i})" class="btn btn-success btn-sm">Visit</button>
                            <button onclick="editWebsite(${i})" class="btn btn-primary btn-sm">Edit</button>
                            <button onclick="deleteWebsite(${i})" class="btn btn-danger btn-sm">Delete</button>
                        </div>
                    </div>
                </div>
            `;
            displayIndex++;
        }
    }

    document.getElementById("websiteCards").innerHTML = temp;
    swiper.update();
}

// delete website
function deleteWebsite(index){
    websiteList.splice(index,1)
    localStorage.setItem("allSitesArray", JSON.stringify(websiteList))
    display()
}

// clear inputs
function clear(){
    websiteNameInput.value = null
    websiteUrlInput.value = null
    websiteNameInput.classList.remove("is-valid", "is-invalid");
    websiteUrlInput.classList.remove("is-valid", "is-invalid");
}



