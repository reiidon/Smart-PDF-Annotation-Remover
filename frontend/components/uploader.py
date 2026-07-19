import streamlit as st


def render_uploader():

    uploaded_file = st.file_uploader(
        "Choose a PDF",
        type=["pdf"]
    )

    return uploaded_file