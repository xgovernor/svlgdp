declare global {
  interface INote {
    id: string;
    title: string;
    coordinates: { lat: number; lng: number };
    content: string;
    date: string;
    layer: string;
    overlay?: string[];
    zoom?: number;
    tags: string[];
  }
}
