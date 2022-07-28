import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;

    colors: {
      action: string;
      font: string;
      background: string;
      section: string;
      error: string;
    };
  }
}
