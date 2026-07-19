import fitz
from pathlib import Path


class AnnotationRemover:

    @staticmethod
    def remove_annotations(document: fitz.Document):

        for page in document:

            annot = page.first_annot

            while annot:

                next_annot = annot.next

                page.delete_annot(annot)

                annot = next_annot

        return document