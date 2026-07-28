import os
from PIL import Image


class PDFBuilder:

    def images_to_pdf(self, image_paths, output_path):

        images = []

        for image_path in image_paths:

            image = Image.open(image_path)

            if image.mode != "RGB":
                image = image.convert("RGB")

            images.append(image)

        if images:

            images[0].save(
                output_path,
                save_all=True,
                append_images=images[1:]
            )

        return output_path