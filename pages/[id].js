import { useRouter } from "next/router";

function Person() {
  const router = useRouter();
  const { Id } = router.query;
  console.log(Id);

  return (
    <div>
      <h1>Person {Id}</h1>
    </div>
  );
}

export default Person;
