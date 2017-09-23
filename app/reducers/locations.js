import uuid from 'uuid';
console.info(uuid());
const dummyLocations = [
  {
    id: '5388e5fc-9789-4d68-a747-23d0dc1c4d7d',
    name: 'The best bar',
    address: '10 Dizeingoff str. , Tel Aviv, Israel',
    coordinates: {
      lat: 32.10,
      lon: 34.85
    },
    cat: ['6cc4f0f8-1232-4a64-b581-a72bcdcd14ce']
  },
  {
    id: 'd8c55c3a-18a4-4286-aeee-1980c8196c0d',
    name: 'Restaurant good',
    address: '150 Hertzel str. , Haifa',
    coordinates: {
      lat: 32.79,
      lon:34.89
    },
    cat: ['e88dbdb3-49b9-410c-ace3-d49aeaa3a820']
  },
  {
    id: '46513f0b-1a03-469c-80bb-4344656992ba',
    name: 'Shopping Center',
    address: '1 Rotchild str. , Jerusalem',
    coordinates: {
     lat: 31.77,
     lon: 35.21
    },
    cat: ['c3b7faeb-9103-4a0b-8fa1-4ec5c4f7401e']
  }
];

export default function locationsReducer(locData = dummyLocations, action) {

  if (action.type === 'ADD_LOCATION') {
console.info(action);
    const newID = uuid();
    let newLocData = [...locData];
    newLocData.push({
      id: uuid(),
      name: action.name,
      address: action.address,
      coordinates: {
        lat: parseInt(action.lat),
        lon: parseInt(action.lon)
      },
      cat: action.catArr
    });
    return newLocData;
  }


  return locData
}


