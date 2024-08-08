from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline, BartTokenizer
import fitz  # PyMuPDF
import traceback
import logging

app = Flask(__name__)
CORS(app)


logging.basicConfig(level=logging.DEBUG)


model_name = 'sshleifer/distilbart-cnn-12-6'
summarizer = pipeline('summarization', model=model_name)
tokenizer = BartTokenizer.from_pretrained(model_name)

def chunk_text(text, max_length=1024):
    tokens = tokenizer.encode(text, truncation=True, max_length=max_length)
    chunks = [tokens[i:i + max_length] for i in range(0, len(tokens), max_length)]
    return [tokenizer.decode(chunk, skip_special_tokens=True) for chunk in chunks]

@app.route('/summarize', methods=['POST'])
def summarize():
    try:
        file = request.files['file']
        if not file:
            return jsonify({'error': 'No file provided'}), 400

        
        if not file.filename.lower().endswith('.pdf'):
            return jsonify({'error': 'Invalid file type. Please upload a PDF file.'}), 400

        
        pdf_document = fitz.open(stream=file.read(), filetype='pdf')
        text = ""
        for page_num in range(pdf_document.page_count):
            page = pdf_document.load_page(page_num)
            text += page.get_text()
        pdf_document.close()

        if not text:
            return jsonify({'error': 'No text found in the PDF file.'}), 400

        
        chunks = chunk_text(text, max_length=1024)
        summaries = []

        
        for chunk in chunks:
            summary = summarizer(chunk, max_length=150, min_length=50, do_sample=False)
            summaries.append(summary[0]['summary_text'])

        final_summary = ' '.join(summaries)

        return jsonify({'summary': final_summary}), 200

    except Exception as e:
        error_message = str(e)
        logging.error(f"Error occurred: {error_message}")
        traceback.print_exc()  
        return jsonify({'error': 'An error occurred while processing the file.'}), 500

if __name__ == '__main__':
    app.run(debug=True)