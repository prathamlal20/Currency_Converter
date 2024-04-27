const base_url = "https://2024-03-06.currency-api.pages.dev/v1/currencies";

const btn = document.querySelector('form button');

const dropdowns = document.querySelectorAll(".dropdown select");
const msg = document.querySelector('.msg');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');


for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if(select.name==="from" && currCode==="USD"){
            newOption.selected = "selected";
        }
        else if(select.name==="to" && currCode==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    // console.log(countryCode)
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener('click',async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector('.amount input');
    let amtVal = amount.value;;
    if(amtVal===''||amtVal<1){
        amtVal=1;
        amount.value="1";
    }

    let currCodeFrom = fromCurr.value.toLowerCase();
    // console.log(currCodeFrom);
    let currCodeTo = toCurr.value.toLowerCase();

    const URL_from = `${base_url}/${fromCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL_from);
    // console.log(response);
    let data = await response.json();
    data = data[currCodeFrom];
    let rate = data[currCodeTo];
    let final_amount = amtVal*rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${final_amount} ${toCurr.value}`;


});


 

