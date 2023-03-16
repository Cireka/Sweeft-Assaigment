import DataContext from "./data-context";
import { useEffect, useState } from "react";

const DataProvider = (props) => {
  const [count, setCount] = useState(1);
  const [listData, setListData] = useState([]);

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
  };

  return (
    <DataContext.Provider value={data}>{props.children}</DataContext.Provider>
  );
};

export default DataProvider;
