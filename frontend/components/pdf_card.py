
import streamlit as st


def render_pdf_card(uploaded_file):

    st.subheader("📄 PDF Information")

    if uploaded_file:

        size = round(uploaded_file.size / 1024, 2)

        col1, col2 = st.columns(2)

        with col1:
            st.metric("Filename", uploaded_file.name)

        with col2:
            st.metric("Size", f"{size} KB")

    else:

        st.info("No PDF selected.")