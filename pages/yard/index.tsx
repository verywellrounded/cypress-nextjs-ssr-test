import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function Yard({
  data, // Access the "data" prop directly
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <textarea data-cy="resultsBox">{data[0]["name"]["common"]}</textarea>
    </>
  );
}

export const getServerSideProps = async () => {
  console.log("Calling the api");
  const allCountries = (
    await axios.get(`https://restcountries.com/v3.1/all?name`)
  ).data;
  console.log("axios data res", allCountries);
  const data = allCountries;
  console.log(data[0]["name"]["common"]);

  const thingsToReturn: any = { props: { data } };
  return thingsToReturn;
};
