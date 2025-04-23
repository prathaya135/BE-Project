import nltk
from nltk.stem import WordNetLemmatizer
import spacy
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import string
import os

# Load Spacy model and stopwords
nlp = spacy.load("en_core_web_sm")
stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()

# Lemmatization function optimized for spacy tokenization
def lemmatize_words(words, pos_tags):
    filtered_text = []
    for word, tag in zip(words, pos_tags):
        pos = 'n'  # Default POS is noun
        if tag.startswith('V'): pos = 'v'
        elif tag.startswith('J'): pos = 'a'
        # Lemmatize based on POS
        filtered_text.append(lemmatizer.lemmatize(word, pos))
    return filtered_text

# Optimized function to detect negatives
def find_negative_word(doc):
    negative_words = {"not", "no", "never", "nothing", "none"}
    for token in doc:
        if token.text.lower() in negative_words:
            return token.text
    return None

# Optimized to detect WH-questions
def is_question(doc):
    for token in doc:
        if token.tag_ in ["WP", "WRB"]:  # WH-pronoun and WH-adverb
            return token.text
    return None

# Main processing function
def preprocess_text_to_isl(text):
    doc = nlp(text.lower())
    
    subject, obj, verb = "", "", ""
    adjectives, numbers = [], []
    negative_word, pronoun, wh_word = "", "", is_question(doc)

    for token in doc:
        if "subj" in token.dep_ and not subject:
            subject = "me" if token.text.lower() == "i" else token.text
        elif "obj" in token.dep_ and not obj:
            obj = token.text
        elif token.dep_ == "ROOT":
            verb = token.text
        elif token.pos_ == "ADJ":
            adjectives.append(token.text)
        elif token.pos_ == "NUM":
            numbers.append(token.text)
        elif token.dep_ in ["poss", "nsubj", "nsubjpass", "dobj"] and token.tag_ in ["PRP", "PRP$"]:
            pronoun = "me" if token.text.lower() == "i" else token.text

    negative_word = find_negative_word(doc)
    
    isl_sentence = [pronoun, subject, obj, verb] + adjectives + numbers
    if negative_word:
        isl_sentence.append(negative_word)
    if wh_word:
        isl_sentence.append(wh_word)

    return " ".join(filter(None, isl_sentence))

# Main function optimized to reduce redundant steps
def main_func(text):
    words = word_tokenize(text.lower())
    words = [word for word in words if word not in string.punctuation]
    
    preprocessed_text = preprocess_text_to_isl(" ".join(words))
    lemmatized_words = lemmatize_words(word_tokenize(preprocessed_text), [token.tag_ for token in nlp(preprocessed_text)])

    return " ".join(lemmatized_words)

# Helper function to retrieve video file paths based on ISL sentence
def get_folder_titles(path):
    return {item[:-4] for item in os.listdir(path)}

def return_file_path(isl_sentence, folders):
    file_paths = []
    for word in isl_sentence.split():
        if word in folders:
            file_paths.append(f"assets/{word}.mp4")
        else:
            for char in word:
                file_paths.append(f"assets/{char}.mp4")
    return file_paths

# Example usage
folder_path = 'assets/'
folders = get_folder_titles(folder_path)

text = "Hello I am Mohak"
isl_sentence = main_func(text)
print("ISL Sentence:", isl_sentence)

retrieved_files = return_file_path(isl_sentence, folders)
print("Retrieved File Paths:", retrieved_files)
