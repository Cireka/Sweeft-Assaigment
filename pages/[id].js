import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import style from "./personal.module.css";

function Person() {
  const [personalData, setPersonalData] = useState(null);
  const router = useRouter();
  const { Id, imgUrl } = router.query;

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

  console.log(personalData);

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
          <div className={style.Address}></div>
        </div>
      )}
    </div>
  );
}

export default Person;
