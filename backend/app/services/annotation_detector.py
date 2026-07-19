class AnnotationDetector:

    @staticmethod
    def detect_annotations(doc):

        annotations = []

        for page_number in range(len(doc)):

            page = doc[page_number]

            annot = page.first_annot

            while annot:

                annotations.append(
                    {
                        "page": page_number + 1,
                        "type": annot.type[1],
                        "content": annot.info.get("content", ""),
                        "author": annot.info.get("title", "")
                    }
                )

                annot = annot.next

        return annotations