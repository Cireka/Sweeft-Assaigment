import React from "react";

const DataContext = React.createContext({
  data: [],
  friendsData: [],
  additionalFriends: [],
  idSetter: (id) => {},
  addFriendsData: () => {},
  addData: () => {},
  addName: (fullName, Id, imgUrl, firstName, lastName) => {},
  nameList: [],
});

export default DataContext;
