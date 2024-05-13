"use client";

import { useState } from "react";
import { json2ts } from "json-ts";

export default function Home() {
  const [file, setFile] = useState([]);
  const [fileName, setFileName] = useState("");
  const [objectName, setObjectName] = useState("");

  const setFileHandler = (e) => {
    setFile(e.target.files?.[0]);
  };

  const generate = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const contents = event.target?.result as string;
        const body = JSON.parse(contents);
        const bodyTs = json2ts(JSON.stringify(body), { rootName: objectName });
        fetch("/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: bodyTs,
            filename: fileName,
          }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error("Error:", error));
      };
      reader.readAsText(file);
    }
  };

  return (
    <div style={{ color: "black" }}>
      <input
        placeholder="file name"
        onChange={(e) => setFileName(e.target.value)}
      />
      <br />
      <br />
      <input
        placeholder="object name"
        onChange={(e) => setObjectName(e.target.value)}
      />
      <br />
      <br />
      <input
        type="file"
        id="files"
        name="files"
        accept=".json"
        // multiple
        onChange={(e) => {
          setFileHandler(e);
        }}
      />
      <br />
      <br />
      <button onClick={generate}>Generate</button>
    </div>
  );
}
