import thunderstorm from "../assets/backgrounds/thunderstormNight.jpg";
import fogSkyDay from "../assets/backgrounds/fogSkyDay.jpg";
import fogSkyNight from "../assets/backgrounds/fogSkyNight.jpg";
import clearSkyDay from "../assets/backgrounds/clearSkyDay.jpg";
import clearSkyNight from "../assets/backgrounds/clearSkyNight.jpg";
import cloudSkyDay from "../assets/backgrounds/cloudSkyDay.jpg";
import cloudSkyNight from "../assets/backgrounds/cloudSkyNight.jpg";
import rainSkyDay from "../assets/backgrounds/rainSkyDay.jpg";
import rainSkyNight from "../assets/backgrounds/rainSkyNight.jpg";
import snowDay from "../assets/backgrounds/snowDay.jpg";
import snowNight from "../assets/backgrounds/snowNight.jpg";

const getBackGroundImage = (id: number, day: boolean) => {
  if (id > 199 && id < 300) return thunderstorm;

  if (day) {
    if (id > 299 && id < 600) return rainSkyDay;
    if (id > 599 && id < 700) return snowDay;
    if (id > 799 && id < 800) return fogSkyDay;
    if (id > 800) return cloudSkyDay;
    return clearSkyDay;
  } else {
    if (id > 299 && id < 600) return rainSkyNight;
    if (id > 599 && id < 700) return snowNight;
    if (id > 799 && id < 800) return fogSkyNight;
    if (id > 800) return cloudSkyNight;
    return clearSkyNight;
  }
};

export default getBackGroundImage;
