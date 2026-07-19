import streamlit as st


def initialize_session():

    defaults = {

        "uploaded_file": None,

        "filename": None,

        "detect_result": None,

        "cleaned_filename": None

    }

    for key, value in defaults.items():

        if key not in st.session_state:

            st.session_state[key] = value