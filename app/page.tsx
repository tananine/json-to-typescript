"use client";

import { useState } from "react";
import { json2ts } from "json-ts";

export default function Home() {
  const [file, setFile] = useState([]);

  const setFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const contents = event.target?.result as string;
        const body = JSON.parse(contents).res_body.data;
        const bodyTs = json2ts(JSON.stringify(body));
        fetch("/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: bodyTs, filename: "test" }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error("Error:", error));
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <input
        type="file"
        id="files"
        name="files"
        accept=".json"
        multiple
        onChange={setFileHandler}
      />
      <br />
      <br />
      <input type="submit" />
    </>
  );
}
