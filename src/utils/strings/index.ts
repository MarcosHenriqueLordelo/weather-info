import pt_br from "./pt-br";
import en_us from "./en_us";

const getStrings = (language: string): Strings => {
  switch (language) {
    case "pt-br":
      return pt_br;
    default:
      return en_us;
  }
};

export default getStrings;
