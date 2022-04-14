/*--------------------------------------INFO--------------------------------------*/
const apiKey = 'at_o3qcYh0KCg6BOGMCeUFSTw40vKgmU'
const search = document.forms['searchIP']

var width = window.matchMedia("(max-width: 660px)")

const ipAddress = document.querySelector('#ip h2')
const myLocation = document.querySelector('#location h2')
const timezone = document.querySelector('#timezone h2')
const isp = document.querySelector('#isp h2')
const info = document.getElementById('info_list')
const error = document.getElementById('error')
const init = document.getElementById('init')

const getData = async (value) => {
    const response = await fetch('https://geo.ipify.org/api/v2/country,city?apiKey='+apiKey+'&ipAddress='+value)
    const data = await response.json()
    return data
}

getData().then((data)=>{console.log(data)})

search.addEventListener('submit', async (e) =>{
    e.preventDefault()
    const value = search.querySelector('input[type="text"]').value
    getData(value).then((data)=>{
        console.log(data)
        if(data.code === 422) {
            init.style.display = 'none'
            error.style.display = 'block'
            info.style.display = 'none'
        }
        else {
            
            ipAddress.textContent = data.ip
            myLocation.textContent = data.location.city + ',' + data.location.region + data.location.country
            timezone.textContent = data.location.timezone
            isp.textContent = data.isp
            init.style.display = 'none'
            error.style.display = 'none'
            if(width.matches) {
                info.style.display = 'block'
            }
            else {
                info.style.display = 'flex'
            }
        }
    })

})


/*--------------------------------------MAP--------------------------------------*/
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('This is your location.')
    .openPopup();