{
  /* <button class="btn" data-bass="82.41 " data-note="329.63" data-harm="415.30">E</button>
<button class="btn" data-bass="110" data-note=".00" data-harm="554.37">A</button>
<button class="btn" data-bass="" data-note="554.37" data-harm="659.25">C#</button>
<button class="btn" data-bass="185" data-note="739.99" data-harm="932.33">F#</button> */
}
const notes = [
  [16.35, 17.32, 18.35, 19.45, 20.6, 21.83, 23.12, 24.5, 25.96, 27.5, 29.14, 30.87],
  [32.7, 34.65, 36.71, 38.89, 41.2, 43.65, 46.25, 49, 51.91, 55, 58.27, 61.74],
  [65.41, 69.3, 73.42, 77.78, 82.41, 87.31, 92.5, 98, 103.83, 110, 116.54, 123.47],
  [130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185, 196, 207.65, 220, 233.08, 246.94],
  [261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392, 415.3, 440, 466.16, 493.88],
  [523.25, 554.37, 587.33, 622.25, 659.25, 698.46, 739.99, 783.99, 830.61, 880, 932.33, 987.77],
  [1046.5, 1108.73, 1174.66, 1244.51, 1318.51, 1396.91, 1479.98, 1567.98, 1661.22, 1760, 1864.66, 1975.53],
  [2093.0, 2217.46, 2349.32, 2489.02, 2637.02, 2793.83, 2959.96, 3135.96, 3322.44, 3520, 3729.31, 3951.07],
  [4186.01, 4434.92, 4698.63, 4978.03, 5274.04, 5587.65, 5919.91, 6271.93, 6644.88, 7040, 7458.62, 7902.13],
];

export const buttons = {
  yellow: {
    bass: notes[3][0],
    note: notes[4][0],
    harm: notes[4][9],
    colors: ["fill-yellow", "fill-yellow-active"],
    position: "top-button left-button",
  },
  blue: {
    bass: notes[3][0],
    note: notes[4][4],
    harm: notes[5][0],
    colors: ["fill-blue", "fill-blue-active"],
    position: "top-button right-button rotate-90",
  },
  green: {
    bass: notes[3][0],
    note: notes[4][7],
    harm: notes[5][4],
    colors: ["fill-green", "fill-green-active"],
    position: "bottom-button right-button rotate-180",
  },
  red: {
    bass: notes[4][0],
    note: notes[5][0],
    harm: notes[5][9],
    colors: ["fill-red", "fill-red-active"],
    position: "bottom-button left-button -rotate-90",
  },
};
