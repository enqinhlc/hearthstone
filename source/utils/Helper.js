export const sortCardsByMechanics = mainData => {
  let cardList = {};
  let cardData = {};
  let mechanicList = [];

  let dataKeys = Object.keys(mainData);
  let indexId = {};
  let mechanicId = 0;
  dataKeys.map((type, index) => {
    mainData[type].map(data => {
      if (data.mechanics) {
        data.mechanics.map(mechanic => {
          if (!cardList[mechanic.name]) {
            indexId[mechanic.name] = 0;
            cardList[mechanic.name] = { mechanicId, data: [] };
            mechanicList[mechanicId] = { id: mechanicId, name: mechanic.name };
            mechanicId++;
          }

          const cardIndexId = indexId[mechanic.name];

          data.cardIndexId = cardIndexId;
          data.mainType = type;
          cardList[mechanic.name].data[cardIndexId] = data;
          indexId[mechanic.name]++;
        });
      }
    });
  });
  return { cardList, mechanicList };
};

export const sortCardSets = data => {
  return Object.keys(data);
};

export const delay = sec =>
  new Promise(resolve => setTimeout(resolve, sec * 1000));

export const handleDataByIndex = (data, minIndex = 0, per = 100) => {
  const maxIndex = minIndex + per;
  return data.filter((v, index) => {
    // index must be bigger than minIndex
    // index must be maximum minIndex + perPage;
    return index > minIndex && index < maxIndex;
  });
};
