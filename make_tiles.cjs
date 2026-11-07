const { PNG } = require('pngjs');
const fs = require('fs');

const colors = [
	[70, 70, 70],    // 0 road (gray)
	[150, 90, 60],   // 1 building (brown)
	[90, 160, 80],   // 2 footpath (green)
	[200, 50, 50],   // 3 shop (red)
	[60, 120, 200],  // 4 puddle (blue)
];

const png = new PNG({ width: 32 * colors.length, height: 32 });
for (let y = 0; y < 32; y++) {
	for (let x = 0; x < png.width; x++) {
		const [r, g, b] = colors[Math.floor(x / 32)];
		const i = (png.width * y + x) << 2;
		png.data[i] = r;
		png.data[i + 1] = g;
		png.data[i + 2] = b;
		png.data[i + 3] = 255;
	}
}

fs.writeFileSync('public/assets/tiles.png', PNG.sync.write(png));
console.log('tiles.png written');
