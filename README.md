<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/Amorano/Jovimetrix-examples/blob/master/res/logo-jovimetrix.png">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/Amorano/Jovimetrix-examples/blob/master/res/logo-jovimetrix-light.png">
  <img alt="ComfyUI Nodes for procedural masking, live composition and video manipulation">
</picture>

<h2><div align="center">
<a href="https://github.com/comfyanonymous/ComfyUI">COMFYUI</a> Nodes for procedural masking, live composition and video manipulation
</div></h2>

<h3><div align="center">
JOVIMETRIX IS ONLY GUARANTEED TO SUPPORT <a href="https://github.com/comfyanonymous/ComfyUI">COMFYUI 0.1.3+</a> and <a href="https://github.com/Comfy-Org/ComfyUI_frontend">FRONTEND 1.2.40+</a><br>
IF YOU NEED AN OLDER VERSION, PLEASE DO NOT UPDATE.
</div></h3>

<h2><div align="center">

![KNIVES!](https://badgen.net/github/open-issues/amorano/jovimetrix)
![FORKS!](https://badgen.net/github/forks/amorano/jovimetrix)

</div></h2>

<!---------------------------------------------------------------------------->

# SPONSORSHIP

Please consider sponsoring me if you enjoy the results of my work, code or documentation or otherwise. A good way to keep code development open and free is through sponsorship.

<div align="center">

[![BE A GITHUB SPONSOR ❤️](https://img.shields.io/badge/sponsor-30363D?style=for-the-badge&logo=GitHub-Sponsors&logoColor=#EA4AAA)](https://github.com/sponsors/Amorano)

[![DIRECTLY SUPPORT ME VIA PAYPAL](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://www.paypal.com/paypalme/onarom)

[![PATREON SUPPORTER](https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white)](https://www.patreon.com/joviex)

[![SUPPORT ME ON KO-FI!](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/alexandermorano)

</div>

## HIGHLIGHTS

* 30 function `BLEND` node -- subtract, multiply and overlay like the best
* Vector support for 2, 3, 4 size tuples of integer or float type
* Specific RGB/RGBA color vector support that provides a color picker
* All Image inputs support RGBA, RGB or pure MASK input
* GLSL shader support
* * `GLSL Node`  provides raw access to Vertex and Fragment shaders
* * `Dynamic GLSL` dynamically convert existing GLSL scripts file into ComfyUI nodes at runtime
* * Over 20+ Hand written GLSL nodes to speed up specific tasks better done on the GPU (10x speedup in most cases)
* `STREAM READER` node to capture monitor, webcam or url media
* `STREAM WRITER` node to export media to a HTTP/HTTPS server for OBS or other 3rd party streaming software
* `SPOUT` streaming support *WINDOWS ONLY*
* MIDI device read support with `MIDI FILTER` and `MIDI FILTER EZ` nodes to drive other node parameters
* Full Text generation support using installed system fonts
* Basic parametric shape (Circle, Square, Polygon) generator
* `COLOR BLIND` check support
* `COLOR MATCH` against existing images or create a custom LUT
* Generate `COLOR THEORY` spreads from an existing image
* `COLOR MEANS` to generate palettes for existing images to keep other images in the same tonal ranges
* `PIXEL SPLIT` separate the channels of an image to manipulate and `PIXEL MERGE` them back together
* `STACK` a series of images into a new single image vertically, horizontally or in a grid
* Or `FLATTEN` a batch of images into a single image with each image subsequently added on top (slap comp)
* `VALUE` Node has conversion support for all ComfyUI types and some 3rd party types (2DCoords, Mixlab Layers)
* `LERP` node to linear interpolate all ComfyUI and Jovimetrix value types
* Automatic conversion of Mixlab Layer types into Image types
* Generic `ARRAY` that can Merge, Split, Select, Slice or Randomize a list of ANY type
* `STRINGER` node to perform specific string manipulation operations: Split, Join, Replace, Slice.
* A `QUEUE` Node that supports recursing directories, filtering multiple file types and batch loading
* Use the `OP UNARY` and `OP BINARY` nodes to perform single and double type functions across all ComfyUI and Jovimetrix value types
* Manipulate vectors with the `SWIZZLE` node to swap their XYZW positions
* `DELAY` execution at certain parts in a workflow, with or without a timeout
* Generate curve data with the `TICK` and `WAVE GEN` nodes
* Help System for *ALL NODES* that will auto-parse unknown knows for their type data and descriptions
* Colorization for *ALL NODES* using their own node settings, their node group or via regex pattern matching

### HELP SYSTEM

<div align="center">

![CLICKING NODES FOR HELP](res/wiki/help_002.png)
</div>

The built-in help system will dynamically parse any nodes found at the ComfyUI API endpoint:

`<comfyui_web_root>/object_info`

If those nodes have descriptions written in HTML or Markdown, they will be converted into HTML for presentation in the panel.

### NODE COLORS

<div align="center">

![alt text](res/wiki/color_001.png)
</div>

## UPDATES

**2024/11/24** @1.2.48:
* requirements update for OpenGL Accelerate
* Fixed bad escape sequence in header in image/__init__

**2024/11/16** @1.2.47:
* Better list handling for `VALUE` node et. al.
* Wave defaults for offset/phase adjusted to be zero (0)

**2024/10/29** @1.2.46:
* `DELAY` node updated maintain ComfyUI zoom (fixes issue #61)
* Added Enable/Disable for Screensaver mode in `DELAY` node (added option from issue #61)
* Added `Resize Matte` for nodes with `MODE` operator

**2024/10/16** @1.2.45:
* ENUMs cleaned for all usages (someone send coffee bucks to bframes for the bug checks!)

**2024/10/14** @1.2.44:
* Updated MIDI to use new ENUMs (thanks for the bug report bframes!)

**2024/10/13** @1.2.43:
* Attempt to patch MacOS for STREAMREADER to capture windows (ref: [Issue 60](https://github.com/Amorano/Jovimetrix/issues/60))

**2024/10/03** @1.2.42:
* OpenGL support for macOS with Silicon processors and Linux with Arm64 CPU (aarch64)
* Shout out to [BigCat88](https://github.com/bigcat88) for the PR to fix the above

**2024/09/21** @1.2.41:
* Colorizer panel ported to new frontend.
* numerical bit conversion for Number fields, String fields (character bits) and Image fields (pixels on/off)
* new `COLOR MEANS` node will generate color palettes of the top-k colors of an input
* new `BIT SPLIT` node will turn inputs into streams of bits used for modulation and triggering of other inputs
* Officially Supported Versions:
  * ComfyUI 0.1.3+
  * ComfyUI Frontend 1.2.40+

**2024/09/18** @1.2.39:
* `COMPARISON` node updated to support NONE for all inputs
* Fixed bad inputs for IMAGE/MASK where they were compound use on slots
* Cleaner API Message routes
* new include system for GLSL shaders
* GLSL: color, camera, const, curve, noise, sdf, shading and vector library supports
* new `GLSL COLOR PALETTE` node based on cosines
* new `GLSL INVERT` node
* new `GLSL FILTER RANGE` node
* Officially Supported Versions:
  * ComfyUI 0.1.3+
  * ComfyUI Frontend 1.2.30+

# INSTALLATION

[Please see the wiki for advanced use of the environment variables used during startup](https://github.com/Amorano/Jovimetrix/wiki/B.-ASICS)

## COMFYUI MANAGER

If you have [ComfyUI Manager](https://github.com/ltdrdata/ComfyUI-Manager) installed, simply search for Jovimetrix and install from the manager's database.

## MANUAL INSTALL
Clone the repository into your ComfyUI custom_nodes directory. You can clone the repository with the command:
```
git clone https://github.com/Amorano/Jovimetrix.git
```
You can then install the requirements by using the command:
```
.\python_embed\python.exe -s -m pip install -r requirements.txt
```
If you are using a <code>virtual environment</code> (<code><i>venv</i></code>), make sure it is activated before installation. Then install the requirements with the command:
```
pip install -r requirements.txt
```
# WHERE TO FIND ME

You can find me on [![DISCORD](https://dcbadge.vercel.app/api/server/62TJaZ3Z5r?style=flat-square)](https://discord.gg/62TJaZ3Z5r).