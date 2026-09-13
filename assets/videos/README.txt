Place your video files (e.g. .mp4) in this folder.

Example usage in HTML:

  <video class="card-media" controls src="assets/videos/your-video.mp4"></video>

Uncomment the example <video> tag in research.html (or any other page)
and update the "src" path to point to your actual video file here.

Tips:
- Keep video files reasonably small (a few MB) for fast page loads,
  especially if hosting on GitHub Pages (repo size limits apply).
- Supported formats: .mp4 (H.264) has the best browser support.
- You can also embed YouTube/Vimeo videos instead using an <iframe>,
  which avoids storing large video files in the repo, e.g.:

  <iframe width="100%" height="315"
    src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
    title="Video title" frameborder="0" allowfullscreen></iframe>
