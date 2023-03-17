import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from "./personal.module.css";
import DataContext from "@/Components/Cotnext/data-context";
import { useContext } from "react";
import UserBox from "@/Components/UserBox/UserBox";
import Link from "next/link";

function Person() {
  const [personalData, setPersonalData] = useState(null);
  const [userFriends, setUserFriends] = useState(null);

  const router = useRouter();
  const { name, Id, imgUrl, firstName, lastName } = router.query;
  const ctx = useContext(DataContext);

  useEffect(() => {
    if (name && Id && imgUrl && firstName && lastName) {
      ctx.addName(name, Id, imgUrl, firstName, lastName);
    }
  }, [name, Id, imgUrl, firstName, lastName]);


  useEffect(() => {
    if (userFriends === null) {
      setUserFriends(ctx.friendsData);
    } else {
      setUserFriends(ctx.friendsData.list);
    }
  }, [ctx.friendsData]);

  useEffect(() => {
    setUserFriends((prevData) => [...prevData, ...ctx.additionalFriends]);
  }, [ctx.additionalFriends]);

  useEffect(() => {
    if (Id) {
      // ensure that Id is defined before making the fetch call
      fetch(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${Id}`
      )
        .then((response) => {
          response.json().then((data) => {
            setPersonalData(data);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [Id]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY; // current vertical position of scroll bar
      const height = document.documentElement.scrollHeight - window.innerHeight; // height of the page
      const scrolled = Math.floor((scrollY / height) * 100); // percentage scrolled

      if (scrolled === 100) {
        ctx.addFriendsData();
      }
    });
  }

  useEffect(() => {
    if (Id) {
      ctx.idSetter(Id);
    }
  }, [Id]);

  return (
    <div className={style.PersonalPage}>
      {personalData && (
        <div className={style.personalInfoParrent}>
          <img width={250} height={200} alt="personal image" src={imgUrl} />
          <div className={style.PersonalInformationParrent}>
            <p className={style.HoveringText}>Info</p>
            <div className={style.NameParrent}>
              <h1>
                {personalData.prefix} {personalData.name}{" "}
                {personalData.lastName}
              </h1>
              <p>{personalData.title}</p>
            </div>
            <div className={style.ListOfTitles}>
              <p>
                <u>Email</u>: {personalData.email}
              </p>
              <p>
                <u>Ip Address</u>: {personalData.ip}
              </p>
              <p>
                <u>Ip Address</u>: {personalData.ip}
              </p>
              <p>
                <u>Job Area</u>: {personalData.jobArea}
              </p>
              <p>
                <u>Job Type</u>: {personalData.jobType}
              </p>
            </div>
          </div>
          <div className={style.Address}>
            <div className={style.AddressContainer}>
              <p className={style.HoveringAddress}>Address</p>
              <h2>{personalData.company.name}</h2>
              <p>
                <u>Citty</u>: {personalData.address.city}
              </p>
              <p>
                <u>Country</u>: {personalData.address.country}
              </p>
              <p>
                <u>State</u>: {personalData.address.state}
              </p>
              <p>
                <u>Street Address</u>: {personalData.address.streetAddress}
              </p>
              <p>
                <u>ZIP</u>: {personalData.address.zipCode}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className={style.VisitedParrent}>
        {ctx.nameList.map((item) => {
          return (
            <Link
              key={Math.random()}
              className={style.Visited}
              href={`http://localhost:3000/personId2?Id=${item.Id}&imgUrl=${item.imgUrl}&name=${item.firstName}+${item.lastName}r`}
            >
              {item.fullName}
            </Link>
          );
        })}
      </div>
      <h2 className={style.FriendsTitle}>Friends:</h2>
      <div className={style.ListParrent}>
        {userFriends &&
          userFriends.map((item) => (
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
    </div>
  );
}

export default Person;
