function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin + 1) + newMin);
  // The maximum is inclusive and the minimum is inclusive
}

function restoArrayGenerator(arr) {
  // console.log('Fired Restaurant Array Generator');
  console.table(arr); // this is called "dot notation"
  const range = [...Array(15).keys()];
  const listItems = range.map((item, index) => {
    const randResto = getRandomIntInclusive(0, arr.length - 1);
    return arr[randResto];
  });
  return listItems;
}

function generateHtmlList(collection) {
  // console.log('Fired HTML Generator');
  // console.log(collection);
  const targetList = document.querySelector('.resto-list');
  targetList.innerHTML = '';
  collection.forEach((item) => {
    const {name} = item;
    const displayName = name.toLowerCase();
    const injectThisItem = `<li>${displayName}</li>`;
    targetList.innerHTML += injectThisItem;
  });
}

async function mainEvent() { // the async keyword means we can make API requests
  console.log('script loaded');
  const form = document.querySelector('#main-form');
  const submit = document.querySelector('.submit-button');
  const resto = document.querySelector('#resto_name');
  const zipcode = document.querySelector('#zipcode');
  submit.style.display = 'none';
  const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
  const arrayFromJson = await results.json(); // This changes it into data we can use - an object
  // console.log(arrayFromJson);
  // The if statement is to prevent race condition on dataload
  if (arrayFromJson.data.length > 0) {
    submit.style.display = 'block';
    let currentArray = [];
    resto.addEventListener('input', async (event) => {
      if (currentArray === undefined) { return; }
      console.log(event.target.value);
      if (currentArray.length < 1) {
        // console.log('empty);
        return;
      }
      const matchResto = currentArray.filter((item) => {
        const lowerName = item.name.toLowerCase();
        const lowerValue = event.target.value.toLowerCase();
        return lowerName.includes(lowerValue);
      });
      generateHtmlList(matchResto);
      // console.log(matchResto);
    });
    zipcode.addEventListener('input', async (event) => {
      if (currentArray === undefined) { return; }
      console.log(event.target.value);
      if (currentArray.length < 1) {
        // console.log('empty);
        return;
      }
      const matchZip = currentArray.filter((item) => {
        const itemZip = item.zip;
        const itemValue = event.target.value;
        return itemZip.includes(itemValue);
      });
      generateHtmlList(matchZip);
    });
    form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
      submitEvent.preventDefault(); // This prevents your page from refreshing!
      // console.log('form submission'); // this is substituting for a "breakpoint"
      // arrayFromJson.data - we're accessing a key called 'data' on the returned object
      // it contains all 1,000 records we need
      currentArray = restoArrayGenerator(arrayFromJson.data);
      generateHtmlList(currentArray);
    });
  }
}

// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
