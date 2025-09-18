import { useEffect, useState,useMemo } from "react";
import Filterbar from "./Filterbar";
import Template from "./Template";

function fetchData(api_id:string,values:string,setPrev:any):void{
  fetch(
      `http://api.weatherapi.com/v1/current.json?key=${api_id}&q=${values}`
    ).then((res) => {
      res.json().then((data) => {
       (setPrev(data));
      });
    });
}

function dataFetching(api: string, data:any,setFunction:any) {
  console.log(data)
  if (data.city !== "") {
    fetchData(api,data.city,setFunction)
  } else if (data.lat !== "" && data.lon !== "") {
    fetchData(api,`${data.lat},${data.lon}`,setFunction)
  }
}

function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          city:"",
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        reject(err.message);
      }
    );
  });
}
interface stateType{
  city:string;
  lat:string;
  lon:string
}
export default function Home() {
  const [data, setData] = useState<stateType>({city:"",lat:"",lon:""});
  const [prev,setPrev] = useState<object>({})
  const API_KEY = "99f96237abf34c7d84d62740251709";

const template = useMemo(() => {
  console.log("Template re-computed with", prev);
  return Object.entries(prev).length !== 0 ? <Template objCurrent={prev.current} objLocation={prev.location} /> : <p>hello</p>;
}, [prev]);

  useEffect(() => {
    if (data.city === "" && data.lat === "" && data.lon === "") {
      async function fetchLocation() {
        try {
          const loc: any = await getUserLocation();
          console.log(loc,"he")
          setData(loc);
        } catch (err: any) {
          alert("Sorry,We Can't get the current location");
        }
      }
      fetchLocation();
    } else {
      console.log(data.city)
      dataFetching(API_KEY, {...data},setPrev);
    }
  }, [data]);
  return (
    <div className="home_page">
      <Filterbar setFunctions={setData} />
      {template}
    </div>
  );
}
