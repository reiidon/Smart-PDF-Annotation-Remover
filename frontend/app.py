import streamlit as st
import pandas as pd

from components.uploader import render_uploader
from components.header import render_header
from components.footer import render_footer

from utils.session import initialize_session
from utils.style import load_css

from services.api import APIService


# ======================================================
# Page Configuration
# ======================================================

st.set_page_config(
    page_title="Smart PDF Annotation Remover",
    page_icon="📄",
    layout="wide"
)

# ======================================================
# Initialize
# ======================================================

initialize_session()
load_css()

# ======================================================
# Header
# ======================================================

render_header()


# ======================================================
# Workflow
# ======================================================

st.markdown("""
<div style="
background:#ffffff;
padding:20px;
border-radius:12px;
border:1px solid #E5E7EB;
margin-top:20px;
margin-bottom:20px;
">

<h4 style="text-align:center;margin-bottom:20px;">
🚀 Application Workflow
</h4>

<div style="
display:flex;
justify-content:space-around;
align-items:center;
font-size:18px;
font-weight:bold;
">

<span>📂 Upload</span>

<span style="color:#2563eb;">➜</span>

<span>🔍 Detect</span>

<span style="color:#2563eb;">➜</span>

<span>🧹 Remove</span>

<span style="color:#2563eb;">➜</span>

<span>⬇ Download</span>

</div>

</div>
""", unsafe_allow_html=True)



st.divider()

# ======================================================
# Upload Section
# ======================================================

with st.container():

    st.subheader("📂 Upload PDF")

    uploaded_file = render_uploader()

    if uploaded_file:

        if st.session_state.filename != uploaded_file.name:

            with st.spinner("Uploading PDF..."):

                try:

                    response = APIService.upload_pdf(uploaded_file)

                    st.session_state.uploaded_file = uploaded_file
                    st.session_state.filename = response["filename"]

                    st.session_state.detect_result = None
                    st.session_state.cleaned_filename = None

                    st.toast(
                        "📂 PDF uploaded successfully!",
                        icon="✅"
                    )

                except Exception as e:

                    st.error(f"Upload Failed: {e}")

# ======================================================
# PDF Information
# ======================================================

with st.container():

    st.subheader("📄 PDF Information")

    if st.session_state.uploaded_file:

        pdf = st.session_state.uploaded_file

        file_size = round(pdf.size / 1024, 2)

        col1, col2 = st.columns(2)

        with col1:
            st.metric(
                "Filename",
                pdf.name
            )

        with col2:
            st.metric(
                "Size",
                f"{file_size} KB"
            )

    else:

        st.info("No PDF selected.")

st.divider()

# ======================================================
# Detect
# ======================================================

with st.container():

    st.subheader("🔍 Detect Annotations")

    detect_btn = st.button(
        "🔍 Detect Annotations",
        use_container_width=True,
        disabled=st.session_state.filename is None
    )

    if detect_btn:

        with st.spinner("Detecting annotations..."):

            try:

                result = APIService.detect_annotations(
                    st.session_state.filename
                )

                st.session_state.detect_result = result

                st.toast(
                    f"🔍 Detection completed! Found {result['total_annotations']} annotations.",
                    icon="🔍"
                )

            except Exception as e:

                st.error(f"Detection Failed: {e}")

# ======================================================
# Annotation Results
# ======================================================

with st.container():

    st.subheader("📋 Annotation Results")

    if st.session_state.detect_result:

        result = st.session_state.detect_result

        col1, col2, col3 = st.columns(3)

        with col1:
            st.metric(
                "📝 Annotations",
                result["total_annotations"]
            )

        with col2:
            pages = len(
                set(a["page"] for a in result["annotations"])
            ) if result["annotations"] else 0

            st.metric(
                "📄 Pages Affected",
                pages
            )

        with col3:

            status = (
                "Needs Cleaning"
                if result["total_annotations"] > 0
                else "Clean PDF"
            )

            st.metric(
                "✅ Status",
                status
            )

        if result["annotations"]:

            df = pd.DataFrame(result["annotations"])

            # Rename columns
            df.rename(
                columns={
                    "page": "📄 Page",
                    "type": "📝 Annotation Type",
                    "content": "💬 Comment",
                    "author": "👤 Author"
                },
                inplace=True
            )

            # Replace empty values
            df.fillna("—", inplace=True)
            df.replace("", "—", inplace=True)

            st.dataframe(
                df,
                use_container_width=True,
                hide_index=True
            )

        else:

            st.info("No annotations found in this PDF.")

    else:

        st.info("No analysis performed yet.")
# ======================================================
# Remove
# ======================================================

with st.container():

    st.subheader("🧹 Remove PDF Content")

    col1, col2 = st.columns(2)

    # --------------------------------------------
    # Remove PDF Annotations
    # --------------------------------------------
    with col1:

        remove_annotation_btn = st.button(
            "📝 Remove PDF Annotations",
            use_container_width=True,
            disabled=st.session_state.detect_result is None
        )

        if remove_annotation_btn:

            with st.spinner("Removing PDF annotations..."):

                try:

                    result = APIService.remove_annotations(
                        st.session_state.filename
                    )

                    st.session_state.cleaned_filename = result["output_file"]

                    st.success("PDF annotations removed successfully!")

                except Exception as e:

                    st.error(f"Removal Failed: {e}")

    # --------------------------------------------
    # Remove Handwritten Signature
    # --------------------------------------------
    with col2:

        remove_signature_btn = st.button(
            "✍ Remove Handwritten Signature",
            use_container_width=True,
            disabled=st.session_state.filename is None
        )

        if remove_signature_btn:

            with st.spinner("Removing handwritten signature..."):

                try:

                    result = APIService.remove_signatures(
                        st.session_state.filename
                    )

                    st.session_state.cleaned_filename = result["output_file"]

                    st.success("Handwritten signature removed successfully!")

                except Exception as e:

                    st.error(f"Removal Failed: {e}")

# ======================================================
# Download
# ======================================================

with st.container():

    st.subheader("⬇ Download Clean PDF")

    if st.session_state.cleaned_filename:

        try:

            pdf_bytes = APIService.download_pdf(
                st.session_state.cleaned_filename
            )

            st.success("✅ Your cleaned PDF is ready to download.")

            st.download_button(
                label="⬇ Download Clean PDF",
                data=pdf_bytes,
                file_name=st.session_state.cleaned_filename,
                mime="application/pdf",
                use_container_width=True
            )

        except Exception as e:

            st.error(f"Download Failed: {e}")

    else:

        st.button(
            "⬇ Download Clean PDF",
            disabled=True,
            use_container_width=True
        )

st.divider()

# ======================================================
# Reset Application
# ======================================================

with st.container():

    st.subheader("🔄 Process Another PDF")

    st.write(
        "Click the button below to clear the current session and start with a new PDF."
    )

    if st.button(
        "🔄 Start New Session",
        use_container_width=True
    ):

        # Clear all session variables
        for key in list(st.session_state.keys()):
            del st.session_state[key]

        st.toast(
            "Session reset successfully!",
            icon="🔄"
        )

        st.rerun()

st.divider()

# ======================================================
# Footer
# ======================================================

render_footer()