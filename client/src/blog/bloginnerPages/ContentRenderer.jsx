import React from "react";
import { Link } from "react-router-dom";

export function renderTextWithLinks(text) {
  if (!text) return null;

  // Step 1: split by link pattern
  const linkRegex = /\{\{link:([^|]+)\|([^}]+)\}\}/g;
  const parts = text.split(linkRegex);

  return parts.map((part, index) => {
    // Normal text OR bold handling
    if (index % 3 === 0) {
      // Handle **bold** inside normal text
      return part.split(/(\*\*.*?\*\*)/g).map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**")) {
          return (
            <strong key={`${index}-${i}`} className="font-bold text-gray-900">
              {p.replace(/\*\*/g, "")}
            </strong>
          );
        }
        return <span key={`${index}-${i}`}>{p}</span>;
      });
    }

    // Label (ignore, used with slug)
    if (index % 3 === 1) return null;

    // Slug/URL → Link
    if (index % 3 === 2) {
      const label = parts[index - 1];
      const target = part;

      if (target.startsWith("http://") || target.startsWith("https://")) {
        return (
          <a
            key={index}
            href={target}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-semibold hover:underline"
          >
            {label}
          </a>
        );
      }

      return (
        <Link
          key={index}
          to={`/blog/${target}`}
          className="text-blue-600 font-semibold hover:underline"
        >
          {label}
        </Link>
      );
    }

    return null;
  });
}

export default function ContentRenderer({ block }) {
  if (!block || !block.type) return null;

  switch (block.type) {
    case "heading":
      return (
        <h2 className="text-2xl sm:text-3xl font-extrabold mt-10 mb-4 text-gray-900 tracking-tight border-b border-gray-100 pb-2">
          {block.text}
        </h2>
      );

    case "subHeading":
      return (
        <h3 className="text-xl sm:text-2xl font-bold mt-8 mb-3 text-gray-900">
          {block.text}
        </h3>
      );

    case "subSubHeading":
      return (
        <h4 className="text-lg font-bold mt-6 mb-2 text-gray-800">
          {block.text}
        </h4>
      );

    case "paragraph":
      return (
        <div className="mb-6">
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            {renderTextWithLinks(block.text)}
          </p>
          {block.image && (
            <div className="flex justify-center items-center my-8 overflow-hidden rounded-2xl border border-gray-200 shadow-sm max-h-[450px] md:max-h-[550px] w-full">
              <img
                src={block.image}
                alt={block.alt || "image"}
                className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
              />
            </div>
          )}
        </div>
      );

    case "paragraphbold": {
      const [heading, ...rest] = (block.text || "").split("\n");
      const bodyText = rest.join("\n");

      return (
        <div className="mb-6 bg-gray-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
          {heading && (
            <span className="block font-bold text-gray-900 mb-1 text-base sm:text-lg">
              {heading}
            </span>
          )}
          <p className="text-gray-700 text-base leading-relaxed">
            {renderTextWithLinks(bodyText || heading)}
          </p>
        </div>
      );
    }

    case "imageLeftText":
      return (
        <div className="flex flex-col md:flex-row gap-8 items-center my-8">
          <div className="w-full md:w-1/2 overflow-hidden rounded-xl border border-gray-200 shadow-xs">
            <img
              src={block.image}
              alt={block.alt || "content image"}
              className="w-full h-auto object-cover hover:scale-103 transition-transform duration-500"
            />
          </div>
          <div className="w-full md:w-1/2 text-gray-700 text-base sm:text-lg leading-relaxed">
            {renderTextWithLinks(block.text)}
          </div>
        </div>
      );

    case "imageRightText":
      return (
        <div className="flex justify-center items-center my-8 overflow-hidden rounded-2xl border border-gray-200 shadow-xs max-h-[450px] md:max-h-[550px] w-full">
          <img
            src={block.image}
            alt={block.alt || "image"}
            className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
          />
        </div>
      );

    case "list":
      return block.variant === "ordered" ? (
        <ol className="list-decimal ml-6 text-gray-700 mb-6 space-y-2 text-base sm:text-lg">
          {(block.items || []).map((item, i) => (
            <li key={i}>
              {typeof item === "string" ? renderTextWithLinks(item) : renderTextWithLinks(item?.text)}
            </li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc ml-6 text-gray-700 mb-6 space-y-2 text-base sm:text-lg">
          {(block.items || []).map((item, i) => (
            <li key={i}>
              {typeof item === "string" ? renderTextWithLinks(item) : renderTextWithLinks(item?.text)}
            </li>
          ))}
        </ul>
      );

    case "linkList":
      return (
        <ul className="list-disc ml-6 text-gray-700 mb-6 space-y-2 text-base sm:text-lg">
          {(block.items || []).map((item, i) => (
            <li key={i}>{renderTextWithLinks(typeof item === "string" ? item : item?.text)}</li>
          ))}
        </ul>
      );

    case "boldList":
      return (
        <ul className="list-disc ml-6 text-gray-700 mb-6 space-y-2.5 text-base sm:text-lg">
          {(block.items || []).map((item, i) => (
            <li key={i}>
              {item.bold && (
                <span className="font-bold text-gray-900 mr-1.5">
                  {item.bold}
                </span>
              )}
              {renderTextWithLinks(item.text)}
            </li>
          ))}
        </ul>
      );

    case "boldListpara":
      return (
        <ul className="list-none ml-0 mb-6 space-y-3">
          {(block.items || []).map((item, i) => (
            <li key={i} className="p-3.5 bg-gray-50 border-l-4 border-[#0096FF] rounded-r-xl text-gray-700 text-base sm:text-lg">
              {item.bold && (
                <span className="font-bold text-gray-900 block mb-1">
                  {item.bold}
                </span>
              )}
              {renderTextWithLinks(item.text)}
            </li>
          ))}
        </ul>
      );

    case "unorderedBoldListdecimal":
      return (
        <ol className="list-decimal ml-6 text-gray-700 mb-6 space-y-2.5 text-base sm:text-lg">
          {(block.items || []).map((item, i) => (
            <li key={i}>
              {item.bold && (
                <span className="font-bold text-gray-900 mr-1.5">
                  {item.bold}
                </span>
              )}
              {renderTextWithLinks(item.text)}
            </li>
          ))}
        </ol>
      );

    case "table":
      return (
        <div className="my-8 w-full overflow-x-auto rounded-xl border border-gray-200 shadow-xs bg-white">
          <table className="w-full text-left border-collapse text-sm sm:text-base">
            {block.headers && block.headers.length > 0 && (
              <thead>
                <tr className="bg-gray-100/80 text-gray-900 font-bold border-b border-gray-200">
                  {block.headers.map((header, i) => (
                    <th
                      key={i}
                      className="p-3.5 sm:p-4 font-bold border-r border-gray-200 last:border-r-0 tracking-wide text-gray-900"
                    >
                      {renderTextWithLinks(header)}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            {block.rows && block.rows.length > 0 && (
              <tbody className="divide-y divide-gray-200 text-gray-700">
                {block.rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="hover:bg-gray-50/70 transition-colors duration-150"
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="p-3.5 sm:p-4 border-r border-gray-200 last:border-r-0 leading-relaxed"
                      >
                        {renderTextWithLinks(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      );

    case "video": {
      const getEmbedUrl = (url) => {
        if (!url) return "";
        if (url.includes("youtube.com/watch?v=")) {
          return url.replace("watch?v=", "embed/");
        }
        if (url.includes("youtu.be/")) {
          return url.replace("youtu.be/", "youtube.com/embed/");
        }
        return url;
      };

      return (
        <div className="my-8 aspect-video w-full overflow-hidden rounded-2xl border border-gray-200 shadow-md">
          <iframe
            src={getEmbedUrl(block.url)}
            title={block.title || "Embedded Video"}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    default:
      return null;
  }
}