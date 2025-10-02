type TemplateProps = {
  objCurrent: any;
  objLocation: any;
};
export default function Template({objCurrent,objLocation}:TemplateProps){
  console.log(objCurrent,"hello",objLocation);
return (
  <div className="weather_tab">
    <div className="separate">
    <div className="location_names" >
    <h1>{objLocation.name}</h1>
    <p>Region - <b>{objLocation.region},{objLocation.country}</b></p>
    <p>Zone - <b>{objLocation.tz_id}</b></p></div>
    <div className="latlon">
      <h4>Latitude : {objLocation.lat}</h4>
      <h4>Longitude : {objLocation.lon}</h4>
    </div>
    </div>
    <div className="img_tab">
      <h2>{objCurrent.condition.text} - {objCurrent.temp_c}<span style={{fontSize:"20px"}}>&#8451;</span></h2>
   <img src={objCurrent.condition.icon} />
        <h4 style={{'color':"black"}}> Humidity :{objCurrent.humidity}</h4>
    </div>
    

  </div>
)

}