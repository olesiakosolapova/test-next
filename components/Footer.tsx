import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export interface FooterLink {
  name: string;
  url: string;
}

export interface FooterColumn {
  links: FooterLink[];
}

export interface FooterData {
  id: number;
  name: string;
  slug: string;
  locale: string;
  publishDate: string;
  web: {
    id: number;
  };
  data: {
    columns: FooterColumn[];
    address: string;
    facebook: string;
    twitter: string;
    youtube: string;
    instagram: string;
    copyright: string;
  };
}
export const Footer = () => {
  const [data, setData] = useState<FooterData["data"] | undefined>();
  console.log(data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<FooterData>(
          "https://acecmsmock.z6.web.core.windows.net/api/content/1"
        );
        const data = response.data;
        console.log("here");
        setData(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <footer
      style={{ backgroundColor: "#f5f5f5", padding: "20px", marginTop: "50px" }}
    >
      {data && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {data.columns.map((link) =>
            link.links.map((link) => (
              <li key={link.name}>
                <Link href={`${link.url}`}>{link.name}</Link>
              </li>
            ))
          )}
          <div>{data.address}</div>
          <div>{data.facebook}</div>
          <div>{data.twitter}</div>
          <div>{data.youtube}</div>
          <div>{data.instagram}</div>
          <div>{data.copyright}</div>
        </div>
      )}
    </footer>
  );
};
