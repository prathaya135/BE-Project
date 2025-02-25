#Install nltk
import nltk
from nltk.tag import pos_tag
from nltk.stem import WordNetLemmatizer
# Install Spacy
import spacy
import os

# nltk.download('punkt_tab')
# nltk.download('punkt')
# nltk.download('stopwords')
# nltk.download('averaged_perceptron_tagger')
# nltk.download('wordnet')


from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import string
# Install en_core_web_sm: python -m spacy download en_core_web_sm 
nlp = spacy.load("en_core_web_sm")
stop_words = set(stopwords.words('english'))


def lemm(words):
    tagged = nltk.pos_tag(words)
    lr = WordNetLemmatizer()
    filtered_text = []
    for w, p in zip(words, tagged):
        if p[1] in ['VBG', 'VBD', 'VBZ', 'VBN', 'NN']:
            filtered_text.append(lr.lemmatize(w, pos='v'))
        elif p[1] in ['JJ', 'JJR', 'JJS', 'RBR', 'RBS']:
            filtered_text.append(lr.lemmatize(w, pos='a'))
        else:
            filtered_text.append(lr.lemmatize(w))
    return filtered_text

def find_negative_word(doc):
    negative_words = {"not", "no", "never", "nothing", "none"}
    for word in doc:
        if word in negative_words:
            return word
    return None

def is_question(doc):
    for token in doc:
        if token.tag_ in ["WP", "WRB"]:  # WH-pronoun and WH-adverb
            return token.text
    return None

def preprocess_text_to_isl(text):

    doc = nlp(text)
    subject = ""
    obj = ""
    verb = ""
    adjectives = []
    numbers = []
    negative_word = ""
    wh_word = is_question(doc)
    pronoun = ""

    for token in doc:

        if "subj" in token.dep_:
            if token.text.lower() == "i":
                pronoun = "me"
            else:
                subject = token.text

        elif "obj" in token.dep_:
            obj = token.text

        elif token.dep_ == "ROOT":
            verb = token.text

        elif token.pos_ == "ADJ":
            adjectives.append(token.text)

        elif token.pos_ == "NUM":
            numbers.append(token.text)
        
        elif token.dep_ in ["poss", "nsubj", "nsubjpass", "dobj"] and token.tag_ in ["PRP", "PRP$"]:
            if token.text.lower() == "i":
                pronoun = "me"
            else:
                pronoun = token.text

    negative_word = find_negative_word(doc)
    isl_sentence = []

    if pronoun:
        isl_sentence.append(pronoun)

    if subject:
        isl_sentence.append(subject)
        
    if obj:
        isl_sentence.append(obj)

    if verb and verb not in stop_words:
        isl_sentence.append(verb)

    isl_sentence.extend(adjectives)
    isl_sentence.extend(numbers)

    if negative_word:
        isl_sentence.append(negative_word)
    if wh_word:
        isl_sentence.append(wh_word)

    return " ".join(isl_sentence)

###Main Function 
def main_func(text):
    text= text.lower()
    words = word_tokenize(text)
    words = [word for word in words if word not in string.punctuation]
    text = ""
    text=" ".join(words)
    text= preprocess_text_to_isl(text)
    words = word_tokenize(text)
    words=lemm(words)
    words=process_and_compare("../assets",words)
    # return " ".join(capitalized_words)
    capitalized_words = [word.capitalize() for word in words]
    return capitalized_words


def get_folder_titles(path):
    folder_titles = set()

    # Iterate through items in the specified path
    for item in os.listdir(path):
        item_name = item[:-4].lower()
        folder_titles.add(item_name)
    return folder_titles

def process_and_compare(path, capitalized_words):
    folder_titles = get_folder_titles(path)
    # print(folder_titles)
    result_array = []

    for word in capitalized_words:
        if word in folder_titles:
            result_array.append(word)
        else:
            # Convert the word into individual letters and add each letter
            result_array.extend(list(word))

    return result_array

# word=main_func("I am Prathamesh")
# print(word)

# text = "How are you?"
# ans=main_func(text)
# print(ans)

#Akash likes food
#What is your name?
#My car is red
#I have two brothers
#How are you?
#My name is Namya