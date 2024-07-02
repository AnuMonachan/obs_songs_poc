"use client";
import { api } from "~/trpc/react";
import React, { useState } from "react";
import MarkDown from 'react-markdown';

export default function Stories() {
  const baseURL =
    "https://raw.githubusercontent.com/Bridgeconn/vachancontentrepository/master/obs/";
  //   const directionData = api.get.getDirections.useQuery().data;
  const languages = api.get.getLanguages.useQuery().data;
  //   const languageData = api.get.getLanguageData.useQuery().data;
  const obsDetails = api.get.getObsLanguages.useQuery().data;
  const [selectedLangcode, setSelectedLangcode] = useState<string | null>(null);
  const [selectedStoryId, setSelectedStoryId] = useState<number | null>(null);
  const [markdownContent, setMarkdownContent] = useState<string>("");

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedLangcode(event.target.value);
    setSelectedStoryId(null); 
  };

  const handleStoryClick = async (storyId: number) => {
    setSelectedStoryId(storyId);

    try {
      const response = await fetch(
        `${baseURL}${selectedLangcode}/content/${storyId.toString().padStart(2, "0")}.md`,
      );
      const markdown = await response.text();
      setMarkdownContent(markdown);
      if (!response.ok) {
        throw new Error("Failed to fetch Markdown content");
      }
    } catch (error) {
      console.error("Error fetching Markdown content:", error);
      setMarkdownContent("Failed to load content");
    }
  };

  return (
    <div className="flex justify-between p-4">
      <div className="w-1/4">
        <label className="mb-2 block">Select Language:</label>
        <select
          onChange={handleLanguageChange}
          value={selectedLangcode ?? ""}
          className="w-full rounded border border-gray-300 p-2"
        >
          <option value="">Select a language</option>
          {languages?.map((lang) => (
            <option key={lang.langcode} value={lang.langcode ?? ""}>
              {lang.languagename}
            </option>
          ))}
        </select>

        {selectedLangcode && (
          <div className="max-h-screen w-full overflow-y-auto mt-4">
            <h3 className="mb-2 text-lg font-bold">
              Stories in{" "}
              {
                languages?.find((lang) => lang.langcode === selectedLangcode)
                  ?.languagename
              }
            </h3>
            <ul className="list-none p-0">
              {obsDetails
                ?.filter((story) => story.langcode === selectedLangcode)
                .map((story) => (
                  <li key={story.id} className="mb-2">
                    <button
                      onClick={() => handleStoryClick(story?.story_id)}
                      className="block w-full overflow-hidden truncate whitespace-nowrap rounded bg-gray-200 p-2 text-left hover:bg-gray-300"
                      title={story.story_name ?? ""}
                    >
                      {story.story_name}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>

      <div className="max-h-screen w-full overflow-y-auto ml-4 w-3/4">
        {selectedStoryId !== null && (
          <div>
          <h3 className="text-lg font-bold mb-2">Story</h3>
          <div className="bg-white p-4 rounded shadow-md">
              <MarkDown>{markdownContent}</MarkDown>
          </div>
      </div>
        )}
      </div>
    </div>
  );
}
