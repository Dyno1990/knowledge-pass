export interface CertificateImageDetails {
  name: string;
  moduleTitle: string;
  issuedDate: string;
  certificateId: string;
}

const TEMPLATE_URL = "/certificate-template.png";
const WIDTH = 1536;
const HEIGHT = 1024;

function loadTemplate(): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Certificate template could not be loaded."));
    image.src = TEMPLATE_URL;
  });
}

function fitCenteredText(
  context: CanvasRenderingContext2D,
  text: string,
  y: number,
  maxWidth: number,
  maximumSize: number,
  minimumSize: number,
  family: string,
) {
  let size = maximumSize;
  do {
    context.font = `${size}px ${family}`;
    size -= 2;
  } while (context.measureText(text).width > maxWidth && size >= minimumSize);
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, WIDTH / 2, y, maxWidth);
}

export async function renderCertificateImage(details: CertificateImageDetails): Promise<HTMLCanvasElement> {
  const template = await loadTemplate();
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is not available in this browser.");

  context.drawImage(template, 0, 0, WIDTH, HEIGHT);
  context.fillStyle = "#0b2851";
  fitCenteredText(context, details.name.trim().toUpperCase(), 450, 900, 78, 42, 'Georgia, "Times New Roman", serif');
  fitCenteredText(context, details.moduleTitle, 642, 920, 48, 32, 'Georgia, "Times New Roman", serif');

  context.font = '22px Arial, sans-serif';
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.fillText(details.issuedDate, 475, 790, 320);
  context.fillText(details.certificateId || "—", 1015, 790, 350);
  return canvas;
}

export async function certificateCanvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Certificate image could not be created.")), "image/png", 1);
  });
}

export function downloadImage(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
