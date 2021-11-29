import { Url } from "url";

export class blog {
  title: string;
  author: string;
  image?: Url;
  date: number;
  blurb: string;
  bodyText: string;
  uid?: string;
}
