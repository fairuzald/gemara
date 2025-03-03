import Konva from 'konva';
import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

// Specify the type for stageRef
export const stageRef = React.createRef<Konva.Stage>();

interface CustomImageProps {
  url: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
}
export const handleCreateImage = (): Promise<Blob | null> => {
  return new Promise((resolve) => {
    const stage = stageRef.current;

    if (!stage) {
      resolve(null);
      return;
    }

    const fileName = Math.random().toString(36);
    if (!fileName) {
      resolve(null);
      return;
    }

    stage.toCanvas().toBlob((blob: Blob | null) => {
      if (blob) {
        // You can perform any additional processing here if needed
        resolve(blob);
      } else {
        resolve(null);
      }
    }, 'image/png');
  });
};
export const CustomImage: React.FC<CustomImageProps> = ({
  url,
  x,
  y,
  width,
  height,
  rotate,
}) => {
  const [image] = useImage(url, 'anonymous');

  return (
    <>
      <Image
        image={image}
        x={x}
        y={y}
        width={width}
        height={height}
        rotation={rotate}
      />
    </>
  );
};
export const handleExport = () => {
  // Ensure stageRef.current is not null
  const stage = stageRef.current;
  if (stage) {
    // Prompt user for filename and directory
    const fileName = prompt('Enter a filename:', 'custom-bead-image');
    if (!fileName) return; // User canceled or entered an empty name

    const link = document.createElement('a');

    // Use a Blob to handle the download
    stage.toCanvas().toBlob((blob: Blob | null) => {
      if (blob) {
        const url = URL.createObjectURL(blob);

        link.href = url;
        link.download = `${fileName}.png`;

        // Trigger the download
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    }, 'image/png');
  }
};
