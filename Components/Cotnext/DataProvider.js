import DataContext from "./data-context";
import { useEffect, useState } from "react";

const DataProvider = (props) => {
  const [count, setCount] = useState(1);
  const [listData, setListData] = useState([]);

  const [friendsCount, setFriendsCount] = useState(1);
  const [userId, setUserId] = useState(null);
  const [friendsData, setFriendsData] = useState([]);
  const [additionalFriends, setAdditionalFriends] = useState([]);

  const [name, setName] = useState([]);

  const addNameHandler = (fullName, Id, imgUrl, firstName, lastName) => {
    // Checking so that same user doesnot gets added twice
    if (!name.some((item) => item.Id === Id)) {
      setName((prevName) => [
        ...prevName,
        ...[
          {
            fullName: fullName,
            Id: Id,
            imgUrl: imgUrl,
            firstName: firstName,
            lastName: lastName,
          },
        ],
      ]);
    }
  };

  const idSetterHandler = (id) => {
    setUserId(id);
  };
  const addFriendsDataHandler = () => {
    setFriendsCount(friendsCount + 1);
  };

  useEffect(() => {
    if (userId) {
      // ensure that Id is defined before making the fetch call
      fetch(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}/friends/${friendsCount}/16`
      )
        .then((response) => {
          response.json().then((data) => {
            setFriendsData(data);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      // ensure that Id is defined before making the fetch call

      fetch(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}/friends/${friendsCount}/16`
      )
        .then((response) => {
          response.json().then((data) => {
            setAdditionalFriends(data.list);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [friendsCount]);

  useEffect(() => {
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${count}/16`
    )
      .then((response) => {
        response.json().then((newData) => {
          setListData((prevData) => [...prevData, ...newData.list]);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [count]);

  const addDataHandler = () => {
    setCount(count + 1);
  };

  const data = {
    data: listData,
    addData: addDataHandler,
    idSetter: idSetterHandler,
    addFriendsData: addFriendsDataHandler,
    friendsData: friendsData,
    additionalFriends: additionalFriends,
    addName: addNameHandler,
    nameList: name,
  };

  return (
    <DataContext.Provider value={data}>{props.children}</DataContext.Provider>
  );
};

export default DataProvider;
