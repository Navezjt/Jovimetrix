"""
Jovimetrix - http://www.github.com/amorano/jovimetrix
Audio
"""

from typing import Tuple

import torch
from loguru import logger

from comfy.utils import ProgressBar

from Jovimetrix import JOVBaseNode
from Jovimetrix.sup.lexicon import Lexicon
from Jovimetrix.sup.util import parse_param, zip_longest_fill, EnumConvertType
from Jovimetrix.sup.image import channel_solid, cv2tensor_full, EnumImageType, \
    MIN_IMAGE_SIZE
from Jovimetrix.sup.audio import graph_sausage

# =============================================================================

JOV_CATEGORY = "AUDIO"

# =============================================================================

class WaveGraphNode(JOVBaseNode):
    NAME = "WAVE GRAPH (JOV) ▶ ılıılı"
    CATEGORY = f"JOVIMETRIX 🔺🟩🔵/{JOV_CATEGORY}"
    RETURN_TYPES = ("IMAGE", "IMAGE", "MASK")
    RETURN_NAMES = (Lexicon.IMAGE, Lexicon.RGB, Lexicon.MASK)
    DESCRIPTION = """
The Wave Graph node visualizes audio waveforms as bars. Adjust parameters like the number of bars, bar thickness, and colors.
"""

    @classmethod
    def INPUT_TYPES(cls) -> dict:
        d = {
            "required": {},
            "optional": {
                Lexicon.WAVE: ("WAVE", {"default": None, "tooltip": "Audio Wave Object"}),
                Lexicon.VALUE: ("INT", {"default": 100, "min": 32, "max": 8192, "step": 1, "tooltip": "Number of Vertical bars to try to fit within the specified Width x Height"}),
                Lexicon.THICK: ("FLOAT", {"default": 0.72, "min": 0, "max": 1, "step": 0.01, "tooltip": "The percentage of fullness for each bar; currently scaled from the left only"}),
                Lexicon.WH: ("VEC2", {"default": (MIN_IMAGE_SIZE, MIN_IMAGE_SIZE),
                                    "step": 1, "label": [Lexicon.W, Lexicon.H], "tooltip": "Final output size of the wave bar graph"}),
                Lexicon.RGBA_A: ("VEC4", {"default": (128, 128, 0, 255), "step": 1,
                                        "label": [Lexicon.R, Lexicon.G, Lexicon.B, Lexicon.A], "rgb": True, "tooltip": "Bar Color"}),
                Lexicon.MATTE: ("VEC4", {"default": (0, 128, 128, 255), "step": 1,
                                        "label": [Lexicon.R, Lexicon.G, Lexicon.B, Lexicon.A], "rgb": True})
            }
        }
        return Lexicon._parse(d, cls)

    def run(self, **kw) -> Tuple[torch.Tensor, torch.Tensor]:
        wave = parse_param(kw, Lexicon.WAVE, EnumConvertType.ANY, None)
        bars = parse_param(kw, Lexicon.VALUE, EnumConvertType.INT, 50, 1, 8192)
        thick = parse_param(kw, Lexicon.THICK, EnumConvertType.FLOAT, 0.75, 0, 1)
        wihi = parse_param(kw, Lexicon.WH, EnumConvertType.VEC2INT, (MIN_IMAGE_SIZE, MIN_IMAGE_SIZE), MIN_IMAGE_SIZE)
        rgb_a = parse_param(kw, Lexicon.RGBA_A, EnumConvertType.VEC4INT, (196, 0, 196), 0, 255)
        matte = parse_param(kw, Lexicon.MATTE, EnumConvertType.VEC4INT, (42, 12, 42), 0, 255)
        params = list(zip_longest_fill(wave, bars, wihi, thick, rgb_a, matte))
        images = []
        pbar = ProgressBar(len(params))
        for idx, (wave, bars, wihi, thick, rgb_a, matte) in enumerate(params):
            width, height = wihi
            if wave is None:
                img = channel_solid(width, height, matte, EnumImageType.BGRA)
            else:
                img = graph_sausage(wave[0], bars, width, height, thickness=thick, color_line=rgb_a, color_back=matte)
            images.append(cv2tensor_full(img))
            pbar.update_absolute(idx)
        return [torch.cat(i, dim=0) for i in list(zip(*images))]
