import { useMap } from "react-leaflet";
import L from "leaflet";

function PositionButton({ position }) {
  const map = useMap();
  const customButton = L.Control.extend({
    options: {
      position: position,
    },
    onAdd: function () {
      const button = L.DomUtil.create(
        "button",
        "leaflet-bar leaflet-control leaflet-control-custom"
      );
      button.innerHTML = "<img src='/location.svg' class='currentPosition' />";
      button.className = "customButton";

      button.onclick = function () {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (location) => {
              map.setView(
                [location.coords.latitude, location.coords.longitude],
                14
              );

              L.marker([location.coords.latitude, location.coords.longitude])
                .bindPopup("イマココ")
                .addTo(map);
            },
            (err) => {
              console.log(err);
            }
          );
        } else {
          console.log("ブラウザが対応していません");
        }
      };

      return button;
    },
  });

  map.addControl(new customButton());
}
export default PositionButton;