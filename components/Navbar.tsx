import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

interface Menu {
  id: number;
  name: string;
  slug: string;
  locale: string;
  publishDate: string;
  web: {
    id: number;
  };
  data: {
    items: MenuItem[];
  };
}

interface MenuItem {
  name: string;
  uri: string;
}

export const Navbar = () => {
  const [links, setLinks] = useState<MenuItem[]>();
  console.log(links);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<Menu>(
          "https://acecmsmock.z6.web.core.windows.net/api/content/2"
        );
        const response = res.data.data;
        setLinks(response.items);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <nav>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: "1rem",
          fontSize: "1.5rem",
        }}
      >
        {links?.map((link) => (
          <li key={link.name}>
            <Link href={`${link.uri}`}>{link.name}</Link>
          </li>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: "1rem",
          fontSize: "1.5rem",
        }}
      >
        <Link href="/articles">Articles</Link>
      </div>
    </nav>
  );
};
