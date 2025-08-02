"use client";

interface FileResource {
  id: string;
  name: string;
  url: string;
}

interface FilesListProps {
  resources: FileResource[];
}

export function FilesList({ resources }: FilesListProps) {
  if (resources.length === 0) {
    return <p className="text-gray-500">No files available.</p>;
  }

  return (
    <ul className="space-y-2">
      {resources.map((f) => (
        <li key={f.id}>
          <a
            href={f.url}
            download={f.name}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {f.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
