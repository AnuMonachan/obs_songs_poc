"use client";
import { api } from "~/trpc/react";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

interface Song {
  id: number;
  langcode: string;
  name: string;
  url: string;
  lyrics: string;
}

const Songs = () => {
  const languages = api.get.getSongLanguages.useQuery().data;
  const songs = api.get.getSongDetails.useQuery().data;

  const [selectedLangcode, setSelectedLangcode] = useState<string>("");
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [markdownContent, setMarkdownContent] = useState<string>("");

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedLangcode = event.target.value;
    setSelectedLangcode(selectedLangcode);
    setSelectedSong(null); // Reset selected song when language changes
    setMarkdownContent(""); // Clear markdown content when language changes
  };

  const handleSongSelect = (song: Song) => {
    setSelectedSong(song);
    if (song.lyrics) {
      fetch(song.lyrics)
        .then((response) => response.text())
        .then((data) => setMarkdownContent(data))
        .catch((error) => console.error("Error fetching lyrics:", error));
    } else {
      console.error("Lyrics URL is missing for the selected song.");
    }
  };

  return (
    <div className="container max-h-screen mx-auto px-4 py-8">
      <div className="mb-4 w-1/4">
        <label
          htmlFor="language"
          className="mb-2 block text-lg font-medium text-gray-700"
        >
          Select Language:
        </label>
        <select
          id="language"
          className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          value={selectedLangcode || ""}
          onChange={handleLanguageChange}
        >
          <option value="">Select a language</option>
          {languages?.map((lang) => (
            <option key={lang.id} value={lang.langcode??""}>
              {lang.language_name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="max-h-screen w-full overflow-y-auto sm:w-1/3">
          {selectedLangcode && (
            <div className="space-y-2">
              {songs?.filter((song) => song.langcode === selectedLangcode)
                .map((song) => (
                  <div
                    key={song.id}
                    className="cursor-pointer rounded-md border p-4 hover:bg-gray-100"
                    onClick={() => handleSongSelect(song)}
                  >
                    <p
                      className="truncate text-lg font-medium text-gray-800"
                      title={song.name??""}
                    >
                      {song.name}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="w-full sm:w-2/3">
          {" "}
          {selectedSong && (
            <div className="rounded-md border bg-gray-50 p-4">
              <h2 className="mb-4 text-xl font-medium text-gray-800">
                {selectedSong.name}
              </h2>
              <audio controls className="mb-4 w-full">
                <source src={selectedSong.url} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
              <div className="prose">
                <ReactMarkdown>{markdownContent}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Songs;
