export interface Video {
  id: string;
  title: string;
  url: string;
}

export const mainVideo: Video = {
  id: "main-video",
  title: "Video Principal",
  url: "https://drive.google.com/file/d/1WPYdsUP_VXov3gMKZgB2U1Hx8ZdLNX9a/preview"
};

export const sideVideos: Video[] = [
  {
    id: "historia-1",
    title: "Historia 1",
    url: "https://drive.google.com/file/d/1puqzvpNKRFfnyZ9wv3zvjD3ckdgaDErE/preview"
  },
  {
    id: "historia-2",
    title: "Historia 2",
    url: "https://drive.google.com/file/d/1WPYdsUP_VXov3gMKZgB2U1Hx8ZdLNX9a/preview"
  },
  {
    id: "historia-2",
    title: "Historia 2",
    url: "https://drive.google.com/file/d/1WPYdsUP_VXov3gMKZgB2U1Hx8ZdLNX9a/preview"
  }
]; 