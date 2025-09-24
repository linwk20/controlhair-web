let currentGroup = 0;  // Track the current group of videos
const videosPerGroup = 6;

const videoScenes = [
  {
    sources: [
      './static/videos/bicycle_22_25_900_MiniSplatting-D_render_compressed.mp4',
      './static/videos/bicycle_22_25_900_3DGS_render_compressed.mp4',
      './static/videos/bicycle_22_25_900_LightGS-H_render_compressed.mp4',
      './static/videos/bicycle_22_25_900_FR-Render-H_render_compressed.mp4',
      './static/videos/bicycle_22_25_900_FR-Display-H_render_compressed.mp4',
      './static/videos/bicycle_22_25_900_PowerGS-H_render_compressed.mp4'
    ],
    render: [0.71, 0.64, 0.28, 0.14, 0.72, 0.11],
    display: [0.27, 0.27, 0.27, 0.26, 0.20, 0.21]
  },
  {
    sources: [
      './static/videos/room_18_20_1440_MiniSplatting-D_render_compressed.mp4',
      './static/videos/room_18_20_1440_3DGS_render_compressed.mp4',
      './static/videos/room_18_20_1440_LightGS-H_render_compressed.mp4',
      './static/videos/room_18_20_1440_FR-Render-H_render_compressed.mp4',
      './static/videos/room_18_20_1440_FR-Display-H_render_compressed.mp4',
      './static/videos/room_18_20_1440_PowerGS-H_render_compressed.mp4'
    ],
    render: [0.66, 0.31, 0.19, 0.10, 0.63, 0.10],
    display: [0.32, 0.32, 0.32, 0.32, 0.28, 0.30]
  },
  {
    sources: [
      './static/videos/hotdog_30_70_40_MiniSplatting-D_render_compressed.mp4',
      './static/videos/hotdog_30_70_40_3DGS_render_compressed.mp4',
      './static/videos/hotdog_30_70_40_LightGS-H_render_compressed.mp4',
      './static/videos/hotdog_30_70_40_FR-Render-H_render_compressed.mp4',
      './static/videos/hotdog_30_70_40_FR-Display-H_render_compressed.mp4',
      './static/videos/hotdog_30_70_40_PowerGS-H_render_compressed.mp4'
    ],
    render: [0.68, 0.08, 0.04, 0.02, 0.08, 0.02],
    display: [0.16, 0.16,  0.16, 0.16, 0.15, 0.15]
  },
  {
    sources: [
      './static/videos/materials_30_70_40_MiniSplatting-D_render_compressed.mp4',
      './static/videos/materials_30_70_40_3DGS_render_compressed.mp4',
      './static/videos/materials_30_70_40_LightGS-H_render_compressed.mp4',
      './static/videos/materials_30_70_40_FR-Render-H_render_compressed.mp4',
      './static/videos/materials_30_70_40_FR-Display-H_render_compressed.mp4',
      './static/videos/materials_30_70_40_PowerGS-H_render_compressed.mp4'
    ],
    render: [0.61, 0.07, 0.03, 0.01, 0.08, 0.01],
    display: [0.04, 0.09, 0.04, 0.04, 0.03, 0.03]
  }
];

const labels = [
  'Mini-D',
  '3DGS',
  'LightGS-H',
  'FR-Render-H',
  'FR-Display-H',
  'PowerGS-H'
];

function switchGroup(direction) {
  // Ensure the group cycles between available scenes
  currentGroup = (currentGroup + direction + videoScenes.length) % videoScenes.length;

  const videoItems = document.querySelectorAll('.video-item video');
  const fpsLabels = document.querySelectorAll('.video-label');

  // Update all videos with new sources
  videoItems.forEach((video, index) => {
    const source = video.querySelector('source');
    source.src = videoScenes[currentGroup].sources[index];
    video.load();  // Reload the video with the new source
  });

  // Update only the first 6 labels
  for (let i = 0; i < 6; i++) {
    const render = videoScenes[currentGroup].render[i];
    const display = videoScenes[currentGroup].display[i];
    const total = render + display;
    fpsLabels[i].innerHTML = `${labels[i]}<br>(${total.toFixed(2)} W = ${render.toFixed(2)} W + ${display.toFixed(2)} W)`;

  }
}

document.addEventListener("DOMContentLoaded", function() {
  // Get all video elements
  const videos = document.querySelectorAll('.video-item video');
  
  // Function to start all videos at the same time when Play All is clicked
  function playAllVideos() {
    videos.forEach(video => {
      video.currentTime = 0;  // Reset videos to start from the beginning
      video.play();           // Play each video
    });
  }

  // Expose the playAllVideos function globally for button click
  window.playAllVideos = playAllVideos;
});
