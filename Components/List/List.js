import style from "./List.module.css";
import UserBox from "../UserBox/UserBox";
import DataContext from "../Cotnext/data-context";
import { useContext } from "react";

const List = () => {
  const ctx = useContext(DataContext);
  let data = ctx.data;

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY; // current vertical position of scroll bar
      const height = document.documentElement.scrollHeight - window.innerHeight; // height of the page
      const scrolled = Math.floor((scrollY / height) * 100); // percentage scrolled

      if (scrolled === 100) {
        ctx.addData();
      }
    });
  }

  return (
    <div className={style.ListParrent}>
      {data.map((item) => (
        <UserBox
          id={item.id}
          key={Math.random()}
          lastName={item.lastName}
          name={item.name}
          img={item.imageUrl}
          jobTitle={item.title}
          prefix={item.prefix}
        />
      ))}
    </div>
  );
};

export default List;
