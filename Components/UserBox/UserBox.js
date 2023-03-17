import style from "./UserBox.module.css";
import { useRouter } from "next/router";

const UserBox = (props) => {
  const fullName = `${props.prefix}${props.name} ${props.lastName}`;

  const router = useRouter();
  const BoxClickHandler = () => {
    router.push({
      pathname: `/personId${props.id}`,
      query: {
        Id: props.id,
        imgUrl: `http://placeimg.com/640/480/animals?v=${props.id}`,
        name: fullName,
        firstName: props.name,
        lastName: props.lastName,
      },
    });
  };

  return (
    <div onClick={BoxClickHandler} className={style.BoxParrent}>
      <img
        className={style.Test}
        src={`http://placeimg.com/640/480/animals?v=${props.id}`}
        alt="User Image"
      />
      <strong>
        {props.prefix} {props.name} {props.lastName}
      </strong>
      <p>{props.jobTitle}</p>
    </div>
  );
};
export default UserBox;
