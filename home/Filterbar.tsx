// import { useState } from "react";
type FilterbarProps = {
  setFunctions: React.Dispatch<React.SetStateAction<any>>; 
};
export default function Filterbar({setFunctions}:FilterbarProps){
  
  function handledata(e:any){
    e.preventDefault()  
    const formData = new FormData(e.target);
    const city : string = (formData.get("city") || "").toString();  
    const longitude :string = (formData.get("longitude") || "").toString(); 
    const latitude = (formData.get("latitude") || "").toString();
    if(city != "" || longitude !== "" || latitude !== ""){
      setFunctions({city:city,lat:latitude,lon:longitude});
    }
    else{
      alert("Please,Provide any Data")
    }
  }
  return (
    <div className="search_bar_tabs">
      <form onSubmit={handledata}>
      <label htmlFor="city">City</label>
      <input id="city" name="city" type="text" placeholder="Search by City"/>
      <label htmlFor="latitude">Latitude</label>
      <input id="latitude" name="latitude" type="text" placeholder="Search by Latitude" />
      <label htmlFor="longitude">Longitude</label>
      <input id="longitude" name="longitude" type="text" placeholder="Search by Longitude" />
      <button type="submit">Fetch Data</button>
      </form>
    </div>
  )
}