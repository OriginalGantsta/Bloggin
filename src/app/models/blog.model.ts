import { Url } from "url";

export class Blog {
  title: string;
  author: string;
  image?: string;
  imageDescription?: string;
  date: number | string;
  blurb: string;
  bodyText: string;
  uid?: string;
  bid?: string;
  likes?: any;
  likesCount?: number;
}
