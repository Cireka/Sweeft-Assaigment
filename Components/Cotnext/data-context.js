import React from "react";

const DataContext = React.createContext({
  data: [],
  friendsData: [],
  additionalFriends: [],
  idSetter: (id) => {},
  addFriendsData: () => {},
  addData: () => {},
});

export default DataContext;
